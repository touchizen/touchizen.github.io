# 드라마 블로그 열기 (2단계) Implementation Plan

> Executed inline (superpowers:executing-plans). Spec: `docs/superpowers/specs/2026-10-28-drama-blog-design.md`. Builds on phase 1 (`2026-10-28-blog-categories-phase1.md`).

**Goal:** 드라마 카테고리(`/{lang}/blog/drama/`)를 「100일의 거짓말」 글 4편 × 4개 언어와 함께 연다 — 글마다 유튜브 임베드·끝 링크·VideoObject, 목록은 작품별 묶음, 허브는 카테고리마다 3개 + 더 보기.

## Global Constraints
- phase 1 의 Global Constraints 그대로(IT 주소·출력 불변, i18n line-parallel — 새 키는 `blog_hub_subtitle` 다음 줄, node 모듈 없는 `lib/blog-categories.ts`, 영어 커밋 + Co-Authored-By).
- `BLOG_CATEGORIES` 에는 4개 언어 모두 글이 있을 때만 `DRAMA` 를 넣는다(마지막 Task).
- 라우트 파일은 카테고리 상수 하나만 넘기는 얇은 파일(phase 1 리뷰).
- 글·이미지는 Opus 서브에이전트가 쓴다(ko 4편 → 검토 → en·ja·de 번역 → 검토). 이 계획의 Task 는 코드만.

## Interfaces
```ts
// lib/blog-categories.ts
interface BlogCategory { …; subtitleKey: TranslationKey; youtubeChannel?: string }
export const DRAMA: BlogCategory = { id: 'drama', contentDir: 'drama', postBase: 'blog/drama', listBase: 'blog/drama',
  sitemapFile: 'sitemap-drama.xml', nameKey: 'blog_cat_drama', subtitleKey: 'blog_drama_subtitle', youtubeChannel: 'UCF79bfcre5z5WZmN8ncsA2Q' };
// lib/blog.ts — BlogPost += youtube?: string; series?: string; seriesId?: string. CardPost += series, seriesId.
// buildPostJsonLd: post.youtube 가 있으면 video: VideoObject(name, description, thumbnailUrl i.ytimg maxresdefault, uploadDate, embedUrl, url)
// lib/blog-hub.ts
export function hubSections(lang: Language, categories?: readonly BlogCategory[]): HubSection[]
```
i18n 새 키(4개 언어): `blog_cat_drama`, `blog_drama_subtitle`, `blog_watch_youtube`, `blog_subscribe_channel`.

## Tasks (TDD — 테스트 먼저, 실패 확인, 구현, 통과, 커밋)
1. **콘텐츠 모델 + DRAMA 정의**: 새 front matter 3키 파싱, `subtitleKey`(목록 부제가 카테고리에서), `DRAMA` 상수(아직 목록 밖). 테스트는 `lib/__fixtures__/drama/` 픽스처를 가리키는 카테고리로.
2. **글 화면 유튜브**: `youtube` 있으면 제목·메타 아래 16:9 iframe(`https://www.youtube.com/embed/{id}`, title = 글 제목), 본문 끝 "유튜브에서 보기"(`https://youtu.be/{id}`) + "채널 구독"(`https://www.youtube.com/channel/{youtubeChannel}?sub_confirmation=1`), JSON-LD `video`. 없으면 아무것도 안 그린다(IT 글 불변).
3. **목록·허브**: 글에 `series` 가 있으면 목록을 작품별 묶음(h2 작품명 → 카드 h3, 최신 작품 먼저). `hubSections` 를 `lib/blog-hub.ts` 로 빼서 [TECH, FIXTURE] 로 "3개 + more" 검증, 허브 카드 제목 h3. phase 1 의 "IT 하나일 때 허브 = 전부" 테스트는 `hubSections(lang, [TECH])` 로 바꾼다.
4. **헤더 드롭다운 접근성**: 하위 메뉴가 있을 때 블로그 링크에 `aria-haspopup="true"`, 감싼 요소에서 Esc 면 포커스를 풀어 닫는다.
5. **드라마 열기** (글 16개가 들어온 뒤): `blog/drama/page.tsx`(목록 + `generateMetadata` = `buildListMetadata`), `blog/drama/[slug]/page.tsx`(postRoute 에 `DRAMA`), `app/sitemap-drama.xml/route.ts`(`categorySitemapResponse(DRAMA)`), `BLOG_CATEGORIES = [TECH, DRAMA]`, `blog-sitemap.test.ts` 의 `[pages, blog]` 고정 줄 삭제. phase 1 의 일반 테스트(라우트 존재·4개 언어 글·라우트가 자기 카테고리)가 드라마를 자동으로 검사한다. 추가: 본문 대본 잔재 금지·로컬 이미지 존재·front matter 필수 키 테스트(`lib/drama-content.test.ts`).
6. **빌드 확인 → Opus 리뷰 → 병합·배포**: 기준선 대비 IT 페이지 0 손실, `out/{lang}/blog/drama/` 목록 4 + 글 16, 각 글 iframe·AdSense·hreflang·VideoObject, `sitemap-drama.xml` 글 16, 색인에 3개, 헤더 하위 메뉴·허브 두 섹션 눈확인.

## Review Focus
- 드라마 글에서 언어를 바꾸면 같은 글의 그 언어판으로 간다(4개 언어 다 있음).
- IT 글 화면에는 iframe·유튜브 링크가 생기지 않는다.
- 같은 날짜 두 편(10-26)의 순서가 뒤섞여도 목록·이전/다음이 깨지지 않는다.
- 썸네일이 없는 언어에서도 OG 이미지가 깨지지 않는다(ko 사본).
- 드라마 목록·허브의 제목 계층(h1 → h2 → h3).
