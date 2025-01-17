import { getCurrentBranch } from '../lib/get-current-branch';

import { initFixtureFactory } from '@lerna-test/helpers';
const initFixture = initFixtureFactory(__dirname);

test('getCurrentBranch', async () => {
  const cwd = await initFixture('root-manifest-only');

  expect(getCurrentBranch({ cwd })).toBe('main');
});

test('getCurrentBranch without commit', async () => {
  const cwd = await initFixture('root-manifest-only', false);

  expect(() => getCurrentBranch({ cwd })).toThrow(/Command failed.*: git rev-parse --abbrev-ref HEAD.*/);
});
