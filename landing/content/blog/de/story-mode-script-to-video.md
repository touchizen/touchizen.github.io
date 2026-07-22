---
title: "Video aus einem vorhandenen Skript — Story-Modus"
date: "2026-07-21"
modified: "2026-07-22"
excerpt: "Fügen Sie ein fertiges Skript in den Story-Modus ein: Die Recherche entfällt, Sie bestätigen nur die Besetzung, dann folgen Szenenaufteilung, Audio und Prompts."
tags: ["AutoFlowCut", "Story-Modus", "Skript", "Tutorial"]
author: "Touchizen"
image: "/images/blog/story/story-script-setup-en.png"
---

## Sie haben bereits ein Skript

> 📌 Die Abbildungen in diesem Beitrag sind **UI-Mockups**, erstellt aus den Daten eines realen Projekts und dem CSS der App. Die Werte darin (Szenen, Segmente, Prompts) sind der tatsächliche Output. Die Oberfläche von AutoFlowCut gibt es auf **Koreanisch und Englisch**, deshalb zeigen sie die englische Oberfläche. Das Projekt selbst lief auf Koreanisch; die hier gezeigten Geschichtstexte sind eine Übersetzung dieses Outputs — Zahlen, Zeiten und Prompts sind unverändert.

Ob selbst geschrieben, beauftragt oder in einem anderen Tool entworfen und überarbeitet — wenn das Skript fertig ist, gibt es keinen Grund, den Story-Modus eines von Grund auf schreiben zu lassen. **Fügen Sie das Skript ein**, und der Story-Modus übernimmt es unverändert, lässt Sie die Besetzung bestätigen und macht bei der Szenenaufteilung weiter.

![Story-Modus-Stepper — nur Recherche ausgegraut; Synopsis offen zum Bestätigen der Besetzung](/images/blog/story/story-script-hero-en.png)

Im Stepper oben ist **nur 1 Recherche ausgegraut (deaktiviert)** — liegt ein Skript vor, gibt es kein Thema zu recherchieren. **2 Synopsis bleibt offen**, denn dort wird die Besetzung wieder aus Ihrem eingefügten Skript herausgezogen und bestätigt. Der Ablauf ist **3 Skript (fertig) → 2 Besetzung bestätigen → 4 Szenenaufteilung**.

## Wo Sie das Skript einfügen: der Setup-Tab

Ganz unten im Tab **0 Setup** gibt es ein Feld **Skript (optional)**. Fügen Sie Ihr Skript einfach dort ein. Wählen Sie dieselben Optionen — Titel, Ausgabesprache, Szenen-Einheit — aber sobald Sie das Skriptfeld füllen, wechselt der Ablauf von „aus einem Titel neu schreiben" zu „mit diesem Skript ausführen".

![Story-Modus-Setup-Tab — ein fertiges Skript im Feld Skript (optional)](/images/blog/story/story-script-setup-en.png)

- **Szenen-Einheit** — legen Sie fest, ob fein pro Satz aufgeteilt oder nach Zeit (Sekunden) gruppiert wird. Wählen Sie passend zu Skriptlänge und Schnittstil.
- **Ausgabesprache** — an die Sprache Ihres Skripts anpassen (Koreanisch oder English).
- **Titel** — sinnvoll auszufüllen, um das Projekt geordnet zu halten.

## Recherche entfällt; Synopsis bestätigt nur die Besetzung

In einem Projekt mit vorhandenem Skript wird der **Gate-Tab Recherche gesperrt** — das Thema steht fest, der Schritt ist gegenstandslos.

**Synopsis wird nicht gesperrt.** Seine Aufgabe ändert sich nur: Statt eine Handlung abzuleiten, **zieht er die Besetzung aus Ihrem eingefügten Skript heraus und lässt sie bestätigen.** Name, Geschlecht, Alter und Aussehen jeder Figur können Sie hier korrigieren; diese Werte fließen direkt in die Stimmenbesetzung in Schritt 5 und die Figurenbeschreibungen in Schritt 6. Bis Sie bestätigen, bleibt **▶ Alles ausführen** deaktiviert — ein Schutz davor, die Folgeschritte mit unbestätigter Besetzung laufen zu lassen.

## Von der Szenenaufteilung zu Audio und Prompts

Ab hier ist es identisch mit dem [Ablauf nur mit Titel](/de/blog/story-mode-title-to-video/). Die Werte in den Screens unten sind der Output eines realen Projekts, **„Der Reiche und der Arme“**, in dem ein Skript zu **11 Szenen, 20 Segmenten, 72,5 Sekunden** wurde.

### 4 Szenenaufteilung — aus dem eingefügten Skript wird eine Tabelle

