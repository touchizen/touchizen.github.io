# Whisk2CapCut - Import Guide 작업 요청서

## 목표
Chrome Extension의 파일 불러오기 기능에 대한 상세 가이드 페이지 작성

## 대상 파일 형식 (4종)

### 1. 프롬프트 Text 파일 (.txt)
- **용도**: 이미지 생성을 위한 프롬프트 목록
- **형식**: 줄바꿈으로 구분된 프롬프트
- **필요 문서**:
  - [ ] 사용법 가이드
  - [ ] 샘플 파일 제공
  - [ ] AI 생성 프롬프트 예시 (ChatGPT/Claude)

### 2. 씬 CSV 파일 (.csv)
- **용도**: 씬별 프롬프트 + 설정 (duration, effect 등)
- **형식**: CSV (prompt, duration, effect 컬럼)
- **필요 문서**:
  - [ ] 사용법 가이드 (컬럼 설명)
  - [ ] 샘플 파일 제공
  - [ ] AI 생성 프롬프트 예시

### 3. 레퍼런스 CSV 파일 (.csv)
- **용도**: Character/Background/Style 레퍼런스 이미지 매핑
- **형식**: CSV (scene_id, character, background, style 컬럼)
- **필요 문서**:
  - [ ] 사용법 가이드
  - [ ] 샘플 파일 제공
  - [ ] AI 생성 프롬프트 예시

### 4. 자막 SRT 파일 (.srt)
- **용도**: 타임코드 기반 자막 → 씬 자동 분할
- **형식**: 표준 SRT 포맷
- **필요 문서**:
  - [ ] 사용법 가이드
  - [ ] 샘플 파일 제공
  - [ ] 자막 생성 도구 안내 (Whisper 등)

---

## 페이지 구조 제안

```
touchizen.github.io/
├── whisk2capcut/
│   ├── index.html          # 메인 랜딩 (기존)
│   ├── docs/
│   │   ├── import-guide.html    # Import 가이드 메인
│   │   ├── prompt-text.html     # 프롬프트 Text 상세
│   │   ├── scene-csv.html       # 씬 CSV 상세
│   │   ├── reference-csv.html   # 레퍼런스 CSV 상세
│   │   └── subtitle-srt.html    # 자막 SRT 상세
│   └── samples/
│       ├── sample-prompts.txt
│       ├── sample-scenes.csv
│       ├── sample-references.csv
│       └── sample-subtitles.srt
```

---

## Chrome Extension 연동

whisk2capcut 확장프로그램의 파일 불러오기 UI에서:

```
📄 프롬프트 Text 파일  [?] [샘플] [AI 생성법]
                        ↓
               touchizen.github.io/whisk2capcut/docs/prompt-text.html
```

각 파일 형식 옆에 버튼 추가:
- **[?]** 또는 **[사용법]** → 해당 가이드 페이지로 이동
- **[샘플]** → 샘플 파일 다운로드
- **[AI 생성법]** → AI 프롬프트 예시 페이지

---

## 참고 - 기존 whisk2capcut 파일들

Extension 소스코드 위치:
- `/Volumes/Macintosh HD/Users/tuxxon/workspace/whisk2capcut/`

Import 관련 컴포넌트 (추정):
- `src/components/ImportSection.jsx` 또는 유사 파일
- 파일 파싱 로직 확인 필요

---

## 우선순위

1. **높음**: 프롬프트 Text, 씬 CSV (가장 많이 사용)
2. **중간**: 자막 SRT (활용도 높음)
3. **낮음**: 레퍼런스 CSV (고급 기능)

---

## 작업자 참고사항

- Jekyll 기반 사이트 (`_config.yml` 확인)
- 기존 스타일/레이아웃 활용
- 모바일 반응형 필수

---

## 다국어 지원 (필수)

**지원 언어 4개:**
| 코드 | 언어 |
|------|------|
| `ko` | 한국어 |
| `en` | English |
| `ja` | 日本語 |
| `de` | Deutsch |

**파일 구조 (언어별):**
```
whisk2capcut/
├── docs/
│   ├── ko/                      # 한국어
│   │   ├── import-guide.html
│   │   ├── prompt-text.html
│   │   ├── scene-csv.html
│   │   ├── reference-csv.html
│   │   └── subtitle-srt.html
│   ├── en/                      # English
│   │   └── (동일 구조)
│   ├── ja/                      # 日本語
│   │   └── (동일 구조)
│   └── de/                      # Deutsch
│       └── (동일 구조)
└── samples/                     # 샘플 파일 (공통)
    ├── sample-prompts.txt
    ├── sample-scenes.csv
    ├── sample-references.csv
    └── sample-subtitles.srt
```

**또는 단일 파일 + i18n 방식:**
```html
<!-- 언어 선택 탭 -->
<div class="lang-tabs">
  <button data-lang="ko">한국어</button>
  <button data-lang="en">English</button>
  <button data-lang="ja">日本語</button>
  <button data-lang="de">Deutsch</button>
</div>
```

**Chrome Extension 연동:**
- Extension에서 현재 언어 감지 (`useI18n` 훅)
- URL 파라미터로 언어 전달: `?lang=ko`

---

*작성일: 2025-01-30*
*작성자: Claude (이전 세션에서 요청받음)*
