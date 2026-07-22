---
title: "Make a Video From a Script You Already Have — Story Mode"
date: "2026-07-21"
modified: "2026-07-22"
excerpt: "Paste a finished script into Story mode: research is skipped, you just confirm the cast, and it goes on to scene split, audio, and prompts."
tags: ["AutoFlowCut", "Story mode", "script", "tutorial"]
author: "Touchizen"
image: "/images/blog/story/story-script-setup-en.png"
---

## You already have a script

> 📌 The screens in this post are **UI mockups** built from a real project's data and the app's own CSS. The values in them (scenes, segments, prompts) are the actual output. The project itself ran in Korean; the story text shown here is an English translation of that output — the numbers, timings, and prompts are unchanged.

Whether you wrote it yourself, commissioned it, or drafted and polished it in another tool — if the script is finished, there's no reason to ask Story mode to write one from scratch. **Paste the script**, and Story mode takes it as-is, has you confirm the cast, and continues from scene splitting.

![Story mode stepper — only Research grayed out; Synopsis open for confirming the cast](/images/blog/story/story-script-hero-en.png)

In the stepper above, **only 1 Research is grayed out (disabled)** — with a script in place there's no topic to research. **2 Synopsis stays open**, because that's where the cast is extracted back out of your pasted script and confirmed. The flow is **3 Script (done) → 2 confirm the cast → 4 Scene split**.

## Where to paste the script: the Setup tab

At the bottom of the **0 Setup** tab there's a **Script (optional)** field. Just paste your script there. Pick the same options — title, output language, scene-split unit — but the moment you fill the script field, the flow switches from "write a new one from a title" to "run with this script."

![Story mode Setup tab — a finished script pasted into the Script (optional) field](/images/blog/story/story-script-setup-en.png)

- **Scene-split unit** — decide whether to split finely per sentence or group by time (seconds). Choose to match your script length and editing style.
- **Output language** — match it to the language of your script (Korean or English).
- **Title** — worth filling in to keep the project organized.

## Research is skipped; Synopsis just confirms the cast

In a project that already has a script, the **Research gate tab locks** — the topic is settled, so the step is moot.

**Synopsis does not lock.** Its job changes: instead of deriving a storyline, it **extracts the cast back out of your pasted script and asks you to confirm it.** You can fix each character's name, gender, age, and appearance here, and those values flow straight into voice casting in step 5 and the character descriptions in step 6. Until you confirm, **▶ Run all** stays disabled — a guard against running the downstream steps on an unsettled cast.

## From scene split to audio and prompts

From here it's identical to the [title-only flow](/en/blog/story-mode-title-to-video/). The values in the screens below are the output of a real project, **"The Rich Man and the Poor Man,"** where one script became **11 scenes, 20 segments, 72.5 seconds**.

### 4 Scene split — the pasted script becomes a table

![Story mode Scene split tab — the split unit and the segment table with speaker, emotion, and sound effects](/images/blog/story/story-step-scenes-en.png)

Rows are **segments**, not scenes. A scene with several segments repeats its number in the `#` column.

- **Speaker** — lines you prefixed in the script, like `Gatekeeper:`, are picked up as speakers. Marking dialogue before pasting is what makes them split apart here.
- **Emotion** — the table shows an emotion only on non-narrator dialogue (`(Angry)`, `(Sad)`). Narration has an emotion value too, but it isn't displayed and is always synthesized as `normal` — only **dialogue** emotion reaches the TTS in step 5.
- **SFX rows** — sound-effect cues arrive as their own tinted rows. They come out as English descriptions like `heavy iron gate slamming shut` because the sound-effect model takes English.
- **Split again** — if the result is too fine or too clumped, change the unit and min–max seconds in the bar above and split again. Your script stays untouched; only the table is rebuilt.

### 5 Audio — a voice per speaker

![Story mode Audio tab — per-speaker voice assignment and per-segment generation status](/images/blog/story/story-step-audio-en.png)

- **Voice picker** — browse Typecast, Gemini, and ElevenLabs voices in one window.
- **Per-speaker progress** — a counter like `16/16` shows how many of that speaker's segments are done. You can also generate one speaker first and listen.
- **Segment status** — every row carries a done badge, and **Test** regenerates just that one line so you can hear it.
- **Your own recordings work too** — if you already have takes, drop an mp3 and an SRT onto a speaker row and that file is used instead of TTS. It pairs well with bringing your own script.

### 6 Prompts — an image and video prompt per scene

![Story mode Prompts tab — per-scene image and video prompts with plain-text @mentions](/images/blog/story/story-step-prompts-en.png)

Each scene gets one image prompt and one video prompt. Note the **`@Park`-style mentions** inside them.

Turn on **[auto]** for Scene split, Audio, and Prompts, press **▶ Run all**, and the rest runs on its own.

## Character @mentions still work

Even in a pasted script, characters **register themselves as reference cards**. Scenes featuring them get the mention inserted automatically. The card's image slot starts empty, so **generate the reference image once** and it is attached to every mentioned scene from then on, which is what keeps characters consistent. You can add or remove them by typing `@` in a prompt; names with a space are wrapped in braces, like `@{Chairman Yun}`.

## Generate and export

Once the prompts are ready, generate images and videos and **export to CapCut, Adobe Premiere, or Vrew in one click** — timeline, subtitles, audio tracks, and Ken Burns animations all included.

## In short

If you have a finished script, there's no need to rewrite it. **Setup tab → paste the script → confirm the cast → Run all → export.** The two starting paths meet at exactly the same point after scene splitting.

Want to see one episode end to end with its real output? Read [From one title to 11 scenes — a real run](/en/blog/story-mode-case-study/). No script yet? See [how to start from a single title](/en/blog/story-mode-title-to-video/); want to nail the topic first? See [YouTube benchmarking](/en/blog/story-mode-youtube-benchmark/).
