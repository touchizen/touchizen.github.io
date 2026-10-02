---
title: "Gemini 4 Argon im Überblick: Ein Monster, das die KI-Landschaft aufmischt"
date: "2026-10-02"
excerpt: "Google hat mit Gemini 4 Argon sein erstes neues Flaggschiff seit fast einem Jahr vorgestellt. Laut Google schlägt es GPT-6 Astra und Claude Fable 5.1 – zum Einführungspreis von einem Fünftel von Astra. Doch per App oder API gibt es noch keinen Zugang; zuerst bekommen es Sicherheitsteams. Warum, was unabhängige Messungen sagen und was es wirklich kostet."
tags: ["Gemini 4 Argon", "Google", "GPT-6 Astra", "LMArena"]
author: "Touchizen"
image: "/images/blog/gemini-4-argon/argon-hero.jpg"
---

## Besser als Astra und Fable – und wir können es nicht nutzen

Am 30. September 2026 (US-Zeit) hat Google **Gemini 4 Argon** veröffentlicht. Nach Googles eigener Darstellung schlägt es OpenAIs Spitzenmodell **GPT-6 Astra** und Anthropics Spitzenmodell **Claude Fable 5.1**: Platz 1 in 13 der 18 von Google veröffentlichten Benchmarks, zum Einführungspreis von **einem Fünftel** des Astra-Preises.

Nutzen können wir es aber **weder per App noch per API**. Offiziell zuerst bekommen es Sicherheitsteams, die Hackerangriffe abwehren – und zwar ohne die Cyber-Schutzmechanismen. Warum gibt Google ein so starkes Modell zuerst ihnen und nicht uns? Darum geht es in diesem Beitrag.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:2rem 0">
<iframe src="https://www.youtube.com/embed/l2palIQRHqc" title="Gemini 4 Argon im Überblick: Ein Monster, das die KI-Landschaft aufmischt (Koreanisch)" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
</div>

> Das Video ist auf Koreanisch. Die Bilder unten sind Standbilder daraus. Alle Preise in US-Dollar.

![Die Seiten zu OpenAI GPT-6 Astra und Anthropic Claude Fable 5.1, darunter „??? hat gewonnen – laut Google“](/images/blog/gemini-4-argon/argon-rivals.jpg)

![Platz 1 in 13 von 18 Google-Benchmarks – 12 allein, 1 geteilt](/images/blog/gemini-4-argon/argon-scores.jpg)

## Nicht nur Googles Tabelle: LMArena

**LMArena** stellt zwei KIs dieselbe Frage, verbirgt ihre Namen und lässt Menschen abstimmen, welche Antwort besser ist. Auch dort landete Argon in der **Text Arena auf Platz 1 mit 1.525 Punkten** – beim **Website-Bauen (Code Arena: WebDev) aber nur auf Platz 8 mit 1.679 Punkten**, wo GPT-6.1 Sol Platz 3 belegte (1.759). Kein Alleskönner also.

![LMArena – Platz 1 in der Text Arena (1525), Platz 8 bei WebDev (1679)](/images/blog/gemini-4-argon/argon-arena.jpg)

## Googles Jahr der Lücke

![Googles Lücke – Gemini 3 im Nov. 2025, 3.1 Pro im Feb., „nächstes großes Modell im Juni“ auf der I/O im Mai, kein 3.5 Pro, DeepMind-Führungswechsel im Aug., Argon am 30.9.](/images/blog/gemini-4-argon/argon-gap.jpg)

- **November 2025** – Nach Gemini 3 brachte Google kein neues Flaggschiff der nächsten Generation.
- **Mai 2026** – CEO Sundar Pichai kündigte das nächste große Modell für Juni an. Das als Gemini 3.5 Pro erwartete Modell erschien nie.
- In der Zwischenzeit brachte OpenAI GPT-6 Astra (3.9.), Anthropic Fable 5.1 und Opus 5.5 (22.9.), und Google vor allem günstige, schnelle Flash-Modelle.
- **August** – Bei DeepMind wechselte die Führung.
- **30. September** – Einen Tag nach OpenAIs DevDay kam endlich Argon.

## Bei Google arbeitet es schon

Argon ist bei Google intern bereits im Einsatz und wird von Tausenden Mitarbeitenden genutzt. Googles Beispiele sind konkret:

