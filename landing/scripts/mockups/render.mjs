#!/usr/bin/env node
/**
 * Story 단계별 목업 PNG 렌더러.
 *
 *   node render.mjs            # 전체(7종 × ko/en = 14장)
 *   node render.mjs scenes     # 한 종류만
 *   node render.mjs --html     # PNG 없이 HTML만 남겨 브라우저로 확인
 *
 * 언어: **ko와 en만 만든다.** AutoFlowCut 로케일은 ko/en 둘뿐이고 스토리 출력 언어도
 * ko/en 둘뿐이라, ja/de 목업을 따로 만들면 en과 픽셀까지 같은 파일이 복제될 뿐이다.
 * ja/de 글은 -en.png를 참조하고 캡션만 각 언어로 쓴다. (SPEC.md 참고)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, '..', '..', 'public', 'images', 'blog', 'story')
const TMP = join(HERE, '.build')

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
// CSS px. 2배율로 찍는다. 1240(기존 목업 폭)이면 한국어 스텝퍼 칩 7개 + [전체 진행]이
// 한 줄에 안 들어가 오른쪽이 잘린다 — 실제 앱은 track이 가로 스크롤되지만 목업은 잘릴 뿐이라 넓혔다.
const WIDTH = 1400

const data = JSON.parse(readFileSync(join(HERE, 'data.json'), 'utf8'))
const strings = JSON.parse(readFileSync(join(HERE, 'strings.json'), 'utf8'))
const enNames = JSON.parse(readFileSync(join(HERE, 'translations.en.json'), 'utf8')).speakers
const css = readFileSync(join(HERE, 'story-mockup.css'), 'utf8')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// 스텝퍼 칩 정의(StoryStepper.jsx). 게이트 탭(리서치·시놉시스)은 상태 점을 확정됐을 때만
// 달고, 자동 토글은 실행 스텝 중 AUTO_STEPS = [scenes, audio, prompts]에만 붙는다 —
// **대본에는 자동 토글이 없다**(StoryStepper.jsx:42).
const GATES = [
  { icon: '0', key: 'story.step.setup', setup: true },
  { icon: '①', key: 'story.step.research', gate: 'research' },
  { icon: '②', key: 'story.step.synopsis', gate: 'synopsis' },
]
const RUN_STEPS = [
  { icon: '③', key: 'story.step.script', kind: 'script' },
  { icon: '④', key: 'story.step.scenes', kind: 'scenes', auto: true },
  { icon: '⑤', key: 'story.step.audio', kind: 'audio', auto: true },
  { icon: '⑥', key: 'story.step.prompts', kind: 'prompts', auto: true },
]

/**
 * 스텝퍼가 그릴 파이프라인 상태.
 *
 * 게이트 상태: 'enabled'(활성, 미확정) / 'done'(확정) / 'active'(현재 게이트) / 'disabled'.
 * `runAll`은 canRunAll(StoryView.jsx:1493) — 대본 done + 미확정 게이트 없음 + 남은 자동 스텝 있음.
 * `autoSteps`는 컴포넌트 초기값 그대로다 — StoryView.jsx:472의
 * `useState({ scenes: true, audio: false, prompts: true })` (오디오는 TTS 비용이라 기본 off).
 * 영속되지 않으므로 프로젝트를 다시 열어도 이 값으로 돌아온다.
 */
const AUTO_DEFAULTS = { scenes: true, audio: false, prompts: true }

