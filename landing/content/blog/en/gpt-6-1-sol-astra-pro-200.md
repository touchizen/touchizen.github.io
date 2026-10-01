---
title: "Astra-Level at One-Fifth the Price… but Pro 200 Got Cut in Half — GPT-6.1 Sol Explained"
date: "2026-10-01"
excerpt: "One week after GPT-6 Sol, OpenAI shipped GPT-6.1 Sol. It beat Astra on a coding benchmark at one-fifth of the price — and on the same day, ChatGPT Pro 200's usage allowance was halved. Here's what the keynote and the official charts show."
tags: ["GPT-6.1 Sol", "GPT-6 Astra", "OpenAI", "ChatGPT Pro"]
author: "Touchizen"
image: "/images/blog/gpt-6-1-sol/gpt61-hero.jpg"
---

## The younger model that beat Astra, at one-fifth of the price

At OpenAI DevDay on September 29, 2026, OpenAI released **GPT-6.1 Sol**. It scored higher than its flagship **GPT-6 Astra** on a coding benchmark, at **one-fifth** of Astra's price. But something is odd: the mid-tier GPT-6 Sol had come out **exactly one week** earlier. Why ship another model a week later? Follow the answer and you also find the people who lose out.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:2rem 0">
<iframe src="https://www.youtube.com/embed/AjCYxDrX8sw" title="GPT-6.1 Sol explained — Astra-level performance and the Pro 200 usage change (Korean)" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
</div>

> The video is in Korean. The images below are frames from it.

## How it started: Astra sold too well

![September timeline — 9/3 Astra launch, 9/8 'never seen demand like this', 9/10 Pro $200 sign-ups paused, 9/22 Sol and Luna, 9/29 DevDay](/images/blog/gpt-6-1-sol/gpt61-timeline.jpg)

- **September 3** — OpenAI's top model **GPT-6 Astra** launches at $10 input / $50 output per million tokens. Expensive, and people flocked to it anyway.
- **September 8** — Less than a week later, someone at OpenAI wrote that they had never seen demand like it.
- **September 10** — OpenAI **paused new sign-ups for the $200/month Pro plan**, because it "puts the most strain on its systems". It was the plan with the largest usage allowance.
- **September 22** — The mid-tier **GPT-6 Sol** and the small **GPT-6 Luna** launch.
- **September 29** — Exactly a week later, DevDay. On stage, OpenAI said: *"People keep asking us for two things. Make it cheaper and make it faster."*

## Answer one: faster — Ultrafast

**Astra Ultrafast** runs Astra at high speed: **up to 8×** faster token generation, at **6×** the standard price.

OpenAI played a recording in which both models got the same prompt (build a white rocket and launch it). On the left, Ultrafast's rocket had already taken off; on the right, the standard model was still assembling. In the live demo, voice input failed, but a typed prompt still produced an app in **about 20 seconds**.

Note that **8× is token generation speed**. OpenAI's own documentation says the comparison is not about overall task completion time — a task that also runs tests does not finish in an eighth of the time. And the speed is not free; more on that below.

## Answer two: cheaper — GPT-6.1 Sol

The main event. On stage, OpenAI called it "very near Astra level intelligence at a fifth of the price".

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|---|---|---|
| GPT-6 Astra | $10 | $50 |
| **GPT-6.1 Sol** | **$2** | **$10** |

![Coding benchmark DeepSWE — 6.1 Sol best 75.2%, Astra best 74.1%](/images/blog/gpt-6-1-sol/gpt61-deepswe.jpg)

I pulled the raw numbers from OpenAI's launch charts.

- **DeepSWE (coding)**: 6.1 Sol's best is **75.2%** (High), Astra's best is **74.1%** (Xhigh). The announcement only says 6.1 Sol "matches" Astra, but by the numbers the younger model is **1.1 points** ahead. On stage it was even called "smarter than Astra in some ways".
- **Cost per task**: 65 cents vs. $4.43 — about **one-seventh** of Astra.
- **Computer use (OSWorld 2.0, highest setting)**: Astra 73.5%, 6.1 Sol 71.4% — **2.1 points** apart.

