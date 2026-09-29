---
title: "구글 AI에 내 목소리 넣었다가 큰일 났습니다 — Gemini 3.8 TTS 음성 복제 실험"
date: "2026-09-29"
excerpt: "21초 녹음을 넣었더니 7초 만에 제 목소리로 말하는 AI가 생겼습니다. Gemini 3.8 TTS의 가격·순위·블라인드 비교부터 AI Studio 사용법, 무료로 쓰면 안 되는 이유까지 직접 써보고 정리했습니다."
tags: ["Gemini 3.8 TTS", "음성 복제", "TTS", "AI 목소리"]
author: "Touchizen"
image: "/images/blog/gemini-tts/gemini-tts-hero.jpg"
---

## 21초 녹음, 7초 대기, 그리고 제 목소리

2026년 9월 23일, 구글이 새 AI 목소리 모델 **Gemini 3.8 TTS**를 공개했습니다. 글자를 목소리로 바꿔 주는 TTS인데, 이번 버전은 짧은 녹음만으로 **내 목소리를 복제**할 수 있습니다. 그래서 제 목소리를 넣어 봤습니다 — 그리고 큰일이 한두 개가 아니었습니다.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:2rem 0">
<iframe src="https://www.youtube.com/embed/BcSw59ueNpg" title="AI가 내 목소리를 그대로? Gemini 3.8 Flash 체험기" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
</div>

> 📌 영상 속 **"셋 중 진짜는?" 블라인드 퀴즈**를 직접 풀어 보고 싶다면, 영상을 먼저 보세요. 이 글의 "큰일 ③"에는 스포일러가 있습니다.

## Gemini 3.8 TTS가 뭔가요

모델은 두 가지입니다.

- **Gemini 3.8 Flash TTS** — 연기에 강한 모델. 캐릭터, 오디오북, 내레이션용
- **Gemini 3.8 Flash-Lite TTS** — 싸고 빠른 모델. 대량 더빙, 음성 에이전트용

한국어를 포함해 Flash는 130개, Flash-Lite는 101개 언어를 지원하고, 준비된 목소리만 2,000개가 넘습니다. 새 기능의 핵심은 두 가지입니다. **글로 설명해서 목소리를 새로 만드는 목소리 디자인**, 그리고 **짧은 녹음으로 목소리를 복제하는 음성 복제**입니다.

## 큰일 ① 가격이 말이 안 됩니다

가격표대로 계산하면 **1시간 분량 음성이 약 81센트**, 우리 돈 약 1,100원입니다(Flash 기준, 환율 1달러≈1,366원). Flash-Lite는 약 54센트입니다.

![100만 글자당 가격 비교 — Gemini 3.8 Flash TTS $16.5, Cartesia Sonic 3.6 $49, ElevenLabs v3 Conversational $50, Eleven v3 $100](/images/blog/gemini-tts/gemini-tts-price.jpg)

Artificial Analysis가 정리한 100만 글자당 가격(영어 기준)으로 비교하면 차이가 더 분명합니다.

| 모델 | 100만 글자당 |
|---|---|
| **Gemini 3.8 Flash TTS** | **$16.5** |
| Cartesia Sonic 3.6 (기본 목소리 1위) | $49 |
| ElevenLabs v3 Conversational | $50 |
| ElevenLabs Eleven v3 | $100 |

1위 모델의 3분의 1, ElevenLabs 최신 모델들의 **3분의 1에서 6분의 1** 수준입니다. 게다가 무료로 쓸 수 있는 구간도 있습니다 — 이 "무료"가 뒤에서 진짜 큰일이 됩니다.

## 큰일 ② 비싼 구독을 끊게 됩니다

싸기만 한 게 아닙니다. 사람들이 블라인드로 듣고 투표하는 **Artificial Analysis 순위**(영어, 기본 목소리)에서 Gemini 3.8 Flash TTS는 **2위**입니다. 1위 Cartesia Sonic 3.6(1,279점)과의 차이는 14점으로, 오차 범위(±17)보다 작습니다. 사실상 같은 줄에 서 있는 셈이고, ElevenLabs 최신 모델 둘(1,196점·1,169점)은 그보다 아래입니다.

