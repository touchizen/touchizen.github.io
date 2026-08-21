'use client';

import { useRouter, useParams } from 'next/navigation';
import { Language, languages } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Google Play requires two deletion paths, not one: an in-app path, and "a web
// link resource where users can request app account deletion", submitted in the
// Data safety form. The web page exists for people who already uninstalled the
// app and would otherwise have to reinstall it to be forgotten.
export default function DeleteAccountPage() {
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;

  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}/delete-account`);
  };

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />

      <section className="pt-32 pb-20">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              {lang === 'ko' ? '계정 및 데이터 삭제' : lang === 'ja' ? 'アカウントとデータの削除' : lang === 'de' ? 'Konto- und Datenlöschung' : 'Account and Data Deletion'}
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              {lang === 'ko' ? (
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
