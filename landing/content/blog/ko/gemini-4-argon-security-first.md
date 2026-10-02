---
title: "Gemini 4 Argon 총정리: AI 판도를 뒤흔들 괴물 등장"
date: "2026-10-02"
excerpt: "구글이 거의 1년 만에 새 세대 모델 제미나이 4 아르곤을 냈습니다. 구글 발표로는 아스트라와 페이블을 이겼고 가격은 할인가로 아스트라의 5분의 1. 그런데 앱이나 API로는 못 쓰고, 해킹을 막는 보안팀이 먼저 받았습니다. 왜 그랬는지, 남이 잰 성적표와 비용까지 따라가 봤습니다."
tags: ["Gemini 4 Argon", "Google", "GPT-6 Astra", "LMArena"]
author: "Touchizen"
image: "/images/blog/gemini-4-argon/argon-hero.jpg"
---

## 아스트라·페이블도 이겼다는데, 우리는 못 써요

2026년 9월 30일(미국 시간) 구글이 <strong>제미나이 4 아르곤(Gemini 4 Argon)</strong>을 냈습니다. 구글 발표로는 오픈AI 최고 모델 <strong>GPT-6 아스트라</strong>도, 앤트로픽 최고 모델 <strong>클로드 페이블 5.1</strong>도 이겼습니다. 구글이 공개한 시험 18개 중 13개에서 1등, 가격은 출시 할인가로 아스트라의 <strong>5분의 1</strong>입니다.

그런데 우리는 아직 <strong>앱이나 API로는 못 씁니다.</strong> 구글이 정식으로 먼저 내준 곳은 해킹을 막는 보안팀들이고, 그것도 해킹 관련 안전장치를 풀어서 줬습니다. 이렇게 센 모델을 왜 우리 말고 그쪽에 먼저 줬을까요? 이게 오늘의 주제입니다.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:2rem 0">
<iframe src="https://www.youtube.com/embed/l2palIQRHqc" title="Gemini 4 Argon 총정리: AI 판도를 뒤흔들 괴물 등장" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
</div>

![OpenAI GPT-6 Astra 발표 페이지와 Anthropic Claude Fable 5.1 발표 페이지, 그리고 '??? 가 이겼다 · 구글 발표'](/images/blog/gemini-4-argon/argon-rivals.jpg)

![구글 표 18개 중 13개 1등 — 단독 12 + 공동 1](/images/blog/gemini-4-argon/argon-scores.jpg)

## 구글 표만 있는 건 아닙니다: LM아레나

<strong>LM아레나</strong>는 AI 두 개에 같은 질문을 하고, 이름을 가린 채 사람들이 어느 답이 나은지 투표해서 순위를 매기는 사이트입니다. 여기서도 아르곤은 <strong>질문하고 글 쓰는 부문(Text Arena) 1위, 1525점</strong>이었습니다. 다만 <strong>웹사이트 만들기(Code Arena: WebDev)는 8위, 1679점</strong>입니다. 같은 부문에서 GPT-6.1 Sol은 3위(1759점)였습니다. 만능은 아니라는 거죠.

![LM아레나 — 질문하고 글 쓰기 1위 1525점, 웹사이트 만들기 8위 1679점](/images/blog/gemini-4-argon/argon-arena.jpg)

## 구글의 1년 공백

![구글의 1년 공백 — 2025년 11월 제미나이 3, 2월 3.1 Pro, 5월 I/O '다음 큰 모델은 6월', 3.5 Pro 안 나옴, 8월 딥마인드 수장 교체, 9/30 아르곤](/images/blog/gemini-4-argon/argon-gap.jpg)

- <strong>2025년 11월</strong> — 구글이 제미나이 3을 낸 뒤로 새 세대 대표 모델이 안 나왔습니다.
- <strong>2026년 5월</strong> — 피차이 CEO가 "다음 큰 모델은 6월"이라고 했지만, 제미나이 3.5 프로로 알려진 그 모델은 끝내 안 나왔습니다.
- 그 사이 OpenAI는 GPT-6 아스트라(9/3)를, 앤트로픽은 페이블 5.1과 오퍼스 5.5(9/22)를 냈고, 구글은 주로 싸고 빠른 플래시 모델을 냈습니다.
- <strong>8월</strong> — 딥마인드 수장도 바뀌었습니다.
- <strong>9월 30일</strong> — OpenAI 데브데이 바로 다음 날, 드디어 아르곤이 나왔습니다.

## 구글 안에선 이미 일하는 중

아르곤은 사실 구글 안에선 벌써 일하고 있습니다. 직원 수천 명이 쓰고 있고, 구글이 든 예가 꽤 구체적입니다.

