---
title: "GitHub verrät die Star-Historie nicht mehr — also zeichnen wir sie selbst auf"
date: "2026-09-09"
excerpt: "Auf der Suche nach Repositories, die in drei Monaten 10.000 Sterne gewonnen haben, stellte sich heraus: Jede API, die das beantworten könnte, ist verschwunden. Der stargazers-Endpunkt liefert 404, und der öffentliche Event-Feed trägt 5% der Star-Events von vor einem Jahr. Die Messwerte — und das kostenlose Werkzeug, das daraus entstand."
tags: ["GitHub", "API", "Entwicklerwerkzeuge", "Open Source"]
author: "Touchizen"
image: "/images/blog/ghstars/ghstars-hero-en.png"
---

## Eine Frage, die einfach aussah

„Gibt es GitHub-Repositories, die in den letzten drei Monaten mehr als 10.000 Sterne bekommen haben?"

Ein Satz. Doch bei der Suche nach der Antwort zeigte sich: Das sind **zwei grundverschiedene Fragen** in einem Mantel. Die eine war in dreißig Sekunden gelöst. Die andere ließ sich überhaupt nicht beantworten.

![GitHub-Star-Tracker — in den letzten drei Monaten erstellte Repositories mit 10.000+ Sternen](/images/blog/ghstars/ghstars-hero-en.png)

## Die einfache Hälfte: neu erstellte Repositories

„In den letzten drei Monaten **erstellte** Repositories mit mindestens 10.000 Sternen" ist eine Zeile GitHub-Suche.

```
created:>2026-06-09 stars:>=10000
```

Heute ergibt das **24 Repositories**. An der Spitze steht `deepseek-ai/deepseek-harness`, erstellt am 13. August und jenseits von 216.000 Sternen. Die Liste besteht überwiegend aus KI-Agenten und -Harnesses.

Ein Detail lohnt hier den Blick. Diese Such-API antwortet **dem Browser direkt, ohne jede Authentifizierung**.

```
HTTP/2 200
access-control-allow-origin: *
x-ratelimit-limit: 10
x-ratelimit-resource: search
```

CORS ist offen, und das Limit von zehn Anfragen pro Minute zählt **pro Besucher-IP**. Stellt man einen Server davor, teilt sich die ganze Website ein Budget von zehn; ruft der Browser direkt auf, bekommt jeder Besucher seine eigenen zehn. Für diese Art von Problem ist kein Backend zu haben keine Abkürzung — es ist der bessere Entwurf.

## Die schwere Hälfte: wie stark ein bestehendes Repository gewachsen ist

Die zweite Lesart ist das Problem. „Repositories, die in den letzten drei Monaten 10.000 Sterne **dazugewonnen** haben, unabhängig vom Erstellungsdatum" — das liefert die Suche nicht. Die GitHub-Suche kennt den heutigen Sternestand und nichts über den Stand vor drei Monaten.

Früher gab es einen Umweg. Mit einem bestimmten Accept-Header lieferte der `stargazers`-Endpunkt zu jedem Stern einen Zeitstempel, und eine binäre Suche rückwärts von der letzten Seite fand die Grenze jedes gewünschten Zeitfensters.

So sieht diese Anfrage heute aus.

```
GET /repos/facebook/react/stargazers
Accept: application/vnd.github.star+json

HTTP/2 404
```

Das ist `facebook/react`. Kein Tippfehler, kein Rechteproblem. Ein paar Nachbarn abgeklopft, und das Muster wird sichtbar.

| Endpunkt | Antwort |
|---|---|
| `/repos/{o}/{r}/stargazers` | **404** |
| `/repos/{o}/{r}/subscribers` | **404** |
| `/repos/{o}/{r}/forks` | 200 |
| `/repos/{o}/{r}/contributors` | 200 |
| `/user/starred` (eigene) | 200, mit `starred_at` |

Forks und Contributors funktionieren, und die eigenen Sterne sind weiterhin lesbar. Verschwunden ist genau die Möglichkeit, **aufzuzählen, wer fremde Repositories mit Sternen oder Watches versehen hat**. Als Datenschutzänderung ergibt das Sinn. Es hat zugleich das Fundament unter jedem Werkzeug entfernt, das Star-Historie berechnet hat.

## Auch der zweite Weg ist ausgetrocknet

