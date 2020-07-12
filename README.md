# Kizuna AI Attendance Log

An interactive log of all videos on [A.I.Channel](https://www.youtube.com/aichannel), [A.I.Games](https://www.youtube.com/aigamesdayo), and [A.I.Channel China](https://www.youtube.com/channel/UCArUdy5xj0i0cTuhPHRVMpw) from the day Love-chan and AI-pii were installed to the day of their first livestream on [love-pii Channel](https://www.youtube.com/channel/UCYm8zALd2uHqyy6C1tb4_zA) using their own distinct models.

Its main purpose is to show which videos AI-chan, Black AI, Love-chan, AI-pii, and AI-bro participated in.

![ailovepii](ailovepii.gif)

## Symbols

The website already explains the symbols, but here's another chart including each AI's former and alternative nicknames:

|Symbol|Version of Kizuna AI|
|:-:|-|
|<img src="icon/ai.png" width="32px">|AI-chan / Oyabun / Original / OG|
|<img src="icon/black.png" width="32px">|Black AI|
|<img src="icon/love.png" width="32px">|Love-chan / AInee / キュール / AI #2|
|<img src="icon/pii.png" width="32px">|AI-pii / AImouto / すきぴ / AI #3|
|<img src="icon/bro.png" width="32px">|AI-bro / AI-ge / Chinese AI / AI #4|

## Versions

There are two versions of the attendance log.

### [Live Version](https://krazete.github.io/ailog/live)

* uses the YouTube Data API to retrieve up-to-date information for each video
* sometimes messes up the chronological order due to loading videos in batches of 50

### [Static Version](https://krazete.github.io/ailog/static)

* probably has nearly identical data because ratings and view counts don't change much months after a video is published
* loads faster (it isn't held back by quota limits, so videos don't need to be lazy loaded)
* doesn't have any weird order issues

Both versions lazy load all thumbnails for efficiency and faster initialization.

## Unlisted and Members-Only Videos

The website uses the automatically generated Channel Uploads playlist for each channel, which means it only includes publicly listed videos.

The [A.I.Games Video List](https://www.youtube.com/playlist?list=PLWkRfirH7n-tCgddNgyWCSK8QGsK8EV7L) playlist has a bunch of additional videos which are unlisted and members-only, but nearly all of these have a publicly listed digest version and are thus better off excluded.

The only notable exceptions are the members-only [AI-pii stream of upd8's Pokémon Sword and Shield Cup](https://youtu.be/AQuB3W1p4Yg) and the unlisted [Love-chan and AI-pii stream of Man of Medan](https://youtu.be/dzmzokLdeIA).

## A.I.Channel China

I realize A.I.Channel China's videos were uploaded on Bilibili much earlier than their YouTube publish date.
This means AI-bro's content is not truly in chronological order.
More importantly, it means some later videos which should be included are not displayed here.

Due to the rarity of collaborations on A.I.Channel China, this error is a minor one.
Thus, I did not make any attempt to fix the issue.

## Logging

I reviewed and marked all 534 videos myself.
Though I thoroughly checked each video, I may have missed or mismarked some entries.

For example, I would've missed AI-chan and Love-chan in AI-pii's Christmas livestream if I hadn't checked the last few minutes knowing it was the last of 3 livestreams that day.
I also would've missed Love-chan's participation in AI-pii's 9-hour livestream if I hadn't checked timestamps in the comment section.

If I did get anything wrong, please let me know.

* Gmail: krazete@gmail.com
* Discord: Krazete#7038
* Reddit: u/krazete

## Supplementary Reading

* [MOTIVATION.md](https://github.com/Krazete/ailog/blob/master/MOTIVATION.md)
* [CONTEXT.md](https://github.com/Krazete/ailog/blob/master/CONTEXT.md)
