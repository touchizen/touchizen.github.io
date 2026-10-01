---
title: "5분의 1 가격에 Astra급… 대신 Pro 200은 반토막 — GPT-6.1 Sol 총정리"
date: "2026-10-01"
excerpt: "OpenAI가 Sol을 낸 지 일주일 만에 GPT-6.1 Sol을 또 냈습니다. Astra의 5분의 1 가격에 코딩 시험은 Astra를 앞섰지만, 같은 날 ChatGPT Pro 200 사용량은 반토막이 났습니다. 키노트와 공식 차트로 왜 그랬는지 따라가 봤습니다."
tags: ["GPT-6.1 Sol", "GPT-6 Astra", "OpenAI", "ChatGPT Pro"]
author: "Touchizen"
image: "/images/blog/gpt-6-1-sol/gpt61-hero.jpg"
---

## Astra를 이긴 동생, 값은 5분의 1

2026년 9월 29일 OpenAI 데브데이에서 **GPT-6.1 Sol**이 나왔습니다. 코딩 시험에서 최고급 모델 **GPT-6 Astra**보다 높은 점수를 냈는데, 가격은 Astra의 **5분의 1**입니다. 그런데 이상한 점이 있습니다. 중간급 GPT-6 Sol이 나온 지 **딱 일주일** 만이었거든요. 일주일 만에 왜 또 냈을까요? 답을 따라가 보면 손해 보는 사용자도 나옵니다.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:2rem 0">
<iframe src="https://www.youtube.com/embed/AjCYxDrX8sw" title="GPT-6.1 Sol 총정리 — Astra급 성능과 Pro 200 사용량 변화" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
</div>

## 시작: Astra가 너무 잘 팔렸다

![9월 타임라인 — 9/3 Astra 출시, 9/8 '이런 수요는 처음', 9/10 Pro $200 가입 중단, 9/22 Sol·Luna, 9/29 데브데이](/images/blog/gpt-6-1-sol/gpt61-timeline.jpg)

- **9월 3일** — OpenAI 최고급 모델 **GPT-6 Astra** 출시. 100만 토큰에 입력 10달러, 출력 50달러로 비쌌지만 사람들이 몰렸습니다.
- **9월 8일** — 일주일도 안 돼서 OpenAI 쪽에서 "이런 수요는 처음 본다"고 썼습니다.
- **9월 10일** — 월 200달러 **Pro 신규 가입을 막았습니다.** 이유는 "시스템에 가장 큰 부담". 사용량이 제일 많은 요금제였거든요.
- **9월 22일** — 중간급 **GPT-6 Sol**과 막내 **GPT-6 Luna** 출시.
- **9월 29일** — 딱 일주일 뒤 데브데이. 무대에서 OpenAI는 이렇게 말했습니다. *"사람들이 두 가지를 계속 요구한다. 더 싸게, 그리고 더 빠르게."*

## 첫 번째 답: 더 빠르게 — Ultrafast

Astra를 초고속으로 돌리는 **Astra Ultrafast**입니다. 글자를 뽑는 속도가 **최대 8배**, 대신 가격은 보통의 **6배**입니다.

OpenAI는 같은 주문("흰 로켓을 만들어서 발사해 줘")을 양쪽에 넣은 녹화를 틀었습니다. 왼쪽 Ultrafast의 로켓은 벌써 날아갔는데, 오른쪽 보통 속도는 아직 조립 중이었죠. 무대 라이브 데모에선 음성 입력이 먹통이었지만, 타이핑으로 시켜도 앱이 **20초 남짓** 만에 나왔습니다.

다만 **8배는 글자 생성 속도**입니다. OpenAI 문서도 이 비교가 전체 작업 시간이 아니라고 적어 둡니다. 테스트까지 다 합친 작업 시간이 8분의 1이 되는 건 아닙니다. 그리고 이 속도는 공짜가 아닙니다 — 뒤에서 다시 나옵니다.

## 두 번째 답: 더 싸게 — GPT-6.1 Sol

오늘의 주인공입니다. 무대에선 "Astra에 아주 가까운 지능을 5분의 1 가격에"라고 소개했습니다.

| 모델 | 입력 (100만 토큰) | 출력 (100만 토큰) |
|---|---|---|
| GPT-6 Astra | $10 | $50 |
| **GPT-6.1 Sol** | **$2** | **$10** |

![코딩 시험 DeepSWE — 6.1 Sol 최고점 75.2%, Astra 최고점 74.1%](/images/blog/gpt-6-1-sol/gpt61-deepswe.jpg)

OpenAI 발표 차트의 원본 숫자를 뽑아 봤습니다.

- **코딩 시험 DeepSWE**: 6.1 Sol 최고점 **75.2%**(High 설정), Astra 최고점 **74.1%**(Xhigh). 발표문엔 '대등(matches)'이라고 썼지만 숫자로는 동생이 **1.1점** 앞섭니다. 무대에선 "어떤 면에선 Astra보다 더 똑똑하다"는 말까지 나왔습니다.
- **문제 하나 비용**: 65센트 대 4달러 43센트, Astra의 약 **7분의 1**.
- **컴퓨터 조작 시험(OSWorld 2.0, 최고 설정)**: Astra 73.5%, 6.1 Sol 71.4%로 **2.1점 차**.

