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

function parseDuration(duration) {
	var hMatch = duration.match(/(\d+)H/);
	var mMatch = duration.match(/(\d+)M/);
	var sMatch = duration.match(/(\d+)S/);
	var h = hMatch ? parseInt(hMatch[1]) : 0;
	var m = mMatch ? parseInt(mMatch[1]) : 0;
	var s = sMatch ? parseInt(sMatch[1]) : 0;

	return (h ? h + ":" + m.toString().padStart(2, "0") : m) + ":" + s.toString().padStart(2, "0");
}

function loadStatistics(videoIds) {
	var params = {
		"part": ["statistics", "contentDetails"],
		"id": videoIds
	};

	function onload(response) {
		for (var item of response.result.items) {
			var unit = document.getElementById(item.id);
			if (unit) {
				var duration = parseDuration(item.contentDetails.duration);
				var views = parseInt(item.statistics.viewCount);
				var likes = parseInt(item.statistics.likeCount);
				var dislikes = parseInt(item.statistics.dislikeCount);
				var rating = parseInt(100 * likes / (likes + dislikes));

				var thumb = unit.getElementsByClassName("thumb")[0];
				thumb.dataset.duration = duration;

				var sentiment = unit.getElementsByClassName("sentiment")[0];
				sentiment.style.backgroundImage = "linear-gradient(to right, #3ea6ff " + rating + "%, #606060 " + rating + "%)";
				sentiment.innerHTML = Math.floor(rating) + "%";

				var viewcount = unit.getElementsByClassName("viewcount")[0];
				viewcount.innerHTML = (
					views > 1e9 ? Math.floor(views / 1e9) + "B" :
					views > 1e6 ? Math.floor(views / 1e6) + "M" :
					views > 1e3 ? Math.floor(views / 1e3) + "K" :
					views
				) + " views";
			}
		}
		console.log(response);
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
			"UCArUdy5xj0i0cTuhPHRVMpw"
		),
		"maxResults": 50
	};

	if (pageToken) {
		params.pageToken = pageToken;
	}

	function onload(response) {
		console.log(response);
		var broken = false;
		var videoIds = [];

		for (var item of response.result.items.sort(byTime)) {
			var timestamp = new Date(item.snippet.publishedAt);
			if (timestamp > new Date("2020-05-09T15:00:00Z")) { /* Board Game Arena: Love Letter */
				continue;
			}
			else if (timestamp < new Date("2019-05-24T15:00:00Z")) { /* Kizuna AI's Every Day #1 */
				broken = true;
				break;
			}

			var unit = document.createElement("a");
			unit.id = item.snippet.resourceId.videoId;
			unit.className = "unit";
			unit.target = "_blank";
			unit.href = "https://youtu.be/" + item.snippet.resourceId.videoId;
			container.appendChild(unit);

			var sentiment = document.createElement("div");
			sentiment.className = "sentiment";
			unit.appendChild(sentiment);

			var thumb = document.createElement("div");
			thumb.className = "thumb";
			unit.appendChild(thumb);

			var img = new Image();
			img.alt = item.snippet.title;
			img.src = (
				item.snippet.thumbnails.high ? item.snippet.thumbnails.high.url :
				item.snippet.thumbnails.medium ? item.snippet.thumbnails.medium.url :
				item.snippet.thumbnails.default ? item.snippet.thumbnails.default.url :
				item.snippet.thumbnails.standard ? item.snippet.thumbnails.standard.url :
				item.snippet.thumbnails.maxres ? item.snippet.thumbnails.maxres.url :
				"https://i.ytimg.com/"
			);
			thumb.appendChild(img);

			var attendance = document.createElement("div");
			attendance.className = "attendance";
			unit.appendChild(attendance);

			for (var member of ["ai", "black", "love", "pii", "bro"]) {
				var slot = document.createElement("div");
				slot.className = member;
				attendance.appendChild(slot);
			}

			var title = document.createElement("div");
			title.className = "title";
			title.innerHTML = item.snippet.title;
			unit.appendChild(title);

			var viewcount = document.createElement("div");
			viewcount.className = "viewcount";
			unit.appendChild(viewcount);

			var date = document.createElement("div");
			date.className = "date";
			date.innerHTML = new Date(item.snippet.publishedAt).toLocaleDateString();
			unit.appendChild(date);

			videoIds.push(item.snippet.resourceId.videoId);
		}

		loadStatistics(videoIds);

		if (!broken && "nextPageToken" in response.result) {
			// loadPlaylist(channel, response.result.nextPageToken);
		}
	}

	return gapi.client.youtube.playlistItems.list(params).then(onload, onerror);
}

function init() {
	function callback() {
		loadClient().then(function () {
			loadPlaylist("aichannel");
			// loadPlaylist("aigames");
		});
	}

	gapi.load("client", callback);
}

window.addEventListener("DOMContentLoaded", init);
