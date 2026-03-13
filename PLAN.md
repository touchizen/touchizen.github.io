# Whisk2CapCut 웹사이트 - Video Creation Workflow 섹션 추가 플랜

## 현재 상태
- `page.tsx` (1778줄): "How It Works" 섹션은 Whisk2CapCut 앱 내부 3단계만 설명
- 전체 영상 제작 파이프라인 (Script → TTS → SRT → Prompts → Whisk2CapCut → CapCut)이 없음
- MS Store/Chrome Store 설명에는 이미 추가됨, 웹사이트에만 빠져있음

## 삽입 위치
**"Time Saving" 섹션과 "Features" 섹션 사이** (line 605~607)
- Time Saving: "4시간 → 1분" 시간 절약 메시지 → 자연스럽게 "그럼 전체 흐름은?" 으로 이어짐
- Features: 개별 기능 나열 → 워크플로우에서 각 기능이 어디서 쓰이는지 맥락 제공

## 구현 방식

### 1. 새 컴포넌트: `VideoWorkflowPipeline.tsx`
- `/landing/components/VideoWorkflowPipeline.tsx`에 생성
- 기존 page.tsx를 리팩토링하지 않고, import 1줄 + JSX 삽입만으로 추가

### 2. 시각적 디자인 (도형 활용)
6단계 파이프라인을 **수직 타임라인** 형태로 표현:

```
① 📝 Script    ──→  대본 작성
       │
       ▼
② 🎙️ TTS + SRT ──→  음성 + 자막 생성
       │
       ▼
③ ✂️ Scene Split ──→  SRT 기반 씬 분할
       │
       ▼
④ 🎨 Prompts   ──→  씬별 이미지 프롬프트
       │
       ▼
⑤ ⚡ Whisk2CapCut ──→  AI 이미지 생성 + CapCut 내보내기  ← 하이라이트!
       │
       ▼
⑥ 🎬 CapCut    ──→  최종 편집 & 공개
```

구체적 UI:
- 각 단계: 원형 번호 + 아이콘 + 제목 + 설명 카드
- 단계 사이: SVG 또는 CSS로 연결선 (세로 점선/화살표)
- 5단계(Whisk2CapCut): 보라색 그라데이션 하이라이트 테두리 + "This is where Whisk2CapCut takes over" 강조
- SRT 파일이 핵심 연결고리라는 점을 하단 callout 박스로 표시
- 모바일: 세로 스택 그대로 OK (원래 세로 타임라인이니까)
- 데스크톱: 같은 세로 레이아웃, max-width 제한으로 중앙 정렬

### 3. i18n 번역 키 추가
4개 언어 파일에 추가 (en.ts, ko.ts, ja.ts, de.ts):
- `workflow_pipeline_title`: 섹션 제목
- `workflow_pipeline_subtitle`: 섹션 부제
- `workflow_step1_title` ~ `workflow_step6_title`: 각 단계 제목
- `workflow_step1_desc` ~ `workflow_step6_desc`: 각 단계 설명
- `workflow_highlight`: Whisk2CapCut 강조 문구
- `workflow_srt_callout`: SRT 핵심 연결고리 문구

### 4. page.tsx 수정
- import 추가: `import VideoWorkflowPipeline from '@/components/VideoWorkflowPipeline';`
- Time Saving 섹션 닫는 `</section>` (line 605) 뒤에 새 섹션 삽입:
```tsx
{/* Video Creation Workflow Pipeline */}
<section className="section-padding">
  <div className="container-custom px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
      <span className="gradient-text">{t('workflow_pipeline_title')}</span>
    </h2>
    <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
      {t('workflow_pipeline_subtitle')}
    </p>
    <VideoWorkflowPipeline lang={lang} />
  </div>
</section>
```

## 작업 순서
1. en.ts에 번역 키 추가
2. ko.ts에 번역 키 추가
3. ja.ts, de.ts에 번역 키 추가 (영어 fallback 또는 번역)
4. VideoWorkflowPipeline.tsx 컴포넌트 생성
5. page.tsx에 import + 섹션 삽입
6. `npm run build` 로 빌드 확인
7. 커밋 & 푸시