![구글 안의 사례 — 데이터센터 메모리 300TiB+, Rust 2.7배 빠르게, 양자 자원 −40%](/images/blog/gemini-4-argon/argon-inside.jpg)

- <strong>데이터센터 메모리</strong> — 아르곤 에이전트들이 서버 성능 기록을 분석해 고칠 곳을 스스로 찾아 적용했고, <strong>300TiB가 넘는 메모리</strong>를 비웠습니다(총 500TiB~1PiB 절감 추정).
- <strong>오래된 코드를 러스트로</strong> — 동영상 디코더 libgav1의 러스트 버전에서 고속 처리(SIMD) 코드 3만 2천 줄을 바꿨더니 <strong>2.7배</strong> 빨라졌습니다. 영상 출력은 그대로고, 최적화된 C++ 버전보다는 아직 느립니다. 지금은 80만 줄이 넘는 Zircon 운영체제 커널도 옮기는 중입니다.
- <strong>양자컴퓨터 계산</strong> — 한 사례에선 몇 분 만에 공개된 기록보다 필요한 자원을 <strong>40%</strong> 줄였습니다.
- 한 번에 내놓을 수 있는 <strong>출력</strong>이 6만 4천 토큰에서 <strong>100만 토큰</strong>으로 늘었습니다(입력 한도가 아닙니다). 긴 일을 중간에 끊지 말고 끝까지 하라는 거죠.

다만 여기까지는 <strong>전부 구글이 직접 밝힌 사례</strong>입니다.

## 코딩보다 '사무'를 앞세운 성적표

재밌는 건 구글이 표 맨 위에 코딩이 아니라 사무 업무를 올렸다는 점입니다.

| 시험 | 제미나이 4 아르곤 | 비교 |
|---|---|---|
| 업무 자동화 AutomationBench (재피어) | <strong>51.3%</strong> · 1등 | — |
| 법률 조사·문서 작성 (Harvey) | <strong>19.6%</strong> | 아스트라 5.4%, 오퍼스 5.5 3.8% |
| 긴 개발 과제 DeepSWE | <strong>77.9%</strong> | 오퍼스 74.2%, 아스트라 74.1% |

이렇게 18개 시험 중 13개에서 1등이고, 가격은 100만 토큰에 입력 2달러, 출력 10달러, 출시 할인가로 아스트라($10/$50)의 5분의 1입니다. 여기까지만 보면 '다 씹어먹었다'는 말이 나올 만하죠.

## 왜 막는 사람들에게 먼저?

답은 구글이 내세운 강점에 있습니다. <strong>소프트웨어의 구멍, 취약점을 찾는 일</strong>입니다. 구글 말로는 아르곤은 구멍을 스스로 찾고, 진짜인지 확인하고, 고치는 것까지 합니다(외부와 비교할 수 있는 CWE-bench v1에선 아스트라·Grok 4.7과 68%로 동점).

- 구글이 인수한 보안 회사 <strong>위즈(Wiz)</strong>가 써 봤더니, 전 세계 병원이 쓰는 의료 소프트웨어에서 민감한 개인정보가 새는 치명적인 구멍을 찾았습니다. 이전 최신 모델들은 놓친 구멍이었습니다.
- 문제는 이 능력이 공격하는 쪽 손에 들어가도 똑같이 세다는 겁니다. 구글도 Fairwind 페이지에 *"잘못된 손에 들어가면 같은 능력이 똑같이 강력한 위협이 될 수 있다"*고 적었습니다.
- 그래서 <strong>막는 쪽이 먼저 쥐게 했습니다.</strong> 정부, 병원, 통신사 같은 곳들입니다. 심사를 통과한 파트너 중 일부만, 보안팀 안에서만, 쓴 기록을 남기면서요.
- 대신 이들에겐 해킹 관련 거절 장치를 풀어 줍니다. 방어 능력을 전부 쓰라는 거죠.
- 우리한테 아직인 이유도 구글이 밝혔습니다. 악용을 막고, AI가 선을 넘는지 감시하는 등 <strong>안전장치부터 다듬고</strong> 주겠다는 겁니다.

타이밍도 절묘합니다.

![같은 주에 생긴 일 — 9/28(월) OpenAI GPT-6.1 Astra 출시 취소, 9/29(화) 백악관 AI 안전 자율 합의, 9/30(수) Gemini 4 Argon 발표](/images/blog/gemini-4-argon/argon-week.jpg)

