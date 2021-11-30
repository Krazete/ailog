# Kizuna AI Attendance Log

An interactive log of all videos on [A.I.Channel](https://youtube.com/aichannel), [A.I.Games](https://youtube.com/aigamesdayo), and [A.I.Channel China](https://youtube.com/channel/UCArUdy5xj0i0cTuhPHRVMpw) spanning from Love-chan and AI-pii's debut on A.I.Channel to their Live2D redebut on their own [love-pii Channel](https://youtube.com/channel/UCYm8zALd2uHqyy6C1tb4_zA).

Its main purpose is to show which videos AI-chan, Black AI, Love-chan, AI-pii, and AI-bro participated in.

![ailovepii](ailovepii.gif)

## Versions

There are two versions of the attendance log.

### [Live Version](https://krazete.github.io/ailog/live)

* uses the YouTube Data API to retrieve up-to-date information for each video
* doesn't include ratings due to YouTube's [removal of the dislike count](https://blog.youtube/news-and-events/update-to-youtube)
* sometimes messes up the chronological order due to loading videos in batches of 50

### [Static Version](https://krazete.github.io/ailog/static)

* uses data archived from June 2020
* loads faster (it isn't held back by quota limits, so video entries don't need to be lazy loaded)
* includes old ratings and entries of deleted videos
* doesn't have any weird order issues

## Symbols

|Symbol|Version of Kizuna AI|
|:-:|-|
|<img src="icon/ai.png" width="32px">|AI-chan / Oyabun / Original / OG|
|<img src="icon/black.png" width="32px">|Black AI|
|<img src="icon/love.png" width="32px">|Love-chan / AInee / キュール / AI #2|
|<img src="icon/pii.png" width="32px">|AI-pii / AImouto / すきぴ / AI #3|
|<img src="icon/bro.png" width="32px">|AI-bro / AI-ge / Chinese AI / AI #4|

## Unlisted and Members-Only Videos

The website uses the automatically generated Channel Uploads playlist for each channel, so only publicly listed videos are included.

The [A.I.Games Video List](https://youtube.com/playlist?list=PLWkRfirH7n-tCgddNgyWCSK8QGsK8EV7L) playlist has a bunch of additional unlisted and members-only videos, but nearly all of these have a publicly listed digest version and are thus negligible.

The only notable exceptions are the members-only [AI-pii stream of upd8's Pokémon Sword and Shield Cup](https://youtu.be/AQuB3W1p4Yg) and the unlisted [Love-chan and AI-pii stream of Man of Medan](https://youtu.be/dzmzokLdeIA).

## A.I.Channel China

A.I.Channel China's videos are sporadic reuploads of Bilibili videos.
This means the section isn't in true chronological order and is missing some content.

Most collaborations with AI-chan are still included though, so this error is minor.

## Logging

I reviewed and marked all 534 videos myself.
Though I thoroughly checked each video, I may have missed or mismarked some entries.

For example, I would've missed AI-chan and Love-chan in AI-pii's Christmas livestream if I hadn't checked the last few minutes knowing it was the last of 3 livestreams that day.
I also would've missed Love-chan's participation in AI-pii's 9-hour livestream if I hadn't checked timestamps in the comment section.

If I got anything wrong, please let me know.

* Gmail: krazete@gmail.com
* Discord: Krazete#7038
* Reddit: u/krazete

## Supplementary Reading

* [MOTIVATION.md](https://github.com/Krazete/ailog/blob/master/MOTIVATION.md)
* [CONTEXT.md](https://github.com/Krazete/ailog/blob/master/CONTEXT.md)
* [Infographic Timeline](https://twitter.com/kizunaaiss/status/1327967483932725251)
* [Detailed Timeline](https://docs.google.com/document/d/1wFML_LXAbKEIuRu42vN_GW7hIqqPU4DDfQALbvCv4FI)
