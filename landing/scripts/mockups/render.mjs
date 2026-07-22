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
const gallery = JSON.parse(readFileSync(join(HERE, 'gallery.json'), 'utf8'))
const css = readFileSync(join(HERE, 'story-mockup.css'), 'utf8')
/** assets/의 축소 이미지를 file:// 절대경로로 — headless Chrome이 로컬 파일을 읽는다. */
const asset = (file) => `file://${join(HERE, 'assets', file)}`

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


// ── Ref 탭 / 씬 목록 / 타임라인 프리뷰 (생성 결과가 들어간 화면) ─────────

/** 화자 이름을 목업 언어에 맞춰 — 표는 원시 id, Ref 카드/태그는 표시 이름을 쓴다. */
const localName = (name, lang) => (lang === 'en' ? enNames[name] || name : name)

/**
 * Ref 탭 — 4명이 모두 생성된 상태.
 * [일괄 생성] 버튼은 그리지 않는다: generatableRefs는 `prompt && !data && !filePath`라
 * (ReferencePanel.jsx:61) 생성이 끝나 filePath가 생기면 비고, 버튼 자체가 사라진다(`:301`).
 * 반면 Clear All(🗑️)은 reference가 하나라도 있으면 항상 남는다(`:275`).
 */
function panelRefTab(lang, t) {
  const cards = gallery.references
    .map(
      (r) => `<div class="reference-card ratio-landscape status-done has-image">
      <div class="ref-header"><span class="ref-type-select">👤 ${esc(t('reference.character'))} ▾</span><button class="btn-remove">✕</button></div>
      <div class="ref-image-area"><img src="${asset(r.file)}" alt=""><span class="uploaded-badge">✅</span></div>
      <button class="ref-name-btn">${esc(localName(r.name, lang))}<span class="has-prompt-indicator">📝</span></button>
    </div>`,
    )
    .join('')
  return `<div class="ref-panel-header">
      <div class="ref-header-left">
        <button class="btn-collapse">▼</button>
        <span>🖼️ ${esc(t('reference.title'))} (${gallery.references.length})</span>
      </div>
      <div class="ref-header-actions"><button class="btn-clear-refs" title="${esc(t('reference.clearAll'))}">🗑️</button></div>
    </div>
    <div class="ref-grid ratio-landscape">${cards}
      <div class="reference-add-card ratio-landscape"><span class="add-icon">+</span></div>
    </div>`
}

/** 씬 자막의 영어판 — 그 씬에 속한 나레이션·대사 세그먼트를 이어 붙인다(효과음 제외). */
const sceneSubtitle = (no, lang) =>
  lang === 'ko'
    ? gallery.scenes.find((s) => s.no === no).subtitle
    : data.rows.filter((r) => r.sceneNo === no && !r.sfx).map((r) => r.text.en).join(' ')

function panelSceneList(lang, t) {
  const rows = gallery.scenes
    .map((sc) => {
      const tags = sc.characters
        ? sc.characters.split(',').map((n) => localName(n.trim(), lang)).join(', ')
        : ''
      const tagCls = tags ? 'tag-input matched' : 'tag-input placeholder'
      const tagText = tags || esc(t('sceneList.character'))
      return `<tr class="scene-row status-done">
        <td class="col-id">${sc.no}</td>
        <td class="col-time">
          <span class="time-display">${sc.startTime.toFixed(1)} ~ ${sc.endTime.toFixed(1)}</span>
          <span class="duration-input">${sc.duration.toFixed(1)}</span>
        </td>
        <td class="col-subtitle">${esc(sceneSubtitle(sc.no, lang))}</td>
        <td class="col-tags">
          <div class="tag-input-wrapper"><span class="${tagCls}">${esc(tagText)}</span></div>
          <div class="tag-input-wrapper"><span class="tag-input placeholder">${esc(t('sceneList.background'))}</span></div>
          <div class="tag-input-wrapper"><span class="tag-input matched">${esc(gallery.styleTag)}</span></div>
        </td>
        <td class="col-media"><div class="media-selector">
          <div class="media-thumb selected"><img src="${asset(sc.file)}" alt=""><span class="media-label">IMG</span></div>
        </div></td>
      </tr>`
    })
    .join('')
  return `<div class="scene-table-wrapper"><table class="scene-table"><thead><tr>
      <th class="col-id">#</th>
      <th class="col-time">${esc(t('sceneList.time'))}</th>
      <th class="col-subtitle">${esc(t('sceneList.subtitle'))}</th>
      <th class="col-tags">${esc(t('sceneList.tags'))}</th>
      <th class="col-media">${esc(t('sceneList.media'))}</th>
    </tr></thead><tbody>${rows}</tbody></table></div>`
}

/** useAudioTimeline.js:10 COLORS — 트랙별 클립 색. */
const TRACK_COLORS = { image: '#7E57C2', subtitle: '#FFD54F', narration: '#4FC3F7', voice: '#BA68C8', sfx: '#FFB74D' }
// constants.js: RULER_H=32, TRACK_H_MIN=32 — 레인은 32px 아래로 못 내려간다.
const LANE_H = { subtitle: 34, image: 56, narration: 32, voice: 44, sfx: 44 }
const RULER_H = 32
const LABEL_W = 110
const TRACK_W = 1150 // 트랙 영역 폭(px)
const PX_PER_SEC_BASE = 40 // constants.js:11 — 줌 100%의 기준