물론 1점 차이는 오차일 수 있습니다. 그래도 여기까지는 "싸고 거의 같다"가 맞습니다. 참고로 OpenAI가 Astra로 만든 공식 예시(우주 탐험 게임, 3D 세포, 심해 생태계)는 있지만, 6.1 Sol로 만든 공식 예시는 9월 30일 기준 아직 없었습니다.

## 그런데 못 넘은 곳

![6.1 Sol이 못 넘은 곳 — 과학 연구 1등 Astra, 업무 자동화 1등 Opus 5.5, 제3자 종합 지수 Fable 5.1 > 6.1 Sol](/images/blog/gpt-6-1-sol/gpt61-limits.jpg)

- **과학 연구 시험**(Terminal-Bench Science): Astra **68.1%**, 6.1 Sol **57.0%**. 11점 차이입니다. OpenAI도 가장 어려운 과학 연구엔 Astra를 쓰라고 직접 적어 놨습니다.
- **업무 자동화 시험**(AutomationBench, 최고 설정): 1등은 앤트로픽 **Opus 5.5**(42.5%, 폴백 포함). OpenAI 자기 차트인데 1등이 남의 모델입니다.
- **제3자 종합 평가**(Artificial Analysis 지수 v4.3.2): 앤트로픽 최고 모델 **Fable 5.1이 53.4**, Astra 52.7, **6.1 Sol 51.8**. 대신 문제당 비용은 6.1 Sol이 Fable의 10분의 1도 안 됩니다($0.72 대 $7.63).
- 입출력 가격이 6.1 Sol과 같은 **Sonnet 5.5**는 56.0점인데, 토큰을 많이 써서 문제당 7.6달러가 듭니다.

정리하면 **싸고 거의 같다, 딱 거기까지**입니다.

## 싸게 만든 비결? 내용은 Astra

일주일 만에 어떻게 Astra급이 됐을까요? API 문서에 단서가 있습니다.

![API 모델 정보 — 지식 기준일 6 Sol 2026-04-20, 6.1 Sol 2026-04-30, Astra 2026-04-30, 'none' 모드 6 Sol만 있음](/images/blog/gpt-6-1-sol/gpt61-identity.jpg)

| | GPT-6 Sol | GPT-6.1 Sol | GPT-6 Astra |
|---|---|---|---|
| 지식 기준일 | 2026-04-20 | **2026-04-30** | **2026-04-30** |
| 생각 없이 바로 답하는 'none' 모드 | 있음 | **없음** | **없음** |

이름은 Sol인데, 공부한 시점과 동작 방식은 Astra를 닮았습니다. 해커뉴스에는 며칠 전 파일에서 'Astra-Minor'라는 이름이 나왔고 그게 6.1 Sol 같다는 댓글도 있었습니다. **이건 추측이고, OpenAI가 확인한 건 아닙니다.** 추가 학습으로 좋아졌다는 해석도 있습니다.

제 해석으론 이러면 앞뒤가 맞습니다. Astra 수요를 감당하기 벅차니, 작은 Astra를 싸게 내놓은 것 아닐까요?

## 대가: Pro 200 사용량 반토막

같은 무대에서 발표가 하나 더 있었습니다. **막혔던 Pro 200 가입을 다시 받는다.** 여기까진 좋은 소식이죠. 그런데 무대에서 말하지 않은 게 있습니다.

![ChatGPT 요금제 — Pro 200 사용량 Plus의 20배에서 10배로](/images/blog/gpt-6-1-sol/gpt61-pro200.jpg)

| ChatGPT 요금제 | 월 요금(미국) | Work·Codex 사용량 (Plus = 1배) |
|---|---|---|
| Plus | $20 | 1배 |
| Pro 100 | $100 | 5배 |
| **Pro 200** | **$200** | **20배 → 10배** |
| Pro 500 (신규) | $500 | 25배 + Ultrafast |

- Pro 200 사용량이 **Plus의 20배에서 10배로**, 값은 그대로 두고 절반이 됐습니다. 기존 가입자도 **10월 29일까지만 20배**입니다.
- 기존 가입자에게는 **2,500달러어치 크레딧**을 한 번 줍니다(연말 만료).
- 무대에선 "Pro 200은 최신 모델을 전부 계속 쓸 수 있고, Astra에 가까운 6.1 Sol을 매일 많이 쓰시면 된다"고만 했습니다. **싼 걸 주고, 쓸 수 있는 양은 줄인 셈**입니다.
- OpenAI 설명은 "모델 효율이 좋아져서"입니다. 줄어도 한 달 전보다 일은 더 한다는 거죠.

