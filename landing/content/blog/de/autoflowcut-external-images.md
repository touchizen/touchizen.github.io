---
title: "Beliebige KI-Bildtools mit AutoFlowCut nutzen: Eigene Bilder in Szenen einfügen"
date: "2026-07-15"
excerpt: "Deine Bilder in Midjourney, DALL·E oder einem anderen Tool erstellt? Hier erfährst du genau, wie du sie in ein AutoFlowCut-Projekt einfügst, sodass jedes Bild in der richtigen Szene landet — ohne eine einzige Zeile der Projektdatei anzufassen."
tags: ["AutoFlowCut", "Tutorial", "KI-Bilder", "Workflow"]
author: "Touchizen"
image: "/images/thumbnails/autoflowcut/thumbnail_1_de.png"
---

## „Meine Bilder habe ich schon woanders erstellt."

Deine Narration ist aufgenommen, dein SRT ist getimt und deine Szenen sind in einer CSV gruppiert. Aber die Bilder hast du nicht in AutoFlowCut erzeugt — sondern in Midjourney, DALL·E, Stable Diffusion oder einem anderen Tool, das du gern nutzt. Jetzt starrst du auf einen Ordner voller `0001.png`, `0002.png`, `0003.png` und fragst dich:

> „Wie bekomme ich diese Bilder in AutoFlowCut, sodass jedes in der richtigen Szene landet — ohne mein SRT- und Narration-Timing zu zerstören?"

Gute Nachricht: Du musst die Projektdatei nicht bearbeiten und kein Plugin installieren. AutoFlowCut ist so gebaut, dass **die Dateinamen deiner Bilder die Verbindung zwischen Bildern und Szenen herstellen.** Benenne sie richtig, lege sie in einen Ordner, lade neu — fertig. Dein SRT- und Narration-Timing wird separat gespeichert und niemals angetastet.

So funktioniert es genau.

## Die eine Regel: Dateinamen bestimmen alles

AutoFlowCut behandelt die Pfade in `project.json` **nicht** als maßgebliche Quelle. Jedes Mal, wenn du ein Projekt öffnest, **scannt die App den `scenes/`-Ordner erneut** und ordnet jede Datei anhand ihres Namens einer Szene zu.

Das heißt, der zuverlässige Weg, deine eigenen Bilder anzuhängen, ist einfach:

**Benenne jedes Bild passend zur Szenen-ID um und lege es in den `scenes/`-Ordner des Projekts.**

Kein JSON-Editieren. Wenn du einen Bildpfad von Hand in `project.json` einträgst, überschreibt die App ihn beim nächsten Laden einfach — also spar dir die Mühe. Der Dateiname ist der Vertrag.

## Wo wird das Projekt gespeichert?

Jedes Projekt ist ein **Ordner**, keine einzelne Datei. Du findest ihn hier:

```
Windows:  C:\Users\<du>\Documents\AutoFlowCut\<Projektname>\
macOS:    ~/Documents/AutoFlowCut/<Projektname>/
```

(Wenn du in der App einen eigenen Arbeitsordner gewählt hast, liegt es darunter.)

Innen sieht die Struktur so aus:

```
<Projektname>\
    ├── project.json     ← Szenen, Prompts, SRT-Track, Narration-Timing
    ├── scenes\          ← deine Bilder kommen HIERHIN
    ├── references\
    ├── videos\
    └── sfx\
```

