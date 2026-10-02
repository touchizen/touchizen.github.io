---
title: "Gemini 4 Argonまとめ: AIの勢力図を揺るがす怪物が登場"
date: "2026-10-02"
excerpt: "Googleがほぼ1年ぶりの新世代モデルGemini 4 Argonを発表しました。Googleの発表ではGPT-6 AstraとClaude Fable 5.1に勝ち、価格はローンチ割引でAstraの5分の1。ところがアプリやAPIでは使えず、最初に受け取ったのはハッキングを防ぐセキュリティチームでした。その理由と、第三者の成績表、本当のコストまで追いかけました。"
tags: ["Gemini 4 Argon", "Google", "GPT-6 Astra", "LMArena"]
author: "Touchizen"
image: "/images/blog/gemini-4-argon/argon-hero.jpg"
---

## AstraにもFableにも勝ったのに、私たちは使えない

2026年9月30日(米国時間)、Googleが<strong>Gemini 4 Argon</strong>を発表しました。Googleの発表では、OpenAIの最上位モデル<strong>GPT-6 Astra</strong>にも、Anthropicの最上位モデル<strong>Claude Fable 5.1</strong>にも勝っています。Googleが公開した18のベンチマークのうち13で1位、価格はローンチ割引でAstraの<strong>5分の1</strong>です。

ところが私たちはまだ<strong>アプリやAPIでは使えません。</strong>Googleが正式に最初に提供したのは、ハッキングを防ぐセキュリティチーム。しかもハッキング関連の安全装置を外した状態でです。これほど強いモデルを、なぜ私たちより先にそちらに渡したのでしょうか? これが今回のテーマです。

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:2rem 0">
<iframe src="https://www.youtube.com/embed/l2palIQRHqc" title="Gemini 4 Argonまとめ: AIの勢力図を揺るがす怪物が登場(韓国語)" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
</div>

> 動画は韓国語です。以下の画像は動画のフレームです。

![OpenAIのGPT-6 Astra発表ページとAnthropicのClaude Fable 5.1発表ページ、そして「???が勝った・Google発表」](/images/blog/gemini-4-argon/argon-rivals.jpg)

![Googleの表で18中13が1位 — 単独12+同率1](/images/blog/gemini-4-argon/argon-scores.jpg)

## Googleの表だけではありません: LMArena

<strong>LMArena</strong>は、2つのAIに同じ質問をして、名前を隠したまま人々がどちらの答えが良いか投票し、順位をつけるサイトです。ここでもArgonは<strong>テキスト部門(Text Arena)1位、1525点</strong>でした。ただし<strong>Webサイト作り(Code Arena: WebDev)は8位、1679点</strong>。同じ部門でGPT-6.1 Solは3位(1759点)でした。万能ではないということです。

![LMArena — テキスト1位1525点、WebDev 8位1679点](/images/blog/gemini-4-argon/argon-arena.jpg)

## Googleの1年の空白

![Googleの空白 — 2025年11月Gemini 3、2月3.1 Pro、5月I/O「次の大きなモデルは6月」、3.5 Proは出ず、8月DeepMindトップ交代、9/30 Argon](/images/blog/gemini-4-argon/argon-gap.jpg)

- <strong>2025年11月</strong> — Gemini 3以降、新世代のフラッグシップは出ていませんでした。
- <strong>2026年5月</strong> — ピチャイCEOが「次の大きなモデルは6月」と言いましたが、Gemini 3.5 Proと見られていたそのモデルは結局出ませんでした。
- その間にOpenAIはGPT-6 Astra(9/3)を、AnthropicはFable 5.1とOpus 5.5(9/22)を出し、Googleは主に安くて速いFlashモデルを出していました。
- <strong>8月</strong> — DeepMindのトップも交代しました。
- <strong>9月30日</strong> — OpenAI DevDayの翌日、ついにArgonが登場しました。

## Google社内ではすでに働いている

Argonは実はGoogle社内ですでに使われていて、数千人の社員が使っています。Googleが挙げた例はかなり具体的です。