대신 월 500달러 **Pro 500**이 나왔습니다. Plus의 25배에 아까 그 Ultrafast까지 들어 있습니다. 그런데 **Ultrafast는 사용량을 8배로 씁니다.** Ultrafast로만 쓰면 제 계산으론 25 ÷ 8, **Plus의 3배 남짓**입니다.

**1달러당 사용량도 이제 모든 요금제가 같아졌습니다**(예전 Pro 200은 두 배였습니다). 많이 산다고 더 주던 덤이 사라진 거죠. 그리고 6.1 Sol의 초고속 버전은 아직 '곧'입니다. 영어 발표문은 "앞으로 며칠 안에(In the coming days)"인데, 한국어 발표문엔 "함께 출시"라고 돼 있습니다.

## 그래서, 왜 일주일 만에? 그리고 뭘 골라야 할까

제가 보기엔 **Astra가 너무 잘 팔려서**입니다. 비싼 Astra 대신 싼 6.1 Sol로 사람들을 옮기려는 것 같습니다. OpenAI가 이렇게 연결해서 말한 적은 없으니, 이 부분은 제 해석으로 봐 주세요.

![그래서 뭘 골라야 하나 — 코딩 6.1 Sol, 어려운 과학 Astra, 단순·대량 Luna, API 에이전트 캐시 $0.10](/images/blog/gpt-6-1-sol/gpt61-verdict.jpg)

| 용도 | 추천 |
|---|---|
| 코딩 | **GPT-6.1 Sol** — 설정은 Max 말고 **High부터**. 코딩 차트에선 Max가 돈은 2.4배 들고 점수는 오히려 낮았습니다(75.2% > 71.9%) |
| 정말 어려운 과학·정밀 분석 | **GPT-6 Astra** — 과학 연구 시험 1등 |
| 단순하고 많은 일 | **GPT-6 Luna** — 100만 토큰에 $0.10 / $0.50 |
| 에이전트·API | 캐시 가격을 보세요. 6.1 Sol 캐시는 100만 토큰에 **$0.10**, 일주일 전 Sol($0.20)의 반값 |

- 6.1 Sol은 아직 **일반 채팅창엔 없고**, ChatGPT Work·Codex·API에서만 됩니다.
- **Pro 200 쓰시는 분은 10월 29일 전에** 내 사용량부터 확인해 보세요.

형님 점수를 넘본 동생, 값은 5분의 1. 근데 알고 보면 형님을 쏙 빼닮았습니다. 여러분은 지금 어떤 모델로 작업하시나요? 영상 댓글로 알려 주세요.

## 이 영상은 이렇게 만들었습니다

영상 마지막(6:24)에서 이 영상을 만든 **첫 요청 원문**과 그 뒤에 더한 수정 요청을 그대로 보여 드립니다. 조사, 대본, 화면, 내레이션까지 그 몇 줄에서 시작했습니다. 내레이션은 제 목소리를 복제한 AI 음성입니다(키노트 원음 제외).

## 출처

2026년 9월 29~30일에 확인한 내용이며, 수치는 바뀔 수 있습니다. 날짜는 미국 기준입니다.

- [OpenAI — Introducing GPT-6.1 Sol (영어)](https://openai.com/index/introducing-gpt-6-1-sol/) · [한국어](https://openai.com/ko-KR/index/introducing-gpt-6-1-sol/)
- [OpenAI — GPT-6 Astra](https://openai.com/index/gpt-6-astra/)
- [OpenAI DevDay 2026 키노트(YouTube)](https://www.youtube.com/watch?v=Fls_onRviPM) · [DevDay 2026 정리](https://openai.com/index/devday-2026-recap/)
- [API 모델 문서 — gpt-6.1-sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol)
- [ChatGPT 문서 — 속도(Ultrafast)](https://learn.chatgpt.com/docs/agent-configuration/speed) · [가격](https://learn.chatgpt.com/docs/pricing)
- [OpenAI 도움말 — ChatGPT Pro 요금제](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)
- [TechCrunch — Pro 가입 중단(9/10)](https://techcrunch.com/2026/09/10/openai-puts-pro-subscriptions-on-hold-due-to-astra-demand/)
- [Engadget — Pro 요금제 변경](https://www.engadget.com/2272106/openai-adds-dollar500-pro-subscription-nerfs-its-existing-dollar200-tier/)
- [The Next Web — Pro 200 크레딧](https://thenextweb.com/news/openai-devday-pro-200-usage-cut-pro-500-plan)
- [nerdschalk — Pro 요금제 정리](https://nerdschalk.com/chatgpt-pro-100-vs-200-vs-500-prices-usage-limits)
- [VentureBeat — GPT-6 Sol·Luna(9/22)](https://venturebeat.com/technology/openai-releases-gpt-6-sol-and-luna-models-slashing-api-costs-50-or-more)
- [Artificial Analysis — GPT-6.1 Sol 분석](https://artificialanalysis.ai/articles/gpt-6-1-sol-replaces-gpt-6-sol-after-just-7-days-with-near-astra-intelligence)
- [Anthropic — Claude Fable 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1)
- [Hacker News 토론](https://news.ycombinator.com/item?id=49896586)
