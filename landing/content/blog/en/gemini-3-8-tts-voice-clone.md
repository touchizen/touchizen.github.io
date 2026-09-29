---
title: "I Put My Voice into Google's AI, and Things Got Out of Hand — Testing Gemini 3.8 TTS Voice Cloning"
date: "2026-09-29"
excerpt: "21 seconds of recording, a 7-second wait, and an AI that speaks in my voice. Price, rankings, a blind test, how to use it in AI Studio, and why you shouldn't clone your voice on the free tier."
tags: ["Gemini 3.8 TTS", "Voice Cloning", "TTS", "AI Voice"]
author: "Touchizen"
image: "/images/blog/gemini-tts/gemini-tts-hero.jpg"
---

## 21 seconds of recording, a 7-second wait, and my own voice

On September 23, 2026, Google released **Gemini 3.8 TTS**, its new text-to-speech model. This version can **clone your voice** from a short recording. So I fed it mine — and it got out of hand in more ways than one.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:2rem 0">
<iframe src="https://www.youtube.com/embed/BcSw59ueNpg" title="I put my voice into Google's AI | Gemini 3.8 TTS voice cloning" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
</div>

> 📌 The video is in **Korean** — which is part of the point: public TTS rankings don't score Korean, so I tested it myself. If you want to try the **"Which one is real?" blind test** first, watch the video before reading on; "Surprise ③" below contains a spoiler.

## What is Gemini 3.8 TTS?

There are two models:

- **Gemini 3.8 Flash TTS** — the expressive one, for characters, audiobooks and narration
- **Gemini 3.8 Flash-Lite TTS** — the cheap and fast one, for bulk dubbing and voice agents

Flash supports 130 languages and Flash-Lite 101 (Korean included), with more than 2,000 ready-made voices. The two headline features are **voice design** — describe a voice in words and it's created — and **voice replication**, which clones a voice from a short recording.

## Surprise ① The price doesn't add up

By the price list, **an hour of audio costs about $0.81** on Flash, and about $0.54 on Flash-Lite.

![Price per 1M characters — Gemini 3.8 Flash TTS $16.5, Cartesia Sonic 3.6 $49, ElevenLabs v3 Conversational $50, Eleven v3 $100](/images/blog/gemini-tts/gemini-tts-price.jpg)

Artificial Analysis's price per million characters (English) makes the gap clearer:

