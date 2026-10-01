---
title: "5分の1の価格でAstra級… その代わりPro 200は半減 — GPT-6.1 Solまとめ"
date: "2026-10-01"
excerpt: "GPT-6 Solの発表からわずか1週間で、OpenAIはGPT-6.1 Solを出しました。Astraの5分の1の価格でコーディング試験ではAstraを上回る一方、同じ日にChatGPT Pro 200の利用量は半分になりました。キーノートと公式チャートから理由を追いました。"
tags: ["GPT-6.1 Sol", "GPT-6 Astra", "OpenAI", "ChatGPT Pro"]
author: "Touchizen"
image: "/images/blog/gpt-6-1-sol/gpt61-hero.jpg"
---

## Astraを超えた弟分、価格は5分の1

2026年9月29日のOpenAI DevDayで **GPT-6.1 Sol** が発表されました。コーディング試験で最上位モデル **GPT-6 Astra** より高いスコアを出し、価格はAstraの **5分の1** です。ところが、おかしな点があります。中位モデルのGPT-6 Solが出てから **ちょうど1週間** しか経っていなかったのです。なぜ1週間でまた出したのか。答えを追っていくと、損をするユーザーも出てきます。

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:2rem 0">
<iframe src="https://www.youtube.com/embed/AjCYxDrX8sw" title="GPT-6.1 Solまとめ — Astra級の性能とPro 200の利用量変更(韓国語)" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
</div>

> 動画は韓国語です。以下の画像は動画のフレームです。

## 始まり:Astraが売れすぎた

![9月のタイムライン — 9/3 Astra発表、9/8「こんな需要は初めて」、9/10 Pro $200 新規受付停止、9/22 Sol・Luna、9/29 DevDay](/images/blog/gpt-6-1-sol/gpt61-timeline.jpg)

- **9月3日** — OpenAIの最上位モデル **GPT-6 Astra** を発表。100万トークンあたり入力10ドル、出力50ドルと高価でしたが、人が殺到しました。
- **9月8日** — 1週間もたたないうちに、OpenAI側から「こんな需要は見たことがない」という投稿がありました。
- **9月10日** — 月200ドルの **Proの新規受付を停止**。理由は「システムへの負荷が最も大きい」。利用量がいちばん多いプランだったからです。
- **9月22日** — 中位の **GPT-6 Sol** と小型の **GPT-6 Luna** を発表。
- **9月29日** — ちょうど1週間後のDevDay。ステージでOpenAIはこう言いました。*「みんなが求めるものは二つ。もっと安く、そしてもっと速く。」*

## 一つ目の答え:もっと速く — Ultrafast

Astraを超高速で動かす **Astra Ultrafast** です。文字を生成する速度が **最大8倍**、その代わり価格は通常の **6倍** です。

OpenAIは、同じ指示(「白いロケットを作って打ち上げて」)を両方に入れた録画を流しました。左のUltrafastのロケットはもう飛び立っているのに、右の通常速度はまだ組み立て中でした。ステージのライブデモでは音声入力が動きませんでしたが、タイピングで指示してもアプリは **20秒ほど** でできあがりました。

ただし **8倍は文字の生成速度** です。OpenAIのドキュメントも、この比較は作業全体の時間ではないと書いています。テストまで含めた作業時間が8分の1になるわけではありません。そしてこの速さは無料ではありません。後でまた出てきます。

## 二つ目の答え:もっと安く — GPT-6.1 Sol

今回の主役です。ステージでは「Astraに非常に近い知能を5分の1の価格で」と紹介されました。

| モデル | 入力(100万トークン) | 出力(100万トークン) |
|---|---|---|
| GPT-6 Astra | $10 | $50 |
| **GPT-6.1 Sol** | **$2** | **$10** |

![コーディング試験DeepSWE — 6.1 Solの最高値75.2%、Astraの最高値74.1%](/images/blog/gpt-6-1-sol/gpt61-deepswe.jpg)

OpenAIの発表チャートから元の数値を取り出しました。

- **コーディング試験 DeepSWE**:6.1 Solの最高値 **75.2%**(High設定)、Astraの最高値 **74.1%**(Xhigh)。発表文は「同等(matches)」と書いていますが、数字では弟分が **1.1ポイント** 上です。ステージでは「ある面ではAstraより賢い」という言葉まで出ました。
- **1問あたりのコスト**:65セント対4ドル43セントで、Astraの約 **7分の1**。
- **コンピューター操作試験(OSWorld 2.0、最高設定)**:Astra 73.5%、6.1 Sol 71.4%で **2.1ポイント差**。

