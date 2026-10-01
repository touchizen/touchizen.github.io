import { describe, expect, it } from 'vitest';
import { relatedPosts } from './blog';

const post = (slug: string, date: string, tags: string[]) => ({ slug, date, tags });

describe('relatedPosts', () => {
  const current = post('cur', '2026-10-01', ['AutoFlowCut', 'Story 모드']);

  it('never lists the post being read', () => {
    const others = relatedPosts(current, [current, post('a', '2026-09-01', [])]);
    expect(others.map((p) => p.slug)).toEqual(['a']);
  });

  it('puts posts that share more tags first', () => {
    const posts = [
      post('none', '2026-09-30', ['GitHub']),
      post('one', '2026-07-01', ['AutoFlowCut']),
      post('two', '2026-02-01', ['AutoFlowCut', 'Story 모드']),
    ];
    expect(relatedPosts(current, posts).map((p) => p.slug)).toEqual(['two', 'one', 'none']);
  });

  it('breaks ties with the newest post first', () => {
    const posts = [post('old', '2026-02-25', ['GitHub']), post('new', '2026-09-29', ['TTS']), post('mid', '2026-07-15', [])];
    expect(relatedPosts(current, posts).map((p) => p.slug)).toEqual(['new', 'mid', 'old']);
  });

  it('lists at most five', () => {
    const posts = Array.from({ length: 8 }, (_, i) => post(`p${i}`, `2026-09-0${i + 1}`, []));
    expect(relatedPosts(current, posts)).toHaveLength(5);
  });
});
