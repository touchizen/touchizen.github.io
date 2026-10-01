---
title: "Astra-Niveau zum Fünftel des Preises … dafür wird Pro 200 halbiert – GPT-6.1 Sol erklärt"
date: "2026-10-01"
excerpt: "Eine Woche nach GPT-6 Sol hat OpenAI GPT-6.1 Sol nachgelegt. Zum Fünftel des Preises schlägt es Astra in einem Coding-Benchmark – und am selben Tag wurde das Nutzungskontingent von ChatGPT Pro 200 halbiert. Was Keynote und offizielle Diagramme zeigen."
tags: ["GPT-6.1 Sol", "GPT-6 Astra", "OpenAI", "ChatGPT Pro"]
author: "Touchizen"
image: "/images/blog/gpt-6-1-sol/gpt61-hero.jpg"
---

## Das kleinere Modell, das Astra schlägt – zum Fünftel des Preises

Auf dem OpenAI DevDay am 29. September 2026 hat OpenAI **GPT-6.1 Sol** vorgestellt. In einem Coding-Benchmark liegt es vor dem Spitzenmodell **GPT-6 Astra**, kostet aber nur **ein Fünftel**. Merkwürdig ist nur: Das Mittelklassemodell GPT-6 Sol war **genau eine Woche** vorher erschienen. Warum schon wieder ein neues Modell? Wer der Antwort folgt, stößt auch auf Nutzer, die dabei verlieren.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:2rem 0">
<iframe src="https://www.youtube.com/embed/AjCYxDrX8sw" title="GPT-6.1 Sol erklärt – Astra-Niveau und das neue Pro-200-Kontingent (Koreanisch)" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
</div>

> Das Video ist auf Koreanisch. Die Bilder unten sind Standbilder daraus. Alle Preise in US-Dollar; ChatGPT-Abopreise gelten für die USA und können in Europa abweichen.

## Der Anfang: Astra verkaufte sich zu gut

![September-Zeitleiste – 9/3 Astra-Start, 9/8 „noch nie solche Nachfrage“, 9/10 Pro-$200-Neuanmeldungen gestoppt, 9/22 Sol und Luna, 9/29 DevDay](/images/blog/gpt-6-1-sol/gpt61-timeline.jpg)

- **3. September** – OpenAIs Spitzenmodell **GPT-6 Astra** erscheint: 10 $ Input / 50 $ Output pro Million Tokens. Teuer – und trotzdem wollten es alle.
- **8. September** – Keine Woche später schrieb jemand bei OpenAI, man habe noch nie eine solche Nachfrage gesehen.
- **10. September** – OpenAI **stoppt Neuanmeldungen für den Pro-Tarif zu 200 $/Monat**, weil er „die Systeme am stärksten belastet“. Es war der Tarif mit dem größten Nutzungskontingent.
- **22. September** – Das Mittelklassemodell **GPT-6 Sol** und das kleine **GPT-6 Luna** erscheinen.
- **29. September** – Genau eine Woche später, DevDay. Auf der Bühne sagte OpenAI: *„Die Leute wünschen sich immer wieder zwei Dinge: Macht es billiger, und macht es schneller.“*

## Antwort eins: schneller – Ultrafast

**Astra Ultrafast** lässt Astra im Hochgeschwindigkeitsmodus laufen: **bis zu 8-mal** schnellere Token-Erzeugung, zum **6-fachen** des Standardpreises.

OpenAI zeigte eine Aufzeichnung, in der beide Modelle denselben Auftrag bekamen (eine weiße Rakete bauen und starten). Links war die Rakete von Ultrafast schon abgehoben, rechts baute das Standardmodell noch. In der Live-Demo streikte die Spracheingabe, doch per getipptem Prompt stand die App trotzdem nach **gut 20 Sekunden**.

Wichtig: **8-mal bezieht sich auf die Token-Erzeugung**. Auch OpenAIs Dokumentation sagt, dass der Vergleich nicht die Gesamtdauer einer Aufgabe misst – eine Aufgabe mit Tests ist nicht in einem Achtel der Zeit fertig. Und kostenlos ist das Tempo nicht; dazu weiter unten mehr.

