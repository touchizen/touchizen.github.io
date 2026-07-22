---
title: "Aus einem Titel ein Video machen — AutoFlowCut Story-Modus"
date: "2026-07-21"
modified: "2026-07-22"
excerpt: "Kein Thema, kein Skript, keine Sprecher — ein Titel reicht. Der Story-Modus verkettet Synopsis bis Prompts und liefert eine fertige Szenentabelle."
tags: ["AutoFlowCut", "Story-Modus", "KI-Video-Automatisierung", "Tutorial"]
author: "Touchizen"
image: "/images/blog/story/story-title-setup-en.png"
---

## Ein einziger Titel genügt

> 📌 Die Abbildungen in diesem Beitrag sind **UI-Mockups**, erstellt aus den Daten eines realen Projekts und dem CSS der App. Die Werte darin (Szenen, Segmente, Prompts) sind der tatsächliche Output. Die Oberfläche von AutoFlowCut gibt es auf **Koreanisch und Englisch**, deshalb zeigen sie die englische Oberfläche. Das Projekt selbst lief auf Koreanisch; die hier gezeigten Geschichtstexte sind eine Übersetzung dieses Outputs — Zahlen, Zeiten und Prompts sind unverändert.

Ein Video zu erstellen erfordert normalerweise all das — ein Thema, ein Skript, Szenenaufteilung, eine Sprecherbesetzung, Soundeffekte, Bild-Prompts. Der Story-Modus füllt jedes davon für Sie aus, ausgehend von **einem einzigen Titel**.

Der Story-Modus von AutoFlowCut ist eine Pipeline, die eine Idee in eine **Szenentabelle mit Prompts, Stimmen und Soundeffekten** verwandelt. Geben Sie einen Titel an, und sie durchläuft Synopsis → Skript → Szenenaufteilung → Audio → Prompts der Reihe nach und reicht das Ergebnis jedes Schritts direkt an den nächsten weiter. **Recherche ist optional** — Sie öffnen und starten sie selbst und müssen in der Synopsis [Recherche-Kontext verwenden] aktivieren, damit sie einfließt. Sie verlassen AutoFlowCut nie.

![Story-Modus-Stepper — das Skript ist fertig, Alles ausführen ist bereit](/images/blog/story/story-title-hero-en.png)

Die Werte in den Screens unten sind der Output eines realen Projekts: **„Der Reiche und der Arme“**. Es startete mit einem Titel und ergab **11 Szenen, 20 Segmente, 72,5 Sekunden**.

## Die Pipeline auf einen Blick

Oben im Story-Bildschirm sitzt ein Stepper. Jeder Schritt ist ein Chip, und ein farbiger Punkt zeigt seinen Status — wartend, läuft, fertig, Fehler.

```
0 Setup → 1 Recherche → 2 Synopsis → 3 Skript → 4 Szenenaufteilung → 5 Audio → 6 Prompts
```

| Schritt | Was an den nächsten Schritt übergeben wird |
|---------|--------------------------------------------|
| **0 Setup** | Story-Typ, Generierungs-KI, Ausgabesprache, Skriptlänge, Szenen-Einheit, Titel |
| **1 Recherche** | Strukturanalyse von Referenz-YouTube-Videos sowie faktengeprüfte Aussagen |
| **2 Synopsis** | Die Handlung und eine finalisierte Besetzung |
| **3 Skript** | Das fertige Skript |
| **4 Szenenaufteilung** | Szenen, Segmente pro Sprecher (mit Emotion), Soundeffekt-Hinweise |
| **5 Audio** | Nach Sprecher getrennte Erzählspuren und generierte Soundeffekte |
| **6 Prompts** | Ein Bild- und Video-Prompt pro Szene |

## Loslegen: der Setup-Tab

Das ist der Einstieg in die Pipeline. Alles, was Sie hier wählen, wird im Projekt gespeichert und exakt wiederhergestellt, wenn Sie es später erneut öffnen.

![Story-Modus-Setup-Tab — Titel, Story-Typ, Generierungs-KI, Ausgabesprache](/images/blog/story/story-title-setup-en.png)

