/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Particles extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Particles/costumes/costume1.svg", {
        x: 18.715237238353183,
        y: 4.827916595671411,
      }),
      new Costume("costume2", "./Particles/costumes/costume2.svg", {
        x: 18.715237238353183,
        y: 4.827916595671411,
      }),
      new Costume("costume3", "./Particles/costumes/costume3.svg", {
        x: 18.715237238353183,
        y: 4.827916595671411,
      }),
    ];

    this.sounds = [new Sound("pop", "./Particles/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.menuscreenClones = 0;
    yield* this.makeIntClones();
    while (true) {
      this.size = this.random(100, 500);
      this.goto(this.random(-240, 240), this.random(-180, 180));
      this.y = -200;
      if (this.compare(this.stage.vars.menuscreenClones, 200) < 0) {
        this.stage.vars.menuscreenClones++;
        this.createClone();
        yield* this.wait(0);
      }
      yield;
    }
  }

  *startAsClone() {
    this.costume = this.random(1, 3);
    this.direction = this.random(10, -10);
    while (true) {
      this.direction += this.random(1, -1);
      this.move(1);
      if (this.compare(this.y, 200) > 0) {
        this.stage.vars.menuscreenClones--;
        this.deleteThisClone();
      }
      yield;
    }
  }

  *makeIntClones() {
    for (let i = 0; i < 100; i++) {
      this.size = this.random(100, 500);
      this.goto(this.random(-240, 240), this.random(-180, 180));
      this.stage.vars.menuscreenClones++;
      this.createClone();
    }
  }
}
