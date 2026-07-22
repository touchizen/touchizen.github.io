# Story 단계별 목업 + 블로그 보강 — 설계

날짜: 2026-07-22

## 배경

`6465487b`에서 Story 모드 블로그 3편(ko/en/ja/de)을 추가했다. 두 가지 문제가 있다.

1. **내용이 얇다.** 파이프라인 후반 4단계(③ 대본 · ④ 씬 분리 · ⑤ 오디오 · ⑥ 프롬프트)가
   글자로만 설명돼 있다. 이미지는 스텝퍼와 0번 설정 폼 두 장뿐이라, 실제로 각 단계에서
   **무엇이 나오는지**를 독자가 볼 수 없다.
2. **ja/de 목업이 없는 UI를 보여준다.** AutoFlowCut 로케일은 `src/locales/ko.js`, `en.js`
   둘뿐인데 de 목업은 `Story-Typ` / `Ausgabesprache` / `Skriptlänge` 처럼 UI 전체가
   독일어다. 같은 이미지의 "출력 언어" 드롭다운은 `English (en)`으로 정확한데 껍데기만
   번역돼 있어, 독일어 UI가 존재한다고 오해하게 만든다.

또 하나: **지난 목업의 HTML 소스가 커밋되지 않았다.** scratchpad에만 있었기 때문에
이번 작업이 처음부터 다시 만드는 것으로 시작한다. 이번엔 렌더 파이프라인을 repo에 남긴다.

## 결정

| 항목 | 결정 |
|---|---|
| 목업 범위 | 후반 4단계(③④⑤⑥)만 신규 제작 — ①리서치·②시놉시스는 기존 이미지 유지 |
| 글 구성 | 기존 3편 보강 + 케이스 스터디 1편 신규 |
| ja/de UI | **UI 라벨은 영어**(실제 en 로케일 문자열), 본문·캡션만 각 언어 |
| 이미지 언어 | **ko와 en만 렌더한다.** ja/de 글은 `-en.png`를 참조하고 캡션만 각 언어 (아래 참고) |
| 후속(별건) | AutoFlowCut에 `src/locales/ja.js`, `de.js` 추가 → 나중에 진짜 ja/de로 재렌더 |

### 왜 ja/de 이미지를 안 만드나

"UI는 영어, 콘텐츠도 en 출력"으로 정하고 나면 ja 목업과 de 목업은 **en 목업과 픽셀까지 같아진다.**
같은 그림을 파일명만 바꿔 3벌 커밋할 이유가 없으므로 ko/en 두 벌만 렌더하고, ja/de 글은
`-en.png`를 참조한다. 기존에 커밋돼 있던 ja/de 12장(`story-{benchmark,script,title}-*-{ja,de}.png`)은
삭제했다. ja/de 글에는 "앱 UI는 ko/en뿐이라 영어 화면을 싣는다"는 안내를 본문에 넣었다.

## 데이터 출처

목업의 모든 값은 실제 프로젝트 `~/Documents/AutoFlowCut/부자와_빈자`에서 온다.

- `story/story.json` — 입력(제목 "부자와 빈자", genre `bespoke`, engine `claude`,
  `opus[1m]`, reasoning `medium`, 1분, `scene` 5~10초), 스텝 상태 4개 전부 `done`,
  `speakers` 4명(박씨·윤 회장·문지기·변호사) 각각 gender/age/role/ethnicity/appearance 확정
- `story/synopsis.md` — 로그라인 · 훅 · 기승전결
- `story/script.md` — 대본 본문(화자 대사 `**문지기:**` 포함)
- `story/scenes.json` — 11씬 / 20세그먼트 / 72.53초.
  화자 분포 narrator 16, SFX 2, 문지기 1, 윤 회장 1.
  감정 분포 sad 8 · normal 7 · angry 2 · happy 1.
  세그먼트마다 `voiceKey: typecast:tc_6436dbbb602bde66c6b39504:normal`, `status: done`,
  씬마다 `imagePrompt` / `videoPrompt`(영문 시네마틱)
