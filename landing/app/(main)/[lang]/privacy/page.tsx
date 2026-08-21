'use client';

import { useRouter, useParams } from 'next/navigation';
import { Language, languages } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;

  // Validate lang parameter
  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}/privacy`);
  };

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />

      <section className="pt-32 pb-20">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              {lang === 'ko' ? '개인정보 처리방침' : lang === 'ja' ? 'プライバシーポリシー' : lang === 'de' ? 'Datenschutzrichtlinie' : 'Privacy Policy'}
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              {lang === 'ko' ? (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    최종 수정일: 2026년 6월 7일
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">1. 개인정보의 처리 목적</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    터치즌(&apos;https://touchizen.com&apos;)은 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>고객 가입의사 확인</li>
                    <li>고객에 대한 서비스 제공에 따른 본인 식별 및 인증</li>
                    <li>회원자격 유지 및 관리</li>
                    <li>라이선스 검증 및 구독 관리</li>
                    <li>서비스 개선 및 신규 서비스 개발</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">2. 서비스별 개인정보 처리</h2>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-1. Whisk2CapCut Chrome 확장 프로그램</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Whisk2CapCut Chrome 확장 프로그램은 다음과 같은 데이터를 수집하고 저장합니다:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Google 계정 이메일:</strong> Google OAuth를 통해 수집되며, 라이선스 검증 및 구독 상태 확인에 사용됩니다</li>
                    <li><strong>로컬 저장 데이터 (Chrome Storage):</strong>
                      <ul className="list-disc pl-6 mt-2">
                        <li>라이선스 키</li>
                        <li>사용 횟수 (무료 체험 추적용)</li>
                        <li>사용자 설정 (언어, 테마 등)</li>
                        <li>내보내기 설정</li>
                      </ul>
                    </li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    이 데이터는 사용자의 기기에 로컬로 저장되며, 라이선스 검증을 위해 당사 서버로 전송되는 이메일 주소를 제외하고는 외부로 전송되지 않습니다.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-2. AutoFlowCut 데스크톱 앱</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    AutoFlowCut은 Google AI Studio API 키로 Gemini/Veo API를 사용해 AI 이미지와 비디오를 대량 생성하고, 타임라인·자막·애니메이션이 포함된 CapCut 프로젝트로 내보내는 데스크톱 앱입니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">무료 다운로드 앱</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                    <li>프로젝트와 내보내기 결과물은 사용자의 로컬 기기에 저장됩니다</li>
                    <li>Google AI Studio API 키는 앱에서 사용되며, AI 생성 요청은 Google로 직접 전송됩니다</li>
                    <li>Gemini/Veo API 사용량은 사용자의 Google 계정 정책과 할당량을 따릅니다</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">Pro 버전 (유료 회원제)</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                    <li><strong>Google 계정 이메일:</strong> Google OAuth를 통해 수집되며, 라이선스 검증 및 구독 관리에 사용됩니다</li>
                    <li><strong>라이선스 정보:</strong> 구독 상태 및 라이선스 키</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    AI 이미지와 비디오 생성 시 프롬프트와 참조 콘텐츠는 Gemini/Veo API를 통해 처리됩니다. 이는 Google의 개인정보 처리방침에 따릅니다.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-3. Calorie Shot 모바일 앱</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Calorie Shot은 음식 사진으로 칼로리를 추정하는 AI 모바일 앱입니다.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>음식 사진:</strong> 칼로리 분석을 위해 AI 서버로 전송됩니다. 분석 후 서버에 영구 저장되지 않습니다</li>
                    <li><strong>분석 기록:</strong> 칼로리 분석 결과는 사용자의 기기에 로컬로 저장됩니다</li>
                    <li><strong>구독 정보:</strong> 앱스토어(Apple App Store / Google Play Store)를 통해 관리됩니다</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-4. 매쓰쇼츠(MathShorts) 모바일 앱</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    매쓰쇼츠는 수학 문제의 사진을 찍거나 수식을 입력하면 AI가 풀이를 만들고, 그 풀이를 짧은 영상으로 만들어 주는 모바일 앱입니다.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>문제 사진 및 입력한 수식:</strong> 풀이 생성을 위해 <strong>미국에 소재한 OpenAI 서버로 전송</strong>됩니다. 사진 자체는 당사 서버에 저장하지 않으며, 전송 후 풀이 생성에만 사용됩니다.</li>
                    <li><strong>추출된 수식(LaTeX) 텍스트:</strong> 문제 신고 기능이 참조할 수 있도록 <strong>24시간</strong> 동안 보관한 뒤 처리됩니다.</li>
                    <li><strong>카카오 계정 정보:</strong> 카카오 로그인으로 수집합니다. 회원 식별자는 카카오 회원번호에서 파생되며, 닉네임·이메일·프로필 사진은 카카오에서 선택 동의한 범위에서만 제공됩니다(제공되지 않을 수 있습니다).</li>
                    <li><strong>이용 기록:</strong> 푼 문제 수, 크레딧 잔액과 원장(적립·차감·환급 내역), 신고 내역을 저장합니다.</li>
                    <li><strong>결제 정보:</strong> Google Play 결제의 구매 토큰과 주문번호를 서버 검증 및 중복 적립 방지에 사용합니다. 카드번호 등 결제수단 정보는 당사가 수집하지 않으며 Google Play가 처리합니다.</li>
                    <li><strong>기기에만 저장되는 것:</strong> 만들어진 영상과 편집 내용은 사용자의 기기에만 저장되며 당사 서버로 전송되지 않습니다.</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <strong>국외 이전:</strong> 매쓰쇼츠는 풀이 생성을 위해 개인정보를 국외로 이전합니다.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>OpenAI, L.L.C. (미국):</strong> 이전 항목 — 문제 사진, 입력한 수식. 이전 목적 — 풀이 생성. 이전 시기 및 방법 — 사용자가 풀이를 요청할 때 네트워크를 통해 전송. 보유 기간 — 당사는 저장하지 않으며, OpenAI의 보유 정책을 따릅니다.</li>
                    <li><strong>Google LLC (미국):</strong> 이전 항목 — 계정 식별자, 이용 기록, 결제 검증 정보. 이전 목적 — 인증·데이터베이스·서버 기능(Firebase Authentication, Cloud Firestore, Cloud Functions, 미국 리전). 보유 기간 — 아래 보유 기간에 따릅니다.</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    이전을 거부하실 수 있으나, 문제를 푸는 처리 자체가 위 이전을 포함하므로 거부 시 앱의 핵심 기능을 제공할 수 없습니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <strong>계정 삭제 후에도 보관되는 항목:</strong> 동일한 결제로 크레딧이 중복 적립되는 것을 막기 위해, <strong>구매 토큰과 그 적립 시각·상품 ID</strong>는 계정 삭제 후에도 보관합니다. 이 기록에는 문제 사진이나 풀이 내용이 포함되지 않습니다. 부정 이용 방지를 위한 것으로, 삭제할 경우 해당 결제가 다시 적립될 수 있습니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    <strong>권리 행사:</strong> 앱의 [서랍 &gt; 프로필]에서 <strong>내 데이터 내보내기</strong>와 <strong>계정 삭제</strong>를 직접 하실 수 있습니다. 계정을 삭제하면 위 예외 항목을 제외한 서버 저장 정보가 삭제됩니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">3. Google API 서비스 사용자 데이터 정책</h2>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      Google API로부터 수신한 정보의 사용 및 다른 앱으로의 전송은 제한적 사용 요구사항을 포함하여 <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Google API 서비스 사용자 데이터 정책</a>을 준수합니다.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">4. 제3자 서비스</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    당사는 다음의 제3자 서비스를 사용합니다:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Lemon Squeezy:</strong> 결제 처리. 구매 시 이메일 주소와 결제 정보가 Lemon Squeezy와 공유됩니다. <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">개인정보 처리방침</a>을 참조하세요.</li>
                    <li><strong>Firebase:</strong> 인증 및 데이터베이스 서비스. Google의 <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">개인정보 및 보안 정책</a>을 참조하세요.</li>
                    <li><strong>OpenAI:</strong> 매쓰쇼츠의 풀이 생성. 문제 사진과 수식이 전송됩니다. <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">개인정보 처리방침</a>을 참조하세요.</li>
                    <li><strong>Google Play 결제:</strong> 매쓰쇼츠의 인앱 결제 처리. 결제수단 정보는 Google이 처리하며 당사는 구매 토큰과 주문번호만 받습니다.</li>
                    <li><strong>카카오:</strong> 매쓰쇼츠의 로그인. <a href="https://www.kakao.com/policy/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">개인정보 처리방침</a>을 참조하세요.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">5. 개인정보의 처리 및 보유 기간</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    터치즌은 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>고객 가입 및 관리: 서비스 이용계약 또는 회원가입 해지시까지</li>
                    <li>전자상거래 관련 기록: 5년</li>
                    <li>매쓰쇼츠 문제 세션(추출된 수식 텍스트): 24시간</li>
                    <li>매쓰쇼츠 구매 토큰(중복 적립 방지): 계정 삭제 후에도 보관 — 위 2-4 참조</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">6. 정보주체의 권리·의무</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    정보주체는 터치즌에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>개인정보 열람요구</li>
                    <li>오류 등이 있을 경우 정정 요구</li>
                    <li>삭제요구</li>
                    <li>처리정지 요구</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">7. 처리하는 개인정보 항목</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    터치즌은 서비스 제공을 위해 최소한의 개인정보만을 수집합니다.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>필수항목: 이메일 주소 (Google OAuth를 통해 수집, 계정 인증 및 라이선스 검증용)</li>
                    <li>선택항목: 없음</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">8. 개인정보의 파기</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    터치즌은 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">9. 쿠키 사용</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    터치즌은 정보주체의 이용정보를 저장하고 수시로 불러오는 &apos;쿠키&apos;를 사용하지 않습니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">10. 개인정보 보호책임자</h2>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>성명:</strong> 안국환<br />
                      <strong>직책:</strong> 대표<br />
                      <strong>이메일:</strong> gordon.ahn@gmail.com
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">11. 개인정보 처리방침 변경</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                  </p>
                </>
              ) : lang === 'ja' ? (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    最終更新日: 2026年6月7日
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">1. 個人情報の処理目的</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen（&apos;https://touchizen.com&apos;）は、以下の目的のために個人情報を処理しており、以下の目的以外には使用しません。
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>お客様の登録意思確認</li>
                    <li>サービス提供のための本人識別・認証</li>
                    <li>会員資格の維持・管理</li>
                    <li>ライセンス検証とサブスクリプション管理</li>
                    <li>サービスの改善および新サービスの開発</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">2. サービス別の個人情報処理</h2>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-1. Whisk2CapCut Chrome拡張機能</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Whisk2CapCut Chrome拡張機能は以下のデータを収集・保存します：
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Googleアカウントメール：</strong> Google OAuthを通じて収集され、ライセンス検証とサブスクリプション状態の確認に使用されます</li>
                    <li><strong>ローカル保存データ（Chrome Storage）：</strong>
                      <ul className="list-disc pl-6 mt-2">
                        <li>ライセンスキー</li>
                        <li>使用回数（無料トライアル追跡用）</li>
                        <li>ユーザー設定（言語、テーマなど）</li>
                        <li>エクスポート設定</li>
                      </ul>
                    </li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    このデータはユーザーのデバイスにローカルで保存され、ライセンス検証のためにサーバーに送信されるメールアドレスを除き、外部に送信されることはありません。
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-2. AutoFlowCutデスクトップアプリ</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    AutoFlowCutは、Google AI Studio APIキーでGemini/Veo APIを使用し、AI画像・動画を一括生成して、タイムライン・字幕・アニメーション付きのCapCutプロジェクトとしてエクスポートするデスクトップアプリです。
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">無料ダウンロードアプリ</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                    <li>プロジェクトとエクスポート結果はユーザーのローカルデバイスに保存されます</li>
                    <li>Google AI Studio APIキーはアプリで使用され、AI生成リクエストはGoogleへ直接送信されます</li>
                    <li>Gemini/Veo APIの利用はユーザーのGoogleアカウントのポリシーと割り当てに従います</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">Pro版（有料会員制）</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                    <li><strong>Googleアカウントメール：</strong> Google OAuthを通じて収集され、ライセンス検証とサブスクリプション管理に使用されます</li>
                    <li><strong>ライセンス情報：</strong> サブスクリプション状態とライセンスキー</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    AI画像・動画生成時、プロンプトと参照コンテンツはGemini/Veo APIを通じて処理されます。これはGoogleのプライバシーポリシーに準拠します。
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-3. Calorie Shotモバイルアプリ</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Calorie Shotは、食べ物の写真からカロリーを推定するAIモバイルアプリです。
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>食べ物の写真：</strong> カロリー分析のためにAIサーバーに送信されます。分析後、サーバーに永続的に保存されません</li>
                    <li><strong>分析履歴：</strong> カロリー分析結果はユーザーのデバイスにローカルで保存されます</li>
                    <li><strong>サブスクリプション情報：</strong> アプリストア（Apple App Store / Google Play Store）を通じて管理されます</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">3. Google APIサービスユーザーデータポリシー</h2>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      Google APIから受け取った情報の使用および他のアプリへの転送は、制限付き使用要件を含む<a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Google APIサービスユーザーデータポリシー</a>に準拠しています。
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">4. サードパーティサービス</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    当社は以下のサードパーティサービスを使用しています：
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Lemon Squeezy：</strong> 決済処理。購入時にメールアドレスと決済情報がLemon Squeezyと共有されます。<a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">プライバシーポリシー</a>をご参照ください。</li>
                    <li><strong>Firebase：</strong> 認証およびデータベースサービス。Googleの<a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">プライバシーとセキュリティ</a>をご参照ください。</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">5. 保持期間</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizenは、同意された保持期間または法律で定められた期間内で個人情報を処理・保持します。
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>お客様登録：サービス終了または退会まで</li>
                    <li>電子商取引記録：5年</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">6. データ主体の権利</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    いつでも以下の権利を行使できます：
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>個人情報へのアクセス要求</li>
                    <li>エラーの訂正要求</li>
                    <li>削除要求</li>
                    <li>処理停止要求</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">7. 収集する個人情報</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizenは、サービス提供に必要な最小限の個人情報のみを収集します。
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>必須：メールアドレス（Google OAuthを通じて収集、アカウント認証およびライセンス検証用）</li>
                    <li>任意：なし</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">8. 個人情報の廃棄</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizenは、処理目的が達成された場合、遅滞なく個人情報を廃棄します。
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">9. クッキー</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizenは、ユーザー情報を保存・取得するためのクッキーを使用しません。
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">10. プライバシー責任者</h2>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>氏名:</strong> Gookwhan Ahn<br />
                      <strong>役職:</strong> CEO<br />
                      <strong>メール:</strong> gordon.ahn@gmail.com
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">11. プライバシーポリシーの変更</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    このプライバシーポリシーは施行日から有効です。変更がある場合は、施行の7日前までに告知します。
                  </p>
                </>
              ) : lang === 'de' ? (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Letzte Aktualisierung: 7. Juni 2026
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">1. Zweck der Datenverarbeitung</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen (&apos;https://touchizen.com&apos;) verarbeitet personenbezogene Daten nur für folgende Zwecke:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Bestätigung der Kundenregistrierung</li>
                    <li>Identitätsverifizierung für die Dienstleistung</li>
                    <li>Mitgliedschaftsverwaltung</li>
                    <li>Lizenzverifizierung und Abonnementverwaltung</li>
                    <li>Serviceverbesserung und Entwicklung neuer Dienste</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">2. Datenverarbeitung nach Dienst</h2>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-1. Whisk2CapCut Chrome-Erweiterung</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Die Whisk2CapCut Chrome-Erweiterung sammelt und speichert folgende Daten:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Google-Konto-E-Mail:</strong> Wird über Google OAuth erfasst und zur Lizenzverifizierung und Überprüfung des Abonnementstatus verwendet</li>
                    <li><strong>Lokal gespeicherte Daten (Chrome Storage):</strong>
                      <ul className="list-disc pl-6 mt-2">
                        <li>Lizenzschlüssel</li>
                        <li>Nutzungsanzahl (für kostenlose Testversion)</li>
                        <li>Benutzereinstellungen (Sprache, Theme usw.)</li>
                        <li>Exporteinstellungen</li>
                      </ul>
                    </li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Diese Daten werden lokal auf Ihrem Gerät gespeichert und werden nicht extern übertragen, außer der E-Mail-Adresse, die zur Lizenzverifizierung an unsere Server gesendet wird.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-2. AutoFlowCut Desktop-App</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    AutoFlowCut ist eine Desktop-App, die mit Ihrem Google AI Studio API-Schlüssel Gemini/Veo APIs nutzt, KI-Bilder und -Videos stapelweise generiert und CapCut-Projekte mit Timeline, Untertiteln und Animationen exportiert.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">Kostenloser Download</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                    <li>Projekte und Exporte werden lokal auf dem Gerät des Nutzers gespeichert</li>
                    <li>Der Google AI Studio API-Schlüssel wird in der App verwendet; KI-Generierungsanfragen werden direkt an Google gesendet</li>
                    <li>Die Nutzung der Gemini/Veo APIs folgt den Richtlinien und Kontingenten des Google-Kontos des Nutzers</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">Pro-Version (kostenpflichtiges Abonnement)</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                    <li><strong>Google-Konto-E-Mail:</strong> Wird über Google OAuth erfasst und zur Lizenzverifizierung und Abonnementverwaltung verwendet</li>
                    <li><strong>Lizenzinformationen:</strong> Abonnementstatus und Lizenzschlüssel</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Bei der KI-Bild- und Videogenerierung werden Prompts und Referenzinhalte über Gemini/Veo APIs verarbeitet. Dies unterliegt den Datenschutzrichtlinien von Google.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-3. Calorie Shot Mobile App</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Calorie Shot ist eine KI-Mobile-App, die Kalorien aus Lebensmittelfotos schätzt.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Lebensmittelfotos:</strong> Werden zur Kalorienanalyse an den KI-Server gesendet. Nach der Analyse werden sie nicht dauerhaft auf dem Server gespeichert</li>
                    <li><strong>Analyseverlauf:</strong> Kalorienanalyseergebnisse werden lokal auf dem Gerät des Nutzers gespeichert</li>
                    <li><strong>Abonnementinformationen:</strong> Werden über die App-Stores (Apple App Store / Google Play Store) verwaltet</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">3. Google API-Dienste Nutzerdatenrichtlinie</h2>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      Die Nutzung und Weitergabe von Informationen, die von Google APIs empfangen werden, an andere Apps entspricht der <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Google API-Dienste Nutzerdatenrichtlinie</a>, einschließlich der Anforderungen zur eingeschränkten Nutzung.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">4. Drittanbieter-Dienste</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Wir nutzen folgende Drittanbieter-Dienste:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Lemon Squeezy:</strong> Zahlungsabwicklung. Beim Kauf werden E-Mail-Adresse und Zahlungsinformationen mit Lemon Squeezy geteilt. Siehe deren <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Datenschutzrichtlinie</a>.</li>
                    <li><strong>Firebase:</strong> Authentifizierung und Datenbankdienste. Siehe Googles <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Datenschutz und Sicherheit</a>.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">5. Aufbewahrungsfrist</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen verarbeitet und speichert personenbezogene Daten innerhalb der vereinbarten oder gesetzlich vorgeschriebenen Aufbewahrungsfrist.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Kundenregistrierung: Bis zur Kündigung oder Abmeldung</li>
                    <li>E-Commerce-Aufzeichnungen: 5 Jahre</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">6. Rechte der Betroffenen</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Sie können jederzeit folgende Rechte ausüben:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Auskunft über personenbezogene Daten</li>
                    <li>Berichtigung von Fehlern</li>
                    <li>Löschung</li>
                    <li>Einschränkung der Verarbeitung</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">7. Erhobene personenbezogene Daten</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen erhebt nur die für die Dienstleistung erforderlichen Mindestdaten.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Erforderlich: E-Mail-Adresse (über Google OAuth erfasst, zur Kontoverifizierung und Lizenzvalidierung)</li>
                    <li>Optional: Keine</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">8. Löschung personenbezogener Daten</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen löscht personenbezogene Daten unverzüglich, wenn der Verarbeitungszweck erreicht wurde.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">9. Cookies</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen verwendet keine Cookies zur Speicherung und Abfrage von Benutzerinformationen.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">10. Datenschutzbeauftragter</h2>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Name:</strong> Gookwhan Ahn<br />
                      <strong>Position:</strong> CEO<br />
                      <strong>E-Mail:</strong> gordon.ahn@gmail.com
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">11. Änderungen der Datenschutzrichtlinie</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Diese Datenschutzrichtlinie gilt ab dem Datum des Inkrafttretens. Änderungen werden mindestens 7 Tage vor Inkrafttreten angekündigt.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Last updated: June 7, 2026
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">1. Purpose of Processing Personal Information</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen (&apos;https://touchizen.com&apos;) processes personal information for the following purposes only:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Confirming customer registration intent</li>
                    <li>Identity verification for service provision</li>
                    <li>Membership management</li>
                    <li>License verification and subscription management</li>
                    <li>Service improvement and new service development</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">2. Data Processing by Service</h2>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-1. Whisk2CapCut Chrome Extension</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    The Whisk2CapCut Chrome extension collects and stores the following data:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Google Account Email:</strong> Collected via Google OAuth, used for license verification and subscription status checks</li>
                    <li><strong>Locally Stored Data (Chrome Storage):</strong>
                      <ul className="list-disc pl-6 mt-2">
                        <li>License key</li>
                        <li>Usage count (for free trial tracking)</li>
                        <li>User preferences (language, theme, etc.)</li>
                        <li>Export settings</li>
                      </ul>
                    </li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    This data is stored locally on your device and is not transmitted externally, except for the email address which is sent to our servers for license verification.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-2. AutoFlowCut Desktop App</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    AutoFlowCut is a desktop app that uses Gemini/Veo APIs through your Google AI Studio API key, batch-generates AI images and videos, then exports CapCut projects with timeline, subtitles, and animations.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">Free Download App</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                    <li>Projects and exports are stored locally on the user&apos;s device</li>
                    <li>The Google AI Studio API key is used by the app, and AI generation requests are sent directly to Google</li>
                    <li>Gemini/Veo API usage follows the user&apos;s Google account policy and quota</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">Pro Version (Paid Membership)</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                    <li><strong>Google Account Email:</strong> Collected via Google OAuth, used for license verification and subscription management</li>
                    <li><strong>License Information:</strong> Subscription status and license key</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    When generating AI images and videos, prompts and reference content are processed through Gemini/Veo APIs. This is subject to Google&apos;s privacy policy.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-3. Calorie Shot Mobile App</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Calorie Shot is an AI mobile app that estimates calories from food photos.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Food Photos:</strong> Sent to the AI server for calorie analysis. Photos are not permanently stored on the server after analysis</li>
                    <li><strong>Analysis History:</strong> Calorie analysis results are stored locally on the user&apos;s device</li>
                    <li><strong>Subscription Information:</strong> Managed through app stores (Apple App Store / Google Play Store)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2-4. MathShorts Mobile App</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    MathShorts is a mobile app that solves a maths problem you photograph or type, and turns the solution into a short video.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Problem photos and typed expressions:</strong> Sent to <strong>OpenAI servers in the United States</strong> to generate the solution. We do not store the photo on our servers; it is used only to produce the solution.</li>
                    <li><strong>Extracted expression (LaTeX) text:</strong> Retained for <strong>24 hours</strong> so that the in-app report feature can reference the problem, then processed.</li>
                    <li><strong>Kakao account information:</strong> Collected through Kakao Login. The account identifier is derived from your Kakao member number; nickname, email and profile image are provided only within the scope you consented to in Kakao, and may be absent.</li>
                    <li><strong>Usage records:</strong> Number of problems solved, credit balance and ledger (grants, charges and refunds), and reports you submit.</li>
                    <li><strong>Purchase information:</strong> The Google Play purchase token and order ID, used for server-side verification and to prevent the same purchase being credited twice. We never collect card or payment instrument details; Google Play handles those.</li>
                    <li><strong>Kept only on your device:</strong> Videos you create and your edits are stored on your device and are not uploaded to our servers.</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <strong>International transfers:</strong> MathShorts transfers personal data outside your country in order to generate solutions.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>OpenAI, L.L.C. (United States):</strong> Data — problem photos and typed expressions. Purpose — generating the solution. When and how — transmitted over the network at the moment you request a solution. Retention — we do not store it; OpenAI&apos;s own retention policy applies.</li>
                    <li><strong>Google LLC (United States):</strong> Data — account identifier, usage records, purchase verification data. Purpose — authentication, database and server functions (Firebase Authentication, Cloud Firestore, Cloud Functions, US region). Retention — as set out below.</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You may refuse these transfers, but solving a problem is itself the processing described above, so if you refuse we cannot provide the app&apos;s core function.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <strong>Retained after account deletion:</strong> To stop the same payment being credited twice, we keep the <strong>purchase token together with the time it was credited and the product ID</strong> even after an account is deleted. This record contains no problem photo and no solution content. It exists to prevent fraud; deleting it would allow that payment to be credited again.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    <strong>Exercising your rights:</strong> You can <strong>export your data</strong> and <strong>delete your account</strong> yourself from [Drawer &gt; Profile] in the app. Deleting your account removes the information stored on our servers, apart from the exception above.
                  </p>
                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">3. Google API Services User Data Policy</h2>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      Information received from Google APIs will be used and transferred according to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Google API Services User Data Policy</a>, including the Limited Use requirements.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">4. Third-Party Services</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We use the following third-party services:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Lemon Squeezy:</strong> Payment processing. Your email address and payment information are shared with Lemon Squeezy when you make a purchase. See their <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</a>.</li>
                    <li><strong>Firebase:</strong> Authentication and database services. See Google&apos;s <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Privacy and Security</a>.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">5. Retention Period</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen processes and retains personal information within the agreed retention period or as required by law.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Customer registration: Until service termination or membership withdrawal</li>
                    <li>E-commerce records: 5 years</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">6. Rights of Data Subjects</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You may exercise the following rights at any time:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Request access to personal information</li>
                    <li>Request correction of errors</li>
                    <li>Request deletion</li>
                    <li>Request suspension of processing</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">7. Personal Information Collected</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen collects only the minimum personal information necessary for service provision.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Required: Email address (collected via Google OAuth, for account verification and license validation)</li>
                    <li>Optional: None</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">8. Destruction of Personal Information</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen destroys personal information without delay when the purpose of processing has been achieved.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">9. Cookies</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen does not use cookies to store and retrieve user information.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">10. Privacy Officer</h2>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Name:</strong> Gookwhan Ahn<br />
                      <strong>Title:</strong> CEO<br />
                      <strong>Email:</strong> gordon.ahn@gmail.com
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">11. Changes to Privacy Policy</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    This privacy policy is effective from the date of implementation. Any changes will be announced through notices at least 7 days before implementation.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
