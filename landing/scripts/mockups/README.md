# Story 단계별 목업 렌더러

블로그의 Story 모드 글에 쓰는 UI 목업 PNG를 만든다. 설계와 근거는 [SPEC.md](./SPEC.md).

## 왜 목업인가

AutoFlowCut UI 로케일은 `ko`/`en` 둘뿐인데 블로그는 ko/en/ja/de 4개 언어라, 실제 스크린샷으로는
ja/de 글을 채울 수 없다. 그래서 실제 마크업·CSS·문자열을 그대로 옮긴 목업을 렌더한다.
다만 **없는 UI 언어를 지어내지는 않는다** — ko와 en만 만들고, ja/de 글은 `-en.png`를 참조한다.

## 실행

```bash
node extract.mjs           # ⚠️ 원 프로젝트가 삭제돼 더는 못 돌린다 (아래 참고)
node extract-images.mjs    # ⚠️ 마찬가지 — assets/·gallery.json 은 읽기 전용 스냅샷
node extract-strings.mjs   # AutoFlowCut 로케일 → strings.json의 ui 블록
node render.mjs            # 12종 × ko/en = 24장 PNG
node render.mjs scenes     # 한 종류만
node render.mjs --html     # PNG 없이 .build/*.html 만 — 브라우저로 열어 확인
```

출력 — 폭·높이·배율은 목업마다 `MOCKUPS`에서 정한다(기본 1400 CSS px · 2배율):

- `story-step-{script,scenes,audio,prompts}-{ko,en}.png` — 단계별 화면
- `story-script-hero-{ko,en}.png` — 대본 붙여넣기 흐름의 스텝퍼(패널 없이 스텝퍼만)
- `story-title-hero-{ko,en}.png` — 대본까지 끝나 [전체 진행]이 눌리는 스텝퍼
- `story-benchmark-pipeline-{ko,en}.png` — ① 리서치 게이트에 들어가 있는 스텝퍼
- `story-ref-tab-{ko,en}.png` — Ref 탭(생성된 캐릭터 레퍼런스 카드 4장, 폭 900)
- `story-scene-list-{ko,en}.png` — 씬 목록(자막·매칭 태그·생성된 씬 썸네일)
- `story-timeline-{ko,en}.png` — 오디오 타임라인(프리뷰 모니터 + 레인 5줄, 1.5배율)
- `story-results-{ko,en}.png` — ☰ 결과 표(썸네일·프롬프트·모델·상태)
- `story-grid-{ko,en}.png` — ⊞ 결과 그리드(카드 11장, 폭 900 · 1.5배율)

AutoFlowCut 경로가 기본값과 다르면 인자로 넘긴다:

```bash
node extract-strings.mjs ~/workspace/AutoFlowCut
```

## 파일

| 파일 | 내용 |
|---|---|
| `SPEC.md` | 설계·결정·근거 |
| `extract.mjs` | 실제 프로젝트 → `data.json` (커밋된 스냅샷) |
| `translations.en.json` | 한국어 산출물의 영어판 — 손으로 쓴 유일한 콘텐츠 |
| `extract-strings.mjs` | AutoFlowCut 로케일 → `strings.json` |
| `story-mockup.css` | StoryView.css / SpeakerAudioSource.css / App.css 발췌 |
| `extract-images.mjs` | 생성 결과물 → `assets/` 축소본 + `gallery.json` |
| `assets/` | 목업에 박히는 축소 이미지(레퍼런스 4 · 씬 11 · 프리뷰 1) |
| `render.mjs` | HTML 생성 + headless Chrome 스크린샷 |

## 손대기 전에 알아둘 것

- **`story-mockup.css`의 `.story-*` 규칙은 앱 CSS의 복사본이다.** 눈대중으로 고치지 말고
  원본(`AutoFlowCut/src/components/story/StoryView.css` 등)에서 다시 옮길 것.
- **UI 라벨을 `render.mjs`에 직접 쓰지 말 것.** `strings.json`에 없는 키를 쓰면
  `page()`가 예외를 던진다 — 실제 앱과 다른 라벨이 조용히 들어가는 걸 막기 위한 가드다.
- **높이는 손으로 맞춘 값이다.** headless Chrome은 창 크기만큼만 찍으므로,
  행을 늘리거나 문구를 바꾸면 `MOCKUPS[name].height`를 다시 맞추고 눈으로 확인해야 한다.
- **스텝퍼 상태는 `FLOWS`에서만 바꾼다.** 게이트 활성/확정, 자동 토글, [전체 진행] 활성 여부가
  전부 실제 컴포넌트 규칙과 묶여 있다 — 보기 좋으라고 손대면 없는 화면을 그리게 된다.
- ⚠️ **원 프로젝트(부자와_빈자)는 삭제됐다 — 복구 불가.** `extract.mjs`와 `extract-images.mjs`는
  더 이상 돌릴 수 없고, 커밋된 `assets/` · `gallery.json` · `data.json`이 **읽기 전용 스냅샷**으로
  유일한 출처다. 두 스크립트는 출처를 남기려고 보존해 둔 것이지 실행 대상이 아니다.
  (`extract-strings.mjs`는 AutoFlowCut 소스만 보므로 계속 쓸 수 있다.)
- **씬 썸네일은 240px이 상한이다.** 더 크게 쓰려면 배율을 낮춰 맞추는 수밖에 없다
  (Grid가 1.5배율인 이유) — 원본이 없어 다시 뽑을 수 없다.
- **생성 이미지가 많은 목업은 `scale`을 낮춘다.** 2배율이면 PNG가 1MB를 넘어 본문이 무거워진다.
- `.build/`는 중간 HTML이라 커밋하지 않는다.
