import { RandomMovingStrategy } from './MovingStrategy.js';
import CarModel from './CarModel.js';

export const state = {
  carList: [],
  // gameConfigurationData
  totalPlayTimes: 0,
  leftPlayTime: 0,
  consumeTime: 0,
  racingCarList: {},
  carNames: [],
};

export const addCar = carNames => {
  carNames.forEach(name => {
    state.carList.push(new CarModel({ name }));
    state.carNames.push(name);
  });
};

export const addPlayTime = playTimes => {
  state.totalPlayTimes = playTimes;
  state.leftPlayTime = playTimes;
};

export const makeGameResult = () => {
  state.racingCarList = state.carList.reduce((acc, cur) => {
    const carName = cur.name;
    acc[carName] = Array.from({ length: state.totalPlayTimes }, () =>
      RandomMovingStrategy.getInstance().isMoveable()
    );
    return acc;
  }, {});
  console.log(state);
};

export const consumeTime = () => {
  state.leftPlayTime = state.leftPlayTime - 1;
};
