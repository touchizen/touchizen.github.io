---
title: "Von einem Titel zu 11 Szenen — ein echter Durchlauf"
date: "2026-07-22"
excerpt: "Ein Titel durch Synopsis, Besetzung, Skript, Szenentabelle, Audio und Prompts — der echte Output jedes Schritts aus einem realen Story-Modus-Lauf."
tags: ["AutoFlowCut", "Story-Modus", "Fallstudie", "KI-Video-Automatisierung"]
author: "Touchizen"
image: "/images/blog/story/story-step-prompts-en.png"
---

## Was entstanden ist

> 📌 Die Abbildungen in diesem Beitrag sind **UI-Mockups**, erstellt aus den Daten eines realen Projekts und dem CSS der App. Die Werte darin (Szenen, Segmente, Prompts) sind der tatsächliche Output. Die Oberfläche von AutoFlowCut gibt es auf **Koreanisch und Englisch**, deshalb zeigen sie die englische Oberfläche. Das Projekt selbst lief auf Koreanisch; die hier gezeigten Geschichtstexte sind eine Übersetzung dieses Outputs — Zahlen, Zeiten und Prompts sind unverändert.

Wir haben einen Titel eingetippt — **„Der Reiche und der Arme“** — und den Story-Modus laufen lassen. Ergebnis: eine Folge mit **11 Szenen, 20 Segmenten, 72,53 Sekunden**. Dieser Beitrag zeigt den echten Output jedes Schritts auf dem Weg dorthin.

Das ist alles, was in den Setup-Tab ging:

| Feld | Wert |
|------|------|
| Titel | Der Reiche und der Arme |
| Story-Typ | Bespoke |
| Generierungs-KI | Claude Opus 4.8 · Reasoning medium |
| Ausgabesprache | Koreanisch |
| Skriptlänge | 1 Minute |
| Szenen-Einheit | Szenenbasiert · 5–10 Sek. |
| Prüfschleife | Aus |

Das Skriptfeld blieb leer. Wir starteten also **ohne Thema, ohne Handlung, ohne Besetzung.**

## 2 Synopsis — Logline und Hook kommen zuerst

Bevor eine Zeile Prosa entsteht, steht das Gerüst der Geschichte fest. Das ist die Logline, die herauskam:

> **Logline** — Ein armer alter Mann, der jeden Monat einen Umschlag vom Anwesen eines Reichen erhielt, erfährt erst nach dessen Tod, dass der wahre Absender er selbst war.

> **Hook** — Dreißig Jahre lang lag am Ersten jedes Monats ein unbeschrifteter Umschlag vor der Tür des alten Mannes. Doch an dem Tag, an dem der Reiche starb, kam daraus kein Geld — sondern ein einzelner vergilbter Schuldschein.

Darauf folgt je ein Absatz für Aufbau, Steigerung, Wendung und Auflösung. Die Wendung — der Reiche zahlte eine Schuld zurück — landet in der *Wendung*, und in der *Auflösung* übernimmt der alte Mann diese Rolle. Diese Struktur steht, bevor eine einzige Skriptzeile geschrieben ist.

## Die Besetzung — Geschlecht, Alter, Rolle und Aussehen fix

Der Synopsis-Schritt hat auch vier Figuren festgelegt. Diese Werte werden stromabwärts für **Stimmenbesetzung** und **Bild-Prompts** wiederverwendet.

| Figur | Geschlecht | Alter | Rolle |
|-------|-----------|-------|-------|
| Park | m | 70er | Armer alter Lastenträger, der Protagonist |
| Chairman Yun | m | 70er | Der Reiche auf dem Hügel, der eine alte Schuld zurückzahlt |
| Gatekeeper | m | 40er | Pförtner des Anwesens, der Park abweist |
| Lawyer | m | 50er | Der Anwalt, der Chairman Yuns letzten Willen überbringt |

Jede Figur trägt zusätzlich eine Aussehensbeschreibung. Die von Park lautet `Korean man in his 70s, deeply weathered face, sparse white hair, thin frame, worn padded jacket and cloth cap, quiet dignified sorrow`. Auf dieser Beschreibung bauen die Bild-Prompts auf. Sie wird nicht wörtlich kopiert — jede Szene formt sie um — aber ihre Kernmerkmale wiederholen sich jedes Mal. Kommt ein **generiertes Referenzbild** hinzu, wird es jeder Szene angehängt, und genau das macht ihn durchgehend zur selben Person.

## 3 Skript — Dialoge kommen mit Sprecher

![Story-Modus-Skript-Tab — das generierte Skript mit Sprecherdialog](/images/blog/story/story-step-script-en.png)

Die Prosa kam in der Reihenfolge Hook → Aufbau → Steigerung → Wendung → Auflösung, mit vorangestellten Sprechern beim Dialog:

> **Gatekeeper:** „Der Vorsitzende würde einen Mann wie Sie niemals kennen."
>
> **Chairman Yun:** „Sie haben gegeben, als Sie nichts hatten. Ich konnte erst zurückzahlen, als ich alles hatte."

Diese zwei Zeilen werden im nächsten Schritt zu **eigenen Sprechersegmenten, getrennt von der Erzählung**.

## 4 Szenenaufteilung — 11 Szenen, 20 Segmente

![Story-Modus-Szenenaufteilung — die Tabelle mit 11 Szenen und 20 Segmenten](/images/blog/story/story-step-scenes-en.png)

Aus dem Skript wurde eine Tabelle. Das ist die Verteilung, die tatsächlich herauskam:

