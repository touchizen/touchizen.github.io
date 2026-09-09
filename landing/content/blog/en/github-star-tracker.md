---
title: "GitHub No Longer Tells You Star History — So We Started Recording It"
date: "2026-09-09"
excerpt: "Looking for repositories that gained 10,000 stars in three months, we found that every API able to answer that question is gone. The stargazers endpoint returns 404, and the public event feed carries 5% of the star events it did a year ago. Here are the measurements, and the free tool they led to."
tags: ["GitHub", "API", "Developer Tools", "Open Source"]
author: "Touchizen"
image: "/images/blog/ghstars/ghstars-hero-en.png"
---

## A question that looked simple

"Are there GitHub repositories that got more than 10,000 stars in the last three months?"

One sentence. But going after the answer, it turned out to be **two questions of completely different kinds** wearing one coat. One took thirty seconds. The other could not be answered at all.

![GitHub Star Tracker — repositories created in the last three months with 10,000+ stars](/images/blog/ghstars/ghstars-hero-en.png)

## The easy half: repositories that are new

"Repositories **created** in the last three months with at least 10,000 stars" is one line of GitHub search.

```
created:>2026-06-09 stars:>=10000
```

Today that returns **24 repositories**. Top of the list is `deepseek-ai/deepseek-harness`, created on August 13 and past 216,000 stars. The list is overwhelmingly AI agents and harnesses.

One detail here is worth pausing on. This search API answers **the browser directly, with no authentication**.

```
HTTP/2 200
access-control-allow-origin: *
x-ratelimit-limit: 10
x-ratelimit-resource: search
```

CORS is open, and the ten-per-minute limit is counted **per visitor IP**. Put a server in front of it and the whole site shares one budget of ten; call it from the browser and every visitor gets their own ten. For this shape of problem, having no backend is not a shortcut — it is the better design.

## The hard half: how much an existing repository grew

The second reading is the problem. "Repositories that **gained** 10,000 stars in the last three months, whenever they were created" does not come out of search. GitHub search knows today's star count and nothing about the count three months ago.

There used to be a way around it. Sending a particular Accept header to the `stargazers` endpoint returned a timestamp for each star, and binary-searching backwards from the last page found the boundary of any window you liked.

Here is that request now.

```
GET /repos/facebook/react/stargazers
Accept: application/vnd.github.star+json

HTTP/2 404
```

That is `facebook/react`. Not a typo, not a permissions problem. Probe a few neighbours and the pattern appears.

| Endpoint | Response |
|---|---|
| `/repos/{o}/{r}/stargazers` | **404** |
| `/repos/{o}/{r}/subscribers` | **404** |
| `/repos/{o}/{r}/forks` | 200 |
| `/repos/{o}/{r}/contributors` | 200 |
| `/user/starred` (your own) | 200, with `starred_at` |

Forks and contributors are fine, and you can still read your own stars. What went away is specifically **the ability to enumerate who starred or watched somebody else's repository**. As a privacy change it reads sensibly. It also removed the foundation under every tool that computed star history.

## The second route has dried up too

The next candidate is the public event feed. In GitHub's public event stream one `WatchEvent` is one star, and GH Archive stores that stream hour by hour. Most services that ranked repositories by recent growth were built on it.

We downloaded the same hour of the day from three different years and counted.

| Date | All events | WatchEvent (stars) |
|---|---|---|
| 2025-06-09 | 137,566 | **4,394** |
| 2026-06-09 | 156,305 | **730** |
| 2026-09-08 | 83,301 | **213** |

Five percent of the old volume within a year, and under one percent now. The telling part is that total event volume did not collapse — the star events specifically did.

OSSInsight, which ranked from exactly this data, now answers with:

```json
{
  "status": "unavailable",
  "unavailable_since": "2026-03-01",
  "reason": "our capture of those events fell to roughly 0.3% of baseline,
             so the ordering would be noise"
}
```

## The conclusion: nobody is giving the past back

So: **star growth over a past window cannot be recovered by any method available today.** Exactly one option remains — start recording it yourself.

And that option has an unusual property: delay costs something permanent. Wait a day and the history starts a day later, and the days you skipped can never be filled in.

So we built it.

## [GitHub Star Tracker](/en/ghstars/)

Free, no sign-in, no account, no token.

**The New repos tab is live.** Pick a period (1, 3, 6 or 12 months) and a star floor, press the button, and your browser calls the GitHub search API itself. Ask the same question again and the last answer is served from a ten-minute cache, so hammering the button never burns through your own rate limit.

**The Fastest growing tab** is computed from snapshots taken once a day. About 1,900 repositories — young ones (created within a year, 1,000+ stars) and established ones (20,000+ stars) — get their star counts recorded daily, and the 7, 30 and 90-day gains are ranked from that.

## Two notes on the design

**Honest windows.** Collection started today, so tomorrow there is one day of history and next week there is a week. If the "last 90 days" tab took nine days of data and presented the ranking as a 90-day result, that would be a lie. So every window carries how many days it actually rests on, and says so on screen when it falls short. A repository that entered tracking mid-window is marked too: its gain is an upper bound, not a measurement.

**Data separated from deployment.** The collector runs daily in GitHub Actions and commits its results to the repository. But a commit made with the Actions default token does not trigger other workflows — so committing data would never rebuild the site.

Rather than working around that constraint, we used it. The page reads its data straight from **raw.githubusercontent.com** instead of from the deployed site. CORS is open there and the cache is five minutes, so a collector commit goes live within five minutes and never needs a rebuild. The data pipeline and the site deployment come apart completely, and there is no longer any reason to rebuild the site daily.

## Where it stands

The first snapshot — 1,913 repositories, 60KB — landed today. Which is why the growth tab is empty today: there is nothing to compare against yet. Tomorrow's second snapshot opens the 7-day window, and the 90-day window fills in December.

**[Try it now →](/en/ghstars/)**
