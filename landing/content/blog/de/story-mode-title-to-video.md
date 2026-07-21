---
title: "Aus nur einem Titel ein Video machen — AutoFlowCut Story-Modus"
date: "2026-07-21"
excerpt: "Kein Thema, kein Skript, keine Sprecherbesetzung — ein einziger Titel reicht. Der Story-Modus verkettet Recherche bis Prompts automatisch und liefert eine Szenentabelle, fertig zum Export in Ihren Editor."
tags: ["AutoFlowCut", "Story-Modus", "KI-Video-Automatisierung", "Tutorial"]
author: "Touchizen"
image: "/images/blog/story/story-title-hero-de.png"
---

## Ein einziger Titel genügt

Ein Video zu erstellen erfordert normalerweise all das — ein Thema, ein Skript, Szenenaufteilung, eine Sprecherbesetzung, Soundeffekte, Bild-Prompts. Der Story-Modus füllt jedes davon für Sie aus, ausgehend von **einem einzigen Titel**.

Der Story-Modus von AutoFlowCut ist eine Pipeline, die eine Idee in eine **Szenentabelle mit Prompts, Stimmen und Soundeffekten** verwandelt. Geben Sie einen Titel an, und sie durchläuft Recherche → Synopsis → Skript → Szenenaufteilung → Audio → Prompts der Reihe nach und reicht das Ergebnis jedes Schritts direkt an den nächsten weiter. Sie verlassen AutoFlowCut nie.

![Story-Modus-Pipeline-Stepper — beginnt mit einem einzigen Titel und läuft automatisch](/images/blog/story/story-title-hero-de.png)

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

![Story-Modus-Setup-Tab — Titel, Story-Typ, Generierungs-KI, Ausgabesprache](/images/blog/story/story-title-setup-de.png)

- **Story-Typ** — die verfügbaren Genres hängen von der Ausgabesprache ab. Koreanisch bietet Yadam, English bietet Dark History, und beide Sprachen bieten den universellen Standard Bespoke.
- **Generierungs-KI** — das Modell, das Ihr Skript schreibt (Claude oder Codex). Unterstützt das Modell es, erscheint daneben eine Auswahl der Reasoning-Stufe.
- **Ausgabesprache** — Koreanisch oder English. Das ist die Sprache der *Geschichte*, nicht der App-Oberfläche.
- **Skriptlänge / Szenen-Einheit / Titel** — der Rest bleibt Ihnen überlassen.

Tragen Sie nur den Titel ein und lassen Sie das Skript leer, dann schreibt der Story-Modus auch das Skript für Sie. (Schon ein Skript zur Hand? Siehe [wie Sie Ihr eigenes Skript einfügen](/de/blog/story-mode-script-to-video/).)

## Bis zum Ende automatisch: Alles ausführen

Die Schritte Skript, Szenenaufteilung, Audio und Prompts haben jeweils einen **[Auto]**-Schalter. Aktivieren Sie Auto für die Schritte, denen Sie vertrauen, drücken Sie **▶ Alles ausführen**, und die Pipeline läuft bis zum Ende durch.

> 💡 Recherche und Synopsis sind **Gate-Tabs**, keine Ausführungsschritte. Sie werden nur aktiv, wenn sie auf Ihr Projekt zutreffen, und bleiben sonst ausgegraut. Beim ersten Mal empfehlen wir, einmal am Skript-Schritt anzuhalten, das Ergebnis zu prüfen und den Rest automatisch laufen zu lassen.

## Figuren werden automatisch zu @Mention-Karten

Figuren aus Ihrem Skript **registrieren sich selbst als Referenzkarten**. Tippen Sie `@` in einem Prompt, um eine auszuwählen und in eine Szene zu setzen — sie landet als Inline-Chip mit Vorschaubild und wird dieser Generierung angehängt, was Figuren über 200+ Szenen hinweg konsistent hält.

## Generieren und exportieren

Sobald die Prompts bereit sind, folgt der übliche AutoFlowCut-Ablauf:

1. Bilder pro Szene im Stapel generieren und T2V/I2V-Videos, wo Sie Bewegung möchten.
2. Audiospuren (Erzählung und Soundeffekte) liegen bereits auf den Szenen.
3. **Export nach CapCut, Adobe Premiere oder Vrew mit einem Klick** — inklusive Timeline, Untertitel und Ken-Burns-Animationen.

## Kurz gesagt

Ein Titel → ein paar Einstellungen → Alles ausführen → exportieren. Entscheiden Sie, *was* Sie machen, und der Story-Modus füllt das *Wie* aus. Um Themen von Anfang an gut zu finden, lesen Sie [wie Sie reichweitenstarke YouTube-Videos benchmarken](/de/blog/story-mode-youtube-benchmark/); eine Schritt-für-Schritt-Referenz finden Sie im [Story-Modus-Leitfaden](https://touchizen.com/guide/de/autoflowcut/story-guide.html).