Was die Zuordnung Szene ↔ Bild tatsächlich steuert, ist **kein** Feld in `project.json` — sondern der **Dateiname** jeder Datei im `scenes\`-Ordner.

## Die Benennungsregel (hier machen die meisten Fehler)

Die Szenen-IDs in AutoFlowCut lauten:

```
scene_1, scene_2, scene_3, ...
```

Das ist **1-basiert, ohne führende Nullen.** Die App sucht also nach:

```
scenes/scene_1.png
scenes/scene_2.png
scenes/scene_3.png
```

Deine exportierten Dateien heißen wahrscheinlich `0001.png`, `0002.png`, … — die **passen nicht.** Du musst sie umbenennen:

| Deine Datei | Umbenennen in  |
|-------------|----------------|
| `0001.png`  | `scene_1.png`  |
| `0002.png`  | `scene_2.png`  |
| `0003.png`  | `scene_3.png`  |

**Erweiterungs-Priorität:** Wenn eine Szene bereits eine alte Datei hat, wählt die App den ersten Treffer in dieser Reihenfolge — `png → jpg → jpeg → webp → gif → mp4 → webm`. Damit kein veraltetes Bild gewinnt, verwende entweder überall `.png` oder lösche zuerst die alte Datei dieser Szene.

## Schritt für Schritt

1. Öffne deinen Projektordner (z. B. `…\Documents\AutoFlowCut\mein-projekt\`).
2. Benenne deine Bilder ins Szenen-ID-Muster um — `scene_1.png`, `scene_2.png`, … (**nicht** `0001.png`).
3. Kopiere sie in den **`scenes\`**-Unterordner.
4. Lade das Projekt in AutoFlowCut neu. Es scannt `scenes/scene_N.*`, hängt jedes Bild automatisch an seine Szene an und markiert es als „fertig".

Das war's. Deine SRT-Zeilen und dein Narration-Timing bleiben genau, wo sie waren.

## Eine Sache zum Prüfen: Szenenreihenfolge bei einer gruppierten CSV

Wenn du eine gruppierte Szenen-CSV importierst, vergibt AutoFlowCut die Szenen-IDs **fortlaufend** in Importreihenfolge — `scene_1`, `scene_2`, `scene_3`, … — **unabhängig von der `scene`-Nummernspalte in deiner CSV.**

- Wenn die Szenennummern deiner CSV bereits in der Reihenfolge `1, 2, 3…` stehen, passt alles perfekt.
- Wenn sie Lücken haben oder umgeordnet wurden, richte deine Bildnummerierung nach der **auf dem Bildschirm angezeigten Szenenreihenfolge in der App** — nicht nach den Rohnummern in der CSV.

Schnelle Kontrolle: Öffne Szene 1 in AutoFlowCut und prüfe, ob es die Szene ist, in die `scene_1.png` deiner Meinung nach gehört.

## Lass GPT oder Claude das Umbenennen erledigen

Das ist eine ideale kleine Aufgabe für einen KI-Assistenten. Statt ihn die Projektdatei bearbeiten zu lassen (das hält ohnehin nicht), lass ihn ein **Umbenennungs-Skript** für deine Dateien **erstellen**:

> „Ich habe diese Dateien: `0001.png` bis `0240.png`. Schreib ein Skript, das sie in `scene_1.png` bis `scene_240.png` umbenennt (1-basiert, ohne führende Nullen)."

Skript ausführen, Ergebnisse in `scenes\` legen und neu laden. Genau hier spart dir KI wirklich Zeit.

## Was ist mit Video?

Hier ist es wichtig, ehrlich zu sagen, wie AutoFlowCut heute funktioniert.

**AutoFlowCut unterstützt derzeit nicht den Import eigener Videodateien in Szenen.** Es gibt keine „Video anhängen"-Option in der Oberfläche — die App geht davon aus, dass Szenenvideos von ihrem eigenen Generierungsschritt erzeugt und mit internen IDs (wie `t2v_5.mp4` / `i2v_5.mp4`) im `videos\`-Ordner gespeichert werden. Anders als Bilder werden Videodateien **nicht** pauschal von der Festplatte gescannt, sodass das bloße Ablegen einer `.mp4` in einem Ordner sie keiner Szene zuordnet.

Wenn dein Ziel ein Video mit Clips aus einem externen Tool ist (Sora, Kling, Runway usw.), ist der praktische Weg:

1. Bringe deine **Bilder** mit der obigen Methode in AutoFlowCut.
2. Exportiere das Projekt nach **CapCut** oder **Premiere**.
3. Ersetze in deinem Editor das Standbild einer beliebigen Szene durch deinen externen Videoclip. Da die Timeline bereits nach deinem SRT-Timing aufgebaut ist, tauschst du nur das Medium aus — Timing und Untertitel bleiben erhalten.

So bleibt dein Workflow sauber und du kämpfst nicht gegen einen Ablauf, für den die App nicht ausgelegt ist.

## Das Fazit in einem Satz

**Die maßgebliche Quelle für die Zuordnung Szene ↔ Bild ist der Dateiname `scene_<N>.<ext>` im `scenes/`-Ordner des Projekts — nicht die Projektdatei.** Benenne deine Bilder `scene_1.png`, `scene_2.png`, … lege sie in `scenes\`, lade neu, und jedes Bild landet in der richtigen Szene, während dein SRT- und Narration-Timing perfekt an Ort und Stelle bleibt.
