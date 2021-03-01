import { awaiter } from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';

const checkMax = async (): Promise<void> => {
  if (apiWlb.client.bets.length === 0) {
    throw new JsFailError('Ошибка проверки макса: нет ставки');
  }
  const maxAppeared = await awaiter(() => {
    return Number(apiWlb.client.bets[0].maxSum) !== 0;
  });
  if (!maxAppeared) {
    throw new JsFailError('Максимум не появился или 0');
  }
  if (Number(apiWlb.client.bets[0].maxSum) >= 999999) {
    throw new JsFailError('Ошибка проверки макса: макс >= 999999');
  }
};

export default checkMax;