- **Story-Typ** — die verfügbaren Genres hängen von der Ausgabesprache ab. Koreanisch bietet Yadam, English bietet Dark History, und beide Sprachen bieten den universellen Standard Bespoke.
- **Generierungs-KI** — das Modell, das Ihr Skript schreibt (Claude oder Codex). Unterstützt das Modell es, erscheint daneben eine Auswahl der Reasoning-Stufe.
- **Ausgabesprache** — Koreanisch oder English. Das ist die Sprache der *Geschichte*, nicht der App-Oberfläche.
- **Skriptlänge / Szenen-Einheit / Titel** — der Rest bleibt Ihnen überlassen.

Tragen Sie nur den Titel ein und lassen Sie das Skript leer, dann schreibt der Story-Modus auch das Skript für Sie. (Schon ein Skript zur Hand? Siehe [wie Sie Ihr eigenes Skript einfügen](/de/blog/story-mode-script-to-video/).)

## Bis zum Ende automatisch: Alles ausführen

Die Schritte **Szenenaufteilung, Audio und Prompts** haben jeweils einen **[Auto]**-Schalter. Aktivieren Sie Auto für die Schritte, denen Sie vertrauen, drücken Sie **▶ Alles ausführen**, und die Pipeline läuft bis zum Ende durch.

Skript hat keinen Auto-Schalter — das ist der Schritt, der Ihren Titel und Ihre Einstellungen braucht. **Alles ausführen wird erst verfügbar, wenn das Skript fertig ist.**

> 💡 Recherche und Synopsis sind **Gate-Tabs**, keine Ausführungsschritte. Sie werden nur aktiv, wenn sie auf Ihr Projekt zutreffen, und bleiben sonst ausgegraut. Beim ersten Mal empfehlen wir, einmal am Skript-Schritt anzuhalten, das Ergebnis zu prüfen und den Rest automatisch laufen zu lassen.

## 3 Skript — aus dem Titel wird Text

Das erste Ergebnis der Pipeline ist das Skript selbst. Dieser Bildschirm ist ein **Editor**, keine reine Vorschau — jeden Satz, der Ihnen nicht gefällt, korrigieren Sie direkt an Ort und Stelle.

![Story-Modus-Skript-Tab — das generierte Skript mit einer Sprecherzeile und den Schaltflächen Rewrite / Continue / Split](/images/blog/story/story-step-script-en.png)

- **Rewrite** — mit demselben Titel und denselben Einstellungen komplett neu schreiben.
- **Continue** — den vorhandenen Text behalten und daran weiterschreiben. Nützlich, wenn das Skript zu kurz geraten ist.
- **Split scenes** — dieses Skript festschreiben und an Schritt 4 übergeben.

Zeilen mit vorangestelltem Sprecher, etwa `Gatekeeper:`, **werden als Dialog erkannt**. Genau diese Markierung wird stromabwärts zu Segmenten pro Sprecher und zur Stimmenzuweisung — Dialoge sollten also einen Sprecher tragen.

## 4 Szenenaufteilung — aus dem Skript wird eine Tabelle

Das Skript wird in Szenen zerlegt und jede Szene in **Segmente**. Zeilen sind Segmente, nicht Szenen — eine Szene mit mehreren Segmenten wiederholt daher ihre Nummer in der Spalte `#`.

![Story-Modus-Szenenaufteilung — Aufteilungseinheit und Segmenttabelle mit Sprecher, Emotion und Soundeffekten](/images/blog/story/story-step-scenes-en.png)

Worauf Sie in der Tabelle achten sollten:

- **Sprecher** — genau das, was das Skript benannt hat: `narrator`, `Gatekeeper`, `Chairman Yun`.
- **Emotion** — die Tabelle zeigt eine Emotion nur bei Dialog außerhalb der Erzählung (`(Angry)`, `(Sad)`). Erzählung hat zwar auch einen Emotionswert, zeigt ihn aber nicht und wird stets als `normal` synthetisiert — nur die **Dialog**-Emotion erreicht die TTS in Schritt 5.
- **SFX-Zeilen** — Soundeffekt-Hinweise erscheinen als eigene, farblich abgesetzte Zeilen. Sie kommen als englische Beschreibungen wie `heavy iron gate slamming shut`, weil das Soundeffekt-Modell Englisch entgegennimmt.
- **Szenen-Einheit** — ändern Sie `Scene-based` / `Sentence-based` und die Min-/Max-Sekunden in der Leiste darüber und teilen Sie erneut auf. Das Beispielprojekt nutzt szenenbasiert, 5–10 Sekunden.

