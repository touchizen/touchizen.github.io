---
title: "From One Title to 11 Scenes — A Real Story Mode Run"
date: "2026-07-22"
excerpt: "One title through synopsis, cast, script, scene table, audio, and prompts — every step's real output from an actual AutoFlowCut Story mode run."
tags: ["AutoFlowCut", "Story mode", "case study", "AI video automation"]
author: "Touchizen"
image: "/images/blog/story/story-step-prompts-en.png"
---

## What got made

> 📌 The screens in this post are **UI mockups** built from a real project's data and the app's own CSS. The values in them (scenes, segments, prompts) are the actual output. The project itself ran in Korean; the story text shown here is an English translation of that output — the numbers, timings, and prompts are unchanged.

We typed one title — **"The Rich Man and the Poor Man"** — and ran Story mode. The result was a single episode of **11 scenes, 20 segments, 72.53 seconds**, and this post shows the real output from each step along the way.

That's everything that went into the Setup tab:

| Field | Value |
|-------|-------|
| Title | The Rich Man and the Poor Man |
| Story type | Bespoke |
| Generation AI | Claude Opus 4.8 · reasoning medium |
| Output language | Korean |
| Script length | 1 minute |
| Scene split unit | Scene-based · 5–10 sec |
| Review loop | Off |

The script field was left empty. So we started with **no topic, no plot, no cast.**

## 2 Synopsis — logline and hook come first

Before any prose gets written, the skeleton of the story is settled. Here's the logline that came out:

> **Logline** — A poor old man who received an envelope every month from a rich man's estate learns, only after the rich man dies, that the true sender was himself.

> **Hook** — For thirty years, on the first of every month, an unmarked envelope was left at the old man's door. But on the day the rich man died, what came out of it was not money — it was a single faded promissory note.

A paragraph each for setup, rise, turn, and resolution follows. The twist — the rich man had been repaying a debt — lands in the *turn*, and the *resolution* has the old man taking over that role. That structure exists before a single line of script is written.

## The cast — gender, age, role, and appearance, all fixed

The synopsis step also finalized four characters. These values are reused downstream for **voice casting** and **image prompts**.

| Character | Gender | Age | Role |
|-----------|--------|-----|------|
| Park | M | 70s | Poor old porter, the protagonist |
| Chairman Yun | M | 70s | The rich man on the hill, repaying an old debt |
| Gatekeeper | M | 40s | Mansion gatekeeper who turns Park away |
| Lawyer | M | 50s | The lawyer who delivers Chairman Yun's last wish |

Each character also carries an appearance description. Park's is `Korean man in his 70s, deeply weathered face, sparse white hair, thin frame, worn padded jacket and cloth cap, quiet dignified sorrow`. That description is what the image prompts are built from. It isn't copied verbatim — each scene reshapes it — but its key traits recur every time. Add a **generated reference image** on top and it gets attached to each scene, which is what makes him the same person throughout.

## 3 Script — dialogue arrives with speakers attached

![Story mode Script tab — the generated script with speaker dialogue](/images/blog/story/story-step-script-en.png)

The prose came out in hook → setup → rise → turn → resolution order, with speakers prefixed on the dialogue:

> **Gatekeeper:** "The chairman would never know a man like you."
>
> **Chairman Yun:** "You gave when you had nothing. I could only repay after I had everything."

Those two lines become **separate speaker segments, split out from the narration**, in the next step.

## 4 Scene split — 11 scenes, 20 segments

![Story mode Scene split tab — the table split into 11 scenes and 20 segments](/images/blog/story/story-step-scenes-en.png)

The script became a table. Here's the distribution that actually came out:

- **Speakers** — 16 narrator, 1 Gatekeeper, 1 Chairman Yun, 2 SFX
- **Emotions** (in the scene data) — 8 sad, 7 normal, 2 angry, 1 happy. The table only shows the two dialogue lines' emotions; narration emotion isn't displayed
- **Length** — 72.53 seconds total. Under the scene-based 5–10 second setting, individual scenes landed between 4.4 and 9.2 seconds

The two sound effects were placed at the story's decisive moments on their own: `heavy iron gate slamming shut` (scene 5) and `old paper being unfolded` (scene 7). Nobody asked for that — they landed on **the peak of the tension and the turn.**

Script done to scene split done took **37 seconds**.

## 5 Audio — all 20 segments generated

![Story mode Audio tab — per-speaker voice assignment and per-segment completion](/images/blog/story/story-step-audio-en.png)

- **18 narration and dialogue segments** — generated with Typecast. Emotion is only applied to **character dialogue**: narration is always synthesized as `normal` even where the table shows sad or angry. So exactly two lines in this episode carry emotion — the Gatekeeper's `(Angry)` and Chairman Yun's `(Sad)`.
- **2 sound effects** — generated with ElevenLabs.
- **Output** — 20 segment audio files plus one time-aligned SRT. Every segment holds a start time and duration in milliseconds, so it drops straight onto the scenes.

Scene split done to audio done took **14 minutes 23 seconds** — the longest stretch of the pipeline.

## 6 Prompts — an image and video pair per scene

![Story mode Prompts tab — per-scene image and video prompts with @mentions](/images/blog/story/story-step-prompts-en.png)

11 scenes produced 11 image and 11 video prompts — 22 in total. Scene 1's, verbatim:

> **Image** — Cinematic still, 1970s-80s Korean alley at dawn. A plain unmarked white envelope rests on the worn wooden threshold of a humble shanty door, faint frost on the step, peeling paint, a rusted mailbox above. Cold blue-gray morning light, soft mist, shallow depth of field, 35mm film grain, muted desaturated palette, melancholic nostalgic mood.
>
> **Video** — Slow push-in on the unmarked envelope resting at the doorstep as thin dawn mist drifts past and a faint breeze lifts one corner of the paper; distant alley sounds, static composition with a gentle dolly forward, cold nostalgic film-grain grade.

Scenes featuring a character got **mentions like `@Park` and `@{Chairman Yun}` inserted automatically.** Names with a space are wrapped in braces. The four characters are registered as reference cards, but **their image slots are still empty** — this project never ran generation. Once a card's image exists, it is attached to every scene that mentions that character, which is what keeps the same face across all 11 scenes.

Audio done to prompts done took **53 seconds**. **From script to prompts, the whole thing took 15 minutes 53 seconds.**

## From here it's your call

Prompts are as far as Story mode carries itself. It isn't fully unattended, though — **you have to confirm the cast at step 2** before the downstream steps unlock, and **Audio's auto toggle is off by default** (TTS costs money), so you either switch it on or run that step yourself. What follows is taste:

1. Batch-generate images per scene — fix the prompt on the scenes you don't like and regenerate just those.
2. Generate T2V/I2V video only for scenes that need motion.
3. **Export to CapCut, Adobe Premiere, or Vrew in one click** — the audio tracks and SRT are already aligned to the scenes, so the timeline opens finished in your editor.

> 📌 This project was run up to the prompts step. Image generation hasn't been run yet, so no final frames are shown.

## In short

One title produced **synopsis → 4 characters → script → 11 scenes → 20 audio segments → 22 prompts**. The human work was picking a handful of settings, confirming the cast, and running the audio step.

To try the same flow, see [how to start from a single title](/en/blog/story-mode-title-to-video/). Already have a script? See [pasting a script](/en/blog/story-mode-script-to-video/). Want to pick the topic with data first? See [YouTube benchmarking](/en/blog/story-mode-youtube-benchmark/).
