#!/usr/bin/env node
/**
 * 부자와_빈자 프로젝트에서 목업용 실데이터를 뽑아 data.json으로 굳힌다.
 *
 * 소스는 repo 밖(사용자 로컬 AutoFlowCut 프로젝트)이라 CI에서 재현되지 않는다.
 * 그래서 data.json은 스냅샷으로 커밋하고, 이 스크립트는 그 출처와 재생성 방법을
 * 남기는 용도다. 프로젝트가 있는 환경에서만 다시 돌리면 된다.
 *
 *   node extract.mjs [프로젝트경로]
 *   기본값: ~/Documents/AutoFlowCut/부자와_빈자
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const PROJECT = process.argv[2] || join(homedir(), 'Documents', 'AutoFlowCut', '부자와_빈자')
const STORY = join(PROJECT, 'story')

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))

const story = readJson(join(STORY, 'story.json'))
const scenes = readJson(join(STORY, 'scenes.json')).scenes
const synopsis = readFileSync(join(STORY, 'synopsis.md'), 'utf8')
const script = readFileSync(join(STORY, 'script.md'), 'utf8')
const en = readJson(join(HERE, 'translations.en.json'))

/** synopsis.md의 `## 제목` 섹션 본문을 뽑는다. */
function section(md, heading) {
  const re = new RegExp(`^## ${heading}\\s*$`, 'm')
  const m = re.exec(md)
  if (!m) return ''
  const rest = md.slice(m.index + m[0].length)
  const next = /^## /m.exec(rest)
  return (next ? rest.slice(0, next.index) : rest).trim()
}

/**
 * script.md를 대본 편집기가 실제로 보여주는 형태로 자른다(훅·기·승까지만).
 *
 * ③ 대본 탭의 편집기는 PromptInput(Lexical) 이고 `scriptText`를 **원문 그대로** 담는다 —
 * 마크다운을 렌더링하지 않는다. 그래서 `## 훅`, `**문지기:** "…"` 같은 표기가 화면에 그대로
 * 보이고, 빈 줄을 포함한 각 줄이 번호가 매겨지는 문단(.prompt-paragraph) 하나가 된다.
 * 목업도 같은 규칙이어야 하므로 파싱하지 않고 줄 배열로만 넘긴다.
 */
function scriptLines(md) {
  const stop = md.indexOf('\n## 전')
  return (stop > 0 ? md.slice(0, stop) : md).replace(/\s+$/, '').split('\n')
}

// StoryView.jsx:57 SFX_SOURCE_LABEL
const SFX_SOURCE_LABELS = { elevenlabs: 'ElevenLabs', library: 'Library' }

const isSfx = (seg) => seg.type === 'sfx'
const segText = (seg) => (isSfx(seg) ? seg.description : seg.text)

// 표는 씬이 아니라 세그먼트 단위 행이다(StoryView.jsx: scenes.flatMap(sc => sc.segments.map(...))).
// 그래서 같은 씬의 세그먼트가 여러 개면 # 열에 같은 씬 번호가 반복된다.
const rows = scenes.flatMap((sc, si) =>
  (sc.segments || []).map((seg) => ({
    sceneNo: si + 1,
    id: seg.id,
    sfx: isSfx(seg),
    speaker: isSfx(seg) ? null : seg.speaker,
    emotion: seg.emotion || null,
    status: seg.status || 'pending',
    durationMs: seg.durationMs,
    startMs: seg.startMs,
    sourceLabel: seg.sourceMode ? SFX_SOURCE_LABELS[seg.sourceMode] || seg.sourceMode : null,
    text: { ko: segText(seg), en: en.segments[seg.id] || segText(seg) },
  })),
)

// ⑤ 오디오의 화자 매핑은 세그먼트가 있는 화자만이 아니라 **state.speakers 전원**을 그린다
// (StoryView.jsx:2261 — 필터가 없다). 대사가 한 줄도 없는 인물(박씨·변호사)도 행으로 나온다.

const data = {
  _source: '~/Documents/AutoFlowCut/부자와_빈자 (story.json / scenes.json / synopsis.md / script.md)',
  _generatedBy: 'landing/scripts/mockups/extract.mjs',
  title: { ko: story.input.title, en: en.title },
  options: story.input.options,
  stepStatus: Object.fromEntries(Object.entries(story.steps).map(([k, v]) => [k, v.status])),
  totalSec: scenes.length ? scenes[scenes.length - 1].endSec : 0,
  sceneCount: scenes.length,
  segmentCount: rows.length,
  synopsis: {
    logline: { ko: section(synopsis, '로그라인'), en: en.logline },
    hook: { ko: section(synopsis, '훅'), en: en.hook },
  },
  script: { ko: scriptLines(script), en: en.scriptExcerpt },
  // 등장인물 카드는 appearance가 확정된 실제 인물만 — story.speakers에는 narrator도
  // 들어 있는데 그건 id/name뿐이라 카드로 그리면 빈 칸만 나온다.
  characters: (story.speakers || []).filter((s) => s.appearance).map((s) => ({
    id: s.id,
    name: { ko: s.name, en: en.speakers[s.id] || s.name },
    gender: s.gender,
    age: { ko: s.age, en: en.age[s.age] || s.age },
    ethnicity: { ko: s.ethnicity, en: en.ethnicity[s.ethnicity] || s.ethnicity },
    role: { ko: s.role, en: en.roles[s.id] || s.role },
    appearance: s.appearance,
  })),
  speakers: (story.speakers || []).map((s) => ({
    id: s.id,
    // 화자 매핑 행은 표(원시 id)와 달리 story.speakers의 표시 이름을 쓴다 — narrator → "나레이션".
    name: { ko: s.name, en: en.speakers[s.id] || s.name },
    appearance: s.appearance || null,
    gender: s.gender || null,
    // 화면의 성우 라벨은 speaker.voice에서 나온다(useStoryVoiceSelection.js:39 voiceIdForSpeaker).
    // 이 프로젝트는 전원 voice:null이라 실제 앱도 "기본 성우"로 표시된다 — 세그먼트의 voiceKey에
    // typecast voiceId가 남아 있어도 그건 합성에 쓰인 기본값이지 화자에 저장된 선택이 아니다.
    voice: s.voice ?? null,
    segmentCount: rows.filter((r) => r.speaker === s.id).length,
  })),
  rows,
  prompts: scenes.map((sc, i) => ({
    sceneNo: i + 1,
    imagePrompt: sc.imagePrompt,
    videoPrompt: sc.videoPrompt,
  })),
}

writeFileSync(join(HERE, 'data.json'), JSON.stringify(data, null, 2) + '\n')
console.log(
  `data.json — ${data.sceneCount} scenes / ${data.segmentCount} segments / ${data.totalSec}s / speakers: ${data.speakers.map((s) => s.id).join(', ')}`,
)