| Model | Per 1M characters |
|---|---|
| **Gemini 3.8 Flash TTS** | **$16.5** |
| Cartesia Sonic 3.6 (#1 for stock voices) | $49 |
| ElevenLabs v3 Conversational | $50 |
| ElevenLabs Eleven v3 | $100 |

That's a third of the #1 model and **a third to a sixth** of ElevenLabs' latest models. There's even a free tier — and that "free" turns into the real problem later.

## Surprise ② You may cancel an expensive subscription

It isn't just cheap. On the **Artificial Analysis arena (English, stock voices)**, where people vote in blind comparisons, Gemini 3.8 Flash TTS ranks **#2**. It trails #1, Cartesia Sonic 3.6 (1,279), by 14 points — less than the ±17 margin of error, so the two are effectively tied. Both of ElevenLabs' latest models (1,196 and 1,169) sit below it.

![Artificial Analysis stock-voice ranking — #1 Cartesia Sonic 3.6, #2 Gemini 3.8 Flash TTS](/images/blog/gemini-tts/gemini-tts-rank.jpg)

**Voice cloning is a different story.** On the ranking that compares the same eight cloned voices (Controlled Voice, English), Gemini 3.8 Flash TTS drops to **#12**, while ElevenLabs Eleven v3 is higher at **#6**. If you only need stock voices, an expensive subscription is worth rethinking — but judge cloning quality separately.

So what about Korean, and my own voice? I tried it.

## Which one is real? — a blind test

I prepared the same sentence in three voices:

- my real recording
- my voice cloned with Gemini
- my voice cloned with ElevenLabs v3

![Blind test — real recording, Gemini clone, ElevenLabs v3 clone](/images/blog/gemini-tts/gemini-tts-blind.jpg)

The video shuffles them as A, B and C over two rounds (**from 1:47**). One disclosure: the test sentences were part of the recording I used to create the Gemini clone, so **the test slightly favors Gemini**. Tell me in the video comments how many you got right.

## Surprise ③ My voice isn't needed anymore

> ⚠️ Spoiler: this is the video's twist.

Apart from the parts I explicitly label as real recordings, **the entire narration is my Gemini-cloned voice**. I only typed the script.

![What voice cloning needs — a 21-second recording of my voice plus a recording of me reading a consent statement](/images/blog/gemini-tts/gemini-tts-clone.jpg)

Cloning needed two things:

1. **A recording of my voice** — 10 to 30 seconds. I used 21 seconds.
2. **A consent recording** — you read a consent statement aloud yourself. The docs provide it in 30 languages; in essence it says you own this voice and allow Google to use it to create a speech synthesis model.

Without a consent recording read by the same person, cloning is blocked. I uploaded both files, and **a little over 7 seconds** later my voice was ready.

The fun part is the voice's age. My older ElevenLabs clone was made from recordings several years old and sounds a bit younger to me; the Gemini clone was made from a recent recording. **The AI copies how old your voice sounds, too.**

## Surprise ④ Your script now includes the acting

You no longer pick a voice — **you describe one.** "A warm, husky storyteller in her sixties" or "an excitable sports caster in his twenties" — a sentence or two is enough.

You can put acting directions inside the script as tags such as `<short pause>`, `<sigh>` and `<laugh>`, and a style like "whispering" makes it whisper. Two-person dialogue can be generated in a single request (with stock voices). Voice casting is now something you write.

## How to try it — Google AI Studio

You can try it without code in **Google AI Studio's speech generation page**.

![Google AI Studio speech generation — reading with my cloned voice](/images/blog/gemini-tts/gemini-tts-aistudio.jpg)

1. Open Generate speech in AI Studio and choose **Gemini 3.8 Flash TTS**.
2. Type the text and press **Run** — it reads it right away.
3. From the voice button, pick one of 2,000+ voices or **create a new one by cloning or designing**. Both require an **API key with billing enabled**. You can record the two cloning recordings right there.
4. Write the delivery in the **Style** field (e.g. "exasperated and wronged"). **Press Enter to confirm it** — if you just close the field, the style isn't applied.
5. No need to memorize acting tags: click one in the **Expression** list and it's inserted at the cursor.
6. For voice design, write a description and press **Generate**; you get three candidates to listen to and choose from.

> 💡 **Watch out with Get code:** you can export Python code, but **the Style text is dropped**, and a cloned voice is referenced by its **display name** instead of its ID. Run as-is, it fails with HTTP 400 — put the voice ID and the style back in yourself.

## The real problem ① Using it for free

Everything so far was really bragging. Here are the three real problems.

I said my voice isn't needed anymore. But **on the free tier, Google may need it.**

- The Gemini API price list says **free-tier usage is used to improve Google's products** (paid usage is not).
- Under the terms, content you send and the results on the unpaid service may be used to improve Google's products and AI, and **human reviewers may read them**. Data is disconnected from your account before review — but a voice identifies a person on its own. The terms also say not to submit personal information.
- Yet voice cloning **only works by sending your voice.** AI Studio only opens cloning for paid keys; whether free API keys are blocked too isn't stated in the docs.
- The usage records show that **every clone-voice request counts the original recording as input.**

I only read this after I'd cloned my voice. Luckily my key was paid, with billing attached. **Paid usage with a billing account is not used for product improvement**, though abuse-monitoring logs are kept for a limited time. Users in the European Economic Area, the UK and Switzerland are exempt from this clause even on the free tier; users elsewhere, such as South Korea, are not.

## The real problem ② It may be less cheap than it looks

- **The gap narrows outside English.** The price comparison above was per English character. Gemini charges by audio length, and Korean reads fewer characters per second than English (about 8.3 per second in this narration versus an estimated 13.6 for English). Against services that charge per character, the difference shrinks for Korean.
- **Today's price is temporary.** From January 1, 2027, both Flash and Flash-Lite **double** in price — $0.81 an hour becomes $1.62.

## The real problem ③ What it can't do yet

- **No Korean scores.** None of the major public rankings I checked scores Korean at all — which is why I tested it in the video.
- Some reviews say **the stock voices all sound alike**.
- Dialogue is limited to **two speakers per request, and only with stock voices**. Cloned voices have to be generated separately and stitched together.
- **No published latency figures**, so check carefully before using it for real-time support.
- In some regions (per AI Studio: the UK, the EEA, Switzerland, India, Texas and Illinois) **cloning is blocked entirely**.

If you worry about misuse: Google requires the consent recording and adds a **SynthID watermark to all generated speech** — though you can't hear it.

## So, should you use it?

![Verdict — recommendations by use case](/images/blog/gemini-tts/gemini-tts-verdict.jpg)

| Use case | Recommendation |
|---|---|
| YouTube narration, audiobooks | **Gemini 3.8 Flash TTS** — good enough, but use a paid key with billing |
| Bulk dubbing, low budget | **Flash-Lite**, or half-price **Batch** |
| Real-time support bots | Compare first with services that publish latency (Voice Arena, US English medians: Sonic 3.6 341 ms · Inworld TTS-2 169 ms · Simba 3.2 123 ms; Gemini 3.8 not measured) |
| Character personality, cloning quality | **ElevenLabs** is still a good choice |

Three things to be careful about: **the free-tier terms, the 2027 price, and — for non-English languages — listen before you choose.**

## How this video was made

While making the narration, I spoke into a microphone for **less than a minute** — the cloning sample, the consent statement, and the real recordings for the blind test. Everything else was text.

The video itself started from a few lines I gave **Claude Code**, an AI coding tool: the URL of Google's announcement and these two lines (in Korean):

```
gemini 3.8 tts 가 매우 좋다고 하는데, 장단점과 타사와 비교등을 해서 가장 중요한 것을 궁금한 것으로(훅) 만들어서,
영상을 제작했으면 해. 먼저 관련 정보를 조사를 해도 되고, 해줄 수 있어?
```

*"People say Gemini 3.8 TTS is very good. Compare its pros and cons against other services, turn the most important point into a question that hooks viewers, and make a video. You can research first — can you do it?"*

Later conversation settled the long-form format, the "looks like a loss" hook, cloning my voice, and script review. Research, script, narration and video assembly were all built on that thread.

## Sources

Checked September 23–26, 2026; figures may change.

- [Google announcement — Gemini 3.8 Text-to-Speech](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/)
- [Gemini 3.8 Flash TTS model docs](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts)
- [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [Gemini API terms (unpaid and paid)](https://ai.google.dev/gemini-api/terms)
- [Voice replication guide](https://ai.google.dev/gemini-api/docs/voice-replication)
- [Artificial Analysis TTS leaderboard (English)](https://artificialanalysis.ai/text-to-speech/leaderboard)
- [Latency comparison (citing Voice Arena)](https://www.digitalapplied.com/blog/best-text-to-speech-models-september-2026-ranked-priced)
- [eesel AI review](https://www.eesel.ai/blog/gemini-3-8-flash-tts-review)
- [SynthID](https://deepmind.google/models/synthid/)
