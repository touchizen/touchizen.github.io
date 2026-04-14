// Common installation section for AutoFlowCut MCP and Skills guides.
// Injects the Settings → MCP tab walkthrough into <div id="install-section"></div>.
// Uses the same locale detection pattern as header.js.
(function () {
  const match = window.location.pathname.match(/^\/guide\/([a-z]{2})\/autoflowcut\/(.*)$/);
  if (!match) return;
  const lang = match[1];

  const I18N = {
    en: {
      title: 'Installation',
      badge: '60-second setup',
      lead: 'Install MCP and skills with one click from AutoFlowCut\u2019s Settings panel \u2014 no terminal, no JSON editing.',
      prereqTitle: 'Prerequisite',
      prereqBody: 'Install <a href="https://claude.com/code" target="_blank" rel="noopener" class="underline text-emerald-700 dark:text-emerald-300">Claude Code</a> first. AutoFlowCut detects it automatically.',
      step1: 'Open Settings \u2192 MCP tab',
      step1Body: 'Launch AutoFlowCut, click the \u2699\ufe0f icon in the top right, and switch to the <strong>MCP</strong> tab.',
      step2: 'Pick the skills you want',
      step2Body: 'Each skill has a checkbox. Defaults are checked \u2014 uncheck anything you do not need. The MCP server itself is always installed.',
      step3: 'Click <strong>Register</strong>',
      step3Body: 'AutoFlowCut registers the MCP server with Claude Code and installs the selected skills. A success toast confirms when it\u2019s done.',
      step4: 'Use it from Claude Code',
      step4Body: 'Open Claude Code in any project. The MCP tools and skill commands are available immediately \u2014 no restart required.',
      mockTitle: 'Settings \u2192 MCP tab',
      mockStatusLabel: 'Status',
      mockStatusOk: 'Claude Code: not registered',
      mockSkillsLabel: 'Skills',
      mockActionLabel: 'Action',
      mockBtn: 'Register',
      mockHint: 'Registers the MCP server and installs checked skills.',
      skillStoryDesc: 'YouTube story channel script writing pipeline',
      skillYadamDesc: 'Korean historical tales template (\uc57c\ub2f4)',
      skillWillInstall: 'will install',
      skillInstalled: 'installed',
      verifyTitle: 'Verify',
      verifyBody: 'After registration the status row turns green: <code class="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">Claude Code: registered</code>. Run <code class="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">claude mcp list</code> in any terminal to confirm.',
    },
    ko: {
      title: '\uc124\uce58',
      badge: '60\ucd08\uba74 \ub05d',
      lead: 'AutoFlowCut \uc124\uc815 \ud0ed\uc5d0\uc11c \ud074\ub9ad \ud55c \ubc88\uc73c\ub85c MCP\uc640 \uc2a4\ud0ac\uc744 \uc124\uce58\ud569\ub2c8\ub2e4. \ud130\ubbf8\ub110\ub3c4 JSON \ud3b8\uc9d1\ub3c4 \ud544\uc694 \uc5c6\uc2b5\ub2c8\ub2e4.',
      prereqTitle: '\uc0ac\uc804 \uc900\ube44',
      prereqBody: '<a href="https://claude.com/code" target="_blank" rel="noopener" class="underline text-emerald-700 dark:text-emerald-300">Claude Code</a>\ub97c \uba3c\uc800 \uc124\uce58\ud558\uc138\uc694. AutoFlowCut\uc774 \uc790\ub3d9\uc73c\ub85c \uac10\uc9c0\ud569\ub2c8\ub2e4.',
      step1: '\uc124\uc815 \u2192 MCP \ud0ed \uc5f4\uae30',
      step1Body: 'AutoFlowCut\uc744 \uc2e4\ud589\ud558\uace0 \uc6b0\uc0c1\ub2e8 \u2699\ufe0f \uc544\uc774\ucf58\uc744 \ud074\ub9ad\ud55c \ub4a4 <strong>MCP</strong> \ud0ed\uc73c\ub85c \uc774\ub3d9\ud569\ub2c8\ub2e4.',
      step2: '\uc6d0\ud558\ub294 \uc2a4\ud0ac \uc120\ud0dd',
      step2Body: '\uc2a4\ud0ac\ub9c8\ub2e4 \uccb4\ud06c\ubc15\uc2a4\uac00 \uc788\uc2b5\ub2c8\ub2e4. \uae30\ubcf8\uac12\uc740 \ubaa8\ub450 \uccb4\ud06c\ub418\uc5b4 \uc788\uc73c\ub2c8 \ud544\uc694 \uc5c6\ub294 \uac83\uc740 \uccb4\ud06c \ud574\uc81c\ud558\uc138\uc694. MCP \uc11c\ubc84 \uc790\uccb4\ub294 \ud56d\uc0c1 \uc124\uce58\ub429\ub2c8\ub2e4.',
      step3: '<strong>Register</strong> \ubc84\ud2bc \ud074\ub9ad',
      step3Body: 'MCP \uc11c\ubc84\uac00 Claude Code\uc5d0 \ub4f1\ub85d\ub418\uace0 \uc120\ud0dd\ud55c \uc2a4\ud0ac\uc774 \uc124\uce58\ub429\ub2c8\ub2e4. \uc644\ub8cc \ud1a0\uc2a4\ud2b8\uac00 \ub728\uba74 \ub05d\uc785\ub2c8\ub2e4.',
      step4: 'Claude Code\uc5d0\uc11c \ubc14\ub85c \uc0ac\uc6a9',
      step4Body: '\uc544\ubb34 \ud504\ub85c\uc81d\ud2b8\uc5d0\uc11c\ub098 Claude Code\ub97c \uc5f4\uba74 MCP \ub3c4\uad6c\uc640 \uc2a4\ud0ac \uba85\ub839\uc744 \ubc14\ub85c \uc4f8 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc7ac\uc2dc\uc791 \ud544\uc694 \uc5c6\uc2b5\ub2c8\ub2e4.',
      mockTitle: '\uc124\uc815 \u2192 MCP \ud0ed',
      mockStatusLabel: '\uc0c1\ud0dc',
      mockStatusOk: 'Claude Code: \ub4f1\ub85d \uc548 \ub428',
      mockSkillsLabel: '\uc2a4\ud0ac',
      mockActionLabel: '\uc791\uc5c5',
      mockBtn: 'Register',
      mockHint: 'MCP \uc11c\ubc84\ub97c \ub4f1\ub85d\ud558\uace0 \uccb4\ud06c\ub41c \uc2a4\ud0ac\uc744 \uc124\uce58\ud569\ub2c8\ub2e4.',
      skillStoryDesc: '\uc720\ud29c\ube0c \uc2a4\ud1a0\ub9ac \ucc44\ub110 \ub300\ubcf8 \uc4f0\uae30 \ud30c\uc774\ud504\ub77c\uc778',
      skillYadamDesc: '\ud55c\uad6d \uc57c\ub2f4 \ud15c\ud50c\ub9bf',
      skillWillInstall: '\uc124\uce58 \uc608\uc815',
      skillInstalled: '\uc124\uce58\ub428',
      verifyTitle: '\ud655\uc778',
      verifyBody: '\ub4f1\ub85d \ud6c4 \uc0c1\ud0dc \ud589\uc774 \ub179\uc0c9\uc73c\ub85c \ubc14\ub00d\ub2c8\ub2e4: <code class="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">Claude Code: \ub4f1\ub85d\ub428</code>. \ud130\ubbf8\ub110\uc5d0\uc11c <code class="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">claude mcp list</code>\ub97c \uc2e4\ud589\ud574 \ud655\uc778\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.',
    },
    ja: {
      title: '\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb',
      badge: '60\u79d2\u3067\u5b8c\u4e86',
      lead: 'AutoFlowCut\u306e\u8a2d\u5b9a\u30bf\u30d6\u304b\u3089\u30af\u30ea\u30c3\u30af1\u3064\u3067 MCP\u3068\u30b9\u30ad\u30eb\u3092\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3057\u307e\u3059\u3002\u30bf\u30fc\u30df\u30ca\u30eb\u3082 JSON \u7de8\u96c6\u3082\u4e0d\u8981\u3067\u3059\u3002',
      prereqTitle: '\u524d\u63d0\u6761\u4ef6',
      prereqBody: '\u307e\u305a <a href="https://claude.com/code" target="_blank" rel="noopener" class="underline text-emerald-700 dark:text-emerald-300">Claude Code</a> \u3092\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3057\u3066\u304f\u3060\u3055\u3044\u3002AutoFlowCut\u304c\u81ea\u52d5\u3067\u691c\u51fa\u3057\u307e\u3059\u3002',
      step1: '\u8a2d\u5b9a \u2192 MCP \u30bf\u30d6\u3092\u958b\u304f',
      step1Body: 'AutoFlowCut\u3092\u8d77\u52d5\u3057\u3001\u53f3\u4e0a\u306e \u2699\ufe0f \u30a2\u30a4\u30b3\u30f3\u3092\u30af\u30ea\u30c3\u30af\u3057\u3066 <strong>MCP</strong> \u30bf\u30d6\u306b\u5207\u308a\u66ff\u3048\u307e\u3059\u3002',
      step2: '\u4f7f\u3044\u305f\u3044\u30b9\u30ad\u30eb\u3092\u9078\u629e',
      step2Body: '\u5404\u30b9\u30ad\u30eb\u306b\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u304c\u3042\u308a\u307e\u3059\u3002\u30c7\u30d5\u30a9\u30eb\u30c8\u3067\u3059\u3079\u3066\u9078\u629e\u6e08\u307f \u2014 \u4e0d\u8981\u306a\u3082\u306e\u306f\u30c1\u30a7\u30c3\u30af\u3092\u5916\u3057\u307e\u3059\u3002MCP\u30b5\u30fc\u30d0\u30fc\u672c\u4f53\u306f\u5e38\u306b\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3055\u308c\u307e\u3059\u3002',
      step3: '<strong>Register</strong> \u30dc\u30bf\u30f3\u3092\u30af\u30ea\u30c3\u30af',
      step3Body: 'MCP\u30b5\u30fc\u30d0\u30fc\u304c Claude Code \u306b\u767b\u9332\u3055\u308c\u3001\u9078\u629e\u3057\u305f\u30b9\u30ad\u30eb\u304c\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3055\u308c\u307e\u3059\u3002\u5b8c\u4e86\u3068\u30c8\u30fc\u30b9\u30c8\u304c\u8868\u793a\u3055\u308c\u307e\u3059\u3002',
      step4: 'Claude Code \u3067\u4f7f\u7528',
      step4Body: '\u3069\u306e\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3067\u3082 Claude Code \u3092\u958b\u304f\u3068\u3001MCP\u30c4\u30fc\u30eb\u3068\u30b9\u30ad\u30eb\u30b3\u30de\u30f3\u30c9\u304c\u3059\u3050\u306b\u4f7f\u3048\u307e\u3059\u3002\u518d\u8d77\u52d5\u4e0d\u8981\u3067\u3059\u3002',
      mockTitle: '\u8a2d\u5b9a \u2192 MCP \u30bf\u30d6',
      mockStatusLabel: '\u30b9\u30c6\u30fc\u30bf\u30b9',
      mockStatusOk: 'Claude Code: \u672a\u767b\u9332',
      mockSkillsLabel: '\u30b9\u30ad\u30eb',
      mockActionLabel: '\u30a2\u30af\u30b7\u30e7\u30f3',
      mockBtn: 'Register',
      mockHint: 'MCP\u30b5\u30fc\u30d0\u30fc\u3092\u767b\u9332\u3057\u3001\u30c1\u30a7\u30c3\u30af\u3055\u308c\u305f\u30b9\u30ad\u30eb\u3092\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3057\u307e\u3059\u3002',
      skillStoryDesc: 'YouTube\u30b9\u30c8\u30fc\u30ea\u30fc\u30c1\u30e3\u30f3\u30cd\u30eb\u53f0\u672c\u30d1\u30a4\u30d7\u30e9\u30a4\u30f3',
      skillYadamDesc: '\u97d3\u56fd\u91ce\u8b5a\uff08\u30e4\u30c0\u30e0\uff09\u30c6\u30f3\u30d7\u30ec\u30fc\u30c8',
      skillWillInstall: '\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u4e88\u5b9a',
      skillInstalled: '\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u6e08\u307f',
      verifyTitle: '\u78ba\u8a8d',
      verifyBody: '\u767b\u9332\u5f8c\u3001\u30b9\u30c6\u30fc\u30bf\u30b9\u884c\u304c\u7dd1\u8272\u306b\u5909\u308f\u308a\u307e\u3059: <code class="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">Claude Code: \u767b\u9332\u6e08\u307f</code>\u3002\u30bf\u30fc\u30df\u30ca\u30eb\u3067 <code class="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">claude mcp list</code> \u3092\u5b9f\u884c\u3057\u3066\u78ba\u8a8d\u3067\u304d\u307e\u3059\u3002',
    },
    de: {
      title: 'Installation',
      badge: 'In 60 Sekunden',
      lead: 'Installieren Sie MCP und Skills mit einem Klick aus dem Einstellungs-Tab von AutoFlowCut \u2014 ohne Terminal, ohne JSON zu bearbeiten.',
      prereqTitle: 'Voraussetzung',
      prereqBody: 'Installieren Sie zuerst <a href="https://claude.com/code" target="_blank" rel="noopener" class="underline text-emerald-700 dark:text-emerald-300">Claude Code</a>. AutoFlowCut erkennt es automatisch.',
      step1: 'Einstellungen \u2192 MCP-Tab \u00f6ffnen',
      step1Body: 'Starten Sie AutoFlowCut, klicken Sie oben rechts auf das \u2699\ufe0f-Symbol und wechseln Sie zum <strong>MCP</strong>-Tab.',
      step2: 'Skills ausw\u00e4hlen',
      step2Body: 'Jeder Skill hat ein H\u00e4kchen. Standardm\u00e4\u00dfig sind alle aktiviert \u2014 deaktivieren Sie nicht ben\u00f6tigte. Der MCP-Server selbst wird immer installiert.',
      step3: 'Klick auf <strong>Register</strong>',
      step3Body: 'AutoFlowCut registriert den MCP-Server bei Claude Code und installiert die ausgew\u00e4hlten Skills. Eine Erfolgsmeldung best\u00e4tigt den Vorgang.',
      step4: 'In Claude Code verwenden',
      step4Body: '\u00d6ffnen Sie Claude Code in einem beliebigen Projekt. MCP-Werkzeuge und Skill-Befehle sind sofort verf\u00fcgbar \u2014 kein Neustart n\u00f6tig.',
      mockTitle: 'Einstellungen \u2192 MCP-Tab',
      mockStatusLabel: 'Status',
      mockStatusOk: 'Claude Code: nicht registriert',
      mockSkillsLabel: 'Skills',
      mockActionLabel: 'Aktion',
      mockBtn: 'Register',
      mockHint: 'Registriert den MCP-Server und installiert ausgew\u00e4hlte Skills.',
      skillStoryDesc: 'YouTube-Story-Kanal-Skript-Pipeline',
      skillYadamDesc: 'Koreanische Geschichten-Vorlage (Yadam)',
      skillWillInstall: 'wird installiert',
      skillInstalled: 'installiert',
      verifyTitle: '\u00dcberpr\u00fcfen',
      verifyBody: 'Nach der Registrierung wird die Statuszeile gr\u00fcn: <code class="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">Claude Code: registriert</code>. F\u00fchren Sie <code class="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">claude mcp list</code> im Terminal aus, um es zu best\u00e4tigen.',
    },
  };

  const t = I18N[lang] || I18N.en;

  const html = `
    <div id="installation" class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6 md:p-8 mb-8">
      <h2 class="text-xl font-bold mb-3 flex items-center gap-3">
        <span class="text-2xl">\u26a1</span>
        ${t.title}
        <span class="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-medium">${t.badge}</span>
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">${t.lead}</p>

      <!-- Prerequisite -->
      <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
        <p class="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">\ud83d\udca1 ${t.prereqTitle}</p>
        <p class="text-sm text-amber-700 dark:text-amber-400">${t.prereqBody}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Steps -->
        <div class="space-y-4">
          ${[
            { n: 1, h: t.step1, b: t.step1Body },
            { n: 2, h: t.step2, b: t.step2Body },
            { n: 3, h: t.step3, b: t.step3Body },
            { n: 4, h: t.step4, b: t.step4Body },
          ].map(s => `
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 flex-shrink-0 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">${s.n}</div>
              <div class="flex-1">
                <h3 class="font-semibold mb-1 text-gray-900 dark:text-white">${s.h}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">${s.b}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Settings Tab Mockup -->
        <div class="bg-gray-800 dark:bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <!-- Title bar -->
          <div class="bg-gray-900 dark:bg-black px-4 py-2 flex items-center gap-2 border-b border-gray-700">
            <span class="w-3 h-3 rounded-full bg-red-500"></span>
            <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span class="w-3 h-3 rounded-full bg-green-500"></span>
            <span class="text-xs text-gray-400 ml-2 font-mono">${t.mockTitle}</span>
          </div>
          <!-- Tabs -->
          <div class="flex border-b border-gray-700 px-2 pt-2 bg-gray-800">
            <div class="px-3 py-1.5 text-xs text-gray-500">\ud83d\udcc1</div>
            <div class="px-3 py-1.5 text-xs text-gray-500">\ud83c\udfac</div>
            <div class="px-3 py-1.5 text-xs text-gray-500">\ud83c\udfa8</div>
            <div class="px-3 py-1.5 text-xs text-emerald-400 border-b-2 border-emerald-400 -mb-px">\ud83d\udd0c MCP</div>
          </div>
          <!-- Content -->
          <div class="p-4 space-y-3">
            <div class="flex items-start gap-3">
              <span class="text-xs text-gray-400 w-16 mt-0.5">${t.mockStatusLabel}</span>
              <span class="text-xs text-gray-500">${t.mockStatusOk}</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-xs text-gray-400 w-16 mt-0.5">${t.mockSkillsLabel}</span>
              <div class="flex-1 space-y-2">
                <label class="flex items-start gap-2">
                  <input type="checkbox" checked disabled class="mt-1 accent-emerald-500">
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-semibold text-gray-200">story-engine</span>
                      <span class="text-[10px] text-blue-400">\uff0b ${t.skillWillInstall}</span>
                    </div>
                    <div class="text-[11px] text-gray-500">${t.skillStoryDesc}</div>
                  </div>
                </label>
                <label class="flex items-start gap-2">
                  <input type="checkbox" checked disabled class="mt-1 accent-emerald-500">
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-semibold text-gray-200">yadam</span>
                      <span class="text-[10px] text-blue-400">\uff0b ${t.skillWillInstall}</span>
                    </div>
                    <div class="text-[11px] text-gray-500">${t.skillYadamDesc}</div>
                  </div>
                </label>
              </div>
            </div>
            <div class="flex items-start gap-3 pt-1">
              <span class="text-xs text-gray-400 w-16 mt-1">${t.mockActionLabel}</span>
              <div class="flex-1">
                <button class="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-4 py-1.5 rounded">${t.mockBtn}</button>
                <p class="text-[11px] text-gray-500 mt-1.5">${t.mockHint}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Verify -->
      <div class="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 mt-6">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u2705 ${t.verifyTitle}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">${t.verifyBody}</p>
      </div>
    </div>
  `;

  const target = document.getElementById('install-section');
  if (target) target.innerHTML = html;
})();