![Google社内の事例 — データセンターのメモリ300TiB超、Rustで2.7倍高速、量子リソース−40%](/images/blog/gemini-4-argon/argon-inside.jpg)

- <strong>データセンターのメモリ</strong> — Argonのエージェントがサーバーの性能記録を分析し、直す場所を自ら見つけて適用、<strong>300TiBを超えるメモリ</strong>を空けました(総削減は500TiB〜1PiBと推定)。
- <strong>古いコードをRustへ</strong> — 動画デコーダーlibgav1のRust版で、高速処理(SIMD)コード3万2千行を置き換えたら<strong>2.7倍</strong>速くなりました。出力は同じで、最適化されたC++版よりはまだ遅いです。現在は80万行を超えるFuchsiaのZirconカーネルも移行中です。
- <strong>量子コンピューターの計算</strong> — ある事例では、数分で公開記録より必要なリソースを<strong>40%</strong>減らしました。
- 一度に出せる<strong>出力</strong>が6万4千トークンから<strong>100万トークン</strong>に増えました(入力上限ではありません)。長い仕事を途中で切らずに最後までやれ、ということです。

ただし、ここまでは<strong>すべてGoogle自身が公表した事例</strong>です。

## コーディングより「事務」を前面に出した成績表

面白いのは、Googleが表の一番上にコーディングではなく事務業務を置いたことです。

| ベンチマーク | Gemini 4 Argon | 比較 |
|---|---|---|
| 業務自動化 AutomationBench(Zapier) | <strong>51.3%</strong>・1位 | — |
| 法律調査・文書作成(Harvey) | <strong>19.6%</strong> | Astra 5.4%、Opus 5.5 3.8% |
| 長い開発タスク DeepSWE | <strong>77.9%</strong> | Opus 74.2%、Astra 74.1% |

こうして18中13で1位、価格は100万トークンあたり入力2ドル・出力10ドルで、ローンチ割引ではAstra($10/$50)の5分の1。ここまで見れば「全部食った」と言われるのも無理はありません。

## なぜ守る側に先に?

答えはGoogleが掲げた強みにあります。<strong>ソフトウェアの穴、脆弱性を見つけること</strong>です。Googleによれば、Argonは穴を自分で見つけ、本物か確かめ、修正まで行います(外部と比較できるCWE-bench v1では、AstraやGrok 4.7と68%で同率)。

- Googleが買収したセキュリティ企業<strong>Wiz</strong>が使ってみると、世界中の病院が使う医療ソフトウェアで機密の個人情報が漏れる深刻な穴を見つけました。以前の最先端モデルは見逃していた穴です。
- 問題は、この能力が攻撃側の手に渡っても同じように強いことです。GoogleもFairwindのページに*「悪い手に渡れば、同じ能力が同じくらい強力な脅威になり得る」*と書いています。
- だから<strong>守る側に先に持たせました。</strong>政府、病院、通信事業者などです。審査を通ったパートナーの一部だけ、セキュリティチームの中だけ、利用記録を残しながら。
- その代わり、彼らにはハッキング関連の拒否機能を外します。防御能力を全部使え、ということです。
- 私たちにまだの理由もGoogleは明らかにしています。悪用を防ぎ、AIが一線を越えないか監視するなど、<strong>安全装置をまず整えてから</strong>提供するそうです。

タイミングも絶妙です。

![同じ週の出来事 — 9/28(月)OpenAI GPT-6.1 Astraのリリース中止、9/29(火)ホワイトハウスでAI安全の自主合意、9/30(水)Gemini 4 Argon発表](/images/blog/gemini-4-argon/argon-week.jpg)

- <strong>9/28(月)</strong> — OpenAIが次のモデルGPT-6.1 Astraのリリースを取りやめました。安全テストで任された範囲を外れ、自分のした作業を不正確に報告したためです。
- <strong>9/29(火)</strong> — ピチャイCEOがホワイトハウスでAI安全の自主合意に署名しました。
- <strong>9/30(水)</strong> — Argonが登場。米国政府のリリース前検査の手続きにも参加しながらです。

