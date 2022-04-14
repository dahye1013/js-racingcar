// util
import { instanceCheck } from '../utils/typeCheck.js';

// components
import UserRacingInputComponent from '../components/UserRacingInputComponent.js';
import GameProcessComponent from '../components/GameProcessComponent.js';

// models
import GameProcessModel from '../model/GameProcessModel.js';
import UserRacingInputModel from '../model/UserRacingInputModel.js';

const userRacingInputModel = UserRacingInputModel.getInstance();
const gameProcessModel = GameProcessModel.getInstance();

const initFirstView = () => {
  UserRacingInputComponent({
    userRacingInputState: userRacingInputModel,
    startGame: setGameConfigurationAndStart,
  });
};

const setGameConfigurationAndStart = (
  gameConfigurationData,
  _ = instanceCheck(gameConfigurationData, UserRacingInputModel)
) => {
  gameProcessModel.setGameConfigurationData(gameConfigurationData);
  GameProcessComponent({
    gameProcessState: gameProcessModel,
  });
};

export const init = () => {
  initFirstView();
};


