// Find env variables if the app is started from Finder. We need a correct PATH variable to
// start nvim.

import { execSync } from 'child_process';

let env;

const shellEnv = () => {
  if (env) return env;

  env = process.env;
  // If we start app from terminal, it will have SHLVL variable. Then we already have correct
  // env variables and can skip this.
  if (!env.SHLVL) {
    try {
      // Try to get user's default shell and get env from it.
      const envString = execSync(
        '"$(dscl . -read ~/ UserShell | sed \'s/UserShell: //\')" -ilc env',
        { encoding: 'UTF-8', timeout: 1000 },
      );
      env = envString
        .split('\n')
        .filter(Boolean)
        .reduce((result, line) => {
          const [key, ...vals] = line.split('=');
          return {
            ...result,
            [key]: vals.join('='),
          };
        }, {});
    } catch (e) {
      // Most likely nvim is here.
      env.PATH = `/usr/local/bin:${env.PATH}`;
    }
  }
  return env;
};

export default shellEnv;