- **Sprecher** — 16× narrator, 1× Gatekeeper, 1× Chairman Yun, 2× SFX
- **Emotionen** (in den Szenendaten) — 8× traurig, 7× neutral, 2× wütend, 1× fröhlich. Die Tabelle zeigt nur die Emotionen der beiden Dialogzeilen; Erzähl-Emotionen werden nicht angezeigt
- **Länge** — insgesamt 72,53 Sekunden. Bei der Einstellung szenenbasiert 5–10 Sekunden landeten die einzelnen Szenen zwischen 4,4 und 9,2 Sekunden

Die beiden Soundeffekte wurden von selbst an den entscheidenden Momenten platziert: `heavy iron gate slamming shut` (Szene 5) und `old paper being unfolded` (Szene 7). Niemand hat darum gebeten — sie landeten **auf dem Höhepunkt der Spannung und auf der Wendung.**

Von „Skript fertig" bis „Szenenaufteilung fertig" vergingen **37 Sekunden**.

## 5 Audio — alle 20 Segmente generiert

![Story-Modus-Audio-Tab — Stimmenzuweisung pro Sprecher und Fertigstellung pro Segment](/images/blog/story/story-step-audio-en.png)

- **18 Erzähl- und Dialogsegmente** — mit Typecast generiert. Emotion wird nur auf **Figurendialog** angewendet: Erzählung wird immer als `normal` synthetisiert, auch wenn die Tabelle traurig oder wütend zeigt. In dieser Folge tragen also genau zwei Zeilen Emotion — das `(Angry)` des Gatekeepers und das `(Sad)` von Chairman Yun.
- **2 Soundeffekte** — mit ElevenLabs generiert.
- **Output** — 20 Segment-Audiodateien plus eine zeitlich passende SRT. Jedes Segment trägt Startzeit und Dauer in Millisekunden und legt sich damit direkt auf die Szenen.

Von „Szenenaufteilung fertig" bis „Audio fertig" vergingen **14 Minuten 23 Sekunden** — der längste Abschnitt der Pipeline.

## 6 Prompts — ein Bild-Video-Paar pro Szene

![Story-Modus-Prompts-Tab — Bild- und Video-Prompts pro Szene mit @Mentions](/images/blog/story/story-step-prompts-en.png)

11 Szenen ergaben 11 Bild- und 11 Video-Prompts — 22 insgesamt. Der von Szene 1, wörtlich:

> **Bild** — Cinematic still, 1970s-80s Korean alley at dawn. A plain unmarked white envelope rests on the worn wooden threshold of a humble shanty door, faint frost on the step, peeling paint, a rusted mailbox above. Cold blue-gray morning light, soft mist, shallow depth of field, 35mm film grain, muted desaturated palette, melancholic nostalgic mood.
>
> **Video** — Slow push-in on the unmarked envelope resting at the doorstep as thin dawn mist drifts past and a faint breeze lifts one corner of the paper; distant alley sounds, static composition with a gentle dolly forward, cold nostalgic film-grain grade.

In Szenen mit Figuren wurden **Mentions wie `@Park` und `@{Chairman Yun}` automatisch eingesetzt.** Namen mit Leerzeichen stehen in geschweiften Klammern. Die vier Figuren sind als Referenzkarten registriert, **ihre Bildplätze sind aber noch leer** — in diesem Projekt lief keine Generierung. Sobald das Bild einer Karte existiert, wird es jeder Szene angehängt, die diese Figur erwähnt, und genau das hält dasselbe Gesicht über alle 11 Szenen.

Von „Audio fertig" bis „Prompts fertig" vergingen **53 Sekunden**. **Vom Skript bis zu den Prompts dauerte das Ganze 15 Minuten 53 Sekunden.**

## Ab hier entscheiden Sie

Bis zu den Prompts trägt sich der Story-Modus selbst. Ganz unbeaufsichtigt läuft er aber nicht — **Sie müssen die Besetzung in Schritt 2 bestätigen**, bevor die Folgeschritte freigeschaltet werden, und **der Auto-Schalter für Audio ist standardmäßig aus** (TTS kostet), Sie schalten ihn also ein oder starten den Schritt selbst. Was folgt, ist Geschmackssache:

1. Bilder pro Szene im Stapel generieren — bei Szenen, die nicht gefallen, den Prompt korrigieren und nur diese neu generieren.
2. T2V/I2V-Video nur für Szenen generieren, die Bewegung brauchen.
3. **Export nach CapCut, Adobe Premiere oder Vrew mit einem Klick** — Audiospuren und SRT liegen bereits passend auf den Szenen, die Timeline öffnet sich also fertig im Editor.

> 📌 Dieses Projekt wurde bis zum Prompt-Schritt ausgeführt. Die Bildgenerierung lief noch nicht, daher werden keine finalen Frames gezeigt.

## Kurz gesagt

Aus einem Titel entstanden **Synopsis → 4 Figuren → Skript → 11 Szenen → 20 Audiosegmente → 22 Prompts**. Die menschliche Arbeit bestand darin, eine Handvoll Einstellungen zu wählen, die Besetzung zu bestätigen und den Audio-Schritt zu starten.

Um denselben Ablauf auszuprobieren, siehe [wie Sie mit einem einzigen Titel starten](/de/blog/story-mode-title-to-video/). Schon ein Skript? Siehe [Skript einfügen](/de/blog/story-mode-script-to-video/). Zuerst das Thema mit Daten festzurren? Siehe [YouTube-Benchmarking](/de/blog/story-mode-youtube-benchmark/).