const FLOWS = {
  // 제목으로 시작해 끝까지 돌린 프로젝트(부자와_빈자).
  // 리서치는 **비활성이 아니다** — researchEnabled(StoryView.jsx:744)는 input.type==='title' 이고
  // charactersConfirmed가 정의돼 있으면 참이다. 이 프로젝트는 둘 다 만족하되 리서치를 돌리지
  // 않았으므로 활성이지만 확정(done) 점은 없다.
  // 남은 자동 스텝이 없어 전체 진행은 비활성.
  finished: {
    research: 'enabled',
    synopsis: 'done',
    steps: { script: 'done', scenes: 'done', audio: 'done', prompts: 'done' },
    autoSteps: AUTO_DEFAULTS,
    runAll: false,
  },
  // 대본을 붙여넣은 직후. 리서치만 비활성이고(pasted는 researchEnabled 세 분기 어디에도 안 걸린다)
  // **시놉시스는 잠기지 않는다** — 붙여넣기는 등장인물 역추출·확인을 위해 시놉시스 게이트로
  // 간다(StoryView.jsx:1422 handlePasteStart). 확정 전에는 unconfirmedGate가 전체 진행을 막는다.
  pasted: {
    research: 'disabled',
    synopsis: 'active',
    steps: { script: 'done', scenes: 'pending', audio: 'pending', prompts: 'pending' },
    autoSteps: AUTO_DEFAULTS,
    runAll: false,
  },
  // 제목으로 시작해 대본까지 끝낸 직후 — 여기서 [전체 진행]을 누르면 나머지가 돈다.
  // canRunAll의 세 조건(대본 done · 미확정 게이트 없음 · 남은 자동 스텝 있음)을 모두 만족한다.
  readyToRun: {
    research: 'enabled',
    synopsis: 'done',
    steps: { script: 'done', scenes: 'pending', audio: 'pending', prompts: 'pending' },
    autoSteps: AUTO_DEFAULTS,
    runAll: true,
  },
  // ① 리서치 게이트에 들어가 있는 상태. 대본이 아직 없어 전체 진행은 비활성.
  research: {
    research: 'active',
    synopsis: 'enabled',
    steps: { script: 'pending', scenes: 'pending', audio: 'pending', prompts: 'pending' },
    autoSteps: AUTO_DEFAULTS,
    runAll: false,
  },
}


function stepper(t, current, flow) {
  // 자동 토글은 실제 컴포넌트대로 <label><input type=checkbox>다(StoryStepper.jsx).
  const autoChip = (on) =>
    `<label class="story-step-auto${on ? ' on' : ''}"><input type="checkbox"${on ? ' checked' : ''}><span>${esc(t('story.auto.label'))}</span></label>`

  const gates = GATES.map((g) => {
    const key = g.setup ? 'setup' : g.gate
    const state = g.setup ? 'enabled' : flow[g.gate]
    const clickable = state !== 'disabled'
    const cls = ['story-step-pill', `story-step-${key}`,
      state === 'active' ? 'active' : '',
      clickable ? 'story-step-clickable' : '',
      state === 'disabled' ? 'story-step-disabled' : ''].filter(Boolean).join(' ')
    // 게이트 칩은 확정됐을 때만 done 점을 단다(StoryStepper.jsx:91).
    // 0번 설정은 상태 배지가 없는 진입 탭이라 점을 달지 않는다(StoryView.css의 .story-step-setup 주석).
    const dot = !g.setup && state === 'done' ? '<span class="story-step-dot story-dot-done"></span>' : ''
    return `<div class="${cls}"><span class="story-step-icon">${g.icon}</span><span class="story-step-name">${esc(t(g.key))}</span>${dot}</div>`
  })

  const runs = RUN_STEPS.map((s) => {
    const status = flow.steps[s.kind]
    // 실행 스텝 칩은 done이거나 현재 스텝일 때만 클릭 가능하다(StoryStepper.jsx:100).
    const clickable = status === 'done' || s.kind === current
    const cls = ['story-step-pill', `story-step-${status}`,
      s.kind === current ? 'active' : '', clickable ? 'story-step-clickable' : ''].filter(Boolean).join(' ')
    const dot = `<span class="story-step-dot story-dot-${status}"></span>`
    const auto = s.auto ? autoChip(flow.autoSteps[s.kind]) : ''
    return `<div class="${cls}"><span class="story-step-icon">${s.icon}</span><span class="story-step-name">${esc(t(s.key))}</span>${dot}${auto}</div>`
  })

  const runAll = `<button class="story-step-runall"${flow.runAll ? '' : ' disabled'}>${esc(t('story.auto.runAllIcon'))}</button>`
  return `<div class="story-stepper"><div class="story-stepper-track">${[...gates, ...runs].join('')}</div>${runAll}</div>`
}