![Artificial Analysis 기본 목소리 순위 — 1위 Cartesia Sonic 3.6, 2위 Gemini 3.8 Flash TTS](/images/blog/gemini-tts/gemini-tts-rank.jpg)

그런데 **목소리 복제 순위는 다릅니다.** 같은 복제 목소리 8개로 겨루는 순위(Controlled Voice, 영어)에서는 Gemini 3.8 Flash TTS가 **12위**로 내려가고, ElevenLabs Eleven v3가 **6위**로 더 위입니다. 기본 목소리만 쓸 거라면 비싼 구독을 다시 생각해 볼 만하지만, 복제 품질은 따로 봐야 합니다.

그럼 한국어로, 제 목소리로 하면 어떨까요? 그래서 직접 해 봤습니다.

## 셋 중 진짜는? — 블라인드 퀴즈

같은 문장을 세 가지 목소리로 준비했습니다.

- 진짜 제가 녹음한 것
- Gemini로 복제한 제 목소리
- ElevenLabs v3로 복제한 제 목소리

![블라인드 퀴즈 — 진짜 녹음, Gemini 복제, ElevenLabs v3 복제](/images/blog/gemini-tts/gemini-tts-blind.jpg)

영상에서는 A·B·C로 섞어 두 라운드를 들려드립니다(**1:47부터**). 한 가지 밝혀 둘 점: 퀴즈 문장은 Gemini 복제에 넣은 원본 녹음에 들어 있던 문장이라, **Gemini에 조금 유리한 시험**입니다. 몇 개나 맞히셨는지 영상 댓글로 알려 주세요.

## 큰일 ③ 제 목소리가 필요 없어졌습니다

> ⚠️ 스포일러: 영상의 반전입니다.

영상에서 들으신 내레이션은, 진짜 녹음이라고 밝힌 부분을 빼면 **처음부터 끝까지 전부 Gemini로 복제한 제 목소리**입니다. 대본을 글자로 입력했을 뿐입니다.

![음성 복제에 필요한 것 — 내 목소리 녹음 21초와 본인이 읽은 동의 문장 녹음](/images/blog/gemini-tts/gemini-tts-clone.jpg)

복제에 필요한 건 두 가지였습니다.

1. **내 목소리 녹음** — 10~30초. 저는 21초를 넣었습니다.
2. **동의 문장 녹음** — 본인이 직접 읽어야 합니다. 한국어 문장은 이렇습니다. *"나는 이 음성의 소유자이며 구글이 이 음성을 사용하여 음성 합성 모델을 생성할 것을 허용합니다."*

본인이 읽은 동의 녹음이 없으면 복제가 막혀 있습니다. 두 파일을 올리고 **7초 남짓** 지나자 제 목소리가 만들어져 있었습니다.

재미있는 건 목소리의 나이입니다. 예전에 ElevenLabs로 만든 복제는 몇 년 전 녹음으로 만들어서 제가 듣기엔 조금 더 젊게 들리고, Gemini 쪽은 최근 녹음으로 만들었습니다. **AI가 목소리의 나이까지 따라 하는 셈**입니다.

## 큰일 ④ 대본에 연기까지 적게 됩니다

이제 목소리를 고르는 게 아니라 **글로 설명해서 만듭니다.** "따뜻하고 허스키한 60대 이야기꾼", "흥분 잘하는 20대 스포츠 캐스터"처럼 한두 문장이면 됩니다.

대본 안에 연기 지시도 넣을 수 있습니다. `<short pause>`, `<sigh>`, `<laugh>`처럼 꺾쇠 괄호로 한숨·웃음·멈춤을 적고, 스타일에 "속삭이듯"이라고 쓰면 속삭입니다. 두 사람 대화도 한 번에 만들어집니다(기본 목소리일 때). 성우 캐스팅을 글로 하는 시대가 온 셈입니다.

## 직접 써보는 법 — Google AI Studio

코드 없이 **Google AI Studio의 음성 생성 화면**에서 바로 써 볼 수 있습니다.

