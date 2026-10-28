# 블로그 카테고리 틀 (1단계) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** touchizen.com 블로그를 카테고리 구조(허브 `/{lang}/blog/` + IT 목록 `/{lang}/blog/tech/`)로 바꾸고, 카테고리별 sitemap·자동 색인·헤더/푸터 진입로까지 오늘 배포한다. 드라마는 2단계에서 첫 글과 함께 연다.

**Architecture:** 카테고리 정의는 fs 없는 순수 데이터 모듈 `lib/blog-categories.ts` 한 곳(클라이언트 헤더·푸터도 import). `lib/blog.ts`·`lib/blog-sitemap.ts` 의 함수는 마지막 인자로 `category`(기본 `TECH`)를 받아 콘텐츠 폴더와 주소 앞부분만 바꾼다 — 기본값 덕분에 기존 호출·테스트가 그대로 돈다. 라우트는 카테고리마다 실제 폴더, 화면 컴포넌트는 `category` 객체를 prop 으로 받는다.

**Tech Stack:** Next.js 14 app router (`output: 'export'`, `trailingSlash: true`), React 18, TypeScript, Tailwind, vitest + `react-dom/server` `renderToStaticMarkup`.

**Spec:** `docs/superpowers/specs/2026-10-28-drama-blog-design.md` (특히 "단계", "카테고리와 주소", "메인에서 들어가는 길", "코드"의 sitemap 항목)

## Global Constraints

- IT 글 주소는 그대로 `/{lang}/blog/{slug}/`. IT 글의 메타·JSON-LD·`sitemap-blog.xml` 출력은 바이트 단위로 그대로.
- 기존 테스트 `lib/blog-list.test.ts`, `lib/blog-post-related.test.ts`, `lib/blog-related.test.ts`, `lib/og-metadata.test.ts`, `lib/products.test.ts`, `lib/adsense.test.ts` 는 **고치지 않고** 통과. `lib/blog-sitemap.test.ts` 는 색인 검사 하나(`sitemap.xml is an index …`)만 고친다.
- `BLOG_CATEGORIES` 에는 4개 언어 모두에 글이 있는 카테고리만 넣는다. 1단계에서는 `[TECH]` 하나.
- `lib/blog-categories.ts` 는 `fs`·`path` 등 node 모듈을 import 하지 않는다(클라이언트 번들에 들어간다). i18n 은 `import type` 만.
- `landing/lib/i18n/{ko,en,ja,de}.ts` 는 line-parallel — 새 키는 네 파일 모두 457행 `blog_tags` 바로 다음 줄에 같은 순서로.
- 모든 주소는 끝 슬래시 포함.
- 커밋 메시지는 영어, 끝에 `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`.
- 커밋에 넣지 말 것: untracked `landing/app/gift/token/`, `landing/lib/token-diet-gift*.ts`, `landing/public/downloads/`(다른 작업), 빌드가 바꾸는 `landing/tsconfig.tsbuildinfo`(`git checkout --` 로 되돌린다).
- 전체 `npx vitest run` 에서 `lib/token-diet-gift.test.ts` 1건 실패는 위 다른 작업 것이라 무시한다. 그 외 실패 0.
- 작업 브랜치 `feat/blog-categories` → 끝나면 main 에 병합 후 push(사용자: "오늘은 … 배포시키는 거야").

## Review Focus

- 예전 북마크 `/{lang}/blog/` 로 들어온 사람은 지금처럼 IT 글 **전부**를 본다(카테고리 하나일 때 허브 = 전체 목록) → Task 3 `BlogHubPage` 테스트.
- 언어 전환: `/ko/blog/tech/` 에서 en 을 고르면 `/en/blog/tech/`, IT 글에서는 같은 글의 en 주소로 간다(허브·404 로 튀지 않는다) → Task 3 언어 전환 테스트.
- 글 화면 "블로그로 돌아가기"는 그 글의 카테고리 목록(`/ko/blog/tech/`)으로 간다 → Task 3.
- `/sitemap.xml` 이 빌드 산출물에 색인으로 존재하고(robots.txt 가 가리키는 그 주소), `public/sitemap.xml` 과 충돌하지 않는다 → Task 2 테스트 + Task 5 산출물 확인.
- 카테고리가 하나뿐일 때 헤더에 하위 메뉴가 안 생기고, 둘 이상이면 데스크톱·모바일 둘 다 생긴다 → Task 4 테스트.