もちろん1ポイントの差は誤差かもしれません。それでもここまでは「安くてほぼ同じ」が当てはまります。なお、OpenAIがAstraで作った公式事例(宇宙探検ゲーム、3D細胞、深海生態系)はありますが、6.1 Solで作った公式事例は9月30日時点でまだありませんでした。

## でも、超えられなかったところ

![6.1 Solが超えられなかったところ — 科学研究1位Astra、業務自動化1位Opus 5.5、第三者の総合指数Fable 5.1 > 6.1 Sol](/images/blog/gpt-6-1-sol/gpt61-limits.jpg)

- **科学研究試験**(Terminal-Bench Science):Astra **68.1%**、6.1 Sol **57.0%**。11ポイント差です。OpenAI自身も、最も難しい科学研究にはAstraを使うべきだと書いています。
- **業務自動化試験**(AutomationBench、最高設定):1位はAnthropicの **Opus 5.5**(42.5%、フォールバック込み)。OpenAI自身のチャートなのに、1位は他社のモデルです。
- **第三者の総合評価**(Artificial Analysis Intelligence Index v4.3.2):Anthropicの最上位モデル **Fable 5.1が53.4**、Astra 52.7、**6.1 Sol 51.8**。ただし1問あたりのコストは、6.1 SolがFableの10分の1未満です($0.72対$7.63)。
- 入出力の価格が6.1 Solと同じ **Sonnet 5.5** は56.0点ですが、トークンを多く使うため1問あたり7.6ドルかかります。

まとめると、**安くてほぼ同じ、ただしそこまで** です。

## 安さの秘密? 中身はAstra

1週間でどうやってAstra級になったのでしょうか。APIドキュメントに手がかりがあります。

![APIモデル情報 — 知識のカットオフ 6 Sol 2026-04-20、6.1 Sol 2026-04-30、Astra 2026-04-30、'none'モードは6 Solだけ](/images/blog/gpt-6-1-sol/gpt61-identity.jpg)

| | GPT-6 Sol | GPT-6.1 Sol | GPT-6 Astra |
|---|---|---|---|
| 知識のカットオフ | 2026-04-20 | **2026-04-30** | **2026-04-30** |
| 考えずにすぐ答える'none'モード | あり | **なし** | **なし** |

名前はSolなのに、学習時期とふるまいはAstraに似ています。Hacker Newsには、数日前にファイルから「Astra-Minor」という名前が見つかり、それが6.1 Solらしいというコメントもありました。**これは推測で、OpenAIが確認したものではありません。** 追加学習で良くなったという見方もあります。

私の解釈では、こう考えると辻褄が合います。Astraの需要をさばききれないので、小さなAstraを安く出したのではないでしょうか。

## 代償:Pro 200の利用量が半減

同じステージで、もう一つ発表がありました。**止まっていたPro 200の受付を再開する。** ここまでは良いニュースです。ところが、ステージでは言わなかったことがあります。

![ChatGPTのプラン — Pro 200の利用量がPlusの20倍から10倍へ](/images/blog/gpt-6-1-sol/gpt61-pro200.jpg)

| ChatGPTのプラン | 月額(米国) | Work・Codexの利用量(Plus = 1倍) |
|---|---|---|
| Plus | $20 | 1倍 |
| Pro 100 | $100 | 5倍 |
| **Pro 200** | **$200** | **20倍 → 10倍** |
| Pro 500(新設) | $500 | 25倍 + Ultrafast |

- Pro 200の利用量は **Plusの20倍から10倍へ**。値段はそのままで半分になりました。既存の加入者も20倍は **10月29日まで** です。
- 既存の加入者には **2,500ドル分のクレジット** が1回付与されます(年末に失効)。
- ステージでは「Pro 200は最新モデルをすべて使い続けられ、Astraに近い6.1 Solを毎日たくさん使えばいい」としか言いませんでした。**安いモデルを渡して、使える量は減らした** 形です。
- OpenAIの説明は「モデルの効率が上がったから」。減っても1か月前よりはたくさん仕事ができる、ということです。

その代わり、月500ドルの **Pro 500** が登場しました。Plusの25倍に、先ほどのUltrafastまで付いています。ただし **Ultrafastは利用量を8倍のペースで消費します。** Ultrafastだけで使うと、私の計算(25 ÷ 8)では **Plusの3倍あまり** です。

