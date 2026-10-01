import { describe, expect, it } from 'vitest';
import { adjacentPosts, latestPosts, relatedPosts } from './blog';

const post = (slug: string, date: string, tags: string[]) => ({ slug, date, tags });
const slugs = (posts: { slug: string }[]) => posts.map((p) => p.slug);

describe('relatedPosts', () => {
  const current = post('cur', '2026-10-01', ['AutoFlowCut', 'Story 모드']);

  it('never lists the post being read', () => {
    const others = relatedPosts(current, [current, post('a', '2026-09-01', ['AutoFlowCut'])]);
    expect(slugs(others)).toEqual(['a']);
  });

  it('lists only posts that share a tag', () => {
    const posts = [post('none', '2026-09-30', ['GitHub']), post('one', '2026-07-01', ['AutoFlowCut'])];
    expect(slugs(relatedPosts(current, posts))).toEqual(['one']);
  });

  it('puts posts that share more tags first', () => {
    const posts = [post('one', '2026-07-01', ['AutoFlowCut']), post('two', '2026-02-01', ['AutoFlowCut', 'Story 모드'])];
    expect(slugs(relatedPosts(current, posts))).toEqual(['two', 'one']);
  });

  it('breaks ties with the newest post first', () => {
    const posts = [post('old', '2026-02-25', ['AutoFlowCut']), post('new', '2026-09-29', ['AutoFlowCut']), post('mid', '2026-07-15', ['AutoFlowCut'])];
    expect(slugs(relatedPosts(current, posts))).toEqual(['new', 'mid', 'old']);
  });

  it('lists at most three', () => {
    const posts = Array.from({ length: 6 }, (_, i) => post(`p${i}`, `2026-09-0${i + 1}`, ['AutoFlowCut']));
    expect(relatedPosts(current, posts)).toHaveLength(3);
  });
});

describe('latestPosts', () => {
  const current = post('cur', '2026-08-01', []);

  it('lists the newest other posts first, at most three', () => {
    const posts = [post('a', '2026-01-01', []), current, post('b', '2026-09-01', []), post('c', '2026-03-01', []), post('d', '2026-05-01', [])];
    expect(slugs(latestPosts(current, posts, []))).toEqual(['b', 'd', 'c']);
  });

  it('skips posts already listed elsewhere', () => {
    const b = post('b', '2026-09-01', []);
    const posts = [post('a', '2026-01-01', []), b, post('c', '2026-03-01', [])];
    expect(slugs(latestPosts(current, posts, [b]))).toEqual(['c', 'a']);
  });
});

describe('adjacentPosts', () => {
  // As getAllPosts returns them: newest first.
  const posts = [post('newest', '2026-10-01', []), post('middle', '2026-09-01', []), post('oldest', '2026-08-01', [])];

  it('takes the older post as previous and the newer one as next', () => {
    const { prev, next } = adjacentPosts(posts[1], posts);
    expect(prev?.slug).toBe('oldest');
    expect(next?.slug).toBe('newest');
  });

  it('has no next for the newest post and no previous for the oldest', () => {
    expect(adjacentPosts(posts[0], posts).next).toBeUndefined();
    expect(adjacentPosts(posts[2], posts).prev).toBeUndefined();
  });
});
