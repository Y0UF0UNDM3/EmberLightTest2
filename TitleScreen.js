/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TitleScreen extends Sprite {
  constructor(...args) {
    super(...args);

    // Costumes (all in root folder)
    this.costumes = [
      new Costume("1", "./1.svg", { x: 714.9237060546875, y: 714.9237060546876 }),
      new Costume("2", "./2.svg", { x: 714.9237060546875, y: 714.9237060546876 }),
      new Costume("3", "./3.svg", { x: 714.9237060546875, y: 714.9237060546876 }),
      new Costume("[Playbutton]", "./[Playbutton].svg", { x: 33.9, y: 13.2 }),
      new Costume("[Loadbutton]", "./[Loadbutton].svg", { x: 33.9, y: 13.2 }),
      new Costume("[Settingsbutton]", "./[Settingsbutton].svg", { x: 33.9, y: 13.2 }),
      new Costume("Emberlight", "./Emberlight.svg", { x: 293.5435, y: 127.6276 }),
    ];

    // Sounds (in root folder)
    this.sounds = [
      new Sound("emberlight-titlescreen", "./emberlight-titlescreen.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Startscreen" }, this.whenIReceiveStartscreen),
      new Trigger(Trigger.BROADCAST, { name: "Clear the dang screen" }, this.whenIReceiveClearTheDangScreen),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
    ];

    this.vars.gamestarted = 0;
    this.vars.backdroptransition = 1;
    this.vars.backdropwaitinator = "nothanks";
  }

  *whenIReceiveStartscreen() {
    this.stage.vars.whicheverBackdropItIsRightNow = this.random(1, 3);
    this.vars.backdroptransition = 0;
    this.size = 100;
    this.effects.clear();
    this.vars.gamestarted = 0;
    this.stage.vars.startscreenslide = 1;
    while (!(this.toNumber(this.vars.gamestarted) === 1)) {
      this.broadcast("Clear the dang screen");
      this.effects.brightness = 0;
      if (this.toNumber(this.stage.vars.startscreenslide) === 1) {
        yield* this.renderstartscreen();
      } else {
        null;
      }
      yield;
    }
  }

  *renderstartscreen() {
    this.costume = "Emberlight";
    this.goto(0, 120);
    this.createClone();
    this.goto(0, 50);
    this.costume = "[Playbutton]";
    this.size = 150;
    if (this.touching("mouse")) {
      this.size = 170;
    } else {
      this.size = 150;
    }
    this.createClone();
    this.goto(0, 0);
    this.costume = "[Loadbutton]";
    if (this.touching("mouse")) {
      this.size = 120;
    } else {
      this.size = 100;
    }
    this.createClone();
    this.goto(0, -50);
    this.costume = "[Settingsbutton]";
    if (this.touching("mouse")) {
      this.size = 120;
    } else {
      this.size = 100;
    }
    this.createClone();
    this.moveBehind();
    this.goto(this.mouse.x / -10, this.mouse.y / -10);
    this.size = 100;
    this.costume = this.stage.vars.whicheverBackdropItIsRightNow;
    this.effects.brightness =
      this.toNumber(this.stage.vars.brightnessthing) +
      Math.sin(this.degToRad(this.timer * 40)) * 10;
    if (this.toNumber(this.vars.backdroptransition) === 1) {
      this.stage.vars.brightnessthing--;
      if (this.toNumber(this.stage.vars.brightnessthing) === -100) {
        this.vars.backdroptransition = 2;
        this.stage.vars.whicheverBackdropItIsRightNow = this.random(1, 3);
      }
    } else if (this.toNumber(this.vars.backdroptransition) === 0) {
      if (this.toString(this.vars.backdropwaitinator) === "nothanks") {
        this.vars.backdropwaitinator =
          ((new Date().getTime() - new Date(2000, 0, 1)) / 1000 / 60 +
            new Date().getTimezoneOffset()) /
          60 /
          24;
      }
      if (
        this.compare(
          0.0001,
          ((new Date().getTime() - new Date(2000, 0, 1)) / 1000 / 60 +
            new Date().getTimezoneOffset()) /
            60 /
            24 -
            this.toNumber(this.vars.backdropwaitinator)
        ) < 0
      ) {
        this.vars.backdropwaitinator = "nothanks";
        this.vars.backdroptransition = 1;
      }
    } else if (this.toNumber(this.vars.backdroptransition) === 2) {
      this.stage.vars.brightnessthing++;
      if (this.toNumber(this.stage.vars.brightnessthing) === 0) {
        this.vars.backdroptransition = 0;
      }
    }
  }

  *whenIReceiveClearTheDangScreen() {
    this.deleteThisClone();
  }

  *whenGreenFlagClicked() {
    this.broadcast("Startscreen");
  }

  *whenGreenFlagClicked2() {
    while (true) {
      yield* this.playSoundUntilDone("emberlight-titlescreen");
      yield;
    }
  }
}
