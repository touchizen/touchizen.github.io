#!/usr/bin/env node
/**
 * AutoFlowCut의 실제 로케일(src/locales/ko.js, en.js)에서 목업이 쓰는 UI 문자열만 뽑아
 * strings.json의 `ui` 블록으로 굳힌다. 목업 라벨을 손으로 적으면 실제 앱과 어긋나므로
 * 반드시 여기서 뽑는다.
 *
 *   node extract-strings.mjs [AutoFlowCut경로]
 *   기본값: ~/workspace/AutoFlowCut-bugfix
 *
 * 앱 로케일은 ko/en 둘뿐이다. 블로그의 ja/de 목업은 en UI를 그대로 쓴다 —
 * 없는 언어의 UI를 그려 넣으면 존재하지 않는 화면을 약속하게 된다. (SPEC.md 참고)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { homedir } from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const APP = process.argv[2] || join(homedir(), 'workspace', 'AutoFlowCut-bugfix')

/** 목업이 실제로 그리는 라벨만. 여기 없는 키를 템플릿에서 쓰면 안 된다. */
const KEYS = [
  'story.step.setup', 'story.step.research', 'story.step.synopsis',
  'story.step.script', 'story.step.scenes', 'story.step.audio', 'story.step.prompts',
  'story.form.granularityLabel', 'story.form.granularityScene', 'story.form.granularitySegment',
  'story.form.sceneSecUnit',
  'story.scenes.no', 'story.scenes.speaker', 'story.scenes.segment',
  'story.audio.no', 'story.audio.speaker', 'story.audio.segment', 'story.audio.status',
  'story.audio.sfxLabel', 'story.audio.testLabel', 'story.audio.voiceDefault',
  // story.prompts.sceneCount는 일부러 뺐다 — 이 키는 ko/en 어디에도 없다.
  // StoryView는 useSafeT(StoryView.jsx:343)를 쓰므로 키가 없으면 2번째 인자인 한국어
  // 문자열 '씬'을 보여준다. 즉 **영어 UI에서도 "씬 11"로 한국어가 샌다.**
  // 영어 목업에 한국어를 넣을 수도, 없는 영어 라벨을 지어낼 수도 없어 카운트 행을 뺐다.
  // → AutoFlowCut 쪽에서 locales에 이 키를 추가하는 게 진짜 수정이다.
  'story.prompts.no', 'story.prompts.image', 'story.prompts.video',
  'story.status.pending', 'story.status.running', 'story.status.done',
  'story.emotion.normal', 'story.emotion.happy', 'story.emotion.sad', 'story.emotion.angry',
  'story.auto.label', 'story.auto.runAllIcon',
  'story.action.rewrite', 'story.action.continue', 'story.action.split',
  'story.review.autoToggleShort', 'story.review.target.script',
  'story.action.scenesRedoIcon', 'story.action.audioRedoIcon', 'story.action.promptsRedoIcon',
  // Ref 탭 (ReferencePanel / ReferenceCard)
  'reference.title', 'reference.generateAll', 'reference.clearAll', 'reference.character',
  // 씬 목록 (SceneList)
  'sceneList.time', 'sceneList.subtitle', 'sceneList.tags', 'sceneList.media',
  'sceneList.character', 'sceneList.background',
  // 타임라인 프리뷰 (AudioTimeline)
  'audioTimeline.title', 'audioTimeline.trackImage', 'audioTimeline.trackSubtitle',
  'audioTimeline.trackNarration', 'audioTimeline.trackVoice', 'audioTimeline.trackSfx',
  'audioTimeline.kenBurns',
]

function flatten(obj, prefix = '') {
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(out, flatten(v, path))
    else out[path] = v
  }
  return out
}

const ui = {}
const missing = []
for (const lang of ['ko', 'en']) {
  const file = join(APP, 'src', 'locales', `${lang}.js`)
  if (!existsSync(file)) throw new Error(`로케일을 찾을 수 없습니다: ${file}`)
  const mod = await import(pathToFileURL(file).href)
  const flat = flatten(mod.default || mod)
  ui[lang] = {}
  for (const key of KEYS) {
    if (!(key in flat)) { missing.push(`${lang}:${key}`); continue }
    ui[lang][key] = flat[key]
  }
}

if (missing.length) {
  // 조용히 빈 라벨로 렌더하면 실제 앱과 다른 목업이 나온다 — 여기서 멈춘다.
  throw new Error(`로케일에 없는 키: ${missing.join(', ')}`)
}

const existing = existsSync(join(HERE, 'strings.json'))
  ? JSON.parse(readFileSync(join(HERE, 'strings.json'), 'utf8'))
  : {}

writeFileSync(
  join(HERE, 'strings.json'),
  JSON.stringify({ ...existing, _source: `${APP}/src/locales/{ko,en}.js`, ui }, null, 2) + '\n',
)
console.log(`strings.json — ui.ko / ui.en, ${KEYS.length} keys each`)
