import { MAX_RACING_CAR_NAME } from '../constants/unit.js';
import { ERROR } from '../constants/message.js';
import ValidationError from '../utils/validation.js';
import { RandomMovingStrategy } from './MovingStrategy.js';

export default class UserRacingInputModel {
  #carNames;
  #playTimes;
  #racingCarList;

  static instance;

  static getInstance() {
    if (!this.instance) this.instance = new UserRacingInputModel();
    return this.instance;
  }

  makePlayResult() {
    this.#racingCarList = this.#carNames.reduce((acc, cur) => {
      acc[cur] = Array.from({ length: this.#playTimes }, () =>
        RandomMovingStrategy.getInstance().isMoveable()
      );
      return acc;
    }, {});
  }

  #validator = {
    isValidCarName: carNames => {
      const isValid = carNames.every(
        carName => carName.length > 0 && carName.length <= MAX_RACING_CAR_NAME
      );
      if (!isValid)
        throw new ValidationError(ERROR.INVALID_LENGTH_RACING_CAR_NAME);
    },
    isValidPlayTime(playTimes) {
      const isValid = Number.isInteger(playTimes) && !Number.isNaN(playTimes);
      if (!isValid) throw new ValidationError(ERROR.INVALID_TYPE_PLAY_TIME);
    },
  };

  updateCarNames = (carNames, resolve) => {
    try {
      this.#validator.isValidCarName(carNames);
      this.#carNames = carNames;
      resolve();
    } catch (err) {
      if (err instanceof ValidationError) alert(err.message);
      console.log(err);
    }
  };

  updatePlayTimes = (playTimes, resolve) => {
    try {
      this.#validator.isValidPlayTime(playTimes);
      this.#playTimes = playTimes;
      resolve();
    } catch (err) {
      if (err instanceof ValidationError) alert(err.message);
      console.log(err);
    }
  };

  createProcessSettingData() {
    const gameProcessSettingData = {
      playTimes: this.#playTimes,
      carNames: this.#carNames,
      racingCarList: this.#racingCarList,
    };

    return new GameProcessSettingData(gameProcessSettingData);
  }
}

class GameProcessSettingData extends UserRacingInputModel {
  constructor(gameProcessSettingData) {
    super();
    this.playTimes = gameProcessSettingData.playTimes;
    this.leftPlayTime = gameProcessSettingData.playTimes;
    this.carNames = gameProcessSettingData.carNames;
    this.racingCarList = gameProcessSettingData.racingCarList;
  }
}