- `story/audio/` — 세그먼트 20개(나레이션·대사 18은 `.wav`, 효과음 2는 ElevenLabs `.mp3`),
  `final.srt`, `manifest.json`

**제약:** `project.json`의 씬 `status`는 전부 `pending` — 이미지/비디오는 아직 생성되지
않았다. 따라서 케이스 스터디는 "제목 → 프롬프트·오디오까지"의 산출물로 구성한다.
나중에 생성하면 최종 프레임을 덧붙인다.

## 1. 목업 7종 × ko/en = 14장

마크업·클래스는 `AutoFlowCut/src/components/story/`의 실제 구조를 따른다.

### `story-step-script-{lang}.png` — ③ 대본
`StoryView.jsx:1655` `story-script-editor` → `PromptInput`. editor phase.
- 편집기는 **마크다운을 렌더링하지 않는다.** `scriptText` 원문이 그대로 보이므로
  `## 훅`, `**문지기:** "…"` 표기가 화면에 남고, 빈 줄을 포함한 줄마다 왼쪽 거터에
  번호가 붙는다(`App.css`의 `.prompt-paragraph::before` counter). 목업도 같은 규칙.
- 하단 `story-editor-controls`: 검수 컨트롤(자동검수 체크 + 횟수 + 실행) / 다시쓰기 /
  이어쓰기 / 분리시작 (`StoryView.jsx:1862-1895`)

### `story-step-scenes-{lang}.png` — ④ 씬 분리
`StoryView.jsx:2080` `story-scenes-panel`.
- `story-rerun-bar`: 라벨 `씬 분리 단위` + select(`씬 기준` / `문장 기준`) + `5 ~ 10 초`
- `table.story-readonly-table` 컬럼 `# | 화자 | 세그먼트(감정)` (`:2130-2132`)
- SFX 행은 `story-sfx-row` + `story-sfx-desc` (`:2176-2179`)
- 감정은 `story-seg-emotion`(0.8em, opacity .7) 보조 텍스트

### `story-step-audio-{lang}.png` — ⑤ 오디오
`StoryView.jsx:2194` `story-audio-panel`.
- `story-voice-map`: **`state.speakers` 전원**의 성우 지정 행 (`:2259-2280`, 필터 없음).
  대사가 한 줄도 없는 인물(박씨·변호사)도 행으로 나온다.
- 성우 라벨은 `speaker.voice`에서 온다(`useStoryVoiceSelection.js:39`). 이 프로젝트는
  전원 `voice: null`이라 실제 앱도 "기본 성우"로 표시한다 — 세그먼트 `voiceKey`에 남은
  typecast voiceId는 합성에 쓰인 기본값이지 화자에 저장된 선택이 아니다.
- `table.story-audio-table` 컬럼 `# | 화자 | 세그먼트(감정) | 상태 | 액션` (`:2431-2437`)
- 상태 배지 `story-status story-status-done`
- SFX 행은 `story-sfx-cell` + `story-sfx-source` select

### `story-step-prompts-{lang}.png` — ⑥ 프롬프트
`StoryView.jsx:2533` `story-prompts-panel`.
- 컬럼 `# | 이미지 프롬프트 | 비디오 프롬프트` (`:2565-2567`)
- 하단 `story-prompts-count-row`는 **일부러 뺐다.** `story.prompts.sceneCount` 키가
  ko/en 어디에도 없는데, `StoryView`는 `useI18n`의 `t`를 직접 쓰지 않고 `useSafeT`
  (`StoryView.jsx:343`)로 감싸며 거기선 2번째 인자가 진짜 fallback이다. 그래서 실제 앱은
  **한국어든 영어든 `씬 11`로 렌더한다** — 영어 UI에 한국어가 새는 것이다.
  영어 목업에 한국어를 넣을 수도, 없는 영어 라벨을 지어낼 수도 없어 이 행을 뺐다.
  → 진짜 수정은 AutoFlowCut locales에 이 키를 추가하는 것(별건).