## Antwort zwei: billiger – GPT-6.1 Sol

Die eigentliche Hauptfigur. Auf der Bühne hieß es: „Intelligenz sehr nahe an Astra, zu einem Fünftel des Preises.“

| Modell | Input (pro 1 Mio. Tokens) | Output (pro 1 Mio. Tokens) |
|---|---|---|
| GPT-6 Astra | 10 $ | 50 $ |
| **GPT-6.1 Sol** | **2 $** | **10 $** |

![Coding-Benchmark DeepSWE – 6.1 Sol bestes Ergebnis 75,2 %, Astra bestes Ergebnis 74,1 %](/images/blog/gpt-6-1-sol/gpt61-deepswe.jpg)

Ich habe die Rohwerte aus OpenAIs Diagrammen zur Vorstellung ausgelesen.

- **DeepSWE (Coding)**: bestes Ergebnis von 6.1 Sol **75,2 %** (High), von Astra **74,1 %** (Xhigh). Die Ankündigung spricht nur von „gleichauf“ („matches“), in Zahlen liegt das kleinere Modell aber **1,1 Punkte** vorn. Auf der Bühne fiel sogar der Satz, es sei „in mancher Hinsicht klüger als Astra“.
- **Kosten pro Aufgabe**: 65 Cent gegenüber 4,43 $ – etwa **ein Siebtel** von Astra.
- **Computerbedienung (OSWorld 2.0, höchste Stufe)**: Astra 73,5 %, 6.1 Sol 71,4 % – **2,1 Punkte** Abstand.

Ein Punkt Unterschied kann natürlich Rauschen sein. Bis hierhin stimmt aber: „billig und fast gleich gut“. Übrigens: Für Astra gibt es offizielle Beispiel-Apps von OpenAI (ein Weltraum-Erkundungsspiel, eine 3D-Zelle, ein Tiefsee-Ökosystem), für 6.1 Sol gab es Stand 30. September noch keine.

## Wo es nicht reicht

![Wo 6.1 Sol nicht vorbeikommt – Wissenschaft: Astra vorn, Arbeitsautomatisierung: Opus 5.5 vorn, unabhängiger Index: Fable 5.1 vor 6.1 Sol](/images/blog/gpt-6-1-sol/gpt61-limits.jpg)

- **Wissenschaftliche Forschung** (Terminal-Bench Science): Astra **68,1 %**, 6.1 Sol **57,0 %** – 11 Punkte Abstand. OpenAI selbst empfiehlt Astra für die schwierigsten Forschungsaufgaben.
- **Arbeitsautomatisierung** (AutomationBench, höchste Stufe): Platz eins geht an Anthropics **Opus 5.5** (42,5 %, mit Fallbacks) – auf OpenAIs eigenem Diagramm.
- **Unabhängiger Gesamtindex** (Artificial Analysis Intelligence Index v4.3.2): Anthropics Spitzenmodell **Fable 5.1 erreicht 53,4**, Astra 52,7, **6.1 Sol 51,8**. Dafür kostet 6.1 Sol pro Aufgabe weniger als ein Zehntel von Fable (0,72 $ gegenüber 7,63 $).
- **Sonnet 5.5** hat dieselben Input-/Output-Preise wie 6.1 Sol und kommt auf 56,0 – verbraucht aber so viele Tokens, dass eine Aufgabe 7,60 $ kostet.

Kurz: **billig und fast gleich gut – aber eben nur bis hierhin**.

## Das Geheimnis des niedrigen Preises? Drinnen steckt Astra

Wie wird ein Modell in einer Woche Astra-ähnlich? Die API-Dokumentation liefert Hinweise.

![API-Modellinfos – Wissensstand: 6 Sol 2026-04-20, 6.1 Sol 2026-04-30, Astra 2026-04-30; 'none'-Modus nur bei 6 Sol](/images/blog/gpt-6-1-sol/gpt61-identity.jpg)