A one-point gap may well be noise. Still, up to here "cheap and nearly the same" holds. For the record, OpenAI has official showcase apps built with Astra (a space exploration game, a 3D cell, a deep-sea ecosystem), but none built with 6.1 Sol as of September 30.

## Where it falls short

![Where 6.1 Sol falls short — science research: Astra first; work automation: Opus 5.5 first; third-party index: Fable 5.1 above 6.1 Sol](/images/blog/gpt-6-1-sol/gpt61-limits.jpg)

- **Science research** (Terminal-Bench Science): Astra **68.1%**, 6.1 Sol **57.0%** — an 11-point gap. OpenAI itself says Astra should be used for the most difficult scientific research tasks.
- **Work automation** (AutomationBench, highest setting): first place goes to Anthropic's **Opus 5.5** (42.5%, with fallbacks) — on OpenAI's own chart.
- **Third-party index** (Artificial Analysis Intelligence Index v4.3.2): Anthropic's top model **Fable 5.1 scores 53.4**, Astra 52.7, **6.1 Sol 51.8**. But 6.1 Sol costs less than a tenth of Fable per task ($0.72 vs. $7.63).
- **Sonnet 5.5**, with the same input/output prices as 6.1 Sol, scores 56.0 — but it uses so many tokens that a task costs $7.60.

So: **cheap and nearly the same — and that's where it ends**.

## The secret to the low price? It's Astra inside

How did a model become Astra-level in a week? The API documentation has clues.

![API model info — knowledge cutoff: 6 Sol 2026-04-20, 6.1 Sol 2026-04-30, Astra 2026-04-30; 'none' reasoning mode only on 6 Sol](/images/blog/gpt-6-1-sol/gpt61-identity.jpg)

| | GPT-6 Sol | GPT-6.1 Sol | GPT-6 Astra |
|---|---|---|---|
| Knowledge cutoff | 2026-04-20 | **2026-04-30** | **2026-04-30** |
| 'none' reasoning mode (answer without thinking) | Yes | **No** | **No** |

It is called Sol, but its training cutoff and behavior match Astra. On Hacker News, one comment said a model named 'Astra-Minor' had turned up in files a few days earlier, and that it was probably 6.1 Sol. **That is speculation; OpenAI has not confirmed it.** Others read it as Sol improved by further training.

My interpretation: it adds up. If Astra demand was more than OpenAI could handle, why not ship a small Astra at a low price?

## The cost: Pro 200 usage cut in half

There was one more announcement on the same stage: **Pro 200 sign-ups are reopening.** Good news so far. But something wasn't said on stage.

![ChatGPT plans — Pro 200 usage goes from 20× Plus to 10×](/images/blog/gpt-6-1-sol/gpt61-pro200.jpg)

| ChatGPT plan | Monthly price (US) | Work/Codex usage (Plus = 1×) |
|---|---|---|
| Plus | $20 | 1× |
| Pro 100 | $100 | 5× |
| **Pro 200** | **$200** | **20× → 10×** |
| Pro 500 (new) | $500 | 25× + Ultrafast |

- Pro 200's allowance drops **from 20× Plus to 10×** at the same price — half. Existing subscribers keep 20× **only through October 29**.
- Existing subscribers get a one-time **$2,500 in usage credits** (expiring at the end of the year).
- On stage, the message was only that Pro 200 keeps access to all frontier models, and that 6.1 Sol is "a model close to Astra quality that you can use a lot as your daily driver". In effect: **a cheaper model, and less of the allowance**.
- OpenAI's explanation is that the change reflects its "increasingly efficient models" — subscribers will still get more work done than a month earlier.

In its place comes **Pro 500** at $500/month: 25× Plus, plus Ultrafast. But **Ultrafast uses the subscription allowance at 8× the standard rate**. Use only Ultrafast and, by my calculation (25 ÷ 8), you get **just over 3× Plus**.

