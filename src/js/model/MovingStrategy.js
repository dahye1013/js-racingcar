import { ERROR } from '../constants/message.js';

class MovingStrategy {
  build() {
    throw new Error(ERROR.ABSTRACT_CLASS);
  }
  isMoveable() {
    throw new Error(
      'MovingStrategy는 추상 클래스입니다. 별도의 구현이 필요합니다.'
    );
  }
}

class RandomMovingStrategy extends MovingStrategy {
  static build() {
    return new RandomMovingStrategy();
  }

  isMoveable() {
    return Math.random() * 10 > 4;
  }
}



export { MovingStrategy, RandomMovingStrategy };
