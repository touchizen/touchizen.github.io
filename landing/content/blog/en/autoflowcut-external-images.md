---
title: "Use Any AI Image Tool with AutoFlowCut: Bring Your Own Images into Scenes"
date: "2026-07-15"
excerpt: "Generated your images in Midjourney, DALL·E, or another tool? Here's exactly how to drop them into an AutoFlowCut project so each image lands on the right scene — without touching a single line of the project file."
tags: ["AutoFlowCut", "Tutorial", "AI Images", "Workflow"]
author: "Touchizen"
image: "/images/thumbnails/autoflowcut/thumbnail_1_en.png"
---

## "I already made my images somewhere else."

You've got your narration recorded, your SRT timed, and your scenes grouped in a CSV. But you didn't generate your images inside AutoFlowCut — you made them in Midjourney, DALL·E, Stable Diffusion, or some other tool you love. Now you're staring at a folder full of `0001.png`, `0002.png`, `0003.png` and wondering:

> "How do I get these into AutoFlowCut so each image lands on the right scene — without breaking my SRT and narration timing?"

Good news: you don't need to edit the project file, and you don't need any plugin. AutoFlowCut is built so that **your image filenames are what connect images to scenes.** Get the names right, drop the files in one folder, reload — done. Your SRT and narration timing are stored separately and never get touched.

Here's exactly how it works.

## The one rule: filenames control everything

AutoFlowCut does **not** treat the paths inside `project.json` as the source of truth. Every time you open a project, the app **re-scans the `scenes/` folder** and matches each file to a scene by its name.

That means the reliable way to attach your own images is simple:

**Rename each image to match its scene ID, then drop it into the project's `scenes/` folder.**

No JSON editing. If you hand-edit an image path into `project.json`, the app just overwrites it on the next load — so don't bother. The filename is the contract.

## Where is the project stored?

Each project is a **folder**, not a single file. You'll find it here:

```
Windows:  C:\Users\<you>\Documents\AutoFlowCut\<project-name>\
macOS:    ~/Documents/AutoFlowCut/<project-name>/
```

(If you picked a custom work folder inside the app, it lives under that instead.)

Inside, the structure looks like this:

```
<project-name>\
    ├── project.json     ← scenes, prompts, SRT track, narration timing
    ├── scenes\          ← your images go HERE
    ├── references\
    ├── videos\
    └── sfx\
```

The file that actually controls scene ↔ image matching is **not** a field in `project.json` — it's the **filename** of each file in the `scenes\` folder.

## The naming rule (this is the part people get wrong)

Scene IDs in AutoFlowCut are:

```
scene_1, scene_2, scene_3, ...
```

That's **1-based, with no zero-padding.** So the app looks for:

```
scenes/scene_1.png
scenes/scene_2.png
scenes/scene_3.png
```

Your exported files are probably named `0001.png`, `0002.png`, … — those **will not match.** You have to rename them:

| Your file   | Rename to      |
|-------------|----------------|
| `0001.png`  | `scene_1.png`  |
| `0002.png`  | `scene_2.png`  |
| `0003.png`  | `scene_3.png`  |

**Extension priority:** if a scene already has an old file, the app picks the first match in this order — `png → jpg → jpeg → webp → gif → mp4 → webm`. To avoid a stale image winning, either use `.png` for everything or delete the old file for that scene first.

## Step by step

1. Open your project folder (e.g. `…\Documents\AutoFlowCut\my-project\`).
2. Rename your images to the scene-ID pattern — `scene_1.png`, `scene_2.png`, … (**not** `0001.png`).
3. Copy them into the **`scenes\`** subfolder.
4. Reload the project in AutoFlowCut. It scans `scenes/scene_N.*`, auto-attaches each image to its scene, and marks it "done."

That's it. Your SRT lines and narration timing stay exactly where they were.

## One thing to double-check: scene order with a grouped CSV

When you import a grouped Scene CSV, AutoFlowCut assigns scene IDs **sequentially** in import order — `scene_1`, `scene_2`, `scene_3`, … — **independent of the `scene` number column in your CSV.**

- If your CSV's scene numbers are already `1, 2, 3…` in order, everything lines up perfectly.
- If they skip or get reordered, match your image numbering to the **on-screen scene order in the app**, not the raw numbers in the CSV.

Quick sanity check: open scene 1 in AutoFlowCut and confirm it's the scene you think `scene_1.png` belongs to.

## Let GPT or Claude do the renaming

This is a great little job to hand off to an AI assistant. Instead of asking it to edit the project file (which won't stick), ask it to **generate a rename script** for your files:

> "I have these files: `0001.png` through `0240.png`. Write a script that renames them to `scene_1.png` through `scene_240.png` (1-based, no zero-padding)."

Run the script, drop the results into `scenes\`, and reload. That's the part where AI actually saves you time.

## What about video?

This is where it's important to be honest about how AutoFlowCut works today.

**AutoFlowCut does not currently support importing your own video files into scenes.** There's no "attach a video" option in the UI — the app assumes scene videos are produced by its own generation step and saved into the `videos\` folder with internal IDs (like `t2v_5.mp4` / `i2v_5.mp4`). Unlike images, video files are **not** blanket-scanned from disk, so simply dropping an `.mp4` into a folder won't attach it to a scene.

If your goal is a video that uses clips from an external tool (Sora, Kling, Runway, etc.), the practical path is:

1. Bring your **images** into AutoFlowCut using the method above.
2. Export the project to **CapCut** or **Premiere**.
3. In your editor, replace the still on any scene with your external video clip. Because the timeline is already built to your SRT timing, you're just swapping the media — the timing and subtitles stay intact.

That keeps your workflow clean and avoids fighting a workflow the app wasn't designed for.

## The one-line takeaway

**The source of truth for scene ↔ image matching is the filename `scene_<N>.<ext>` inside the project's `scenes/` folder — not the project file.** Name your images `scene_1.png`, `scene_2.png`, … drop them in `scenes\`, reload, and every image lands on the right scene while your SRT and narration timing stay perfectly in place.
