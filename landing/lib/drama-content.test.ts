// 드라마 글 파일 자체를 검사한다 — 대본을 글로 바꾼 사람(또는 모델)이 빠뜨리기 쉬운 것들.
// 스펙 "실패로 치는 것": 대본 잔재가 남은 글, 언어마다 다른 영상·작품, 없는 이미지를 가리키는 글.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';

import { languages } from './i18n';

const DIR = path.join(process.cwd(), 'content', 'drama');
const PUBLIC = path.join(process.cwd(), 'public');
const langs = languages.map((l) => l.code);
const slugsOf = (lang: string) =>
  fs.existsSync(path.join(DIR, lang)) ? fs.readdirSync(path.join(DIR, lang)).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)) : [];
const read = (lang: string, slug: string) => matter(fs.readFileSync(path.join(DIR, lang, `${slug}.md`), 'utf-8'));
const files = langs.flatMap((lang) => slugsOf(lang).map((slug) => ({ lang, slug, ...read(lang, slug) })));

/** Production markers of the video scripts (script.md) that must not reach a reader. */
const SCRIPT_RESIDUE: [string, RegExp][] = [
  ['timecode', /@\d+:\d{2}|@\d+\.\d/],
  ['audio cue', /🔊/],
  ['still marker', /스틸★/],
  ['clip marker', /\((?:클립|원음)/],
  ['script table', /^\|\s*#\s*\|/m],
];

describe('drama posts', () => {
  it('exist', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it('exist in every language, with the same video, show and date', () => {
    const problems = slugsOf('ko').flatMap((slug) => {
      const missing = langs.filter((l) => !fs.existsSync(path.join(DIR, l, `${slug}.md`))).map((l) => `${slug}: no ${l}`);
      if (missing.length) return missing;
      const ko = read('ko', slug).data;
      return langs
        .filter((l) => ['youtube', 'seriesId', 'date'].some((k) => read(l, slug).data[k] !== ko[k]))
        .map((l) => `${slug}: ${l} differs in youtube/seriesId/date`);
    });
    expect(problems).toEqual([]);
  });

  it('carry the fields a drama page is built from', () => {
    const problems = files.flatMap(({ lang, slug, data }) =>
      [
        typeof data.title === 'string' && data.title.length > 0 ? null : 'title',
        // A day, or a day and publish time with its offset ("2026-10-26T20:00:00+09:00") to order same-day posts.
        /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2})?$/.test(String(data.date)) ? null : 'date',
        typeof data.excerpt === 'string' && data.excerpt.length > 0 ? null : 'excerpt',
        Array.isArray(data.tags) && data.tags.length > 0 ? null : 'tags',
        /^[A-Za-z0-9_-]{11}$/.test(String(data.youtube)) ? null : 'youtube',
        data.series ? null : 'series',
        data.seriesId ? null : 'seriesId',
        typeof data.image === 'string' && data.image.startsWith('/') ? null : 'image',
      ].filter(Boolean).map((field) => `${lang}/${slug}: ${field}`),
    );
    expect(problems).toEqual([]);
  });

  // Without a time, two posts of one day fall in file-name order — the evening post can sit below the
  // morning one and prev/next point the wrong way.
  it('give a publish time when another post shares their day', () => {
    const untimed = langs.flatMap((lang) => {
      const posts = files.filter((f) => f.lang === lang);
      return posts
        .filter((f) => posts.some((o) => o !== f && String(o.data.date).slice(0, 10) === String(f.data.date).slice(0, 10)))
        .filter((f) => !String(f.data.date).includes('T'))
        .map((f) => `${lang}/${f.slug}`);
    });
    expect(untimed).toEqual([]);
  });

  it('point only at images that exist', () => {
    const missing = files.flatMap(({ lang, slug, data, content }) => {
      const srcs = [data.image, ...Array.from(content.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)/g), (m) => m[1])];
      return srcs.filter((src) => !fs.existsSync(path.join(PUBLIC, src))).map((src) => `${lang}/${slug}: ${src}`);
    });
    expect(missing).toEqual([]);
  });

  it('leave no script production markers in the text', () => {
    const found = files.flatMap(({ lang, slug, content }) =>
      SCRIPT_RESIDUE.filter(([, re]) => re.test(content)).map(([name]) => `${lang}/${slug}: ${name}`),
    );
    expect(found).toEqual([]);
  });
});