![Bei Google – über 300 TiB Rechenzentrumsspeicher, Rust 2,7-mal schneller, Quanten-Ressourcen −40 %](/images/blog/gemini-4-argon/argon-inside.jpg)

- **Speicher im Rechenzentrum** – Argon-Agenten analysierten Leistungsdaten der Server, fanden und setzten Optimierungen selbst um und machten **über 300 TiB Speicher** frei (geschätzt 500 TiB bis 1 PiB Einsparung insgesamt).
- **Alter Code nach Rust** – In der Rust-Portierung des Videodecoders libgav1 wurden 32.000 Zeilen SIMD-Code ersetzt; das Ergebnis ist **2,7-mal schneller** bei identischer Ausgabe (aber noch langsamer als der optimierte C++-Code). Derzeit wird auch der über 800.000 Zeilen große Fuchsia-Zircon-Kernel portiert.
- **Quantencomputing** – In einem Beispiel senkte Argon den Ressourcenbedarf in wenigen Minuten um **40 %** unter den veröffentlichten Bestwert.
- Die maximale **Ausgabe** pro Antwort stieg von 64K auf **1M Tokens** (Ausgabe, nicht Eingabe) – lange Aufgaben sollen am Stück fertig werden.

All das sind **Beispiele, die Google selbst berichtet**.

## Büroarbeit vor Coding

Interessant: Ganz oben in Googles Tabelle steht nicht Coding, sondern Wissensarbeit.

| Benchmark | Gemini 4 Argon | Vergleich |
|---|---|---|
| Zapier AutomationBench (Geschäftsautomatisierung) | **51,3 %** · Platz 1 | – |
| Harvey: juristische Recherche und Entwürfe | **19,6 %** | Astra 5,4 %, Opus 5.5 3,8 % |
| DeepSWE (lange Softwareaufgaben) | **77,9 %** | Opus 74,2 %, Astra 74,1 % |

Insgesamt Platz 1 in 13 von 18, für 2 $ Eingabe / 10 $ Ausgabe pro Million Tokens – zum Einführungspreis ein Fünftel von Astra (10 $ / 50 $). Allein danach klingt „hat alle plattgemacht“ verständlich.

## Warum zuerst die Verteidiger?

Die Antwort liegt in der Stärke, mit der Google wirbt: **Sicherheitslücken in Software finden**. Laut Google findet Argon Lücken selbstständig, prüft, ob sie echt sind, und behebt sie (im extern vergleichbaren CWE-bench v1 liegt es mit 68 % gleichauf mit GPT-6 Astra und Grok 4.7).

- **Wiz**, die von Google übernommene Sicherheitsfirma, fand damit eine kritische Lücke in Medizinsoftware, die Krankenhäuser weltweit nutzen, über die sensible persönliche Daten nach außen gelangen konnten – eine Lücke, die frühere Spitzenmodelle übersehen hatten.
- Das Problem: In den Händen von Angreifern ist dieselbe Fähigkeit genauso stark. Google schreibt auf der Fairwind-Seite selbst: *„in the wrong hands, the same capabilities can become an equally powerful threat.“*
- Deshalb **bekommen zuerst die Verteidiger Zugang** – Regierungen, Gesundheitsversorger, Telekommunikationsanbieter. Nur ausgewählte, geprüfte Partner, nur innerhalb ihrer Sicherheitsteams, mit protokollierter Nutzung.
- Im Gegenzug sind bei ihnen die Cyber-Ablehnungen abgeschaltet, damit sie die volle Abwehrfähigkeit nutzen können.
- Warum wir noch warten, hat Google auch gesagt: Zuerst sollen die **Schutzmechanismen ausgebaut** werden – Missbrauch blockieren, auf grenzüberschreitendes Verhalten der KI achten –, bevor es breit verfügbar wird.

Das Timing ist bemerkenswert:

![Dieselbe Woche – 28.9. (Mo.) OpenAI stoppt GPT-6.1 Astra, 29.9. (Di.) KI-Sicherheitszusage im Weißen Haus, 30.9. (Mi.) Gemini 4 Argon](/images/blog/gemini-4-argon/argon-week.jpg)

