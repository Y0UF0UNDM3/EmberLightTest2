/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    // Costumes (in root folder)
    this.costumes = [
      new Costume("backdrop1", "./backdrop1.svg", { x: 240, y: 180 }),
    ];

    // Sounds (in root folder)
    this.sounds = [
      new Sound("emberlight-titlescreen", "./emberlight-titlescreen.wav"),
    ];

    // Triggers (empty for now)
    this.triggers = [];

    // Stage variables
    this.vars.startscreenslide = 1;
    this.vars.whicheverBackdropItIsRightNow = 1;
    this.vars.brightnessthing = -23;
    this.vars.menuscreenClones = 114;
  }
}