---

### Task 1: 카테고리 정의 + `blog.ts`·`blog-sitemap.ts` 카테고리화

**Files:**
- Create: `landing/lib/blog-categories.ts`
- Modify: `landing/lib/blog.ts` (`contentDir` 상수, `postUrl`, 공개 함수 시그니처), `landing/lib/blog-sitemap.ts` (`postUrl`, 두 공개 함수)
- Modify: `landing/lib/i18n/{ko,en,ja,de}.ts` (457행 다음)
- Test: `landing/lib/blog-categories.test.ts`

**Interfaces:**
- Produces:
  ```ts
  // lib/blog-categories.ts
  export type BlogCategoryId = 'tech' | 'drama' | 'economy';
  export interface BlogCategory {
    id: BlogCategoryId;
    contentDir: string;   // landing/content/ 아래 폴더. tech = 'blog'
    postBase: string;     // 글 주소에서 slug 앞부분. tech = 'blog'
    listBase: string;     // 목록 주소. tech = 'blog/tech'
    sitemapFile: string;  // tech = 'sitemap-blog.xml'
    nameKey: TranslationKey; // tech = 'blog_cat_tech'
  }
  export const TECH: BlogCategory;
  export const BLOG_CATEGORIES: readonly BlogCategory[]; // [TECH]
  export function categoryListPath(category: BlogCategory, lang: Language): string;           // `/${lang}/${listBase}/`
  export function categoryPostPath(category: BlogCategory, lang: Language, slug: string): string; // `/${lang}/${postBase}/${slug}/`
  ```
  ```ts
  // lib/blog.ts — 마지막 인자 category 추가, 기본값 TECH
  getPostSlugs(lang, category = TECH): string[]
  getPostBySlug(lang, slug, category = TECH): BlogPost | null
  getPostLanguages(slug, category = TECH): Language[]
  buildPostMetadata(lang, slug, category = TECH): Metadata
  buildPostJsonLd(lang, slug, post, category = TECH)
  getAllPosts(lang, category = TECH): BlogPost[]
  // lib/blog-sitemap.ts
  blogSitemapEntries(category = TECH): SitemapEntry[]
  blogSitemapXml(entries, category = TECH): string
  ```
- i18n 키: `blog_cat_tech` = ko `'IT·AI'` / en `'Tech & AI'` / ja `'IT・AI'` / de `'Tech & KI'`; `blog_hub_subtitle` = ko `'터치즌의 글을 주제별로 모았습니다'` / en `'Everything Touchizen writes, by topic'` / ja `'Touchizenの記事をテーマ別にまとめました'` / de `'Alle Beiträge von Touchizen nach Themen'`.

- [ ] **Step 0: 기준선 떠 두기(아무것도 고치기 전, main 에서)**

  Run: `cd landing && rm -rf .next out && npm run build && git checkout -- tsconfig.tsbuildinfo && (cd out && find . -path '*/blog/*' -name index.html | sort) > <scratchpad>/blog-before.txt && cp out/sitemap-blog.xml <scratchpad>/sitemap-blog-before.xml`
  Expected: 목록 파일이 비어 있지 않다(IT 글 × 언어 + 언어별 `blog/index.html`). Task 5 가 이걸로 대조한다.

- [ ] **Step 1: Write the failing test** `lib/blog-categories.test.ts`

  테스트용 가짜 카테고리(Task 2~4 의 테스트 파일에도 같은 정의를 둔다) `const FAKE: BlogCategory = { id: 'drama', contentDir: 'blog', postBase: 'x/y', listBase: 'x/list', sitemapFile: 'sitemap-x.xml', nameKey: 'blog_cat_tech' }` (IT 글을 다른 주소로 내보내 보는 용도).
  - `it('keeps the IT post addresses and gives IT its own list')`: `categoryPostPath(TECH, 'ko', 'a')` → `'/ko/blog/a/'`, `categoryListPath(TECH, 'ko')` → `'/ko/blog/tech/'`.
  - `it('lists only categories that have posts in every language')`: 모든 `BLOG_CATEGORIES` × `languages` 에 대해 `getPostSlugs(lang, cat).length > 0`.
  - `it('has no IT post slug that a category folder would shadow')`: `getPostSlugs(l, TECH)` 어느 언어에도 `'tech' | 'drama' | 'economy'` 가 없다.
  - `it('builds a post\'s canonical, hreflang and JSON-LD from its category')`: 아무 IT slug 하나로 `buildPostMetadata('ko', slug, FAKE).alternates.canonical` → `https://touchizen.com/ko/x/y/${slug}/`, `buildPostJsonLd('ko', slug, post, FAKE).mainEntityOfPage['@id']` 같은 주소, 그리고 `buildPostMetadata('ko', slug)`(기본) canonical 은 `https://touchizen.com/ko/blog/${slug}/`.
  - `it('writes a category sitemap with the category\'s addresses')`: `blogSitemapXml([{ lang: 'ko', slug: 'a', date: '2026-01-01', noindex: false }], FAKE)` 에 `<loc>https://touchizen.com/ko/x/y/a/</loc>`.

