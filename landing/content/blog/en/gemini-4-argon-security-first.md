---
title: "Gemini 4 Argon Explained: A Monster That Could Shake Up AI"
date: "2026-10-02"
excerpt: "Google shipped Gemini 4 Argon, its first new-generation flagship in almost a year. By Google's numbers it beats GPT-6 Astra and Claude Fable 5.1 at one-fifth of Astra's launch price — yet there's no app or API access, and cyber defenders got it first. Here's why, plus what independent scores and the real per-task cost show."
tags: ["Gemini 4 Argon", "Google", "GPT-6 Astra", "LMArena"]
author: "Touchizen"
image: "/images/blog/gemini-4-argon/argon-hero.jpg"
---

## It beat Astra and Fable — and we can't use it

On September 30, 2026 (US time), Google released **Gemini 4 Argon**. By Google's own account it beats OpenAI's top model **GPT-6 Astra** and Anthropic's top model **Claude Fable 5.1**: first place in 13 of the 18 benchmarks Google published, at an introductory price of **one-fifth** of Astra's.

But we **can't use it through the app or the API** yet. The first official users are security teams that defend against hacking — and they get it with the cyber guardrails removed. Why would Google hand a model this strong to them before the rest of us? That's the question of this post.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:2rem 0">
<iframe src="https://www.youtube.com/embed/l2palIQRHqc" title="Gemini 4 Argon Explained: A Monster That Could Shake Up AI (Korean)" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
</div>

> The video is in Korean. The images below are frames from it.

![The OpenAI GPT-6 Astra page and the Anthropic Claude Fable 5.1 page, with '??? won — per Google'](/images/blog/gemini-4-argon/argon-rivals.jpg)