**Usage per dollar is now the same on every plan** (the old Pro 200 gave twice as much per dollar), so the bulk bonus is gone. And the Ultrafast version of 6.1 Sol is still "soon": the English announcement says "in the coming days", while the Korean announcement says it launches together.

## So why a week later — and which model should you use?

My read: **Astra sold too well**, and OpenAI wants to move people from expensive Astra to cheap 6.1 Sol. OpenAI has never drawn that connection itself, so take this part as my interpretation.

![Which model to pick — coding 6.1 Sol, hard science Astra, simple bulk work Luna, API agents cached input $0.10](/images/blog/gpt-6-1-sol/gpt61-verdict.jpg)

| Use case | Pick |
|---|---|
| Coding | **GPT-6.1 Sol** — start with **High**, not Max. On the coding chart, Max cost 2.4× as much and scored lower (75.2% > 71.9%) |
| Really hard science, careful analysis | **GPT-6 Astra** — first on the science research benchmark |
| Simple, high-volume work | **GPT-6 Luna** — $0.10 / $0.50 per million tokens |
| Agents and the API | Check cached input: **$0.10** per million tokens on 6.1 Sol, half of last week's Sol ($0.20) |

- 6.1 Sol is **not yet in regular chat**; it is available in ChatGPT Work, Codex and the API.
- **On Pro 200? Check your usage before October 29.**

The younger sibling that topped the elder's score, at a fifth of the price — and, it turns out, a lot like the elder inside. Which model are you working with right now? Let me know in the video's comments.

## How this video was made

At the very end of the video (6:24), I show the **original first request** that started it, word for word, plus the follow-up edits. Research, script, visuals and narration all grew from those few lines. The narration is an AI clone of my own voice (keynote audio excepted).

## Sources

Checked September 29–30, 2026; figures may change. Dates are US dates.

- [OpenAI — Introducing GPT-6.1 Sol](https://openai.com/index/introducing-gpt-6-1-sol/) · [Korean version](https://openai.com/ko-KR/index/introducing-gpt-6-1-sol/)
- [OpenAI — GPT-6 Astra](https://openai.com/index/gpt-6-astra/)
- [OpenAI DevDay 2026 keynote (YouTube)](https://www.youtube.com/watch?v=Fls_onRviPM) · [DevDay 2026 recap](https://openai.com/index/devday-2026-recap/)
- [API model docs — gpt-6.1-sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol)
- [ChatGPT docs — Speed (Ultrafast)](https://learn.chatgpt.com/docs/agent-configuration/speed) · [Pricing](https://learn.chatgpt.com/docs/pricing)
- [OpenAI Help — About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)
- [TechCrunch — Pro sign-ups paused (Sep 10)](https://techcrunch.com/2026/09/10/openai-puts-pro-subscriptions-on-hold-due-to-astra-demand/)
- [Engadget — Pro plan changes](https://www.engadget.com/2272106/openai-adds-dollar500-pro-subscription-nerfs-its-existing-dollar200-tier/)
- [The Next Web — Pro 200 credits](https://thenextweb.com/news/openai-devday-pro-200-usage-cut-pro-500-plan)
- [nerdschalk — Pro plans compared](https://nerdschalk.com/chatgpt-pro-100-vs-200-vs-500-prices-usage-limits)
- [VentureBeat — GPT-6 Sol and Luna (Sep 22)](https://venturebeat.com/technology/openai-releases-gpt-6-sol-and-luna-models-slashing-api-costs-50-or-more)
- [Artificial Analysis — GPT-6.1 Sol analysis](https://artificialanalysis.ai/articles/gpt-6-1-sol-replaces-gpt-6-sol-after-just-7-days-with-near-astra-intelligence)
- [Anthropic — Claude Fable 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1)
- [Hacker News discussion](https://news.ycombinator.com/item?id=49896586)
