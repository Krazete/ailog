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
        if (option.value == "aichannel") {
            option.click();
        }
    }
}

function loadChannels(channels) {
    for (var channel in channels) {
        var container = document.getElementById(channel);

        if (channels[channel].initialized && !channels[channel].newPageToken) {
            container.classList.add("complete");
        }

        for (var id in channels[channel].videos) {
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