- <strong>9/28(월)</strong> — OpenAI가 다음 모델 GPT-6.1 아스트라 출시를 접었습니다. 안전 시험에서 맡은 범위를 벗어나고, 자기가 한 일을 부정확하게 보고했다는 이유입니다.
- <strong>9/29(화)</strong> — 피차이 CEO가 백악관에서 AI 안전 자율 합의에 서명했습니다.
- <strong>9/30(수)</strong> — 아르곤이 나왔습니다. 미국 정부의 출시 전 점검 절차에도 참여하면서요.

## 구글 표 말고, 남이 잰 성적표

그럼 구글 표 1등은 진짜일까요? 구글 표를 다시 보면 <strong>진 시험이 5개</strong> 있습니다. 코딩 시험 FrontierSWE에선 아스트라가 10점 넘게(65.5% 대 55.0%), 터미널 작업 시험 Terminal-bench 4.0에선 오퍼스 5.5가 9점(66.4% 대 57.4%) 앞섭니다.

그리고 1등 했던 DeepSWE 점수는 <strong>구글이 직접 돌린 것</strong>이고, 경쟁사 점수는 공개 순위표나 각 회사 발표에서 가져왔습니다. 이렇게 아르곤 점수를 구글이 직접 잰 시험이 18개 중 절반인 <strong>9개</strong>입니다.

그래서 남이 잰 성적표가 중요한데, 평가 회사 <strong>Artificial Analysis</strong>가 벌써 돌려 봤습니다.

![Artificial Analysis 종합 지수 — 오퍼스 5.5 58, 소넷 5.5 56, 페이블 5.1 53, 아스트라 53, 아르곤 53, GPT-6.1 Sol 52](/images/blog/gemini-4-argon/argon-thirdparty.jpg)

- <strong>종합 지수 53점</strong>, 아스트라와 같습니다. 그런데 오퍼스 5.5는 58점으로, 구글 표에선 대부분 이겼던 오퍼스가 여기선 5점 위입니다. 구글 표엔 없던 소넷 5.5도 56점입니다.
- 대신 눈에 띄는 숫자가 하나 있습니다. <strong>모르는 문제에서 지어내는 비율</strong>이 아르곤 <strong>15%</strong>, 아스트라 <strong>51%</strong>입니다. 맞히는 비율(50%)은 아스트라(63%)보다 낮지만, 모르면 모른다고 하는 모델이라는 거죠.
- 블룸버그는 구글 직원 일부가 시험은 잘 보는데 실제 코딩 일은 아쉽다며 의구심을 갖고 있다고 보도했고, 구글은 사실이 아니라고 반박했습니다.

## 할인이 끝나면 달라지는 비용

- 입력 2달러, 출력 10달러는 <strong>출시 할인가</strong>입니다. 할인이 끝나면 <strong>4달러, 20달러</strong>로 두 배가 되는데, 딱 오퍼스 5.5와 같은 가격입니다. 할인이 언제 끝나는지는 구글이 밝히지 않았습니다(Artificial Analysis는 "적어도 한 달").
- 그리고 아르곤은 생각을 길게 합니다. 한 문제에 쓰는 토큰이 <strong>6.2만</strong>으로 아스트라(2.7만)의 2배가 넘습니다.
- 그래서 Artificial Analysis가 계산해 보니 문제 하나 푸는 비용이 지금은 <strong>$1.99</strong>로 아스트라($3.26)의 60%지만, 할인이 끝나면 <strong>$3.98</strong>로 오히려 아스트라보다 <strong>20%쯤 비싸집니다.</strong>

![문제 하나 푸는 비용 — 정가 기준 아르곤 $3.98, 아스트라 $3.26](/images/blog/gemini-4-argon/argon-bill.jpg)

토큰 값이 5분의 1이라고, 작업 비용까지 5분의 1은 아닌 거죠.

## 풀리면 이렇게 쓰세요

지금까지 나온 성적으로 정리해 봤습니다(추천은 제 정리입니다).

![풀리면 이렇게 쓰세요 — 아르곤에 맡기기 좋은 일과 다른 모델에 맡길 일](/images/blog/gemini-4-argon/argon-howto.jpg)

| 일 | 추천 | 근거 |
|---|---|---|
| 글로 묻고 답하기 · 지시대로 글쓰기 | <strong>아르곤</strong> | LM아레나 텍스트 1위(세부 1위: 코딩 질문·어려운 질문·지시 따르기·긴 질문·창작 글쓰기) |
| 긴 자료 조사 | <strong>아르곤</strong> | 아레나 긴 질문 1위, 지어내는 비율 15%(단, 정답률은 아스트라보다 낮음) |
| 긴 영상 이해 | <strong>아르곤</strong> | LVBench 91.7%, 구글 표 1위(구글 자체 측정) |
| 웹사이트 만들기 | <strong>GPT-6.1 Sol</strong> | 아레나 WebDev 3위(아르곤 8위), 할인가 기준 입출력 가격 같음 |
| 터미널에서 하는 코딩 | <strong>오퍼스 5.5</strong> | Terminal-bench 4.0에서 9점 앞섬 |