/** 세그먼트 셀. narrator는 감정 줄이 없다 — StoryView.jsx:1163의 renderNarrationCell과 같다. */
function segmentCell(row, lang, t) {
  if (row.sfx) return `<span class="story-sfx-desc">${esc(row.text[lang])}</span>`
  const text = esc(row.text[lang])
  if (row.speaker === 'narrator') return text
  const emo = row.emotion || 'normal'
  return `<div class="story-seg-cell"><div class="story-seg-text">${text}</div>
    <div class="story-seg-emotion">(${esc(t(`story.emotion.${emo}`))})</div></div>`
}

const speakerLabel = (row, lang, t) =>
  row.sfx ? esc(t('story.audio.sfxLabel')) : esc(lang === 'en' ? enNames[row.speaker] || row.speaker : row.speaker)

/**
 * 프롬프트 문자열의 멘션을 en 이름으로 바꾼다. 표기(`@박씨`, 공백 이름은 `@{윤 회장}`)는
 * 그대로 유지한다 — 중괄호가 문법의 일부고(mentionParser.js), ⑥ 프롬프트 표는 값을 그냥
 * 텍스트로 찍는다(StoryView.jsx:2581). 칩으로 감싸면 없는 UI를 그리는 셈이라 하지 않는다.
 */
function localizeMentions(text, lang) {
  if (lang !== 'en') return esc(text)
  return esc(
    text.replace(/@(?:\{([^}]+)\}|([^\s,.;:]+))/g, (whole, braced, plain) => {
      const id = braced || plain
      const name = enNames[id]
      if (!name) return whole
      return name.includes(' ') ? `@{${name}}` : `@${name}`
    }),
  )
}

// ── 목업 종류별 본문 ───────────────────────────────────────────────────

function panelScript(lang, t) {
  // 편집기는 대본 원문을 그대로 담는다 — 줄마다 번호가 붙는 문단 하나(빈 줄 포함).
  const paragraphs = data.script[lang]
    .map((line) => `<p class="prompt-paragraph">${esc(line) || '<br>'}</p>`)
    .join('')
  return `<div class="story-script-panel">
    <div class="story-script-editor"><div class="prompt-input-container">
      <div class="prompt-textarea-wrap"><div class="prompt-textarea-content">
        <div class="prompt-textarea">${paragraphs}</div>
      </div></div>
    </div></div>
    <div class="story-editor-controls">
      <div class="story-review-control">
        <label class="story-review-toggle">☐ ${esc(t('story.review.autoToggleShort'))}</label>
        <span class="story-input story-review-rounds">3</span>
        <button class="story-btn-secondary story-review-run">${esc(t('story.review.target.script'))}</button>
      </div>
      <button class="story-btn-secondary">${esc(t('story.action.rewrite'))}</button>
      <button class="story-btn-secondary">${esc(t('story.action.continue'))}</button>
      <button class="story-btn-primary">${esc(t('story.action.split'))}</button>
    </div>
  </div>`
}

function panelScenes(lang, t) {
  const rows = data.rows
    .map(
      (r) => `<tr class="${r.sfx ? 'story-sfx-row' : ''}">
      <td class="story-col-no">${r.sceneNo}</td>
      <td class="story-col-speaker">${speakerLabel(r, lang, t)}</td>
      <td>${segmentCell(r, lang, t)}</td></tr>`,
    )
    .join('')
  return `<div class="story-rerun-bar">
      <span class="story-opt-label">${esc(t('story.form.granularityLabel'))}</span>
      <span class="story-input">${esc(t('story.form.granularityScene'))} ▾</span>
      <div class="story-scene-sec">
        <span class="story-sec-input">${data.options.sceneMinSec}</span>
        <span class="story-sec-sep">~</span>
        <span class="story-sec-input">${data.options.sceneMaxSec}</span>
        <span class="story-sec-unit">${esc(t('story.form.sceneSecUnit'))}</span>
      </div>
    </div>
    <table class="story-readonly-table"><thead><tr>
      <th class="story-col-no">${esc(t('story.scenes.no'))}</th>
      <th class="story-col-speaker">${esc(t('story.scenes.speaker'))}</th>
      <th>${esc(t('story.scenes.segment'))}</th>
    </tr></thead><tbody>${rows}</tbody></table>`
}

