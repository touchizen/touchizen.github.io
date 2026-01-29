'use client';

import { useState, useEffect } from 'react';
import { Language, detectLanguage } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const [lang, setLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLang(detectLanguage());
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={setLang} />

      <section className="pt-32 pb-20">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              {lang === 'ko' ? '개인정보 처리방침' : 'Privacy Policy'}
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              {lang === 'ko' ? (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    최종 수정일: 2024년 1월 1일
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">1. 개인정보의 처리 목적</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    터치즌(&apos;https://touchizen.com&apos;)은 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>고객 가입의사 확인</li>
                    <li>고객에 대한 서비스 제공에 따른 본인 식별 및 인증</li>
                    <li>회원자격 유지 및 관리</li>
                    <li>서비스 개선 및 신규 서비스 개발</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">2. 개인정보의 처리 및 보유 기간</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    터치즌은 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>고객 가입 및 관리: 서비스 이용계약 또는 회원가입 해지시까지</li>
                    <li>전자상거래 관련 기록: 5년</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">3. 정보주체의 권리·의무</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    정보주체는 터치즌에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>개인정보 열람요구</li>
                    <li>오류 등이 있을 경우 정정 요구</li>
                    <li>삭제요구</li>
                    <li>처리정지 요구</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">4. 처리하는 개인정보 항목</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    터치즌은 서비스 제공을 위해 최소한의 개인정보만을 수집합니다.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>필수항목: 이메일 주소 (계정 인증 시)</li>
                    <li>선택항목: 없음</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">5. 개인정보의 파기</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    터치즌은 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">6. 쿠키 사용</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    터치즌은 정보주체의 이용정보를 저장하고 수시로 불러오는 &apos;쿠키&apos;를 사용하지 않습니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">7. 개인정보 보호책임자</h2>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>성명:</strong> 안국환<br />
                      <strong>직책:</strong> 대표<br />
                      <strong>이메일:</strong> gordon.ahn@gmail.com
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">8. 개인정보 처리방침 변경</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Last updated: January 1, 2024
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">1. Purpose of Processing Personal Information</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen (&apos;https://touchizen.com&apos;) processes personal information for the following purposes only:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Confirming customer registration intent</li>
                    <li>Identity verification for service provision</li>
                    <li>Membership management</li>
                    <li>Service improvement and new service development</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">2. Retention Period</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen processes and retains personal information within the agreed retention period or as required by law.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Customer registration: Until service termination or membership withdrawal</li>
                    <li>E-commerce records: 5 years</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">3. Rights of Data Subjects</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You may exercise the following rights at any time:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Request access to personal information</li>
                    <li>Request correction of errors</li>
                    <li>Request deletion</li>
                    <li>Request suspension of processing</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">4. Personal Information Collected</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen collects only the minimum personal information necessary for service provision.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Required: Email address (for account verification)</li>
                    <li>Optional: None</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">5. Destruction of Personal Information</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen destroys personal information without delay when the purpose of processing has been achieved.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">6. Cookies</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Touchizen does not use cookies to store and retrieve user information.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">7. Privacy Officer</h2>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Name:</strong> Kukhwan Ahn<br />
                      <strong>Title:</strong> CEO<br />
                      <strong>Email:</strong> gordon.ahn@gmail.com
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">8. Changes to Privacy Policy</h2>
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