### `story-script-hero-{lang}.png` — 대본 붙여넣기 흐름의 스텝퍼

`render.mjs`의 `FLOWS.pasted`. 이전 커밋의 같은 이름 이미지는 **리서치·시놉시스가 둘 다
회색**이었는데 그건 틀렸다 — `handlePasteStart`(`StoryView.jsx:1422`)는 대본을 영속한 뒤
`setScriptPhase('synopsis')`로 보내 등장인물을 역추출·확인시킨다. 비활성인 건 리서치뿐이고,
확인 전에는 `unconfirmedGate`가 `canRunAll`(`:1493`)을 막아 [전체 진행]이 비활성이다.

또한 자동 토글은 `AUTO_STEPS = ['scenes','audio','prompts']`(`StoryStepper.jsx:42`)뿐이라
**대본에는 [자동]이 없다.** 0번 설정 칩은 상태 배지가 없는 진입 탭이라 점을 달지 않는다.

## 2. 렌더 파이프라인 (repo에 커밋)

```
landing/scripts/mockups/
  SPEC.md            이 문서
  data.json          부자와_빈자에서 추출한 실데이터
  strings.json       UI 라벨 ko/en (locales에서 추출) + 캡션 4언어
  story-mockup.css   StoryView.css에서 해당 클래스만 발췌
  render.mjs         MOCKUPS 레지스트리 → PNG (7종 × ko/en)
  README.md          재생성 방법
```

렌더: headless Chrome (`--headless --screenshot --force-device-scale-factor=2`),
기존 이미지와 같은 2x 해상도. npm 의존성 추가 없음.

렌더는 **ko와 en만** 만든다. ja/de 글은 `-en.png`를 참조한다 — 앱에 ja/de UI가 없으므로
같은 그림을 파일명만 바꿔 복제할 이유가 없다(위 「왜 ja/de 이미지를 안 만드나」 참고).

## 3. 글 4편

| 글 | 추가 |
|---|---|
| `story-mode-title-to-video` | ③④⑤⑥ 목업 4장 + 단계별 실제 산출물 예시 |
| `story-mode-script-to-video` | ④⑤⑥ 목업 3장 (③은 "건너뜀" 설명 유지) |
| `story-mode-youtube-benchmark` | ①② 유지 + 후속 단계 ④⑥ 목업으로 연결 |
| `story-mode-case-study` (신규) | 「제목 한 줄 "부자와 빈자" → 72초, 11씬」 실제 산출물 공개 |

케이스 스터디 구성: 입력(설정값) → 시놉시스(로그라인/훅) → 캐릭터 4명 표 →
대본 발췌 → 씬 표(11씬/20세그먼트) → 오디오(성우·SRT·72.53초) → 프롬프트 11쌍 → 내보내기.

## 4. 부수

- 기존 ja/de 12장 삭제(위 참고). `story-script-hero-{ko,en}`은 잘못된 상태를 그려 재렌더.
- `story-mode-{title,script}-to-video`의 OG 이미지를 스텝퍼 스트립(4:1~7.6:1)에서
  설정 폼(약 1.7:1)으로 교체 — 소셜 카드에서 잘리지 않게.
- `landing/public/sitemap.xml`에 케이스 스터디 4 URL + hreflang 추가.

## 검증

1. `npx next build` 통과 (landing)
2. 신규 md 16개 프론트매터의 `image:` 경로가 실제 파일과 일치
3. 목업의 표 값이 `scenes.json` 원본과 일치 (렌더가 data.json을 읽으므로 구조적으로 보장)
4. ja/de 목업에 한국어/일본어/독일어 UI 라벨이 없음