function panelAudio(lang, t) {
  const voiceRows = data.speakers
    .map((sp) => {
      const appearance = sp.appearance ? `<div class="story-voice-appearance">${esc(sp.appearance)}</div>` : ''
      const gender = sp.gender ? `<span class="story-voice-gender ${sp.gender}">${sp.gender === 'male' ? '♂' : '♀'}</span>` : ''
      // 진행 배지는 세그먼트가 있는 화자에만 — 대사가 없는 인물은 만들 것이 없다.
      const progress = sp.segmentCount
        ? `<span class="story-voice-progress done">${sp.segmentCount}/${sp.segmentCount}</span>`
        : ''
      // voice가 null이면 실제 앱도 "기본 성우"를 보여준다(useStoryVoiceSelection.js:39).
      const voiceLabel = sp.voice?.voiceId || t('story.audio.voiceDefault')
      return `<div class="story-voice-row">
        <div class="story-voice-info">
          <div class="story-voice-speaker">${esc(sp.name[lang])}${gender}</div>
          ${appearance}
          ${progress}
        </div>
        <button class="story-voice-picker-btn">${esc(voiceLabel)}</button>
        <button class="story-speaker-run-btn">✨</button>
        <div class="story-voice-source"><div class="story-src">
          <span class="story-src-chip">＋ mp3</span><span class="story-src-chip">＋ SRT</span>
        </div></div>
      </div>`
    })
    .join('')

  const rows = data.rows
    .slice(0, 10)
    .map((r) => {
      const cell = r.sfx
        ? `<div class="story-sfx-cell"><span class="story-sfx-desc">${esc(r.text[lang])}</span>
           <span class="story-sfx-source">${esc(r.sourceLabel)} ▾</span></div>`
        : segmentCell(r, lang, t)
      return `<tr class="${r.sfx ? 'story-sfx-row' : ''}">
        <td class="story-col-no">${r.sceneNo}</td>
        <td class="story-col-speaker">${speakerLabel(r, lang, t)}</td>
        <td>${cell}</td>
        <td class="story-col-status"><span class="story-status story-status-${r.status}">${esc(t(`story.status.${r.status}`))}</span></td>
        <td class="story-col-actions"><span class="story-seg-btn">${esc(t('story.audio.testLabel'))}</span></td>
      </tr>`
    })
    .join('')

  return `<div class="story-voice-map">${voiceRows}</div>
    <table class="story-readonly-table story-audio-table"><thead><tr>
      <th class="story-col-no">${esc(t('story.audio.no'))}</th>
      <th class="story-col-speaker">${esc(t('story.audio.speaker'))}</th>
      <th>${esc(t('story.audio.segment'))}</th>
      <th class="story-col-status">${esc(t('story.audio.status'))}</th>
      <th class="story-col-actions"></th>
    </tr></thead><tbody>${rows}</tbody></table>`
}

function panelPrompts(lang, t) {
  const rows = data.prompts
    .slice(0, 5)
    .map(
      (p) => `<tr>
      <td class="story-col-no">${p.sceneNo}</td>
      <td class="story-prompt-cell">${localizeMentions(p.imagePrompt, lang)}</td>
      <td class="story-prompt-cell">${localizeMentions(p.videoPrompt, lang)}</td>
    </tr>`,
    )
    .join('')
  return `<table class="story-readonly-table"><thead><tr>
      <th class="story-col-no">${esc(t('story.prompts.no'))}</th>
      <th>${esc(t('story.prompts.image'))}</th>
      <th>${esc(t('story.prompts.video'))}</th>
    </tr></thead><tbody>${rows}</tbody></table>`
}

const PANELS = { script: panelScript, scenes: panelScenes, audio: panelAudio, prompts: panelPrompts }

/**
 * 목업 정의. `file`은 출력 파일명 접두사, `flow`는 스텝퍼가 그릴 파이프라인 상태,
 * `panel`이 없으면 스텝퍼만 그린다(글 머리의 스텝퍼 스트립).
 * `active`는 활성 칩을 명시로 지정한다 — 패널이 없을 때(스텝퍼 전용) 필요하다.
 */
