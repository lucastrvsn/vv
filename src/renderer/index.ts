// import log from '../lib/log';

import { IpcRendererEvent } from 'electron';

import { initNvim } from './nvim';

import initScreen from './screen';

import initKeyboard from './input/keyboard';
import initMouse from './input/mouse';
import hideMouseCursor from './features/hideMouseCursor';

import { ipcRenderer } from './preloaded/electron';

import { Settings } from '../main/nvim/settings';

const initRenderer = (_event: IpcRendererEvent, settings: Settings) => {
  initNvim();
  initScreen(settings);
  initKeyboard();
  initMouse();
  hideMouseCursor();
};

ipcRenderer.on('initRenderer', initRenderer);
