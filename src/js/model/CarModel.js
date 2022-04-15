import { RandomMovingStrategy } from './MovingStrategy.js';

export default class CarModel {
  #name;
  #moving = [];

  constructor({ name }) {
    this.#name = name;
    this.#moving = RandomMovingStrategy.getInstance().isMoveable();
  }

  get name() {
    return this.#name;
  }
}