- [ ] **Step 2: Run test to verify it fails**

  Run: `cd landing && npx vitest run lib/blog-categories.test.ts`
  Expected: FAIL — `Cannot find module './blog-categories'`.

- [ ] **Step 3: Implement** `lib/blog-categories.ts`, i18n 키 8줄(언어마다 2줄), `blog.ts`·`blog-sitemap.ts` 의 시그니처 변경. `blog.ts` 의 `contentDir` 상수는 `path.join(process.cwd(), 'content', category.contentDir)` 계산으로, 두 파일의 `postUrl` 은 `SITE_URL + categoryPostPath(...)` 로 바꾼다. `blogSitemapEntries` 는 `getPostSlugs(lang, category)`/`getPostBySlug(lang, slug, category)` 를 쓴다.

- [ ] **Step 4: Run tests to verify they pass**

  Run: `cd landing && npx vitest run lib/blog-categories.test.ts lib/blog-related.test.ts lib/blog-sitemap.test.ts lib/blog-list.test.ts lib/blog-post-related.test.ts && npx tsc --noEmit`
  Expected: 전부 PASS (기존 테스트 손대지 않음), tsc 출력 없음.

- [ ] **Step 5: Commit**

  ```bash
  git add landing/lib/blog-categories.ts landing/lib/blog-categories.test.ts landing/lib/blog.ts landing/lib/blog-sitemap.ts landing/lib/i18n/ko.ts landing/lib/i18n/en.ts landing/lib/i18n/ja.ts landing/lib/i18n/de.ts
  git commit -m "feat(blog): define blog categories and make the blog loaders category-aware"
  ```

### Task 2: 자동 sitemap 색인

**Files:**
- Modify: `landing/lib/blog-sitemap.ts` (색인 함수 추가)
- Create: `landing/app/sitemap.xml/route.ts`
- Delete: `landing/public/sitemap.xml`
- Modify: `landing/lib/blog-sitemap.test.ts` — `it('sitemap.xml is an index of the page sitemap and the generated blog sitemap')` **하나만** 교체

**Interfaces:**
- Consumes: `BLOG_CATEGORIES`, `BlogCategory.sitemapFile` (Task 1)
- Produces: `sitemapIndexXml(categories: readonly BlogCategory[] = BLOG_CATEGORIES): string` in `lib/blog-sitemap.ts` — `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, `sitemap-pages.xml` 다음 카테고리 순서대로 `https://touchizen.com/<sitemapFile>`. 지금 `public/sitemap.xml` 의 주석 줄은 버린다.