Der nächste Kandidat ist der öffentliche Event-Feed. Im öffentlichen Event-Stream von GitHub ist ein `WatchEvent` ein Stern, und GH Archive speichert diesen Strom stundenweise. Die meisten Dienste, die nach jüngstem Wachstum sortierten, bauten darauf auf.

Wir haben dieselbe Tagesstunde aus drei Jahren heruntergeladen und gezählt.

| Datum | Alle Events | WatchEvent (Sterne) |
|---|---|---|
| 2025-06-09 | 137.566 | **4.394** |
| 2026-06-09 | 156.305 | **730** |
| 2026-09-08 | 83.301 | **213** |

Innerhalb eines Jahres auf fünf Prozent, inzwischen unter ein Prozent. Aufschlussreich ist, dass das Gesamtvolumen nicht eingebrochen ist — nur die Star-Events.

OSSInsight, das genau aus diesen Daten Ranglisten baute, antwortet heute so:

```json
{
  "status": "unavailable",
  "unavailable_since": "2026-03-01",
  "reason": "our capture of those events fell to roughly 0.3% of baseline,
             so the ordering would be noise"
}
```

## Das Fazit: die Vergangenheit gibt niemand zurück

Also: **Star-Wachstum über einen vergangenen Zeitraum lässt sich mit keiner heute verfügbaren Methode nachträglich ermitteln.** Genau eine Möglichkeit bleibt — selbst damit anfangen, es aufzuzeichnen.

Und diese Möglichkeit hat eine ungewöhnliche Eigenschaft: Aufschub kostet dauerhaft. Einen Tag gewartet heißt, die Historie beginnt einen Tag später, und die übersprungenen Tage lassen sich nie nachtragen.

Also haben wir es gebaut.

## [GitHub-Star-Tracker](/de/ghstars/)

Kostenlos, ohne Anmeldung, ohne Konto, ohne Token.

**Der Tab „Neue Repositories" ist live.** Zeitraum wählen (1, 3, 6 oder 12 Monate), Sterne-Untergrenze wählen, Knopf drücken — und der Browser ruft die GitHub-Such-API selbst auf. Dieselbe Frage ein zweites Mal beantwortet ein Zehn-Minuten-Cache, sodass wiederholtes Drücken das eigene Limit nie aufbraucht.

**Der Tab „Am schnellsten wachsend"** rechnet aus Snapshots, die einmal täglich entstehen. Rund 1.900 Repositories — junge (innerhalb eines Jahres erstellt, 1.000+ Sterne) und etablierte (20.000+ Sterne) — werden täglich erfasst, und daraus entstehen die Ranglisten für 7, 30 und 90 Tage.

## Zwei Anmerkungen zum Entwurf

**Ehrliche Zeitfenster.** Die Erhebung begann heute, morgen gibt es also einen Tag Historie und nächste Woche eine Woche. Würde der Tab „Letzte 90 Tage" aus neun Tagen Daten eine Rangliste bauen und sie als 90-Tage-Ergebnis ausgeben, wäre das gelogen. Deshalb trägt jedes Fenster mit sich, auf wie vielen Tagen es tatsächlich ruht, und sagt es auf dem Bildschirm, wenn es zu kurz greift. Ein Repository, das mitten im Zeitraum in die Erhebung kam, wird ebenfalls markiert: sein Zuwachs ist eine Obergrenze, keine Messung.

**Daten getrennt vom Deployment.** Der Collector läuft täglich in GitHub Actions und committet seine Ergebnisse ins Repository. Ein Commit mit dem Standard-Token von Actions löst aber keine anderen Workflows aus — ein Daten-Commit hätte die Website also nie neu gebaut.

Statt diese Einschränkung zu umgehen, haben wir sie genutzt. Die Seite liest ihre Daten direkt von **raw.githubusercontent.com** statt von der ausgelieferten Website. CORS ist dort offen und der Cache beträgt fünf Minuten, ein Collector-Commit ist also binnen fünf Minuten live und braucht keinen Rebuild. Datenpipeline und Website-Deployment lösen sich vollständig voneinander, und es gibt keinen Grund mehr, die Website täglich neu zu bauen.

## Der aktuelle Stand

Der erste Snapshot — 1.913 Repositories, 60 KB — ist heute gelandet. Deshalb ist der Wachstums-Tab heute leer: Es gibt noch nichts zum Vergleichen. Der zweite Snapshot morgen öffnet das 7-Tage-Fenster, das 90-Tage-Fenster füllt sich im Dezember.

**[Jetzt ausprobieren →](/de/ghstars/)**
