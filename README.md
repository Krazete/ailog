# Kizuna AI Attendance Log

An interactive log of all videos on [A.I.Channel](https://www.youtube.com/aichannel), [A.I.Games](https://www.youtube.com/aigamesdayo), and [A.I.Channel China](https://www.youtube.com/channel/UCArUdy5xj0i0cTuhPHRVMpw) from the day Love-chan and AI-pii were installed to the day they resigned from the identity of Kizuna AI.

Its main purpose is to show which videos AI-chan, Black AI, Love-chan, AI-pii, and AI-bro participated in.

There are two versions of the attendance log:

* [Live Version](https://krazete.github.io/ailog/live)
  * uses the YouTube Data API to retrieve up-to-date information for each video
  * sometimes messes up the chronological order due to loading videos in batches of 50

* [Static Version](https://krazete.github.io/ailog/static)
  * probably has nearly identical data because ratings and view counts don't change much months after a video is published
  * loads faster (it isn't held back by quota limits, so videos don't need to be lazy loaded)
  * doesn't have any weird order issues
  * just use the static version

This website was made mostly as a reaction to the common misinformed claim that the original voice model was replaced.
Hopefully this project can clarify that this never was the case.