![Story-Modus-Szenenaufteilung — Aufteilungseinheit und Segmenttabelle mit Sprecher, Emotion und Soundeffekten](/images/blog/story/story-step-scenes-en.png)

Zeilen sind **Segmente**, nicht Szenen. Eine Szene mit mehreren Segmenten wiederholt ihre Nummer in der Spalte `#`.

- **Sprecher** — Zeilen, die Sie im Skript mit `Gatekeeper:` vorangestellt haben, werden als Sprecher übernommen. Dialoge vor dem Einfügen zu markieren ist genau das, was sie hier sauber trennt.
- **Emotion** — die Tabelle zeigt eine Emotion nur bei Dialog außerhalb der Erzählung (`(Angry)`, `(Sad)`). Erzählung hat zwar auch einen Emotionswert, zeigt ihn aber nicht und wird stets als `normal` synthetisiert — nur die **Dialog**-Emotion erreicht die TTS in Schritt 5.
- **SFX-Zeilen** — Soundeffekt-Hinweise erscheinen als eigene, farblich abgesetzte Zeilen. Sie kommen als englische Beschreibungen wie `heavy iron gate slamming shut`, weil das Soundeffekt-Modell Englisch entgegennimmt.
- **Erneut aufteilen** — ist das Ergebnis zu fein oder zu grob, ändern Sie Einheit und Min-/Max-Sekunden in der Leiste darüber und teilen erneut auf. Ihr Skript bleibt unangetastet; nur die Tabelle wird neu gebaut.

### 5 Audio — eine Stimme pro Sprecher

![Story-Modus-Audio-Tab — Stimmenzuweisung pro Sprecher und Generierungsstatus pro Segment](/images/blog/story/story-step-audio-en.png)

- **Stimmenauswahl** — Stimmen von Typecast, Gemini und ElevenLabs in einem Fenster.
- **Fortschritt pro Sprecher** — ein Zähler wie `16/16` zeigt, wie viele Segmente dieses Sprechers fertig sind. Sie können auch zuerst nur einen Sprecher generieren und hineinhören.
- **Segmentstatus** — jede Zeile trägt ein Fertig-Badge, und **Test** erzeugt genau diese eine Zeile neu zum Anhören.
- **Eigene Aufnahmen gehen auch** — wenn Sie bereits Takes haben, ziehen Sie eine mp3 und eine SRT auf eine Sprecherzeile, dann wird diese Datei statt TTS verwendet. Das passt gut dazu, ein eigenes Skript mitzubringen.

### 6 Prompts — ein Bild- und Video-Prompt pro Szene

![Story-Modus-Prompts-Tab — Bild- und Video-Prompts pro Szene mit Klartext-@Mentions](/images/blog/story/story-step-prompts-en.png)

Jede Szene erhält einen Bild- und einen Video-Prompt. Achten Sie auf die **Mentions im Stil `@Park`** darin.

Aktivieren Sie **[Auto]** für Szenenaufteilung, Audio und Prompts, drücken Sie **▶ Alles ausführen**, und der Rest läuft von selbst.

## Charakter-@Mentions funktionieren weiterhin

Auch in einem eingefügten Skript **registrieren sich Figuren selbst als Referenzkarten**. Szenen mit diesen Figuren bekommen die Mention automatisch eingesetzt. Der Bildplatz der Karte ist zunächst leer — **generieren Sie das Referenzbild einmal**, wird es fortan jeder erwähnten Szene angehängt, und genau das hält die Figuren konsistent. Mit `@` in einem Prompt fügen Sie welche hinzu oder entfernen sie; Namen mit Leerzeichen stehen in geschweiften Klammern, etwa `@{Chairman Yun}`.

## Generieren und exportieren

Sobald die Prompts bereit sind, generieren Sie Bilder und Videos und **exportieren mit einem Klick nach CapCut, Adobe Premiere oder Vrew** — Timeline, Untertitel, Audiospuren und Ken-Burns-Animationen inklusive.

## Kurz gesagt

Wenn Sie ein fertiges Skript haben, müssen Sie es nicht neu schreiben. **Setup-Tab → Skript einfügen → Besetzung bestätigen → Alles ausführen → exportieren.** Die beiden Startwege treffen sich nach der Szenenaufteilung an genau demselben Punkt.

Sie möchten eine Folge von Anfang bis Ende mit echtem Output sehen? Lesen Sie [Von einem Titel zu 11 Szenen — ein echter Durchlauf](/de/blog/story-mode-case-study/). Noch kein Skript? Siehe [wie Sie mit einem einzigen Titel starten](/de/blog/story-mode-title-to-video/); zuerst das Thema festzurren? Siehe [YouTube-Benchmarking](/de/blog/story-mode-youtube-benchmark/).
