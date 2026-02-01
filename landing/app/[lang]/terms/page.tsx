'use client';

import { useRouter, useParams } from 'next/navigation';
import { Language, languages } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;

  // Validate lang parameter
  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}/terms`);
  };

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />

      <section className="pt-32 pb-20">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              {lang === 'ko' ? '서비스 이용약관' : lang === 'ja' ? '利用規約' : lang === 'de' ? 'Nutzungsbedingungen' : 'Terms of Service'}
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              {lang === 'ko' ? (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    최종 수정일: 2024년 1월 1일
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">제1조 (목적)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    본 회원약관은 터치즌(이하 &apos;회사&apos;)이 운영하는 인터넷 관련 서비스(이하 &apos;서비스&apos;)를 이용함에 있어 회사와 이용자(이하 &apos;회원&apos;)의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">제2조 (약관의 효력)</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>본 약관은 회사에 회원 가입 시 회원들에게 통지함으로써 효력을 발생합니다.</li>
                    <li>회사는 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 동일한 방법으로 공지함으로써 효력을 발생합니다.</li>
                    <li>약관의 변경사항 및 내용은 회사의 홈페이지에 게시하는 방법으로 공시합니다.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">제3조 (약관 이외의 준칙)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    이 약관에 명시되지 않은 사항이 관련 법령에 규정되어 있는 경우 그 규정에 따릅니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">제4조 (이용계약의 체결)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    회원 가입 시 회원 약관에 동의하면 약관에 동의하여 이 계약이 체결된 것으로 간주합니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">제5조 (서비스 제공의 중지)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    회사는 다음의 경우 서비스의 제공을 중지할 수 있습니다:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>설비의 보수 등을 위하여 부득이한 경우</li>
                    <li>전기통신사업자가 전기통신서비스를 중지하는 경우</li>
                    <li>기타 회사가 서비스를 제공할 수 없는 사유가 발생한 경우</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">제6조 (회사의 의무)</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>회사는 계속적, 안정적으로 서비스를 제공할 수 있도록 최선의 노력을 다합니다.</li>
                    <li>회사는 회원의 개인정보 보안에 최선을 다합니다.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">제7조 (회원의 의무)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    회원은 다음 행위를 하여서는 안됩니다:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>다른 회원의 계정을 부정 사용하는 행위</li>
                    <li>범죄행위를 목적으로 하거나 관련된 행위</li>
                    <li>타인의 명예를 훼손하거나 모욕하는 행위</li>
                    <li>타인의 지적재산권을 침해하는 행위</li>
                    <li>해킹행위 또는 바이러스 유포행위</li>
                    <li>서비스의 안정적인 운영에 지장을 주는 행위</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">제8조 (게시물에 대한 권리)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    게시물에 대한 저작권을 포함한 모든 권리 및 책임은 이를 게시한 회원에게 있습니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">제9조 (면책)</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>회사는 회원이 서비스에 게재한 정보의 정확성, 신뢰성에 대해 책임을 부담하지 않습니다.</li>
                    <li>회원 간 또는 회원과 제3자 간의 분쟁에 대해 회사는 책임을 부담하지 않습니다.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">제10조 (분쟁의 해결)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    회사와 회원은 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다. 소송이 제기될 경우 회사의 소재지를 관할하는 법원의 관할로 합니다.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">부칙</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    이 약관은 2024년 1월 1일부터 시행합니다.
                  </p>
                </>
              ) : lang === 'ja' ? (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    最終更新日: 2024年1月1日
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">第1条（目的）</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    この利用規約は、Touchizen（以下「会社」）が運営するインターネット関連サービス（以下「サービス」）の利用に関して、会社とユーザー（以下「会員」）の権利、義務、責任を定めることを目的とします。
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">第2条（規約の効力）</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>この規約は、会員登録時に会員に通知することで効力を発生します。</li>
                    <li>会社はこの規約の内容を変更することができ、変更は同様の方法で公示することで効力を発生します。</li>
                    <li>規約の変更は会社のウェブサイトに掲載します。</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">第3条（規約以外の準則）</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    この規約に明記されていない事項は、関連法令に従います。
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">第4条（サービス契約）</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    会員登録時に規約に同意することで、サービス契約が締結されたとみなします。
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">第5条（サービスの中断）</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    会社は以下の場合にサービスを中断することがあります：
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>設備のメンテナンスが必要な場合</li>
                    <li>通信事業者がサービスを中断した場合</li>
                    <li>その他サービス提供ができない状況が発生した場合</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">第6条（会社の義務）</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>会社は継続的かつ安定したサービスの提供に最善を尽くします。</li>
                    <li>会社は会員の個人情報のセキュリティを優先します。</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">第7条（会員の義務）</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    会員は以下の行為を行ってはなりません：
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>他の会員のアカウントの不正使用</li>
                    <li>犯罪行為または関連行為</li>
                    <li>他者の名誉毀損または侮辱</li>
                    <li>知的財産権の侵害</li>
                    <li>ハッキングまたはウイルスの配布</li>
                    <li>安定したサービス運営を妨げる行為</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">第8条（コンテンツの権利）</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    投稿されたコンテンツに関する著作権を含むすべての権利と責任は、投稿した会員に帰属します。
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">第9条（免責）</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>会社は会員が投稿した情報の正確性や信頼性について責任を負いません。</li>
                    <li>会社は会員間または会員と第三者間の紛争について責任を負いません。</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">第10条（紛争解決）</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    会社と会員は、サービスに関連する紛争を円満に解決するために必要なすべての努力を行います。訴訟が提起された場合、会社所在地の管轄裁判所とします。
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">附則</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    この規約は2024年1月1日から施行します。
                  </p>
                </>
              ) : lang === 'de' ? (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Letzte Aktualisierung: 1. Januar 2024
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Artikel 1 (Zweck)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Diese Nutzungsbedingungen definieren die Rechte, Pflichten und Verantwortlichkeiten zwischen Touchizen (im Folgenden &apos;Unternehmen&apos;) und Nutzern (im Folgenden &apos;Mitglieder&apos;) bezüglich der Nutzung von Internetdiensten (im Folgenden &apos;Dienste&apos;).
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Artikel 2 (Wirksamkeit der Bedingungen)</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Diese Bedingungen werden bei der Registrierung durch Mitteilung an die Mitglieder wirksam.</li>
                    <li>Das Unternehmen kann diese Bedingungen ändern, und Änderungen werden durch öffentliche Bekanntmachung wirksam.</li>
                    <li>Änderungen der Bedingungen werden auf der Website des Unternehmens bekannt gegeben.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Artikel 3 (Über die Bedingungen hinausgehende Regeln)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Angelegenheiten, die nicht in diesen Bedingungen festgelegt sind, unterliegen den geltenden Gesetzen und Vorschriften.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Artikel 4 (Dienstvertrag)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Durch Zustimmung zu den Bedingungen bei der Registrierung gilt der Dienstvertrag als abgeschlossen.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Artikel 5 (Dienstunterbrechung)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Das Unternehmen kann Dienste in folgenden Fällen unterbrechen:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Bei notwendiger Wartung der Einrichtungen</li>
                    <li>Wenn Telekommunikationsanbieter Dienste unterbrechen</li>
                    <li>Bei anderen Umständen, die die Dienstleistung verhindern</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Artikel 6 (Pflichten des Unternehmens)</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Das Unternehmen bemüht sich um kontinuierliche und stabile Dienstleistungen.</li>
                    <li>Das Unternehmen priorisiert die Sicherheit der persönlichen Daten der Mitglieder.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Artikel 7 (Pflichten der Mitglieder)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Mitglieder dürfen folgende Aktivitäten nicht ausüben:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Unbefugte Nutzung von Konten anderer Mitglieder</li>
                    <li>Kriminelle Aktivitäten oder damit verbundene Handlungen</li>
                    <li>Rufschädigung oder Beleidigung anderer</li>
                    <li>Verletzung von geistigem Eigentum</li>
                    <li>Hacking oder Virenverbreitung</li>
                    <li>Handlungen, die den stabilen Dienstbetrieb stören</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Artikel 8 (Rechte an Inhalten)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Alle Rechte und Verantwortlichkeiten für gepostete Inhalte, einschließlich Urheberrecht, liegen beim Mitglied, das sie gepostet hat.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Artikel 9 (Haftungsausschluss)</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Das Unternehmen ist nicht verantwortlich für die Richtigkeit oder Zuverlässigkeit von von Mitgliedern geposteten Informationen.</li>
                    <li>Das Unternehmen ist nicht verantwortlich für Streitigkeiten zwischen Mitgliedern oder zwischen Mitgliedern und Dritten.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Artikel 10 (Streitbeilegung)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Das Unternehmen und die Mitglieder unternehmen alle notwendigen Anstrengungen, um Streitigkeiten im Zusammenhang mit Diensten gütlich beizulegen. Bei Rechtsstreitigkeiten ist der Gerichtsstand am Sitz des Unternehmens.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Ergänzende Bestimmungen</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Diese Bedingungen gelten ab dem 1. Januar 2024.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Last updated: January 1, 2024
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Article 1 (Purpose)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    These Terms of Service define the rights, obligations, and responsibilities between Touchizen (hereinafter &apos;Company&apos;) and users (hereinafter &apos;Members&apos;) regarding the use of internet-related services (hereinafter &apos;Services&apos;).
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Article 2 (Effect of Terms)</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>These terms become effective upon notification to members at the time of registration.</li>
                    <li>The Company may change these terms, and changes become effective upon public notice.</li>
                    <li>Changes to the terms are announced on the Company&apos;s website.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Article 3 (Rules Beyond Terms)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Matters not specified in these terms shall be governed by applicable laws and regulations.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Article 4 (Service Agreement)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    By agreeing to the terms during registration, the service agreement is considered concluded.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Article 5 (Service Suspension)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    The Company may suspend services in the following cases:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>When necessary for facility maintenance</li>
                    <li>When telecommunications providers suspend services</li>
                    <li>When other circumstances prevent service provision</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Article 6 (Company&apos;s Obligations)</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>The Company shall make best efforts to provide continuous and stable services.</li>
                    <li>The Company shall prioritize the security of members&apos; personal information.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Article 7 (Member&apos;s Obligations)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Members shall not engage in the following activities:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Unauthorized use of other members&apos; accounts</li>
                    <li>Criminal activities or related actions</li>
                    <li>Defamation or insult of others</li>
                    <li>Infringement of intellectual property rights</li>
                    <li>Hacking or virus distribution</li>
                    <li>Actions that disrupt stable service operation</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Article 8 (Rights to Content)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    All rights and responsibilities for posted content, including copyright, belong to the member who posted it.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Article 9 (Disclaimer)</h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>The Company is not responsible for the accuracy or reliability of information posted by members.</li>
                    <li>The Company is not responsible for disputes between members or between members and third parties.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Article 10 (Dispute Resolution)</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    The Company and members shall make all necessary efforts to amicably resolve disputes related to services. If litigation is filed, it shall be under the jurisdiction of the court where the Company is located.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Supplementary Provisions</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    These terms shall be effective from January 1, 2024.
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