/**
 * useAudioTimeline.js:107 shiftHue 를 그대로 옮긴 것 — Voice 서브트랙은 화자마다 색상을
 * 30°씩 민다. hex를 유지해야 한다: 클립 배경이 `색+88` 처럼 hex 알파를 이어 붙이는 방식이라
 * hsl()로 바꾸면 CSS가 통째로 무효가 되어 클립이 투명해진다.
 */
function shiftHue(hex, deg) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const sat = max === min ? 0 : (max - min) / (l < 0.5 ? max + min : 2 - max - min)
  let h = 0
  if (max !== min) {
    const d = max - min
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) h = ((b - r) / d + 2) / 6
    else h = ((r - g) / d + 4) / 6
  }
  const newH = (((h * 360 + deg) % 360) + 360) % 360 / 360
  const hue2rgb = (pp, qq, tt) => {
    let t = tt
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return pp + (qq - pp) * 6 * t
    if (t < 1 / 2) return qq
    if (t < 2 / 3) return pp + (qq - pp) * (2 / 3 - t) * 6
    return pp
  }
  const q = l < 0.5 ? l * (1 + sat) : l + sat - l * sat
  const pv = 2 * l - q
  const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, '0')
  return `#${toHex(hue2rgb(pv, q, newH + 1 / 3))}${toHex(hue2rgb(pv, q, newH))}${toHex(hue2rgb(pv, q, newH - 1 / 3))}`
}
const voiceHue = (i) => shiftHue(TRACK_COLORS.voice, i * 30)

function panelTimeline(lang, t) {
  const totalMs = data.totalSec * 1000
  const pxPerMs = TRACK_W / totalMs
  const at = (ms) => Math.round(ms * pxPerMs)
  const clip = (color, startMs, durMs, inner, variant) => {
    const bg = variant === 'text' ? `${color}26` : `linear-gradient(180deg, ${color}, ${color}88)`
    const border = variant === 'text' ? `1px solid ${color}` : `1px solid ${color}AA`
    return `<div class="atl-clip atl-clip-${variant}" style="left:${at(startMs)}px;width:${Math.max(2, at(durMs))}px;top:2px;bottom:2px;background:${bg};border:${border}">${inner}</div>`
  }

  const imageClips = gallery.scenes
    .map((sc) => clip(TRACK_COLORS.image, sc.startTime * 1000, sc.duration * 1000,
      `<img class="atl-clip-img" src="${asset(sc.file)}" alt="">`, 'block'))
    .join('')
  const subtitleClips = gallery.scenes
    .map((sc) => clip(TRACK_COLORS.subtitle, sc.startTime * 1000, sc.duration * 1000,
      `<span class="atl-clip-text" style="color:${TRACK_COLORS.subtitle}">${esc(sceneSubtitle(sc.no, lang))}</span>`, 'text'))
    .join('')
  // Story 프로젝트의 나레이션·대사는 화자별로 묶여 Voice 트랙으로 간다(storyAudioPackage.js).
  // Narration 트랙은 가져온 영상 오디오 전용이라 여기선 비어 있다(useAudioTimeline.js:260).
  // 서브트랙 순서는 story.speakers 순이 아니라 **첫 등장 순**이다 — buildStoryAudioPackage의
  // byChar Map이 세그먼트를 훑으며 넣는 순서 그대로다(storyAudioPackage.js:55).
  const speakers = [...new Set(data.rows.filter((r) => !r.sfx).map((r) => r.speaker))]
  const voiceClips = data.rows
    .filter((r) => !r.sfx)
    .map((r) => clip(voiceHue(speakers.indexOf(r.speaker)), r.startMs, r.durationMs, '', 'audio'))
    .join('')
  const sfxClips = data.rows
    .filter((r) => r.sfx)
    .map((r) => clip(TRACK_COLORS.sfx, r.startMs, r.durationMs, '', 'audio'))
    .join('')

  const ticks = []
  for (let sec = 0; sec <= data.totalSec; sec += 10) {
    const x = at(sec * 1000)
    const label = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
    ticks.push(`<div class="atl-ruler-line" style="left:${x}px"></div><div class="atl-ruler-label" style="left:${x + 4}px">${label}</div>`)
  }

  const playheadMs = 4200
  // AudioTimeline.jsx:77 formatTC → formatDuration — 초 단위 `m:ss`이고 밀리초는 안 나온다.
  const fmt = (ms) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')}`
  // 줌 배지는 실제 기하에서 되계산한다 — 전체를 한 화면에 편 상태라 100%가 아니다.
  const zoomPct = Math.round(((pxPerMs * 1000) / PX_PER_SEC_BASE) * 100)
  const lanes = [
    ['subtitle', 'Subtitle', subtitleClips],
    ['image', 'Image', imageClips],
    ['narration', 'Narration', ''],
    ['voice', 'Voice', voiceClips],
    ['sfx', 'Sfx', sfxClips],
  ]
  // 라벨 열은 트랙 색으로 칠하고, 그룹(Voice·SFX)엔 펼침 표시 ▶, 상위 트랙엔 보기/음소거
  // 토글을 단다 — 펼침 여부와 무관하게 항상 렌더된다(AudioTimeline.jsx:1158-1175).
  const EYE = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z"/><circle cx="12" cy="12" r="3"/></svg>'
  const VOL = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>'
  const VISUAL = new Set(['image', 'subtitle'])
  const laneLabel = (id, key) => {
    const expand = id === 'voice' || id === 'sfx' ? '<span class="atl-expand">▶</span>' : ''
    const toggle = `<button class="atl-track-toggle">${VISUAL.has(id) ? EYE : VOL}</button>`
    return `${expand}${toggle}<span>${esc(t(`audioTimeline.track${key}`))}</span>`
  }

  return `<div class="atl-root">
    <div class="atl-preview" style="height:280px"><div class="atl-preview-stage">
      <img class="atl-preview-img" src="${asset(gallery.scenes[0].previewFile)}" alt="">
      <div class="atl-preview-subtitle">${esc(sceneSubtitle(1, lang))}</div>
    </div></div>
    <div class="atl-header">
      <div class="atl-title">${esc(t('audioTimeline.title'))}</div>
      <div class="atl-transport">
        <button class="atl-play-btn atl-playing">⏸</button>
        <button class="atl-stop-btn">⏹</button>
        <span class="atl-time-display"><span class="atl-time-cur">${fmt(playheadMs)}</span><span class="atl-time-sep">/</span><span class="atl-time-total">${fmt(totalMs)}</span></span>
        <label class="atl-kb-toggle"><input type="checkbox"><span>${esc(t('audioTimeline.kenBurns'))}</span></label>
      </div>
      <div class="atl-zoom"><button>−</button><span class="atl-zoom-val">${zoomPct}%</span><button>+</button></div>
    </div>
    <div class="atl-body">
      <div class="atl-labels-col" style="width:${LABEL_W}px">
        <div class="atl-label-spacer" style="height:${RULER_H}px"></div>
        ${lanes.map(([id, key]) => `<div class="atl-label" style="height:${LANE_H[id]}px;color:${id === 'voice' ? TRACK_COLORS.voice : TRACK_COLORS[id]}">${laneLabel(id, key)}</div>`).join('')}
      </div>
      <div class="atl-tracks" style="width:${TRACK_W}px">
        <div class="atl-ruler" style="height:${RULER_H}px">${ticks.join('')}</div>
        ${lanes.map(([id, , clips]) => `<div class="atl-lane" style="height:${LANE_H[id]}px">${clips}</div>`).join('')}
        <div class="atl-playhead" style="left:${at(playheadMs)}px"></div>
      </div>
    </div>
  </div>`
}

