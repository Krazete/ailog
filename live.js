var apikey = "AIzaSyDWrtvEz9kusT5RCSEhrqcx2SBdUtw1cVY";
var currentChannel;
var channels = {
    "aichannel": {
        "initialized": false,
        "nextPageToken": undefined,
        "videos": {}
    },
    "aigames": {
        "initialized": false,
        "nextPageToken": undefined,
        "videos": {}
    },
    "aichina": {
        "initialized": false,
        "nextPageToken": undefined,
        "videos": {}
    }
};

function onerror(e) {
    console.error(e);
    if (e.error.code == 403) {
        location = "static.html";
    }
}

function loadClient() {
    var rest = "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest";

    function onload() {
        console.log("GAPI client loaded for API.");
    }

    gapi.client.setApiKey(apikey);
    return gapi.client.load(rest).then(onload, onerror);
}

function loadStatistics(channel, videoIds) {
    var params = {
        "part": ["statistics", "contentDetails"],
        "id": videoIds
    };

    function onload(response) {
        for (var item of response.result.items) {
            var unit = document.getElementById(item.id);
            if (unit) {
                var duration = item.contentDetails.duration;
                var views = parseInt(item.statistics.viewCount);
                var likes = parseInt(item.statistics.likeCount);
                var dislikes = parseInt(item.statistics.dislikeCount);
                var rating = 100 * likes / (likes + dislikes);

                var thumb = unit.getElementsByClassName("thumb")[0];
                thumb.dataset.duration = parseDuration(duration);

                var sentiment = unit.getElementsByClassName("sentiment")[0];
                sentiment.style.backgroundImage = parseRatingBar(rating);
                sentiment.innerHTML = parseRating(rating);

                var viewcount = unit.getElementsByClassName("viewcount")[0];
                viewcount.innerHTML = parseViews(views);

                channels[channel].videos[item.id].duration = duration;
                channels[channel].videos[item.id].views = views;
                channels[channel].videos[item.id].rating = rating;
            }
        }
    }

    return gapi.client.youtube.videos.list(params).then(onload, onerror);
}

function byTime(a, b) {
    return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt);
}

function loadPlaylist(channel, pageToken) {
    var container = document.getElementById(channel);

    var params = {
        "part": "snippet",
        "playlistId": (
            channel == "aichannel" ? "UU4YaOt1yT-ZeyB0OmxHgolA" :
            channel == "aigames" ? "UUbFwe3COkDrbNsbMyGNCsDg" :
            channel == "aichina" ? "UUArUdy5xj0i0cTuhPHRVMpw" :
            "WL"
        ),
        "maxResults": 50
    };

    if (pageToken) {
        params.pageToken = pageToken;
    }

    function onload(response) {
        var broken = false;
        var videoIds = [];

        for (var item of response.result.items.sort(byTime)) {
            var timestamp = item.snippet.publishedAt;
            var ts = new Date(timestamp);
            if (ts > new Date("2020-06-14T15:00:00Z")) { /* love-pii New Model Livestream */
                continue;
            }
            else if (ts < new Date("2019-05-24T15:00:00Z")) { /* Kizuna AI's Every Day #1 */
                broken = true;
                break;
            }

            var id = item.snippet.resourceId.videoId;
            var title = item.snippet.title;
            var thumbnail = (
                item.snippet.thumbnails.high ? item.snippet.thumbnails.high.url :
                item.snippet.thumbnails.default ? item.snippet.thumbnails.default.url :
                item.snippet.thumbnails.standard ? item.snippet.thumbnails.standard.url :
                "https://i.ytimg.com/"
            );

            container.appendChild(newUnit(id, title, thumbnail, timestamp));

            channels[channel].videos[id] = {
                "title": title,
                "thumbnail": thumbnail,
                "timestamp": timestamp
            };

            videoIds.push(id);
        }

        if (videoIds.length > 0) {
            loadStatistics(channel, videoIds);
        }

        if (!broken && "nextPageToken" in response.result) {
            channels[channel].nextPageToken = response.result.nextPageToken;
        }
        else {
            nextPageToken = undefined;
            container.classList.add("complete");
        }
    }

    return gapi.client.youtube.playlistItems.list(params).then(onload, onerror);
}

function initOptions() {
    var options = document.querySelectorAll("input[name='channel']");

    function selectChannel(e) {
        for (var channel in channels) {
            if (this.value == channel) {
                document.getElementById(channel).classList.remove("hidden");
            }
            else {
                document.getElementById(channel).classList.add("hidden");
            }
        }
        if (channels[this.value].initialized == false) {
            channels[this.value].initialized = true;
            loadPlaylist(this.value);
        }
        currentChannel = this.value;
    }

    function queueNextPage() {
        if (currentChannel && channels[currentChannel].nextPageToken && innerHeight + scrollY + 100 >= document.documentElement.offsetHeight) {
            loadPlaylist(currentChannel, channels[currentChannel].nextPageToken);
            channels[currentChannel].nextPageToken = undefined;
        }
        requestAnimationFrame(queueNextPage);
    }

    for (var option of options) {
        option.addEventListener("input", selectChannel);
        if (option.checked) {
            option.checked = false;
            option.click();
        }
        queueNextPage();
    }
}

function init() {
    function callback() {
        loadClient().then(initOptions);
    }

    gapi.load("client", callback);
}

function generateStaticData() {
    for (var channel in channels) {
        if (!channels[channel].initialized || channels[channel].nextPageToken) {
            console.warn("Data for", channel, "has not been fully loaded.");
        }
    }
    return JSON.stringify([Date.now(), channels]);
}

window.addEventListener("DOMContentLoaded", init);