- [ ] **Step 1: Write the failing test** — 위 `it` 을 다음 셋으로 교체(같은 `describe('sitemap files in public/')` 안 또는 새 `describe('sitemap index')`):
  - `it('serves the index at /sitemap.xml: the page sitemap, then one sitemap per category')`: `app/sitemap.xml/route` 의 `GET()` 응답 content-type 에 `application/xml`, 본문에 `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, `locs(본문)` → `[SITE/sitemap-pages.xml, ...BLOG_CATEGORIES.map(c => SITE/c.sitemapFile)]` — 오늘은 곧 `[…/sitemap-pages.xml, …/sitemap-blog.xml]`.
  - `it('adds a category\'s sitemap to the index by itself')`: `locs(sitemapIndexXml([TECH, FAKE]))` 끝이 `…/sitemap-x.xml`.
  - `it('leaves /sitemap.xml to the route alone')`: `fs.existsSync('public/sitemap.xml')` → `false`.

- [ ] **Step 2: Run test to verify it fails**

  Run: `cd landing && npx vitest run lib/blog-sitemap.test.ts`
  Expected: FAIL — `app/sitemap.xml/route` 없음.

- [ ] **Step 3: Implement** `sitemapIndexXml`, `app/sitemap.xml/route.ts`(`export const dynamic = 'force-static'`, `app/sitemap-blog.xml/route.ts` 와 같은 꼴), `git rm landing/public/sitemap.xml`.

- [ ] **Step 4: Run tests to verify they pass**

  Run: `cd landing && npx vitest run lib/blog-sitemap.test.ts lib/blog-categories.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add -A landing/app/sitemap.xml landing/lib/blog-sitemap.ts landing/lib/blog-sitemap.test.ts landing/public/sitemap.xml
  git commit -m "feat(sitemap): generate the sitemap index from the blog categories"
  ```

### Task 3: 허브 + IT 목록 + 화면 컴포넌트 카테고리화

**Files:**
- Modify: `landing/app/(main)/[lang]/blog/page.tsx` (허브로)
- Create: `landing/app/(main)/[lang]/blog/BlogHubClient.tsx`
- Create: `landing/app/(main)/[lang]/blog/tech/page.tsx`
- Modify: `landing/app/(main)/[lang]/blog/BlogPageClient.tsx` (`category` prop, 카드 마크업을 export 해 허브가 재사용)
- Modify: `landing/app/(main)/[lang]/blog/[slug]/BlogPostClient.tsx` (`category` prop)
- Modify: `landing/app/(main)/[lang]/blog/[slug]/page.tsx` (`TECH` 를 명시적으로 넘김 — 동작 동일)
- Test: `landing/lib/blog-hub.test.ts`, `landing/lib/blog-categories.test.ts`(라우트 존재 검사 추가)

**Interfaces:**
- Consumes: `BlogCategory`, `TECH`, `BLOG_CATEGORIES`, `categoryListPath`, `categoryPostPath`, `getAllPosts(lang, category)` (Task 1)
- Produces:
  ```ts
  // BlogPageClient.tsx
  export default function BlogPageClient(props: { lang: Language; posts: BlogPost[]; category?: BlogCategory /* = TECH */ })
  export function PostCard(props: { lang: Language; category: BlogCategory; post: BlogPost }) // 기존 목록 카드 그대로
  // BlogPostClient.tsx — 기존 props + category?: BlogCategory (= TECH)
  // BlogHubClient.tsx
  export interface HubSection { category: BlogCategory; posts: BlogPost[]; more: boolean }
  export default function BlogHubClient(props: { lang: Language; sections: HubSection[] })
  // blog/page.tsx (허브)
  export default function BlogHubPage({ params }: { params: { lang: Language } }) // <BlogHubClient sections=…/> 를 돌려준다
  ```
  허브 규칙: 카테고리 2개 이상이면 섹션마다 최신 3개 + `more = 글 수 > 3`; 1개면 전부 + `more = false`. 목록이 빈 카테고리는 섹션을 만들지 않는다.
  화면 문구: 허브 h1 `blog_title`, 부제 `blog_hub_subtitle`, 섹션 h2 = `t(category.nameKey)`(카테고리 목록 링크), "더 보기 →" = `blog_read_more`. 카테고리 목록 h1 = `t(category.nameKey)`, 부제 `blog_subtitle`(IT 용 그대로).

- [ ] **Step 1: Write the failing tests** `lib/blog-hub.test.ts` (Header 는 props 를 잡아 두는 mock: `vi.mock('@/components/Header', () => ({ default: (p: HeaderProps) => { lastHeader = p; return null; } }))`, `useRouter` 는 `push` 를 `vi.fn()` 으로)
  - `it('shows every IT post on the hub while IT is the only category')`: `BlogHubPage({ params: { lang: 'ko' } })` 의 `props.sections` 길이 1, `sections[0].posts.length === getAllPosts('ko').length`, `more === false`.
  - `it('shows three posts and a more link per category when there are several')`: `BlogHubClient` 에 `[{category: TECH, posts: 4개 중 3개, more: true}, {category: FAKE, posts: 1개, more: false}]` → 섹션 h2 링크 `href="/ko/blog/tech/"` 와 `href="/ko/x/list/"`, `/ko/blog/tech/` 를 가리키는 "더 보기" 링크 정확히 1개, FAKE 쪽엔 없음, 카드 링크 `/ko/blog/<slug>/` 와 `/ko/x/y/<slug>/`.
  - `it('links list cards with the category\'s post address')`: `BlogPageClient({ lang: 'ko', posts, category: FAKE })` → `href="/ko/x/y/a/"`; prop 생략 시 `href="/ko/blog/a/"`.
  - `it('sends the post back to its own category list')`: `BlogPostClient({ lang: 'ko', post, category: FAKE })` → 돌아가기 링크 `href="/ko/x/list/"`, prev/next/관련 링크 `/ko/x/y/…`; 생략 시 돌아가기 `href="/ko/blog/tech/"`.
  - `it('switches language to the same list and the same post')`: 렌더 후 `lastHeader.onLanguageChange('en')` → `push` 가 `'/en/blog/tech/'`(목록), `'/en/blog/<slug>/'`(글), `'/en/blog/'`(허브)로 불린다.
  - `lib/blog-categories.test.ts` 에 `it('gives every category its list page, post page and sitemap route')` 추가: 모든 `BLOG_CATEGORIES` 에 대해 `app/(main)/[lang]/${listBase}/page.tsx`, `app/(main)/[lang]/${postBase}/[slug]/page.tsx`, `app/${sitemapFile}/route.ts` 가 존재(`fs.existsSync`, cwd = landing) — 2단계·경제를 열 때 라우트 빠뜨림을 잡는다.

- [ ] **Step 2: Run tests to verify they fail**

  Run: `cd landing && npx vitest run lib/blog-hub.test.ts lib/blog-categories.test.ts`
  Expected: FAIL — `BlogHubClient` 모듈 없음, `blog/tech/page.tsx` 없음.

- [ ] **Step 3: Implement** 위 Interfaces 대로. `blog/tech/page.tsx` 는 `generateStaticParams`(언어 4개) + `<BlogPageClient lang posts={getAllPosts(lang, TECH)} category={TECH} />`. 허브 `page.tsx` 는 `BLOG_CATEGORIES` 를 돌며 섹션을 만든다. 클라이언트 컴포넌트의 모든 `/blog` 하드코딩 주소(`BlogPageClient.tsx:26,40`, `BlogPostClient.tsx:32,83,89,133,139`)를 `categoryListPath`/`categoryPostPath` 로.

- [ ] **Step 4: Run tests to verify they pass**

  Run: `cd landing && npx vitest run && npx tsc --noEmit`
  Expected: `lib/token-diet-gift.test.ts` 1건 외 전부 PASS, tsc 출력 없음.

- [ ] **Step 5: Commit**

  ```bash
  git add "landing/app/(main)/[lang]/blog" landing/lib/blog-hub.test.ts landing/lib/blog-categories.test.ts
  git commit -m "feat(blog): turn /blog into a category hub and move the IT list to /blog/tech"
  ```

### Task 4: 헤더 하위 메뉴 + 푸터 카테고리 링크

**Files:**
- Modify: `landing/components/Header.tsx` (`navItems` 블로그 항목, 데스크톱 nav, 모바일 nav)
- Modify: `landing/components/Footer.tsx` (Legal 열 앞에 블로그 열)
- Test: `landing/lib/blog-nav.test.ts`

**Interfaces:**
- Consumes: `BLOG_CATEGORIES`, `categoryListPath` (Task 1)
- Produces: `Header` props 에 `categories?: readonly BlogCategory[]`(= `BLOG_CATEGORIES`), `Footer` props 에 같은 이름. 다른 호출부는 안 바꾼다.
  `export function BlogCategoryLinks(props: { lang: Language; categories: readonly BlogCategory[]; className?: string })` in `Header.tsx` — 카테고리 목록 링크 묶음. 데스크톱 드롭다운과 모바일 메뉴가 같이 쓴다.
  - 헤더 블로그 링크 `href` = `/${lang}/blog/`(끝 슬래시 추가). 카테고리 2개 이상이면: 데스크톱은 블로그 링크를 `relative group` 으로 감싸고 `hidden group-hover:block group-focus-within:block` 드롭다운에 카테고리 목록 링크, 모바일 메뉴는 블로그 링크 아래 들여쓴 카테고리 링크. 1개면 둘 다 없음.
  - 푸터: 제목 `nav_blog`, 카테고리마다 `t(nameKey)` → `categoryListPath` 링크(1개여도 표시 — 푸터는 크롤러 진입로).

- [ ] **Step 1: Write the failing test** `lib/blog-nav.test.ts` (`ThemeToggle`·`LanguageToggle` 은 `() => null` mock)
  - `it('links the blog hub from the header')`: `Header({ lang: 'ko', onLanguageChange() {} })` → `href="/ko/blog/"` 1개 이상.
  - `it('adds no category menu while there is one category')`: `categories: [TECH]` → `/ko/blog/tech/` 링크 0개.
  - `it('lists every category under the blog link')`: `categories: [TECH, FAKE]` → (모바일 메뉴는 기본 닫힘이라 데스크톱 드롭다운만 렌더된다) `/ko/blog/tech/`, `/ko/x/list/` 각각 정확히 1개.
  - `it('gives the mobile menu the same category links')`: `BlogCategoryLinks({ lang: 'ko', categories: [TECH, FAKE] })` → 두 링크와 `IT·AI` 문구. 모바일 nav 가 이 컴포넌트를 쓰는지는 리뷰로 본다.
  - `it('puts every category in the footer')`: `Footer({ lang: 'ko' })` → `/ko/blog/tech/` 링크와 `IT·AI` 문구; `categories: [TECH, FAKE]` → 두 링크.

- [ ] **Step 2: Run test to verify it fails**

  Run: `cd landing && npx vitest run lib/blog-nav.test.ts`
  Expected: FAIL — 블로그 링크가 `/ko/blog`(슬래시 없음), 푸터에 링크 없음.

- [ ] **Step 3: Implement** 위대로.

- [ ] **Step 4: Run tests to verify they pass**

  Run: `cd landing && npx vitest run && npx tsc --noEmit`
  Expected: `lib/token-diet-gift.test.ts` 1건 외 PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add landing/components/Header.tsx landing/components/Footer.tsx landing/lib/blog-nav.test.ts
  git commit -m "feat(nav): reach blog categories from the header and footer"
  ```

