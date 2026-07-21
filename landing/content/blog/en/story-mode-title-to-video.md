---
title: "Make a Video From Just a Title — AutoFlowCut Story Mode"
date: "2026-07-21"
excerpt: "No topic, no script, no voice cast — a single title is enough. Story mode chains research through prompts automatically and hands you one scene table, ready to export to your editor."
tags: ["AutoFlowCut", "Story mode", "AI video automation", "tutorial"]
author: "Touchizen"
image: "/images/blog/story/story-title-hero-en.png"
---

## A single title is enough

Making one video usually takes all of this — a topic, a script, scene splitting, a voice cast, sound effects, image prompts. Story mode fills every one of them in for you, starting from **a single title**.

AutoFlowCut's Story mode is a pipeline that turns one idea into a **scene table with prompts, voices, and sound effects attached**. Give it a title and it runs research → synopsis → script → scene split → audio → prompts in order, passing each step's output straight into the next. You never leave AutoFlowCut.

![Story mode pipeline stepper — starts from a single title and runs automatically](/images/blog/story/story-title-hero-en.png)

## The pipeline at a glance

A stepper sits at the top of the Story screen. Each step is a chip, and a colored dot shows its state — idle, running, done, error.

```
0 Setup → 1 Research → 2 Synopsis → 3 Script → 4 Scene split → 5 Audio → 6 Prompts
```

| Step | What it hands to the next step |
|------|--------------------------------|
| **0 Setup** | Story type, generation AI, output language, script length, scene-split unit, title |
| **1 Research** | Structure analysis of reference YouTube videos, plus fact-checked claims |
| **2 Synopsis** | The storyline and a finalized cast |
| **3 Script** | The finished script |
| **4 Scene split** | Scenes, per-speaker segments (with emotion), sound-effect cues |
| **5 Audio** | Per-speaker narration tracks and generated sound effects |
| **6 Prompts** | One image and video prompt per scene |

## Getting started: the Setup tab

This is the pipeline's entry point. Everything you pick here is saved to the project, so it restores exactly when you reopen it later.

![Story mode Setup tab — title, story type, generation AI, output language](/images/blog/story/story-title-setup-en.png)

- **Story type** — the available genres depend on the output language. Korean offers yadam, English offers dark history, and both languages offer the universal default, bespoke.
- **Generation AI** — the model that writes your script (Claude or Codex). If the model supports it, a reasoning-level picker appears next to it.
- **Output language** — Korean or English. This is the language of the *story*, not the app UI.
- **Script length / scene-split unit / title** — the rest is up to you.

Fill in just the title and leave the script empty, and Story mode writes the script for you too. (Already have a script? See [how to paste your own script](/en/blog/story-mode-script-to-video/).)

## All the way through: Run all

The Script, Scene-split, Audio, and Prompts steps each have an **[auto]** toggle. Turn on auto for the steps you trust, press **▶ Run all**, and the pipeline carries itself to the end.

> 💡 Research and Synopsis are **gate tabs**, not run steps. They activate only when they apply to your project and stay grayed out otherwise. The first time, we recommend stopping once at the Script step to review the result, then letting the rest run automatically.

## Characters become @mention cards automatically

Characters in your script **register themselves as reference cards**. Type `@` in a prompt to pick one and drop it into a scene — it lands as an inline chip with a thumbnail and attaches to that generation, keeping characters consistent across 200+ scenes.

## Generate and export

Once the prompts are ready, the rest is the usual AutoFlowCut flow:

1. Batch-generate images per scene, and T2V/I2V videos where you want motion.
2. Audio tracks (narration and sound effects) are already placed on the scenes.
3. **Export to CapCut, Adobe Premiere, or Vrew in one click** — timeline, subtitles, and Ken Burns animations included.

## In short

One title → a few settings → Run all → export. Decide *what* to make, and Story mode fills in *how* to make it. To source topics well from the start, read [how to benchmark high-view YouTube videos](/en/blog/story-mode-youtube-benchmark/); for a step-by-step reference, see the [Story mode guide](https://touchizen.com/guide/en/autoflowcut/story-guide.html).