![First in 13 of Google's 18 benchmarks — 12 outright and 1 tie](/images/blog/gemini-4-argon/argon-scores.jpg)

## Not only Google's table: LMArena

**LMArena** gives two AIs the same prompt, hides their names, and lets people vote on the better answer to build a ranking. There too, Argon took **#1 in Text Arena with 1,525 points** — but only **#8 in Code Arena: WebDev with 1,679 points**, where GPT-6.1 Sol was #3 (1,759). Not good at everything.

![LMArena — #1 in Text Arena (1525), #8 in WebDev (1679)](/images/blog/gemini-4-argon/argon-arena.jpg)

## Google's year-long gap

![Google's gap — Gemini 3 in Nov 2025, 3.1 Pro in Feb, 'next big model in June' at I/O in May, no 3.5 Pro, DeepMind leadership change in Aug, Argon on 9/30](/images/blog/gemini-4-argon/argon-gap.jpg)

- **November 2025** — After Gemini 3, Google released no new-generation flagship.
- **May 2026** — CEO Sundar Pichai said the next major model would come in June. The model widely expected to be Gemini 3.5 Pro never came out.
- Meanwhile OpenAI shipped GPT-6 Astra (9/3), Anthropic shipped Fable 5.1 and Opus 5.5 (9/22), and Google mostly shipped cheap, fast Flash models.
- **August** — DeepMind changed leaders.
- **September 30** — The day after OpenAI's DevDay, Argon finally arrived.

## It's already working inside Google

Argon is already powering Google's internal workflows, used by thousands of Googlers. Google's examples are concrete:

![Inside Google — 300 TiB+ of data-center memory, Rust 2.7x faster, quantum resources −40%](/images/blog/gemini-4-argon/argon-inside.jpg)

- **Data-center memory** — Argon agents analyzed fleet-wide profiling data, found and applied optimizations themselves, and freed **over 300 TiB of memory** (an estimated 500 TiB–1 PiB in total savings).
- **Moving old code to Rust** — In the Rust port of the video decoder libgav1, replacing 32K lines of SIMD code made it **2.7x faster** with identical output (still slower than the optimized C++). Migration of the 800K+-line Fuchsia Zircon kernel is under way.
- **Quantum computing** — In one example it cut the required resources **40%** below the published baseline within minutes.
- The maximum **output** per response grew from 64K to **1M tokens** (output, not input) — so long jobs can run to the end without stopping.

All of these are **examples Google reported itself**.

## A scorecard led by office work, not coding

Interestingly, the top of Google's table isn't coding but knowledge work.

| Benchmark | Gemini 4 Argon | Comparison |
|---|---|---|
| Zapier AutomationBench (business automation) | **51.3%** · #1 | — |
| Harvey legal research and drafting | **19.6%** | Astra 5.4%, Opus 5.5 3.8% |
| DeepSWE (long software tasks) | **77.9%** | Opus 74.2%, Astra 74.1% |

That's first place in 13 of 18, at $2 input / $10 output per million tokens — one-fifth of Astra's $10 / $50 at the introductory price. On this alone, "it crushed everything" sounds fair.

## Why defenders first?

The answer is the strength Google leads with: **finding vulnerabilities in software**. Google says Argon can find them, verify them, and patch them on its own (on CWE-bench v1, the one comparable outside score, it ties GPT-6 Astra and Grok 4.7 at 68%).

- **Wiz**, the security company Google acquired, used it and found a critical vulnerability exposing sensitive personal information in healthcare software used by hospitals worldwide — one that previous frontier models had missed.
- The catch: the same skill is just as strong in an attacker's hands. Google's Fairwind page says so: *"in the wrong hands, the same capabilities can become an equally powerful threat."*
- So **defenders get it first** — governments, healthcare providers, telecoms. Only some vetted partners, only inside their security teams, with usage logged.
- In return their cyber refusals are switched off, so they can use the full defensive capability.
- Google also said why the rest of us wait: it wants to **harden the safeguards first** — blocking misuse and monitoring for misaligned behavior — before a wider release.

The timing is striking:

![The same week — 9/28 (Mon) OpenAI cancels GPT-6.1 Astra, 9/29 (Tue) White House AI safety pledge, 9/30 (Wed) Gemini 4 Argon](/images/blog/gemini-4-argon/argon-week.jpg)

- **9/28 (Mon)** — OpenAI dropped the launch of GPT-6.1 Astra after safety tests: the model strayed outside its task and misreported its own work.
- **9/29 (Tue)** — Sundar Pichai signed a voluntary AI safety agreement at the White House.
- **9/30 (Wed)** — Argon launched, with Google also taking part in the US government's pre-release testing process.

## Beyond Google's table: independent scores

Is Google's #1 real? Look again and Argon **lost 5 benchmarks**: on FrontierSWE, Astra is more than 10 points ahead (65.5% vs 55.0%); on Terminal-bench 4.0, Opus 5.5 leads by 9 (66.4% vs 57.4%).

And the DeepSWE score where Argon came first was **computed by Google itself**, while competitors' numbers came from public leaderboards or their own announcements. In **9 of the 18** benchmarks, Argon's score is Google's own measurement.

That's why an independent scorecard matters, and **Artificial Analysis** has already run one:

![Artificial Analysis Intelligence Index — Opus 5.5 58, Sonnet 5.5 56, Fable 5.1 53, Astra 53, Argon 53, GPT-6.1 Sol 52](/images/blog/gemini-4-argon/argon-thirdparty.jpg)

- **Index score 53** — the same as Astra. But Opus 5.5 scores 58: the model Argon mostly beat in Google's table is 5 points ahead here. Sonnet 5.5, absent from Google's table, scores 56.
- One number stands out: on questions it can't answer, Argon **makes something up 15%** of the time versus **51%** for Astra. It answers correctly less often (50% vs Astra's 63%), but it says when it doesn't know.
- Bloomberg reported that some Google employees doubt it — great at benchmarks, weaker at real coding work. Google called that inaccurate.

## The bill changes when the discount ends

- $2 / $10 is an **introductory price**. Afterwards it doubles to **$4 / $20** — exactly Opus 5.5's price. Google hasn't said when the discount ends (Artificial Analysis says "at least one month").
- Argon also thinks at length: **62K output tokens** per task, more than twice Astra's 27K.
- So Artificial Analysis's cost per task is **$1.99** now — 60% of Astra's $3.26 — but **$3.98** after the discount, about **20% more** than Astra.

![Cost per task at list price — Argon $3.98, Astra $3.26](/images/blog/gemini-4-argon/argon-bill.jpg)

A token price at one-fifth doesn't make the job one-fifth.

## How to use it once it's out

Based on the scores so far (the recommendations are mine):

![How to use it — what to give Argon and what to give other models](/images/blog/gemini-4-argon/argon-howto.jpg)

| Job | Pick | Why |
|---|---|---|
| Q&A · writing to instructions | **Argon** | LMArena Text #1 (also #1 in Coding, Hard Prompts, Instruction Following, Longer Query, Creative Writing) |
| Long research | **Argon** | Arena Longer Query #1, makes things up 15% (but lower accuracy than Astra) |
| Long video understanding | **Argon** | LVBench 91.7%, #1 in Google's table (Google's own measurement) |
| Building websites | **GPT-6.1 Sol** | Arena WebDev #3 (Argon #8), same introductory token price |
| Coding in the terminal | **Opus 5.5** | 9 points ahead on Terminal-bench 4.0 |

Ways to save money:

- If you send the same material repeatedly, **cached input is 95% off** — 10 cents per million tokens at the introductory price.
- While the discount lasts, **measure the cost on your own tasks.**
- It uses a lot of tokens, so compare **cost per task, not price per token.**

## So why? My reading

From here on it's my interpretation. I see two reasons Google gave its strongest model to defenders first:

1. Its headline weapon is **finding holes**, so defenders needed it before attackers.
2. In the very week OpenAI shelved a model over safety, Google wanted to look like **the company that ships powerful models safely**.

![So why? — on the independent index Astra 53 = Argon 53: caught up, not crushed](/images/blog/gemini-4-argon/argon-verdict.jpg)

Google is back — it ties Astra on an independent index. But it's closer to **"caught up"** than "crushed everyone."

The general rollout starts with **paid API customers and Google AI Ultra subscribers**, with no date yet. What would you try first once Argon is open? Tell me in the video comments.

## About the video

The narration is an AI clone of my voice. The source pages shown in the video are quoted for commentary; the yellow highlights are mine. The robot in the thumbnail was made with AI.

## Sources

Checked October 1–2, 2026; figures may change. Dates are US dates.

- [Google — Gemini 4 Argon announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/)
- [Google DeepMind — benchmark table](https://deepmind.google/models/gemini/) · [Evaluation methodology (PDF)](https://deepmind.google/models/evals-methodology/gemini-4-argon) · [Fairwind Program](https://deepmind.google/fairwind-program/)
- [LMArena — Text and WebDev rankings (X)](https://x.com/arena/status/2105394855644139908) · [GPT-6.1 Sol WebDev (X)](https://x.com/arena/status/2105367591174995999)
- [OpenAI — GPT-6 Astra](https://openai.com/index/gpt-6-astra/) · [Anthropic — Claude Fable 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1)
- [Artificial Analysis — Gemini 4 Argon](https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs)
- [VentureBeat](https://venturebeat.com/technology/google-unveils-gemini-4-argon-retaking-benchmark-lead-over-openai-and-anthropic-but-in-limited-release) · [9to5Google (list price)](https://9to5google.com/2026/09/30/gemini-4-argon-announcement/)
- [CNBC](https://www.cnbc.com/2026/09/30/google-gemini-4-argon-ai.html) · [CNBC — White House AI agreement (9/29)](https://www.cnbc.com/2026/09/29/tech-white-house-ai-lunch-trump.html)
- [The Verge](https://www.theverge.com/tech/1002980/google-gemini-4-argon) · [Axios](https://www.axios.com/2026/09/30/google-gemini-4)
- [The Next Web — GPT-6.1 Astra cancelled](https://thenextweb.com/news/openai-cancels-launch-of-gpt-6-1-astra) · [The Next Web — Google's rebuttal](https://thenextweb.com/news/google-gemini-4-argon-cyber-defenders-fairwind)
- [Bloomberg — employee skepticism](https://www.bloomberg.com/news/articles/2026-09-30/google-grapples-with-employee-skepticism-about-new-gemini-model)
- [Google Cloud — Wiz acquisition completed](https://www.googlecloudpresscorner.com/2026-03-11-Google-Completes-Acquisition-of-Wiz)
- [Hacker News discussion](https://news.ycombinator.com/item?id=49913571) · [GeekNews](https://news.hada.io/topic?id=34563)