- **28.9. (Mo.)** – OpenAI stoppte den Start von GPT-6.1 Astra nach Sicherheitstests: Das Modell überschritt seinen Auftrag und berichtete ungenau über die eigene Arbeit.
- **29.9. (Di.)** – Sundar Pichai unterzeichnete im Weißen Haus eine freiwillige Vereinbarung zur KI-Sicherheit.
- **30.9. (Mi.)** – Argon erschien, und Google nimmt am Vorabtest-Verfahren der US-Regierung teil.

## Jenseits von Googles Tabelle: unabhängige Messungen

Ist Googles Platz 1 echt? In Googles eigener Tabelle **verliert Argon 5 Benchmarks**: Bei FrontierSWE liegt Astra über 10 Punkte vorn (65,5 % zu 55,0 %), bei Terminal-bench 4.0 Opus 5.5 um 9 Punkte (66,4 % zu 57,4 %).

Und den DeepSWE-Wert, bei dem Argon vorn lag, hat **Google selbst gemessen**; die Werte der Konkurrenz stammen aus öffentlichen Ranglisten oder deren eigenen Angaben. In **9 der 18** Benchmarks ist Argons Wert Googles eigene Messung.

Deshalb zählen unabhängige Messungen – und **Artificial Analysis** hat schon getestet:

![Artificial Analysis Intelligence Index – Opus 5.5 58, Sonnet 5.5 56, Fable 5.1 53, Astra 53, Argon 53, GPT-6.1 Sol 52](/images/blog/gemini-4-argon/argon-thirdparty.jpg)

- **Indexwert 53** – gleichauf mit Astra. Opus 5.5 kommt aber auf 58: Das Modell, das Argon in Googles Tabelle meist schlug, liegt hier 5 Punkte vorn. Sonnet 5.5, das in Googles Tabelle fehlt, erreicht 56.
- Eine Zahl sticht heraus: Bei Fragen, die es nicht beantworten kann, **erfindet Argon in 15 %** der Fälle etwas, Astra in **51 %**. Richtig liegt es seltener (50 % gegenüber 63 % bei Astra), sagt aber eher, wenn es etwas nicht weiß.
- Bloomberg berichtete, dass einige Google-Mitarbeitende zweifeln – stark in Tests, schwächer bei echter Programmierarbeit. Google nannte das unzutreffend.

## Die Rechnung nach dem Rabatt

- 2 $ / 10 $ ist ein **Einführungspreis**. Danach verdoppelt er sich auf **4 $ / 20 $** – genau der Preis von Opus 5.5. Wann der Rabatt endet, sagt Google nicht (Artificial Analysis: „mindestens einen Monat“).
- Argon denkt außerdem lange nach: **62.000 Ausgabe-Tokens** pro Aufgabe, mehr als doppelt so viele wie Astra (27.000).
- Laut Artificial Analysis kostet eine Aufgabe deshalb jetzt **1,99 $** – 60 % von Astras 3,26 $ –, nach dem Rabatt aber **3,98 $**, also rund **20 % mehr** als Astra.

![Kosten pro Aufgabe zum Listenpreis – Argon 3,98 $, Astra 3,26 $](/images/blog/gemini-4-argon/argon-bill.jpg)

Ein Tokenpreis von einem Fünftel heißt nicht, dass die Aufgabe nur ein Fünftel kostet.

## So nutzt du es, sobald es verfügbar ist

Nach den bisherigen Ergebnissen (die Empfehlungen sind meine):

![So nutzt du es – was Argon bekommt und was andere Modelle](/images/blog/gemini-4-argon/argon-howto.jpg)

| Aufgabe | Wahl | Warum |
|---|---|---|
| Fragen beantworten · nach Anweisung schreiben | **Argon** | LMArena Text Platz 1 (auch Platz 1 bei Coding, Hard Prompts, Instruction Following, Longer Query, Creative Writing) |
| Lange Recherchen | **Argon** | Arena Longer Query Platz 1, erfindet in 15 % (aber geringere Trefferquote als Astra) |
| Lange Videos verstehen | **Argon** | LVBench 91,7 %, Platz 1 in Googles Tabelle (Googles eigene Messung) |
| Websites bauen | **GPT-6.1 Sol** | Arena WebDev Platz 3 (Argon Platz 8), gleicher Einführungspreis pro Token |
| Coden im Terminal | **Opus 5.5** | 9 Punkte vorn bei Terminal-bench 4.0 |

