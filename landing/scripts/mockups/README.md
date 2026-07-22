# Story 단계별 목업 렌더러

블로그의 Story 모드 글에 쓰는 UI 목업 PNG를 만든다. 설계와 근거는 [SPEC.md](./SPEC.md).

## 왜 목업인가

AutoFlowCut UI 로케일은 `ko`/`en` 둘뿐인데 블로그는 ko/en/ja/de 4개 언어라, 실제 스크린샷으로는
ja/de 글을 채울 수 없다. 그래서 실제 마크업·CSS·문자열을 그대로 옮긴 목업을 렌더한다.
다만 **없는 UI 언어를 지어내지는 않는다** — ko와 en만 만들고, ja/de 글은 `-en.png`를 참조한다.

## 실행

```bash
node extract.mjs           # 부자와_빈자 프로젝트 → data.json (사용자 로컬에서만 가능)
node extract-strings.mjs   # AutoFlowCut 로케일 → strings.json의 ui 블록
node render.mjs            # 7종 × ko/en = 14장 PNG
node render.mjs scenes     # 한 종류만
node render.mjs --html     # PNG 없이 .build/*.html 만 — 브라우저로 열어 확인
```

출력 (1400×H CSS px를 2배율로):

- `story-step-{script,scenes,audio,prompts}-{ko,en}.png` — 단계별 화면
- `story-script-hero-{ko,en}.png` — 대본 붙여넣기 흐름의 스텝퍼(패널 없이 스텝퍼만)
- `story-title-hero-{ko,en}.png` — 대본까지 끝나 [전체 진행]이 눌리는 스텝퍼
- `story-benchmark-pipeline-{ko,en}.png` — ① 리서치 게이트에 들어가 있는 스텝퍼

경로 기본값이 안 맞으면 인자로 넘긴다:

```bash
node extract.mjs ~/Documents/AutoFlowCut/부자와_빈자
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
- `.build/`는 중간 HTML이라 커밋하지 않는다.
