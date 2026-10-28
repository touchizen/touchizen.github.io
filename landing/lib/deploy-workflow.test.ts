// The deploy builds and publishes whatever is on main. Drama posts are added daily, and their rules
// (every language present, images exist, no script markers — lib/drama-content.test.ts) only hold
// if the tests run before the build. A red test must stop the deploy.
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const yml = fs.readFileSync(path.join(process.cwd(), '..', '.github', 'workflows', 'deploy.yml'), 'utf8');

describe('deploy workflow', () => {
  it('runs the test suite before it builds the site', () => {
    const test = yml.search(/^\s*npm test\s*$/m);
    const build = yml.search(/^\s*npm run build\s*$/m);
    expect(test).toBeGreaterThan(-1);
    expect(build).toBeGreaterThan(test);
  });
});
