import { execSync } from 'child_process';

import nvimCommand from './nvimCommand';
import shellEnv from './shellEnv';

let version: string | undefined | null;

/**
 * Get Neovim version string.
 */
const nvimVersion = () => {
  if (version !== undefined) return version;

  const env = shellEnv();
  try {
    const execResult = execSync(`${nvimCommand(env)} --version`, {
      encoding: 'utf-8',
      env,
    });
    if (execResult) {
      const match = execResult.match(/NVIM v(\d+)\.(\d+).(\d+)(.*)/);
      if (match) {
        version = `${match[1]}.${match[2]}.${match[3]}${match[4]}`;
      }
    }
  } catch (e) {
    version = null;
  }
  return version;
};

export default nvimVersion;
