/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Smokeparticles extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("", "./Smokeparticles/costumes/.svg", {
        x: 81.3559299314322,
        y: 81.35592993143221,
      }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *startAsClone() {
    this.size = this.random(200, 700);
    for (let i = 0; i < 100; i++) {
      this.move(3);
      this.effects.ghost += 0.5;
      this.size += 1;
      yield;
    }
    this.stage.vars.menuscreenClones--;
    this.deleteThisClone();
  }

  *whenGreenFlagClicked() {
    this.effects.ghost = 50;
    while (true) {
      this.goto(this.random(240, -240), -250);
      this.direction = this.random(-20, 20);
      yield* this.wait(0.2);
      if (this.compare(this.stage.vars.menuscreenClones, 200) < 0) {
        this.createClone();
        this.stage.vars.menuscreenClones++;
      }
      yield;
    }
  }
}