| | GPT-6 Sol | GPT-6.1 Sol | GPT-6 Astra |
|---|---|---|---|
| Wissensstand | 2026-04-20 | **2026-04-30** | **2026-04-30** |
| 'none'-Modus (antwortet ohne Nachdenken) | Ja | **Nein** | **Nein** |

Es heißt Sol, aber Trainingsstand und Verhalten gleichen Astra. Auf Hacker News schrieb jemand, in Dateien sei einige Tage zuvor ein Modell namens „Astra-Minor“ aufgetaucht, und das sei wohl 6.1 Sol. **Das ist Spekulation, OpenAI hat es nicht bestätigt.** Andere sehen darin ein Sol, das durch weiteres Training besser wurde.

Meine Deutung: So passt es zusammen. Wenn OpenAI die Astra-Nachfrage kaum bewältigen konnte – warum nicht ein kleines Astra zum günstigen Preis herausbringen?

## Der Preis dafür: Pro 200 wird halbiert

Auf derselben Bühne gab es noch eine Ankündigung: **Pro 200 nimmt wieder Neuanmeldungen an.** So weit die gute Nachricht. Etwas anderes wurde auf der Bühne aber nicht gesagt.

![ChatGPT-Tarife – Pro 200 sinkt vom 20-fachen auf das 10-fache von Plus](/images/blog/gpt-6-1-sol/gpt61-pro200.jpg)

| ChatGPT-Tarif | Monatspreis (USA) | Work-/Codex-Kontingent (Plus = 1×) |
|---|---|---|
| Plus | 20 $ | 1× |
| Pro 100 | 100 $ | 5× |
| **Pro 200** | **200 $** | **20× → 10×** |
| Pro 500 (neu) | 500 $ | 25× + Ultrafast |

- Das Kontingent von Pro 200 sinkt **vom 20-fachen auf das 10-fache von Plus** – bei gleichem Preis, also die Hälfte. Bestehende Abonnenten behalten das 20-fache **nur bis zum 29. Oktober**.
- Bestehende Abonnenten erhalten einmalig **Nutzungsguthaben im Wert von 2.500 $** (verfällt zum Jahresende).
- Auf der Bühne hieß es nur, Pro 200 behalte Zugang zu allen Frontier-Modellen, und 6.1 Sol sei „ein Modell nahe an Astra-Qualität, das man viel als Daily Driver nutzen kann“. Im Klartext: **ein günstigeres Modell, dafür weniger Kontingent**.
- OpenAIs Begründung: Die Änderung spiegle die „zunehmend effizienten Modelle“ wider – man schaffe trotzdem mehr als noch vor einem Monat.

Dafür kommt **Pro 500** für 500 $ im Monat: das 25-fache von Plus, dazu Ultrafast. Allerdings **verbraucht Ultrafast das Kontingent achtmal so schnell**. Wer nur Ultrafast nutzt, kommt nach meiner Rechnung (25 ÷ 8) auf **gut das 3-fache von Plus**.

**Das Kontingent pro Dollar ist jetzt in allen Tarifen gleich** (das alte Pro 200 bot doppelt so viel pro Dollar) – der Mengenrabatt ist weg. Und die Ultrafast-Version von 6.1 Sol kommt erst „bald“: Die englische Ankündigung sagt „in den kommenden Tagen“ („In the coming days“), die koreanische dagegen, sie erscheine gleichzeitig.

## Warum also nach einer Woche – und welches Modell nehmen?

Meine Lesart: **Astra hat sich zu gut verkauft**, und OpenAI will die Leute vom teuren Astra zum günstigen 6.1 Sol bewegen. OpenAI hat diesen Zusammenhang selbst nie hergestellt – bitte diesen Teil als meine Deutung lesen.

![Welches Modell wofür – Coding 6.1 Sol, schwierige Wissenschaft Astra, einfache Massenarbeit Luna, API-Agenten Cache 0,10 $](/images/blog/gpt-6-1-sol/gpt61-verdict.jpg)