![Google AI Studio 음성 생성 화면 — 복제한 목소리로 읽히는 모습](/images/blog/gemini-tts/gemini-tts-aistudio.jpg)

1. AI Studio에서 음성 생성(Generate speech) 화면을 열고, 모델을 **Gemini 3.8 Flash TTS**로 고릅니다.
2. 읽힐 문장을 적고 **Run**을 누르면 바로 읽어 줍니다.
3. 목소리 버튼에서 준비된 목소리(2,000개 이상)를 고르거나, **복제·디자인으로 새 목소리**를 만듭니다. 둘 다 **결제를 연결한 API 키**가 있어야 열립니다. 복제에 필요한 녹음 두 개도 여기서 직접 녹음할 수 있습니다.
4. 말투는 **Style** 칸에 글로 적습니다(예: "황당하고 억울한 말투로"). 입력한 뒤 **Enter로 확정해야** 실제로 적용됩니다 — 창을 그냥 닫으면 적용되지 않습니다.
5. 연기 태그는 외울 필요 없이 **Expression** 목록에서 누르면 커서 자리에 들어갑니다.
6. 목소리 디자인은 설명을 적고 **Generate**를 누르면 후보가 세 개 나오고, 들어 보고 고르면 됩니다.

> 💡 **Get code 주의:** 오른쪽 위 Get code로 파이썬 코드를 받을 수 있지만, **Style에 적은 말투는 빠지고**, 복제 목소리는 ID가 아니라 **표시 이름만** 들어갑니다. 그대로 실행하면 오류(HTTP 400)가 나니, 목소리 ID와 말투는 직접 고쳐 넣어야 합니다.

## 진짜 큰일 ① 무료로 쓰면

여기까지의 "큰일"은 사실 전부 자랑이었습니다. 이제 진짜 큰일 세 가지입니다.

앞에서 제 목소리가 필요 없어졌다고 했죠. 그런데 **무료로 쓰면, 구글에는 필요할 수 있습니다.**

- Gemini API 가격표에는 **무료 사용분을 제품 개선에 쓴다**고 적혀 있습니다(유료는 쓰지 않음).
- 약관을 보면 무료로 보낸 내용과 결과를 구글이 제품·AI 개선에 쓰고, **사람 검토자가 읽을 수도 있습니다.** 검토 전에 계정과 분리한다고 하지만, 목소리는 그 자체로 누군지 드러냅니다. 약관은 개인 정보를 보내지 말라고도 합니다.
- 그런데 음성 복제는 **내 목소리를 보내야 만들어지는 기능**입니다. AI Studio에서는 복제가 유료 키에서만 열리지만, API 무료 키로도 막혀 있는지는 문서에 없습니다.
- 사용량 기록을 보면, 복제 목소리로 말할 때마다 **원본 녹음 분량이 입력으로 잡혀 있습니다.**

사실 저도 복제를 끝낸 뒤에야 이걸 읽었습니다. 다행히 제 키는 결제가 연결된 유료였습니다. **결제 계정을 연결한 유료 사용량은 제품 개선에 쓰지 않는다**고 적혀 있고, 다만 악용 감시용 기록은 일정 기간 남습니다. 유럽 경제 지역·영국·스위스는 무료여도 이 조항의 예외지만, **한국은 해당되지 않습니다.**

## 진짜 큰일 ② 생각보다 덜 쌀 수 있습니다

- **한국어에선 격차가 줄어듭니다.** 앞의 가격 비교는 영어 글자 기준이었습니다. Gemini는 시간(오디오 길이)으로 값을 매기는데, 한국어는 1초에 읽는 글자가 영어보다 적습니다(이 영상 내레이션 기준 약 8.3자/초, 영어는 약 13.6자/초로 추정). 그래서 글자 수로 값을 매기는 서비스와 비교하면 한국어에선 차이가 좀 줄어듭니다.
- **지금 가격은 기간 한정입니다.** 2027년 1월 1일부터 Flash와 Flash-Lite 모두 가격이 **두 배**로 오릅니다. 시간당 81센트가 1달러 62센트가 됩니다.

## 진짜 큰일 ③ 아직 안 되는 것들