**1ドルあたりの利用量も、今はすべてのプランで同じになりました**(以前のPro 200は2倍でした)。たくさん買うほど多くもらえたおまけが消えたわけです。そして6.1 Solの超高速版はまだ「近日」です。英語の発表文は「数日以内に(In the coming days)」ですが、韓国語の発表文には「同時に発売」と書かれています。

## では、なぜ1週間で? そして、どれを選ぶべき?

私の見立てでは、**Astraが売れすぎたから** です。高いAstraから安い6.1 Solへ、人を移そうとしているように見えます。OpenAIがこう結びつけて語ったことはないので、この部分は私の解釈として読んでください。

![どれを選ぶか — コーディングは6.1 Sol、難しい科学はAstra、単純で大量の作業はLuna、APIエージェントはキャッシュ$0.10](/images/blog/gpt-6-1-sol/gpt61-verdict.jpg)

| 用途 | おすすめ |
|---|---|
| コーディング | **GPT-6.1 Sol** — 設定はMaxではなく **Highから**。コーディングのチャートでは、Maxはコストが2.4倍なのにスコアはむしろ低めでした(75.2% > 71.9%) |
| 本当に難しい科学・精密な分析 | **GPT-6 Astra** — 科学研究試験で1位 |
| 単純で大量の作業 | **GPT-6 Luna** — 100万トークンあたり $0.10 / $0.50 |
| エージェント・API | キャッシュ価格に注目。6.1 Solのキャッシュ入力は100万トークンあたり **$0.10** で、1週間前のSol($0.20)の半額 |

- 6.1 Solは **通常のチャット画面にはまだなく**、ChatGPT Work・Codex・APIでのみ使えます。
- **Pro 200を使っている方は、10月29日より前に** 自分の利用量を確認してください。

兄の点数を超えた弟、価格は5分の1。でも、よく見ると兄にそっくりです。いま皆さんはどのモデルで作業していますか? 動画のコメントで教えてください。

## この動画の作り方

動画の最後(6:24)で、この動画を作った **最初の依頼の原文** と、その後に加えた修正依頼をそのままお見せしています。調査、台本、画面、ナレーションまで、その数行から始まりました。ナレーションは私自身の声をクローンしたAI音声です(キーノートの原音を除く)。

## 出典

2026年9月29〜30日に確認した内容で、数値は変わる可能性があります。日付は米国時間です。

- [OpenAI — Introducing GPT-6.1 Sol(英語)](https://openai.com/index/introducing-gpt-6-1-sol/) · [韓国語版](https://openai.com/ko-KR/index/introducing-gpt-6-1-sol/)
- [OpenAI — GPT-6 Astra](https://openai.com/index/gpt-6-astra/)
- [OpenAI DevDay 2026 キーノート(YouTube)](https://www.youtube.com/watch?v=Fls_onRviPM) · [DevDay 2026 まとめ](https://openai.com/index/devday-2026-recap/)
- [APIモデルドキュメント — gpt-6.1-sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol)
- [ChatGPTドキュメント — 速度(Ultrafast)](https://learn.chatgpt.com/docs/agent-configuration/speed) · [料金](https://learn.chatgpt.com/docs/pricing)
- [OpenAIヘルプ — ChatGPT Proプラン](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)
- [TechCrunch — Pro新規受付停止(9/10)](https://techcrunch.com/2026/09/10/openai-puts-pro-subscriptions-on-hold-due-to-astra-demand/)
- [Engadget — Proプラン変更](https://www.engadget.com/2272106/openai-adds-dollar500-pro-subscription-nerfs-its-existing-dollar200-tier/)
- [The Next Web — Pro 200のクレジット](https://thenextweb.com/news/openai-devday-pro-200-usage-cut-pro-500-plan)
- [nerdschalk — Proプラン比較](https://nerdschalk.com/chatgpt-pro-100-vs-200-vs-500-prices-usage-limits)
- [VentureBeat — GPT-6 Sol・Luna(9/22)](https://venturebeat.com/technology/openai-releases-gpt-6-sol-and-luna-models-slashing-api-costs-50-or-more)
- [Artificial Analysis — GPT-6.1 Solの分析](https://artificialanalysis.ai/articles/gpt-6-1-sol-replaces-gpt-6-sol-after-just-7-days-with-near-astra-intelligence)
- [Anthropic — Claude Fable 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1)
- [Hacker Newsの議論](https://news.ycombinator.com/item?id=49896586)