| Einsatz | Empfehlung |
|---|---|
| Coding | **GPT-6.1 Sol** – mit **High** anfangen, nicht mit Max. Im Coding-Diagramm kostete Max 2,4-mal so viel und schnitt sogar schlechter ab (75,2 % > 71,9 %) |
| Wirklich schwierige Wissenschaft, genaue Analysen | **GPT-6 Astra** – vorn im Forschungs-Benchmark |
| Einfache Aufgaben in großer Menge | **GPT-6 Luna** – 0,10 $ / 0,50 $ pro Million Tokens |
| Agenten und API | Auf den Cache-Preis achten: **0,10 $** pro Million Tokens bei 6.1 Sol, halb so viel wie beim Sol der Vorwoche (0,20 $) |

- 6.1 Sol gibt es **noch nicht im normalen Chat**, sondern in ChatGPT Work, Codex und der API.
- **Mit Pro 200 unterwegs? Vor dem 29. Oktober** das eigene Kontingent prüfen.

Der kleine Bruder, der die Punktzahl des großen übertrifft, zum Fünftel des Preises – und bei näherem Hinsehen dem großen zum Verwechseln ähnlich. Mit welchem Modell arbeitet ihr gerade? Schreibt es in die Kommentare unter dem Video.

## So ist das Video entstanden

Ganz am Ende des Videos (6:24) zeige ich die **ursprüngliche erste Anfrage** im Wortlaut, dazu die späteren Änderungswünsche. Recherche, Skript, Grafiken und Sprecherstimme sind aus diesen wenigen Zeilen entstanden. Die Sprecherstimme ist ein KI-Klon meiner eigenen Stimme (Keynote-Originalton ausgenommen).

## Quellen

Stand 29.–30. September 2026; Zahlen können sich ändern. Datumsangaben nach US-Zeit.

- [OpenAI – Introducing GPT-6.1 Sol](https://openai.com/index/introducing-gpt-6-1-sol/) · [koreanische Fassung](https://openai.com/ko-KR/index/introducing-gpt-6-1-sol/)
- [OpenAI – GPT-6 Astra](https://openai.com/index/gpt-6-astra/)
- [OpenAI DevDay 2026 Keynote (YouTube)](https://www.youtube.com/watch?v=Fls_onRviPM) · [DevDay 2026 Recap](https://openai.com/index/devday-2026-recap/)
- [API-Modelldokumentation – gpt-6.1-sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol)
- [ChatGPT-Doku – Geschwindigkeit (Ultrafast)](https://learn.chatgpt.com/docs/agent-configuration/speed) · [Preise](https://learn.chatgpt.com/docs/pricing)
- [OpenAI-Hilfe – ChatGPT-Pro-Tarife](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)
- [TechCrunch – Pro-Neuanmeldungen gestoppt (10.9.)](https://techcrunch.com/2026/09/10/openai-puts-pro-subscriptions-on-hold-due-to-astra-demand/)
- [Engadget – Änderungen an den Pro-Tarifen](https://www.engadget.com/2272106/openai-adds-dollar500-pro-subscription-nerfs-its-existing-dollar200-tier/)
- [The Next Web – Guthaben für Pro 200](https://thenextweb.com/news/openai-devday-pro-200-usage-cut-pro-500-plan)
- [nerdschalk – Pro-Tarife im Vergleich](https://nerdschalk.com/chatgpt-pro-100-vs-200-vs-500-prices-usage-limits)
- [VentureBeat – GPT-6 Sol und Luna (22.9.)](https://venturebeat.com/technology/openai-releases-gpt-6-sol-and-luna-models-slashing-api-costs-50-or-more)
- [Artificial Analysis – Analyse zu GPT-6.1 Sol](https://artificialanalysis.ai/articles/gpt-6-1-sol-replaces-gpt-6-sol-after-just-7-days-with-near-astra-intelligence)
- [Anthropic – Claude Fable 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1)
- [Hacker-News-Diskussion](https://news.ycombinator.com/item?id=49896586)
