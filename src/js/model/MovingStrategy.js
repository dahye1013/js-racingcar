class MovingStrategy {
  isMoveable() {
    throw new Error(
      'MovingStrategy는 추상 클래스입니다. 별도의 구현이 필요합니다.'
    );
  }
}

class RandomMovingStrategy extends MovingStrategy {
  static instance;

  static getInstance() {
    if (!this.instance) this.instance = new RandomMovingStrategy();
    return this.instance;
  }

  isMoveable() {
    return Math.random() * 10 > 4;
  }
}

export { RandomMovingStrategy };
