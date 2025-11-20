import { Project, Sprite } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage.js";
import TitleScreen from "./TitleScreen.js";
import Particles from "./Particles.js";
import Smokeparticles from "./Smokeparticles.js";

// Create the stage
const stage = new Stage({ costumeNumber: 1 });

// Create sprites
const sprites = {
  TitleScreen: new TitleScreen({
    x: 24,
    y: -18,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1,
  }),
  Particles: new Particles({
    x: 47,
    y: -183,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 3,
    size: 387,
    visible: true,
    layerOrder: 2,
  }),
  Smokeparticles: new Smokeparticles({
    x: -158,
    y: -250,
    direction: 11,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 300,
    visible: true,
    layerOrder: 3,
  }),
};

// Create the project
const project = new Project(stage, sprites, {
  frameRate: 30,
});

export default project;
