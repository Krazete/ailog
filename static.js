function loadJSON(path) {
    function request(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);
        xhr.addEventListener("load", function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(JSON.parse(this.response));
            }
        });
        xhr.addEventListener("error", reject);
        xhr.send();
    }
    return new Promise(request);
}

function initOptions(channels) {
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
    }

    for (var option of options) {
        option.addEventListener("input", selectChannel);
        if (option.checked) {
            option.checked = false;
            option.click();
        }
    }
}

function loadChannels(response) {
    var capture = document.getElementById("capture");
    capture.innerHTML = new Date(response[0]).toLocaleString();

    var channels = response[1];

    for (var channel in channels) {
        var container = document.getElementById(channel);

        if (channels[channel].initialized && !channels[channel].nextPageToken) {
            container.classList.add("complete");
        }

        var ids = Object.keys(channels[channel].videos);
        ids.sort(function (a, b) {
            return new Date(channels[channel].videos[b].timestamp) - new Date(channels[channel].videos[a].timestamp);
        });

        for (var id of ids) {
            container.appendChild(newUnit(
                id,
                channels[channel].videos[id].title,
                channels[channel].videos[id].thumbnail,
                channels[channel].videos[id].timestamp,
                channels[channel].videos[id].duration,
                channels[channel].videos[id].rating,
                channels[channel].videos[id].views
            ));
        }
    }

    initOptions(channels);
}

function init() {
    loadJSON("static.json").then(loadChannels);
}

window.addEventListener("DOMContentLoaded", init);