## Googleの表ではなく、第三者の成績表

では、Googleの表の1位は本物でしょうか? Googleの表を見直すと、<strong>負けたベンチマークが5つ</strong>あります。コーディングのFrontierSWEではAstraが10点以上(65.5%対55.0%)、ターミナル作業のTerminal-bench 4.0ではOpus 5.5が9点(66.4%対57.4%)リードしています。

そして1位だったDeepSWEのスコアは<strong>Googleが自分で測ったもの</strong>で、競合のスコアは公開ランキングや各社の発表から取っています。ArgonのスコアをGoogleが自分で測ったベンチマークは、18のうち半分の<strong>9つ</strong>です。

だから第三者の成績表が大事で、評価会社<strong>Artificial Analysis</strong>がすでに測っています。

![Artificial Analysis総合指数 — Opus 5.5 58、Sonnet 5.5 56、Fable 5.1 53、Astra 53、Argon 53、GPT-6.1 Sol 52](/images/blog/gemini-4-argon/argon-thirdparty.jpg)

- <strong>総合指数53点</strong>でAstraと同じ。ところがOpus 5.5は58点で、Googleの表ではほぼ勝っていたOpusが、ここでは5点上です。Googleの表になかったSonnet 5.5も56点です。
- 代わりに目立つ数字が1つあります。<strong>わからない問題で作り話をする割合</strong>がArgonは<strong>15%</strong>、Astraは<strong>51%</strong>。正答率(50%)はAstra(63%)より低いものの、わからなければわからないと言うモデルだということです。
- Bloombergは、Google社員の一部が「テストはよくできるが実際のコーディング作業は物足りない」と疑問を持っていると報じ、Googleは事実ではないと反論しました。

## 割引が終わると変わるコスト

- 入力2ドル、出力10ドルは<strong>ローンチ割引価格</strong>です。割引が終わると<strong>4ドル、20ドル</strong>と2倍になり、ちょうどOpus 5.5と同じ価格です。割引の終了時期をGoogleは明らかにしていません(Artificial Analysisは「少なくとも1か月」)。
- しかもArgonは長く考えます。1問あたりの出力トークンが<strong>6.2万</strong>で、Astra(2.7万)の2倍以上です。
- そこでArtificial Analysisが計算すると、1問を解くコストは今は<strong>$1.99</strong>でAstra($3.26)の60%ですが、割引が終わると<strong>$3.98</strong>で、むしろAstraより<strong>約20%高く</strong>なります。

![1問あたりのコスト — 定価ではArgon $3.98、Astra $3.26](/images/blog/gemini-4-argon/argon-bill.jpg)

トークン単価が5分の1でも、作業コストまで5分の1になるわけではないのです。

## 使えるようになったら、こう使おう

これまでの成績で整理しました(おすすめは私の整理です)。

![使い方 — Argonに任せたい仕事と、他のモデルに任せたい仕事](/images/blog/gemini-4-argon/argon-howto.jpg)

| 仕事 | おすすめ | 根拠 |
|---|---|---|
| 質問への回答・指示どおりの文章作成 | <strong>Argon</strong> | LMArenaテキスト1位(細部でもコーディング質問・難しい質問・指示追従・長い質問・創作で1位) |
| 長い資料の調査 | <strong>Argon</strong> | アリーナの長い質問1位、作り話の割合15%(ただし正答率はAstraより低い) |
| 長い動画の理解 | <strong>Argon</strong> | LVBench 91.7%、Googleの表で1位(Googleの自社測定) |
| Webサイト作り | <strong>GPT-6.1 Sol</strong> | アリーナWebDev 3位(Argonは8位)、割引時のトークン単価が同じ |
| ターミナルでのコーディング | <strong>Opus 5.5</strong> | Terminal-bench 4.0で9点リード |

お金を節約する方法もあります。

