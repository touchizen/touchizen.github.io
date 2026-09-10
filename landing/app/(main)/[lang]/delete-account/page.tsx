'use client';

import { Suspense } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Language, languages } from '@/lib/i18n';
import { DeleteAccountApp, deleteAccountAppFromSearch, deleteAccountPath } from '@/lib/delete-account';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Google Play requires two deletion paths, not one: an in-app path, and "a web
// link resource where users can request app account deletion", submitted in the
// Data safety form. The web page exists for people who already uninstalled the
// app and would otherwise have to reinstall it to be forgotten.
function DeleteAccountContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const paramLang = params.lang as string;

  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';
  const app = deleteAccountAppFromSearch(searchParams.get('app'));

  const handleLanguageChange = (newLang: Language) => {
    router.push(deleteAccountPath(newLang, app));
  };

  const selectApp = (next: DeleteAccountApp) => router.replace(deleteAccountPath(lang, next));

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />

      <section className="pt-32 pb-20">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              {lang === 'ko' ? '계정 및 데이터 삭제' : lang === 'ja' ? 'アカウントとデータの削除' : lang === 'de' ? 'Konto- und Datenlöschung' : 'Account and Data Deletion'}
            </h1>

            <div role="tablist" aria-label={lang === 'ko' ? '앱 선택' : 'Choose app'} className="mb-8 flex gap-2 border-b border-gray-200 dark:border-gray-700">
              <button
                type="button"
                role="tab"
                aria-selected={app === 'mathshorts'}
                onClick={() => selectApp('mathshorts')}
                className={`px-4 py-3 font-semibold ${app === 'mathshorts' ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
              >
                MathShorts
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={app === 'datrans'}
                onClick={() => selectApp('datrans')}
                className={`px-4 py-3 font-semibold ${app === 'datrans' ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
              >
                다번역 (Datrans)
              </button>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              {app === 'datrans' && lang === 'ko' ? (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    다번역(Datrans) 계정과 당사 서버에 저장되는 데이터를 삭제하는 방법입니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">계정 삭제 요청</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    다번역 앱을 이미 삭제했거나 로그인할 수 없는 경우에도 아래 이메일로 계정 삭제를 요청할 수 있습니다.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>이메일:</strong> <a href="mailto:gordon.ahn@gmail.com?subject=%5BDatrans%5D%20%EA%B3%84%EC%A0%95%20%EC%82%AD%EC%A0%9C%20%EC%9A%94%EC%B2%AD" className="text-blue-600 dark:text-blue-400 underline">gordon.ahn@gmail.com</a>
                      <br />
                      제목에 <strong>[Datrans] 계정 삭제 요청</strong>을 적고, 로그인에 사용한 <strong>이메일 주소</strong>와 로그인 방식(<strong>Google</strong> 또는 <strong>이메일/비밀번호</strong>)을 알려 주세요. 비밀번호, API 키, 문서 내용은 보내지 마세요.
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    요청은 본인 확인 후 <strong>30일 이내</strong>에 처리합니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">삭제되는 서버 데이터</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Firebase Authentication에 있는 계정 식별자, 이메일 주소와 로그인 제공업체 연결 정보</li>
                    <li>계정 인증과 Pro 구독 권한 확인에 필요한 서버 측 계정 정보</li>
                    <li>계정에 연결된 크레딧 지갑, 구매 검증 및 지급·차감·환불 기록</li>
                    <li>같은 요청의 복구를 위해 임시 보관 중인 크레딧 번역 결과와 관련 요청 정보</li>
                  </ul>

                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    법령에 따라 보존해야 하는 기록은 <a href="/ko/privacy" className="text-blue-600 dark:text-blue-400 underline">개인정보 처리방침</a>에 안내된 보유 기간과 법정 보존 의무에 따라 처리됩니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">기기에만 있는 데이터</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    가져온 PDF·EPUB 파일, 완성된 번역 문서 파일, 필기, 번역 대화 기록과 BYOK API 키는 기기에 저장되므로 이 웹 요청으로 기기의 사본을 삭제할 수 없습니다. 필요하면 기기에서 문서와 내보낸 사본을 직접 지우고 앱 데이터 삭제 또는 앱 제거를 진행해 주세요. 크레딧 번역의 서버 임시 결과는 위 삭제 요청 범위에 포함됩니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Google Play 구독</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    계정 삭제 요청은 Google Play 구독을 자동으로 취소하지 않습니다. 활성 Pro 구독은 Google Play의 구독 관리 화면에서 별도로 취소해 주세요. 결제수단 및 Google Play 구매 기록은 Google의 정책에 따라 처리됩니다.
                  </p>
                </>
              ) : app === 'datrans' ? (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    How to request deletion of your Datrans account and the data stored on our servers.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Request account deletion</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You can request deletion even if you have already uninstalled Datrans or cannot sign in.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Email:</strong> <a href="mailto:gordon.ahn@gmail.com?subject=%5BDatrans%5D%20Account%20deletion%20request" className="text-blue-600 dark:text-blue-400 underline">gordon.ahn@gmail.com</a>
                      <br />
                      Use the subject <strong>[Datrans] Account deletion request</strong>. Include the <strong>email address</strong> used to sign in and the sign-in method (<strong>Google</strong> or <strong>email/password</strong>). Do not send a password, API key or document content.
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Requests are processed after identity verification and <strong>within 30 days</strong>.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Server data deleted</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Your Firebase Authentication account identifier, email address and linked sign-in provider</li>
                    <li>Server-side account information needed for account authentication and Pro subscription-entitlement checks</li>
                    <li>Credit wallets, purchase-verification records, and credit grant, charge and refund records linked to your account</li>
                    <li>Credit translation results temporarily stored to recover the same request, and their associated request information</li>
                  </ul>

                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Records that must be retained by law remain subject to the retention periods and legal retention obligations described in our <a href="/en/privacy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</a>.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Data stored only on your device</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Imported PDF and EPUB files, completed translated document files, annotations, translation-chat history and BYOK API keys are stored on your device. This web request cannot delete those device copies. Delete documents and exported copies from your device, then clear app data or uninstall the app if needed. Temporary server results from credit translations are included in the deletion request described above.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Google Play subscription</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Deleting an account does not automatically cancel a Google Play subscription. Cancel an active Pro subscription separately in Google Play&apos;s subscription-management screen. Google handles payment methods and its purchase records under its own policies.
                  </p>
                </>
              ) : lang === 'ko' ? (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    매쓰쇼츠(MathShorts) 계정과 저장된 데이터를 삭제하는 방법입니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">앱에서 직접 삭제하기</h2>
                  <ol className="list-decimal pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>매쓰쇼츠 앱을 엽니다.</li>
                    <li>왼쪽 위 메뉴(햄버거)를 눌러 서랍을 엽니다.</li>
                    <li>맨 위의 <strong>계정 영역</strong>을 눌러 프로필로 들어갑니다.</li>
                    <li><strong>계정 삭제</strong>를 누르고 확인합니다.</li>
                  </ol>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    삭제 전에 같은 화면의 <strong>내 데이터 내보내기</strong>로 저장된 내용을 먼저 받아 두실 수 있습니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">앱을 이미 지웠다면</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    앱을 삭제하셨거나 로그인할 수 없는 경우, 아래 주소로 삭제를 요청해 주세요.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>이메일:</strong> <a href="mailto:gordon.ahn@gmail.com?subject=%5BMathShorts%5D%20%EA%B3%84%EC%A0%95%20%EC%82%AD%EC%A0%9C%20%EC%9A%94%EC%B2%AD" className="text-blue-600 dark:text-blue-400 underline">gordon.ahn@gmail.com</a>
                      <br />
                      제목에 <strong>[MathShorts] 계정 삭제 요청</strong>을 적고, 가입에 사용하신 <strong>카카오 계정의 이메일 또는 닉네임</strong>을 알려 주세요. 본인 확인 후 처리해 드립니다.
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    요청은 접수 후 <strong>30일 이내</strong>에 처리합니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">삭제되는 데이터</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>계정 식별자와 카카오에서 받은 프로필 정보(닉네임·이메일·프로필 사진)</li>
                    <li>크레딧 잔액과 원장(적립·차감·환급 내역)</li>
                    <li>푼 문제 기록과 저장된 수식</li>
                    <li>앱에서 제출한 신고 내역</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    만드신 영상과 편집 내용은 <strong>기기에만</strong> 저장되어 있으므로 서버에서 지울 대상이 아닙니다. 앱을 삭제하시면 함께 사라집니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">삭제 후에도 보관되는 항목</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    동일한 결제로 크레딧이 중복 적립되는 것을 막기 위해, <strong>구매 토큰과 그 적립 시각·상품 ID</strong>는 계정 삭제 후에도 보관합니다. 이 기록에는 문제 사진이나 풀이 내용, 프로필 정보가 포함되지 않습니다. 부정 이용 방지를 위한 것으로, 지울 경우 해당 결제가 다시 적립될 수 있습니다. 자세한 내용은 <a href="/ko/privacy" className="text-blue-600 dark:text-blue-400 underline">개인정보 처리방침</a>을 참고해 주세요.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    How to delete your MathShorts account and the data stored with it.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Delete from inside the app</h2>
                  <ol className="list-decimal pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Open the MathShorts app.</li>
                    <li>Tap the menu button at the top left to open the drawer.</li>
                    <li>Tap the <strong>account area</strong> at the top of the drawer to open your profile.</li>
                    <li>Tap <strong>Delete account</strong> and confirm.</li>
                  </ol>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Before deleting, you can use <strong>Export my data</strong> on the same screen to keep a copy of what is stored.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">If you already uninstalled the app</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    If you have removed the app or cannot sign in, request deletion at the address below.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Email:</strong> <a href="mailto:gordon.ahn@gmail.com?subject=%5BMathShorts%5D%20Account%20deletion%20request" className="text-blue-600 dark:text-blue-400 underline">gordon.ahn@gmail.com</a>
                      <br />
                      Use the subject <strong>[MathShorts] Account deletion request</strong> and tell us the <strong>email address or nickname of the Kakao account</strong> you signed up with, so we can verify it is yours.
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Requests are processed <strong>within 30 days</strong> of receipt.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">What gets deleted</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Your account identifier and the profile details received from Kakao (nickname, email, profile image)</li>
                    <li>Your credit balance and ledger (grants, charges and refunds)</li>
                    <li>Your solved-problem records and the expressions stored with them</li>
                    <li>Any reports you submitted from the app</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Videos you created and your edits are stored <strong>only on your device</strong>, so there is nothing to delete for them on our servers. Uninstalling the app removes them.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">What is kept after deletion</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    To stop the same payment being credited twice, we keep the <strong>purchase token together with the time it was credited and the product ID</strong> after an account is deleted. This record contains no problem photo, no solution content and no profile details. It exists to prevent fraud; deleting it would allow that payment to be credited again. See the <a href="/en/privacy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</a> for details.
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

export default function DeleteAccountPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white dark:bg-gray-950" />}>
      <DeleteAccountContent />
    </Suspense>
  );
}
