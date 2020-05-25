function parseRatingGradient(rating) {
	return "linear-gradient(to right, #3ea6ff " + rating + "%, #606060 " + rating + "%)";
}

function parseRating(rating) {
	return Math.floor(10 * rating) / 10 + "%";
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

function parseViews(views) {
	return (
		views > 1e9 ? Math.floor(views / 1e9) + "B" :
		views > 1e6 ? Math.floor(views / 1e6) + "M" :
		views > 1e3 ? Math.floor(views / 1e3) + "K" :
		views
	) + " views";
}

function newUnit(channel, videoId, title, thumbnail, timestamp, duration, rating, views) {
	var container = document.getElementById(channel);

	var unit = document.createElement("a");
	unit.id = videoId;
	unit.className = "unit";
	unit.target = "_blank";
	unit.href = "https://youtu.be/" + videoId;
	container.appendChild(unit);

	var sentiment = document.createElement("div");
	sentiment.className = "sentiment";
	if (rating) {
		sentiment.style.backgroundImage = parseRatingGradient(rating);
		sentiment.innerHTML = parseRating(rating);
	}
	unit.appendChild(sentiment);

	var thumb = document.createElement("div");
	thumb.className = "thumb";
	if (duration) {
		thumb.dataset.duration = parseDuration(duration);
	}
	unit.appendChild(thumb);

	var img = new Image();
	img.alt = title;
	img.src = thumbnail;
	thumb.appendChild(img);

	var attendance = document.createElement("div");
	attendance.className = "attendance";
	unit.appendChild(attendance);

	for (var member of ["ai", "black", "love", "pii", "bro"]) {
		var slot = document.createElement("div");
		slot.className = member;
		attendance.appendChild(slot);
	}

	var ASDASDDtitle = document.createElement("div");
	ASDASDDtitle.className = "title";
	ASDASDDtitle.innerHTML = title;
	unit.appendChild(ASDASDDtitle);

	var viewcount = document.createElement("div");
	viewcount.className = "viewcount";
	if (views) {
		viewcount.innerHTML = parseViews(views);
	}
	unit.appendChild(viewcount);

	var date = document.createElement("div");
	date.className = "date";
	date.innerHTML = new Date(timestamp).toLocaleDateString();
	unit.appendChild(date);
}