const PANELS = { script: panelScript, scenes: panelScenes, audio: panelAudio, prompts: panelPrompts,
  reftab: panelRefTab, scenelist: panelSceneList, timeline: panelTimeline }

/**
 * 목업 정의. `file`은 출력 파일명 접두사, `flow`는 스텝퍼가 그릴 파이프라인 상태,
 * `panel`이 없으면 스텝퍼만 그린다(글 머리의 스텝퍼 스트립).
 * `active`는 활성 칩을 명시로 지정한다 — 패널이 없을 때(스텝퍼 전용) 필요하다.
 * `scale`은 렌더 배율(기본 2). 생성 이미지가 많이 들어가는 목업은 2배율이면 PNG가 1MB를
 * 넘어 본문이 무거워지므로 낮춘다.
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

  // ── 생성 결과가 들어간 화면(실제 생성 이미지 사용) ──
  // 스텝퍼가 없는 별도 탭이라 flow는 finished로 두되 stepper는 그리지 않는다.
  reftab: { file: 'story-ref-tab', icon: '🖼️', key: 'reference.title', panel: 'reftab',
    flow: 'finished', noStepper: true, noHeading: true, width: 900, height: 330 },
  scenelist: { file: 'story-scene-list', icon: '🎬', key: 'sceneList.subtitle', panel: 'scenelist',
    flow: 'finished', noStepper: true, noHeading: true, height: 1240 },
  timeline: { file: 'story-timeline', icon: '🎞️', key: 'audioTimeline.title', panel: 'timeline',
    flow: 'finished', noStepper: true, bare: true, height: 660, scale: 1.5 },
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
  const heading = m.panel && !m.bare && !m.noHeading
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
  <div class="mock-body${m.bare ? ' mock-body--bare' : ''}">
    ${heading}
    ${m.noStepper ? '' : stepper(t, m.active ?? m.panel, flow)}
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
        `--force-device-scale-factor=${MOCKUPS[name].scale ?? 2}`,
        `--window-size=${MOCKUPS[name].width ?? WIDTH},${MOCKUPS[name].height}`,
        `--screenshot=${png}`,
        `file://${html}`,
      ],
      { stdio: 'ignore' },
    )
    console.log(`png   ${png}`)
  }
}
