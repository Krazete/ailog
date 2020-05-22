var apikey = "AIzaSyDWrtvEz9kusT5RCSEhrqcx2SBdUtw1cVY";

function onerror(error) {
	console.error(error.stack ? error.stack : error.message);
}

function loadClient() {
	var rest = "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest";

	function onload() {
		console.log("GAPI client loaded for API.");
	}

	gapi.client.setApiKey(apikey);
	return gapi.client.load(rest).then(onload, onerror);
}

var qualities = new Set();

function execute(pageToken) {
	var params = {
		"part": "snippet",
		// "playlistId": "UU4YaOt1yT-ZeyB0OmxHgolA", /* A.I.Channel */
		"playlistId": "UUbFwe3COkDrbNsbMyGNCsDg", /* A.I.Games */
		"maxResults": 50
	};

	if (pageToken) {
		params.pageToken = pageToken;
	}

	function onload(response) {
		// console.log(response.result, response.result.items);

		for (var item of response.result.items) {
			console.log(item.snippet.title, item.snippet.publishedAt);
			var timestamp = new Date(item.snippet.publishedAt);
			if (timestamp > new Date("2020-05-09T15:00:00Z")) { /* Board Game Arena: Love Letter */
				continue;
			}
			else if (timestamp < new Date("2019-05-24T15:00:00Z")) { /* Kizuna AI's Every Day #1 */
				return;
			}

			var div = document.createElement("div");

			var img = new Image();
			img.src = item.snippet.thumbnails.standard ? item.snippet.thumbnails.standard.url : item.snippet.thumbnails.default.url;
			img.alt = item.snippet.title;
			div.appendChild(img);

			var p = document.createElement("p");
			p.innerHTML = item.snippet.title;
			div.appendChild(p);

			document.body.appendChild(div);
		}

		if ("nextPageToken" in response.result) {
			execute(response.result.nextPageToken);
		}
	}

	return gapi.client.youtube.playlistItems.list(params).then(onload, onerror);
}

function init() {
	gapi.load("client", function () {
		loadClient().then(execute);
	});
}

window.addEventListener("DOMContentLoaded", init);
