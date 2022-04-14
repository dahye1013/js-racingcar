export const instanceCheck = (instance, clazz) => {
  if (!(instance instanceof clazz))
    throw Error('해당하는 인스턴스의 인자만 받을 수 있습니다.');
};
