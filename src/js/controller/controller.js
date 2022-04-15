// components
import UserRacingInputComponent from '../components/UserRacingInputComponent.js';
import GameProcessComponent from '../components/GameProcessComponent.js';

import UserRacingInputModel from '../model/UserRacingInputModel.js';

// state
import * as state from '../model/state.js';

const userRacingInputModel = UserRacingInputModel.getInstance();

const initFirstView = () => {
  UserRacingInputComponent({
    userRacingInputState: userRacingInputModel,
    startGame: setGameConfigurationAndStart,
  });
};

const setGameConfigurationAndStart = gameConfigurationData => {
  state.addCar(gameConfigurationData.carNames);
  state.addPlayTime(gameConfigurationData.playTimes);
  state.makeGameResult();

  GameProcessComponent({
    gameProcessState: state.state,
    consumeTimeHandler: state.consumeTime,
  });
};

export const init = () => {
  initFirstView();
};
