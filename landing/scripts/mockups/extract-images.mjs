#!/usr/bin/env node
/**
 * 부자와_빈자 프로젝트의 생성 결과물(레퍼런스 4장 · 씬 11장)을 목업에 박을 크기로 줄여
 * assets/ 에 굳힌다. 원본은 각 ~800KB의 1376×768이라 그대로 커밋할 이유가 없다 —
 * 목업 안에서 실제로 차지하는 픽셀 폭만큼만 남긴다(2배율 렌더를 감안한 값).
 *
 *   node extract-images.mjs [프로젝트경로]
 *   기본값: ~/Documents/AutoFlowCut/부자와_빈자
 *
 * 리사이즈는 macOS 기본 `sips`로 한다 — 렌더러와 마찬가지로 npm 의존성을 늘리지 않는다.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, 'assets')
const PROJECT = process.argv[2] || join(homedir(), 'Documents', 'AutoFlowCut', '부자와_빈자')

/** 목업에서 쓰이는 최대 표시 폭 × 2(레티나 렌더). */
const WIDTHS = {
  ref: 400, // Ref 탭 카드
  scene: 240, // 씬 목록 썸네일
  preview: 800, // 타임라인 프리뷰 스테이지 (1번 씬만)
}

const project = JSON.parse(readFileSync(join(PROJECT, 'project.json'), 'utf8'))

function shrink(src, dest, width) {
  if (!existsSync(src)) throw new Error(`원본이 없습니다: ${src}`)
  execFileSync('sips', ['--resampleWidth', String(width), '-s', 'formatOptions', '70', src, '--out', dest], {
    stdio: 'ignore',
  })
}

// 원본을 먼저 전부 확인한 뒤에 지운다 — 중간에 실패하면 커밋된 assets/만 날아가고
// gallery.json은 옛 상태로 남아 목업이 깨진다.
const jobs = []
for (const ref of (project.references || []).filter((r) => r.status === 'done')) {
  // 화면 표시 이름이 아니라 앱이 실제로 쓴 경로를 따른다(이름 규칙을 추측하지 않는다).
  jobs.push({ kind: 'ref', src: ref.filePath, width: WIDTHS.ref, ref })
}
project.scenes.forEach((sc, i) => {
  if (sc.status !== 'done' || !sc.imagePath) return
  jobs.push({ kind: 'scene', src: sc.imagePath, width: WIDTHS.scene, sc, i })
  if (i === 0) jobs.push({ kind: 'preview', src: sc.imagePath, width: WIDTHS.preview, i })
})
const missing = jobs.filter((j) => !j.src || !existsSync(j.src)).map((j) => j.src || `(${j.kind}: 경로 없음)`)
if (missing.length) throw new Error(`원본이 없습니다:\n  ${missing.join('\n  ')}`)

if (existsSync(OUT)) rmSync(OUT, { recursive: true })
mkdirSync(OUT, { recursive: true })

// 모든 씬이 같은 스타일 태그를 쓴다 — 씬 목록의 스타일 행에 그대로 나온다.
const manifest = { styleTag: project.scenes.find((s) => s.style_tag)?.style_tag || '', references: [], scenes: [] }

for (const job of jobs) {
  if (job.kind === 'ref') {
    const file = `ref-${job.ref.id}.jpg`
    shrink(job.src, join(OUT, file), job.width)
    manifest.references.push({ id: job.ref.id, name: job.ref.name, prompt: job.ref.prompt, file })
  } else if (job.kind === 'scene') {
    const file = `scene-${job.i + 1}.jpg`
    shrink(job.src, join(OUT, file), job.width)
    manifest.scenes.push({
      no: job.i + 1,
      startTime: job.sc.startTime,
      endTime: job.sc.endTime,
      duration: job.sc.duration,
      subtitle: job.sc.subtitle,
      characters: job.sc.characters || '',
      file,
    })
  } else {
    // 타임라인 프리뷰는 한 장만 크게 쓴다.
    const file = `scene-${job.i + 1}-preview.jpg`
    shrink(job.src, join(OUT, file), job.width)
    manifest.scenes.find((s) => s.no === job.i + 1).previewFile = file
  }
}

const bytes = readdirSync(OUT).reduce((n, f) => n + statSync(join(OUT, f)).size, 0)
console.log(
  `assets/ — 레퍼런스 ${manifest.references.length}장 / 씬 ${manifest.scenes.length}장, 합계 ${Math.round(bytes / 1024)}KB`,
)
writeFileSync(join(HERE, 'gallery.json'), JSON.stringify(manifest, null, 2) + '\n')