돈 아끼는 법도 있습니다.

- 같은 자료를 반복해서 넣는다면 <strong>캐시 할인 95%</strong>, 할인가 기준 100만 토큰에 <strong>10센트</strong>입니다.
- 할인가일 때 <strong>내 작업으로 직접 비용을 재 보세요.</strong>
- 토큰을 많이 쓰는 모델이라 <strong>토큰 값 말고 작업당 비용으로</strong> 비교해야 합니다.

## 그래서 왜? 제 해석

여기부턴 제 해석입니다. 구글 최강 모델을 보안팀에 먼저 준 이유는 두 가지로 봅니다.

1. 구글이 내세운 무기가 <strong>구멍 찾기</strong>라서, 공격자보다 막는 쪽이 먼저 가져야 했습니다.
2. OpenAI가 안전 문제로 모델을 접은 바로 그 주에 <strong>'세지만 안전하게 내는 회사'</strong>로 보이고 싶었을 겁니다.

![그래서 왜? — 남이 잰 종합 지수 아스트라 53 = 아르곤 53, 씹어먹었다가 아니라 따라잡았다](/images/blog/gemini-4-argon/argon-verdict.jpg)

그리고 구글이 돌아온 건 맞습니다. 남이 잰 종합 지수로도 아스트라와 동점이니까요. 다만 '씹어먹었다'보다는 <strong>'따라잡았다'</strong>에 가깝습니다.

일반 공개는 <strong>유료 API 고객과 구글 AI 울트라 구독자</strong>부터인데, 날짜는 아직 나오지 않았습니다. 여러분은 아르곤이 풀리면 뭐부터 시켜 보고 싶으세요? 영상 댓글로 알려 주세요.

## 이 영상에 대해

내레이션은 제 목소리를 복제한 AI 음성입니다. 영상 화면 속 원문 페이지는 설명을 위해 인용했고, 노란 형광펜은 제가 표시한 것입니다. 썸네일의 로봇 이미지는 AI로 만들었습니다.

## 출처

2026년 10월 1~2일에 확인한 내용이며, 수치는 바뀔 수 있습니다. 날짜는 미국 기준입니다.

- [Google — Gemini 4 Argon 발표](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/)
- [Google DeepMind — 벤치마크 표](https://deepmind.google/models/gemini/) · [평가 방법론(PDF)](https://deepmind.google/models/evals-methodology/gemini-4-argon) · [Fairwind 프로그램](https://deepmind.google/fairwind-program/)
- [LMArena — 텍스트·웹개발 순위(X)](https://x.com/arena/status/2105394855644139908) · [GPT-6.1 Sol 웹개발(X)](https://x.com/arena/status/2105367591174995999)
- [OpenAI — GPT-6 Astra](https://openai.com/index/gpt-6-astra/) · [Anthropic — Claude Fable 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1)
- [Artificial Analysis — Gemini 4 Argon 분석](https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs)
- [VentureBeat](https://venturebeat.com/technology/google-unveils-gemini-4-argon-retaking-benchmark-lead-over-openai-and-anthropic-but-in-limited-release) · [9to5Google(정가)](https://9to5google.com/2026/09/30/gemini-4-argon-announcement/)
- [CNBC](https://www.cnbc.com/2026/09/30/google-gemini-4-argon-ai.html) · [CNBC — 백악관 AI 합의(9/29)](https://www.cnbc.com/2026/09/29/tech-white-house-ai-lunch-trump.html)
- [The Verge](https://www.theverge.com/tech/1002980/google-gemini-4-argon) · [Axios](https://www.axios.com/2026/09/30/google-gemini-4)
- [The Next Web — GPT-6.1 Astra 출시 취소](https://thenextweb.com/news/openai-cancels-launch-of-gpt-6-1-astra) · [The Next Web — 구글 반박](https://thenextweb.com/news/google-gemini-4-argon-cyber-defenders-fairwind)
- [Bloomberg — 직원 회의론](https://www.bloomberg.com/news/articles/2026-09-30/google-grapples-with-employee-skepticism-about-new-gemini-model)
- [Google Cloud — 위즈 인수 완료](https://www.googlecloudpresscorner.com/2026-03-11-Google-Completes-Acquisition-of-Wiz)
- [Hacker News 토론](https://news.ycombinator.com/item?id=49913571) · [GeekNews](https://news.hada.io/topic?id=34563)
