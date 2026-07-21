---
title: "Make a Video From a Script You Already Have — Paste It Into Story Mode"
date: "2026-07-21"
excerpt: "The script is already in hand. Paste it into Story mode and it skips research and synopsis, going straight to scene split → audio → prompts — into a project ready to export."
tags: ["AutoFlowCut", "Story mode", "script", "tutorial"]
author: "Touchizen"
image: "/images/blog/story/story-script-hero-en.png"
---

## You already have a script

Whether you wrote it yourself, commissioned it, or drafted and polished it in another tool — if the script is finished, there's no reason to ask Story mode to write one from scratch. **Paste the script**, and Story mode takes it as-is and continues from scene splitting.

![Story mode stepper — Research and Synopsis grayed out, starting at Scene split](/images/blog/story/story-script-hero-en.png)

In the stepper above, **1 Research and 2 Synopsis are grayed out (disabled)**. With a script already in place, topic research and storyline derivation aren't needed. The pipeline jumps straight from **3 Script (done) → 4 Scene split**.

## Where to paste the script: the Setup tab

At the bottom of the **0 Setup** tab there's a **Script (optional)** field. Just paste your script there. Pick the same options — title, output language, scene-split unit — but the moment you fill the script field, the flow switches from "write a new one from a title" to "run with this script."

![Story mode Setup tab — a finished script pasted into the Script (optional) field](/images/blog/story/story-script-setup-en.png)

- **Scene-split unit** — decide whether to split finely per sentence or group by time (seconds). Choose to match your script length and editing style.
- **Output language** — match it to the language of your script (Korean or English).
- **Title** — worth filling in to keep the project organized.

## Research and Synopsis are skipped

In a project that already has a script, the Research and Synopsis **gate tabs lock**. The story is already decided, so those steps are moot. They stay grayed out and unclickable in the stepper, so there's no risk of accidentally regenerating the story.

## From scene split to audio and prompts

From here it's identical to the [title-only flow](/en/blog/story-mode-title-to-video/):

1. **4 Scene split** — splits the script into scenes and extracts per-speaker segments (with emotion) and sound-effect cues.
2. **5 Audio** — assign a voice per speaker (Typecast · ElevenLabs · Gemini) and generate narration and sound effects.
3. **6 Prompts** — build an image and video prompt for each scene.

Turn on **[auto]** for Scene split, Audio, and Prompts, press **▶ Run all**, and the rest runs on its own.

## Character @mentions still work

Characters in your script **register themselves as reference cards**, so you can pick them with `@` in a prompt and drop them into scenes — a pasted script keeps the same character consistency.

## Generate and export

Once the prompts are ready, generate images and videos and **export to CapCut, Adobe Premiere, or Vrew in one click** — timeline, subtitles, audio tracks, and Ken Burns animations all included.

## In short

If you have a finished script, there's no need to rewrite it. **Setup tab → paste the script → Run all → export.** The two starting paths meet at exactly the same point after scene splitting. No script yet? See [how to start from a single title](/en/blog/story-mode-title-to-video/); want to nail the topic first? See [YouTube benchmarking](/en/blog/story-mode-youtube-benchmark/).