### Task 5: 빌드 산출물 확인 → 리뷰 → 배포

**Files:** 없음(확인·병합·배포)

- [ ] **Step 1: 새 빌드**

  Run: `cd landing && rm -rf .next out && npm run build && git checkout -- tsconfig.tsbuildinfo`
  Expected: 빌드 성공.

- [ ] **Step 2: 산출물 확인 (Task 1 Step 0 기준선과 대조)**

  - `blog-before.txt` 의 모든 경로가 `out/` 에 여전히 있다(`comm -23` 으로 빠진 것 0).
  - `out/{en,ko,ja,de}/blog/tech/index.html` 4개 존재, `out/*/blog/drama`·`economy` 없음.
  - `out/sitemap.xml` 이 `<sitemapindex` 로 시작하고 `sitemap-pages.xml`·`sitemap-blog.xml` 두 개, `out/sitemap-blog.xml` 이 `sitemap-blog-before.xml` 과 **같다**(`cmp`).
  - 새 페이지 `out/ko/blog/index.html`·`out/ko/blog/tech/index.html` 의 `<head>` 에 AdSense 태그 1개(`adsense` 검사 스크립트 재사용).
  - 브라우저 눈확인: `npx serve out` 로 `/ko/blog/`, `/ko/blog/tech/`, IT 글 하나(돌아가기 링크), 헤더(하위 메뉴 없음), 푸터(IT·AI 링크), 언어 전환.

- [ ] **Step 3: 리뷰** — Opus 5.5 서브에이전트 1명에게 `git diff main...feat/blog-categories` 전체 + 이 계획 + 스펙을 주고 구조·중복·에러 방지 리뷰. HIGH/MED 가 0 이 될 때까지 고치고 재리뷰.

- [ ] **Step 4: 병합·배포**

  ```bash
  git checkout main && git merge --no-ff feat/blog-categories && git pull --rebase origin main && git push origin main
  ```
  `gh run watch` 로 Deploy to GitHub Pages 성공 확인 → `curl` 로 `https://touchizen.com/sitemap.xml`(색인), `/ko/blog/`, `/ko/blog/tech/`, IT 글 하나 200 확인(CDN 최대 10분 캐시 고려).

- [ ] **Step 5: 사용자 안내** — 서치 콘솔에 `sitemap.xml` 재제출(주소는 같음, 이번엔 색인이 자동 생성). 2단계(드라마 열기 + 글 4편 × 4언어)는 별도 계획.