- **한국어 점수가 없습니다.** 제가 찾아본 주요 공개 순위에는 한국어 점수가 아예 없습니다. 그래서 영상에서 직접 들려드렸습니다.
- 해외 리뷰에서는 **기본 목소리들이 다 비슷비슷하다**는 평도 있었습니다.
- 한 번에 대화할 수 있는 건 **두 명까지, 그것도 기본 목소리일 때만**입니다. 복제 목소리끼리는 따로 만들어 붙여야 합니다.
- **응답 속도는 공개된 수치가 없습니다.** 실시간 상담용이라면 따져 봐야 합니다.
- 일부 지역(AI Studio 기준 영국·유럽 경제 지역·스위스·인도·미국 텍사스·일리노이)에서는 **복제가 막혀 있습니다.**

악용이 걱정될 수 있는데, 구글은 본인 동의 녹음을 요구하고 **모든 음성에 SynthID 워터마크**를 넣습니다. 다만 이 워터마크는 귀로는 들리지 않습니다.

## 그래서, 써도 될까?

![결론 — 용도별 추천](/images/blog/gemini-tts/gemini-tts-verdict.jpg)

| 용도 | 추천 |
|---|---|
| 유튜브 내레이션·오디오북 | **Gemini 3.8 Flash TTS** — 충분히 쓸 만합니다. 단, 결제를 연결한 유료로 |
| 대량 더빙·저예산 | **Flash-Lite** 또는 절반 가격인 **Batch** |
| 실시간 상담 봇 | 응답 속도가 공개된 서비스와 먼저 비교(Voice Arena 미국 영어 중앙값: Sonic 3.6 341ms · Inworld TTS-2 169ms · Simba 3.2 123ms, Gemini 3.8은 미측정) |
| 캐릭터 개성·복제 품질 | 아직은 **ElevenLabs**도 좋은 선택 |

진짜 조심할 건 세 가지입니다. **무료 약관, 2027년 가격, 그리고 한국어는 직접 들어 보고 고를 것.**

## 이 영상은 이렇게 만들었습니다

이 영상 내레이션을 만드는 동안 제가 마이크 앞에서 말한 건 **1분이 안 됩니다** — 복제용 원본과 동의 문장, 블라인드 퀴즈용 진짜 녹음이 전부입니다. 나머지는 전부 글자였습니다.

영상 자체도 AI 코딩 도구 **Claude Code**에게 준 몇 줄에서 시작했습니다. 첫 프롬프트는 구글 발표 글 주소와 이 두 줄이었습니다.

```
gemini 3.8 tts 가 매우 좋다고 하는데, 장단점과 타사와 비교등을 해서 가장 중요한 것을 궁금한 것으로(훅) 만들어서,
영상을 제작했으면 해. 먼저 관련 정보를 조사를 해도 되고, 해줄 수 있어?
```

이후 대화로 롱폼 형식, "손해 낚시형" 훅, 제 목소리 복제, 대본 검토 같은 방향을 정했습니다. 조사부터 대본, 내레이션 생성, 영상 조립까지 이 흐름 위에서 만들어졌습니다.

## 출처

2026년 9월 23~26일에 확인한 내용이며, 수치는 바뀔 수 있습니다.

- [구글 발표 — Gemini 3.8 Text-to-Speech](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/)
- [Gemini 3.8 Flash TTS 모델 문서](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts)
- [Gemini API 가격표](https://ai.google.dev/gemini-api/docs/pricing)
- [Gemini API 약관(무료·유료)](https://ai.google.dev/gemini-api/terms)
- [음성 복제 가이드](https://ai.google.dev/gemini-api/docs/voice-replication)
- [Artificial Analysis TTS 리더보드(영어)](https://artificialanalysis.ai/text-to-speech/leaderboard)
- [지연시간 비교(Voice Arena 인용)](https://www.digitalapplied.com/blog/best-text-to-speech-models-september-2026-ranked-priced)
- [eesel AI 리뷰](https://www.eesel.ai/blog/gemini-3-8-flash-tts-review)
- [SynthID](https://deepmind.google/models/synthid/)
- 환율: 1달러≈1,366원(2026-09-23~24)
