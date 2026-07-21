---
title: "Aus einem vorhandenen Skript ein Video machen — ins Story-Modus einfügen"
date: "2026-07-21"
excerpt: "Das Skript ist schon da. Fügen Sie es in den Story-Modus ein, und er überspringt Recherche und Synopsis und geht direkt zu Szenenaufteilung → Audio → Prompts — zu einem Projekt, fertig zum Export."
tags: ["AutoFlowCut", "Story-Modus", "Skript", "Tutorial"]
author: "Touchizen"
image: "/images/blog/story/story-script-hero-de.png"
---

## Sie haben bereits ein Skript

Ob selbst geschrieben, beauftragt oder in einem anderen Tool entworfen und überarbeitet — wenn das Skript fertig ist, gibt es keinen Grund, den Story-Modus eines von Grund auf schreiben zu lassen. **Fügen Sie das Skript ein**, und der Story-Modus übernimmt es unverändert und macht bei der Szenenaufteilung weiter.

![Story-Modus-Stepper — Recherche und Synopsis ausgegraut, Start bei der Szenenaufteilung](/images/blog/story/story-script-hero-de.png)

Im Stepper oben sind **1 Recherche und 2 Synopsis ausgegraut (deaktiviert)**. Da bereits ein Skript vorliegt, sind Themenrecherche und Handlungsableitung nicht nötig. Die Pipeline springt direkt von **3 Skript (fertig) → 4 Szenenaufteilung**.

## Wo Sie das Skript einfügen: der Setup-Tab

Ganz unten im Tab **0 Setup** gibt es ein Feld **Skript (optional)**. Fügen Sie Ihr Skript einfach dort ein. Wählen Sie dieselben Optionen — Titel, Ausgabesprache, Szenen-Einheit — aber sobald Sie das Skriptfeld füllen, wechselt der Ablauf von „aus einem Titel neu schreiben" zu „mit diesem Skript ausführen".

![Story-Modus-Setup-Tab — ein fertiges Skript im Feld Skript (optional)](/images/blog/story/story-script-setup-de.png)

- **Szenen-Einheit** — legen Sie fest, ob fein pro Satz aufgeteilt oder nach Zeit (Sekunden) gruppiert wird. Wählen Sie passend zu Skriptlänge und Schnittstil.
- **Ausgabesprache** — an die Sprache Ihres Skripts anpassen (Koreanisch oder English).
- **Titel** — sinnvoll auszufüllen, um das Projekt geordnet zu halten.

## Recherche und Synopsis werden übersprungen

In einem Projekt mit bereits vorhandenem Skript werden die **Gate-Tabs Recherche und Synopsis gesperrt.** Die Geschichte steht schon fest, also sind diese Schritte gegenstandslos. Sie bleiben im Stepper ausgegraut und nicht anklickbar, sodass die Geschichte nicht versehentlich neu generiert wird.

## Von der Szenenaufteilung zu Audio und Prompts

Ab hier ist es identisch mit dem [Ablauf nur mit Titel](/de/blog/story-mode-title-to-video/):

1. **4 Szenenaufteilung** — teilt das Skript in Szenen und extrahiert Segmente pro Sprecher (mit Emotion) und Soundeffekt-Hinweise.
2. **5 Audio** — weisen Sie pro Sprecher eine Stimme zu (Typecast · ElevenLabs · Gemini) und generieren Sie Erzählung und Soundeffekte.
3. **6 Prompts** — erstellen Sie pro Szene einen Bild- und Video-Prompt.

Aktivieren Sie **[Auto]** für Szenenaufteilung, Audio und Prompts, drücken Sie **▶ Alles ausführen**, und der Rest läuft von selbst.

## Charakter-@Mentions funktionieren weiterhin

Figuren aus Ihrem Skript **registrieren sich selbst als Referenzkarten**, sodass Sie sie mit `@` in einem Prompt auswählen und in Szenen setzen können — ein eingefügtes Skript behält dieselbe Figurenkonsistenz.

## Generieren und exportieren

Sobald die Prompts bereit sind, generieren Sie Bilder und Videos und **exportieren mit einem Klick nach CapCut, Adobe Premiere oder Vrew** — Timeline, Untertitel, Audiospuren und Ken-Burns-Animationen inklusive.

## Kurz gesagt

Wenn Sie ein fertiges Skript haben, müssen Sie es nicht neu schreiben. **Setup-Tab → Skript einfügen → Alles ausführen → exportieren.** Die beiden Startwege treffen sich nach der Szenenaufteilung an genau demselben Punkt. Noch kein Skript? Siehe [wie Sie mit einem einzigen Titel starten](/de/blog/story-mode-title-to-video/); zuerst das Thema festzurren? Siehe [YouTube-Benchmarking](/de/blog/story-mode-youtube-benchmark/).