const MOCKUPS = {
  script:  { file: 'story-step-script',  icon: '③', key: 'story.step.script',  panel: 'script',  flow: 'finished', height: 770 },
  scenes:  { file: 'story-step-scenes',  icon: '④', key: 'story.step.scenes',  panel: 'scenes',  flow: 'finished', height: 960 },
  audio:   { file: 'story-step-audio',   icon: '⑤', key: 'story.step.audio',   panel: 'audio',   flow: 'finished', height: 1010 },
  prompts: { file: 'story-step-prompts', icon: '⑥', key: 'story.step.prompts', panel: 'prompts', flow: 'finished', height: 770 },
  // 대본 붙여넣기 글의 머리 이미지. 리서치만 비활성이고 시놉시스는 등장인물 확인 게이트로 열린다.
  'pasted-stepper': { file: 'story-script-hero', key: 'story.step.synopsis', flow: 'pasted', height: 185 },
  // 제목 글의 머리 이미지 — 대본까지 끝나 [전체 진행]이 눌리는 상태.
  'title-stepper': { file: 'story-title-hero', key: 'story.step.script', flow: 'readyToRun', active: 'script', height: 185 },
  // 벤치마크 글의 파이프라인 이미지 — ① 리서치 게이트에 들어가 있는 상태.
  'research-stepper': { file: 'story-benchmark-pipeline', key: 'story.step.research', flow: 'research', height: 185 },
}

function page(name, lang) {
  const m = MOCKUPS[name]
  // 앱 로케일은 ko/en뿐 — ja/de는 이 함수를 타지 않는다(상단 주석 참고).
  const table = strings.ui[lang]
  const t = (key) => {
    if (!(key in table)) throw new Error(`strings.json에 없는 키: ${key} (${lang})`)
    return table[key]
  }
  const flow = FLOWS[m.flow]
  const heading = m.panel
    ? `<div class="mock-heading">${m.icon} ${esc(t(m.key))}<span class="mock-badge">Story</span></div>`
    : ''
  const body = m.panel ? PANELS[m.panel](lang, t) : ''
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">
<style>${css}
html, body { height: ${m.height}px; }
</style></head><body><div class="mock-canvas"><div class="mock-window">
  <div class="mock-titlebar">
    <span class="mock-dot red"></span><span class="mock-dot yellow"></span><span class="mock-dot green"></span>
    <span class="mock-title">AutoFlowCut — Story</span>
  </div>
  <div class="mock-body">
    ${heading}
    ${stepper(t, m.active ?? m.panel, flow)}
    ${body}
  </div>
</div></div></body></html>`
}

// ── 실행 ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const htmlOnly = args.includes('--html')
const only = args.filter((a) => !a.startsWith('--'))
const names = only.length ? only : Object.keys(MOCKUPS)

for (const name of names) {
  if (!MOCKUPS[name]) throw new Error(`알 수 없는 목업 종류: ${name} (가능: ${Object.keys(MOCKUPS).join(', ')})`)
}

mkdirSync(TMP, { recursive: true })
mkdirSync(OUT, { recursive: true })
if (!htmlOnly && !existsSync(CHROME)) throw new Error(`Chrome을 찾을 수 없습니다: ${CHROME}`)

for (const name of names) {
  for (const lang of ['ko', 'en']) {
    const base = `${MOCKUPS[name].file}-${lang}`
    const html = join(TMP, `${base}.html`)
    writeFileSync(html, page(name, lang))
    if (htmlOnly) {
      console.log(`html  ${html}`)
      continue
    }
    const png = join(OUT, `${base}.png`)
    execFileSync(
      CHROME,
      [
        '--headless',
        '--disable-gpu',
        '--hide-scrollbars',
        '--force-device-scale-factor=2',
        `--window-size=${WIDTH},${MOCKUPS[name].height}`,
        `--screenshot=${png}`,
        `file://${html}`,
      ],
      { stdio: 'ignore' },
    )
    console.log(`png   ${png}`)
  }
}