So lässt sich sparen:

- Wer dasselbe Material wiederholt schickt, bekommt **95 % Rabatt auf gecachte Eingaben** – 10 Cent pro Million Tokens zum Einführungspreis.
- Solange der Rabatt gilt: **die Kosten mit den eigenen Aufgaben messen.**
- Weil das Modell viele Tokens verbraucht, sollte man **Kosten pro Aufgabe statt Preis pro Token** vergleichen.

## Also warum? Meine Lesart

Ab hier ist es meine Interpretation. Ich sehe zwei Gründe, warum Google sein stärkstes Modell zuerst den Verteidigern gab:

1. Die zentrale Waffe ist das **Finden von Lücken** – also mussten Verteidiger sie vor Angreifern bekommen.
2. Genau in der Woche, in der OpenAI ein Modell aus Sicherheitsgründen stoppte, wollte Google als **das Unternehmen dastehen, das starke Modelle sicher veröffentlicht**.

![Also warum? – im unabhängigen Index Astra 53 = Argon 53: aufgeholt, nicht plattgemacht](/images/blog/gemini-4-argon/argon-verdict.jpg)

Google ist zurück – im unabhängigen Index gleichauf mit Astra. Aber es ist eher **„aufgeholt“** als „alle plattgemacht“.

Die breite Freigabe beginnt mit **zahlenden API-Kunden und Google-AI-Ultra-Abonnenten**, ein Datum gibt es noch nicht. Was würdest du Argon als Erstes machen lassen? Schreib es in die Kommentare zum Video.

## Zum Video

Die Sprecherstimme ist ein KI-Klon meiner eigenen Stimme. Die im Video gezeigten Originalseiten werden zur Erläuterung zitiert; die gelben Markierungen stammen von mir. Der Roboter im Vorschaubild wurde mit KI erstellt.

## Quellen

Geprüft am 1. und 2. Oktober 2026; Zahlen können sich ändern. Daten nach US-Zeit.

- [Google – Ankündigung von Gemini 4 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/)
- [Google DeepMind – Benchmark-Tabelle](https://deepmind.google/models/gemini/) · [Bewertungsmethodik (PDF)](https://deepmind.google/models/evals-methodology/gemini-4-argon) · [Fairwind-Programm](https://deepmind.google/fairwind-program/)
- [LMArena – Text- und WebDev-Rangliste (X)](https://x.com/arena/status/2105394855644139908) · [GPT-6.1 Sol WebDev (X)](https://x.com/arena/status/2105367591174995999)
- [OpenAI – GPT-6 Astra](https://openai.com/index/gpt-6-astra/) · [Anthropic – Claude Fable 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1)
- [Artificial Analysis – Gemini 4 Argon](https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs)
- [VentureBeat](https://venturebeat.com/technology/google-unveils-gemini-4-argon-retaking-benchmark-lead-over-openai-and-anthropic-but-in-limited-release) · [9to5Google (Listenpreis)](https://9to5google.com/2026/09/30/gemini-4-argon-announcement/)
- [CNBC](https://www.cnbc.com/2026/09/30/google-gemini-4-argon-ai.html) · [CNBC – KI-Vereinbarung im Weißen Haus (29.9.)](https://www.cnbc.com/2026/09/29/tech-white-house-ai-lunch-trump.html)
- [The Verge](https://www.theverge.com/tech/1002980/google-gemini-4-argon) · [Axios](https://www.axios.com/2026/09/30/google-gemini-4)
- [The Next Web – GPT-6.1 Astra gestoppt](https://thenextweb.com/news/openai-cancels-launch-of-gpt-6-1-astra) · [The Next Web – Googles Widerspruch](https://thenextweb.com/news/google-gemini-4-argon-cyber-defenders-fairwind)
- [Bloomberg – Zweifel unter Mitarbeitenden](https://www.bloomberg.com/news/articles/2026-09-30/google-grapples-with-employee-skepticism-about-new-gemini-model)
- [Google Cloud – Übernahme von Wiz abgeschlossen](https://www.googlecloudpresscorner.com/2026-03-11-Google-Completes-Acquisition-of-Wiz)
- [Hacker-News-Diskussion](https://news.ycombinator.com/item?id=49913571) · [GeekNews](https://news.hada.io/topic?id=34563)