## 5 Audio — eine Stimme pro Sprecher

Über der Tabelle erscheint eine Sprecherliste. Wählen Sie für jeden eine eigene Stimme und generieren Sie bei Bedarf zuerst nur die Zeilen eines Sprechers, um sie anzuhören.

![Story-Modus-Audio-Tab — Stimmenzuweisung pro Sprecher und Generierungsstatus pro Segment](/images/blog/story/story-step-audio-en.png)

- **Stimmenauswahl** — Stimmen von Typecast, Gemini und ElevenLabs in einem Fenster. Geschlecht und Aussehen jeder Figur stehen unter dem Namen, was die Besetzung passend zur Rolle erleichtert.
- **Fortschritt pro Sprecher** — ein Zähler wie `16/16` zeigt, wie viele Segmente dieses Sprechers fertig sind.
- **Segmentstatus** — jede Zeile trägt ein Badge (wartend / läuft / fertig), und **Test** erzeugt genau diese eine Zeile neu.
- **Soundeffekt-Quelle** — bei SFX-Zeilen wählen Sie die Generierungsquelle. Einsatzbereit ist derzeit **ElevenLabs**; die Bibliotheks-Option ist bislang nur ein Platzhalter.
- **Eigene Aufnahmen gehen auch** — ziehen Sie eine mp3 und eine SRT auf eine Sprecherzeile, dann wird diese Datei statt TTS verwendet.

## 6 Prompts — ein Bild- und Video-Prompt pro Szene

Der letzte Ausführungsschritt. Jede Szene erhält einen Bild-Prompt und einen Video-Prompt.

![Story-Modus-Prompts-Tab — Bild- und Video-Prompts pro Szene mit Klartext-@Mentions](/images/blog/story/story-step-prompts-en.png)

Achten Sie auf die **Mentions im Stil `@Park`** innerhalb der Prompts. Figuren aus Ihrem Skript registrieren sich selbst als Referenzkarten, und Szenen mit diesen Figuren bekommen die Mention automatisch eingesetzt. Die Karte trägt die aus Ihrem Skript gezogene Figurenbeschreibung als Prompt; ihr Bildplatz ist zunächst leer. **Generieren Sie das Referenzbild einmal**, wird es fortan jeder Szene angehängt, die diese Figur erwähnt — genau das **hält dasselbe Gesicht über 200+ Szenen hinweg konstant.**

Sie können in einem Prompt auch selbst `@` tippen, um eine Figur hinzuzufügen oder zu entfernen. Namen mit Leerzeichen werden in geschweifte Klammern gesetzt, etwa `@{Chairman Yun}`.

## Generieren und exportieren

Sobald die Prompts bereit sind, folgt der übliche AutoFlowCut-Ablauf:

1. Bilder pro Szene im Stapel generieren und T2V/I2V-Videos, wo Sie Bewegung möchten.
2. Audiospuren (Erzählung und Soundeffekte) liegen bereits auf den Szenen.
3. **Export nach CapCut, Adobe Premiere oder Vrew mit einem Klick** — inklusive Timeline, Untertitel und Ken-Burns-Animationen.

## Kurz gesagt

Ein Titel → ein paar Einstellungen → Alles ausführen → exportieren. Entscheiden Sie, *was* Sie machen, und der Story-Modus füllt das *Wie* aus.

Wie „Der Reiche und der Arme“ von Anfang bis Ende entstanden ist, lesen Sie in [Von einem Titel zu 11 Szenen — ein echter Durchlauf](/de/blog/story-mode-case-study/). Um Themen von Anfang an gut zu finden, lesen Sie [wie Sie reichweitenstarke YouTube-Videos benchmarken](/de/blog/story-mode-youtube-benchmark/); eine Schritt-für-Schritt-Referenz finden Sie im [Story-Modus-Leitfaden](https://touchizen.com/guide/de/autoflowcut/story-guide.html).