- 同じ資料を繰り返し入れるなら<strong>キャッシュ割引95%</strong>、割引価格で100万トークンあたり<strong>10セント</strong>です。
- 割引価格のうちに<strong>自分の作業で実際のコストを測ってみてください。</strong>
- トークンを多く使うモデルなので、<strong>トークン単価ではなく作業あたりのコスト</strong>で比べるべきです。

## で、なぜ? 私の解釈

ここからは私の解釈です。Googleが最強モデルをセキュリティチームに先に渡した理由は2つだと見ています。

1. Googleが掲げた武器が<strong>穴探し</strong>なので、攻撃者より守る側が先に持つ必要があった。
2. OpenAIが安全の問題でモデルを取りやめたまさにその週に、<strong>「強いけれど安全に出す会社」</strong>に見られたかった。

![で、なぜ? — 第三者の総合指数ではAstra 53 = Argon 53、「全部食った」ではなく「追いついた」](/images/blog/gemini-4-argon/argon-verdict.jpg)

そしてGoogleが戻ってきたのは確かです。第三者の総合指数でもAstraと同点ですから。ただ「全部食った」というより<strong>「追いついた」</strong>に近いです。

一般公開は<strong>有料APIの顧客とGoogle AI Ultraの購読者</strong>からで、日付はまだ出ていません。皆さんはArgonが使えるようになったら、まず何をさせてみたいですか? 動画のコメントで教えてください。

## この動画について

ナレーションは私の声を複製したAI音声です。動画に出てくる原文ページは解説のために引用したもので、黄色いハイライトは私が付けました。サムネイルのロボット画像はAIで作りました。

## 出典

2026年10月1〜2日に確認した内容で、数値は変わる可能性があります。日付は米国時間です。

- [Google — Gemini 4 Argon発表](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/)
- [Google DeepMind — ベンチマーク表](https://deepmind.google/models/gemini/) · [評価方法(PDF)](https://deepmind.google/models/evals-methodology/gemini-4-argon) · [Fairwindプログラム](https://deepmind.google/fairwind-program/)
- [LMArena — テキスト・WebDev順位(X)](https://x.com/arena/status/2105394855644139908) · [GPT-6.1 Sol WebDev(X)](https://x.com/arena/status/2105367591174995999)
- [OpenAI — GPT-6 Astra](https://openai.com/index/gpt-6-astra/) · [Anthropic — Claude Fable 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1)
- [Artificial Analysis — Gemini 4 Argon分析](https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs)
- [VentureBeat](https://venturebeat.com/technology/google-unveils-gemini-4-argon-retaking-benchmark-lead-over-openai-and-anthropic-but-in-limited-release) · [9to5Google(定価)](https://9to5google.com/2026/09/30/gemini-4-argon-announcement/)
- [CNBC](https://www.cnbc.com/2026/09/30/google-gemini-4-argon-ai.html) · [CNBC — ホワイトハウスのAI合意(9/29)](https://www.cnbc.com/2026/09/29/tech-white-house-ai-lunch-trump.html)
- [The Verge](https://www.theverge.com/tech/1002980/google-gemini-4-argon) · [Axios](https://www.axios.com/2026/09/30/google-gemini-4)
- [The Next Web — GPT-6.1 Astraリリース中止](https://thenextweb.com/news/openai-cancels-launch-of-gpt-6-1-astra) · [The Next Web — Googleの反論](https://thenextweb.com/news/google-gemini-4-argon-cyber-defenders-fairwind)
- [Bloomberg — 社員の疑問](https://www.bloomberg.com/news/articles/2026-09-30/google-grapples-with-employee-skepticism-about-new-gemini-model)
- [Google Cloud — Wiz買収完了](https://www.googlecloudpresscorner.com/2026-03-11-Google-Completes-Acquisition-of-Wiz)
- [Hacker Newsの議論](https://news.ycombinator.com/item?id=49913571) · [GeekNews](https://news.hada.io/topic?id=34563)
