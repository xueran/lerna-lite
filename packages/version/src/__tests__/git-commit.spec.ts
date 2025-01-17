jest.mock('@lerna-lite/core');
jest.mock('../utils/temp-write');
import { EOL } from 'os';
import { exec } from '@lerna-lite/core';
import { gitCommit } from '../lib/git-commit';
import { tempWrite } from '../utils/temp-write';
import { GitCommitOption } from '../models';

describe('git commit', () => {
  (exec as jest.Mock).mockResolvedValue(null);
  (tempWrite.sync as jest.Mock).mockReturnValue('temp-file-path');

  test('--message', async () => {
    const opts = { cwd: 'message' };
    await gitCommit('subject', {} as GitCommitOption, opts);
    expect(exec).toHaveBeenLastCalledWith('git', ['commit', '-m', 'subject'], opts, false);
  });

  test('--message <multiline>', async () => {
    const message = `subject${EOL}${EOL}body`;
    const opts = { cwd: 'multi-line' };
    await gitCommit(message, {} as GitCommitOption, opts);
    expect(tempWrite.sync).toHaveBeenLastCalledWith(message, 'lerna-commit.txt');
    expect(exec).toHaveBeenLastCalledWith('git', ['commit', '-F', 'temp-file-path'], opts, false);
  });

  test('--amend', async () => {
    const opts = { cwd: 'no-edit' };
    await gitCommit('whoops', { amend: true } as GitCommitOption, opts);
    expect(exec).toHaveBeenLastCalledWith('git', ['commit', '--amend', '--no-edit'], opts, false);
  });

  test('--no-commit-hooks', async () => {
    const opts = { cwd: 'no-verify' };
    await gitCommit('yolo', { commitHooks: false } as GitCommitOption, opts);
    expect(exec).toHaveBeenLastCalledWith('git', ['commit', '--no-verify', '-m', 'yolo'], opts, false);
  });

  test('--sign-git-commit', async () => {
    const opts = { cwd: 'signed' };
    await gitCommit('nice', { signGitCommit: true } as GitCommitOption, opts);
    expect(exec).toHaveBeenLastCalledWith('git', ['commit', '--gpg-sign', '-m', 'nice'], opts, false);
  });

  test('--signoff-git-commit', async () => {
    const opts = { cwd: 'signed-off' };
    await gitCommit('nice', { signoffGitCommit: true } as GitCommitOption, opts);
    expect(exec).toHaveBeenLastCalledWith('git', ['commit', '--signoff', '-m', 'nice'], opts, false);
  });
});
