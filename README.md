# Kizuna AI Attendance Log

An interactive log of all videos on [A.I.Channel](https://www.youtube.com/aichannel), [A.I.Games](https://www.youtube.com/aigamesdayo), and [A.I.Channel China](https://www.youtube.com/channel/UCArUdy5xj0i0cTuhPHRVMpw) from the day Love-chan and AI-pii were installed to the day they resigned from the identity of Kizuna AI.

Its main purpose is to show which videos AI-chan, Black AI, Love-chan, AI-pii, and AI-bro participated in.

## Notes

I reviewed and marked all 488 videos myself.

While I did thoroughly check each video, I may have missed some entries.
I would've missed AI-chan and Love-chan in AI-pii's Christmas livestream if I hadn't checked the last few minutes knowing it was the last of 3 livestreams that day.
I also would've missed Love-chan's participation in AI-pii's 9-hour livestream if I hadn't checked timestamps in the comment section.

If I did miss anything, please let me know.

* Gmail: krazete@gmail.com
* Discord: Krazete#7038
* Reddit: u/krazete

I realize A.I.Channel China's videos were uploaded on Bilibili much earlier than their YouTube publish date.
This means AI-bro's content is not truly in chronological order.
More importantly, it means some later videos which should be included are not displayed here.

Due to the rarity of collaborations on A.I.Channel China, this error is a minor one.
Thus, I did not make any attempt to fix the issue.

## Versions

There are two versions of the attendance log:

### [Live Version](https://krazete.github.io/ailog/live)

* uses the YouTube Data API to retrieve up-to-date information for each video
* sometimes messes up the chronological order due to loading videos in batches of 50

### [Static Version](https://krazete.github.io/ailog/static)

* probably has nearly identical data because ratings and view counts don't change much months after a video is published
* loads faster (it isn't held back by quota limits, so videos don't need to be lazy loaded)
* doesn't have any weird order issues

Both versions lazy load all thumbnails for efficiency and faster initialization.
