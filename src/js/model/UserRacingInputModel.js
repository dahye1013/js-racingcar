import ValidationError from '../utils/validation.js';
import {
  CarNameConfigurationStrategy,
  PlayTimeConfigurationStrategy,
  StepForwardConfigurationStrategy,
} from './GameConfigurationStrategy.js';

export default class UserRacingInputModel {
  #carNames;
  #playTimes;
  #racingCarList;

  makePlayResult() {
    this.#racingCarList = this.#carNames.reduce((acc, cur) => {
      acc[cur] = Array.from({ length: this.#playTimes }, () =>
        this.#isStepForward(StepForwardConfigurationStrategy.build())
      );
      return acc;
    }, {});
  }

  #isStepForward(movingStrategy) {
    return movingStrategy.isMoveable() ? 1 : 0;
  }

  updateCarNames = carNames => {
    try {
      CarNameConfigurationStrategy.build()
        .inputNames(carNames)
        .isValidCarName();

      this.#carNames = carNames;
    } catch (err) {
      if (err instanceof ValidationError) alert(err.message);
      console.log(err);
    }
  };

  updatePlayTimes = playTimes => {
    try {
      PlayTimeConfigurationStrategy.build()
        .playTimes(playTimes)
        .isValidPlayTime();

      this.#playTimes = playTimes;
    } catch (err) {
      if (err instanceof ValidationError) alert(err.message);
      console.log(err);
    }
  };

  consumeTime = () => {
    this.#playTimes -= 1;
  };

  get gameProcessSettingData() {
    return {
      leftPlayTime: this.#playTimes,
      carNames: this.#carNames,
      racingCarList: this.#racingCarList,
    };
  }
}
