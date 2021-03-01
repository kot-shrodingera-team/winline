import { awaiter, log } from '@kot-shrodingera-team/germes-utils';
import getStakeCount from '../stake_info/getStakeCount';
import checkMax from './checkMax';
import createCoupon from './createCoupon';
import JsFailError from './errors/jsFailError';

const openBet = async (): Promise<void> => {
  const { lineId, cfId: oddNumber } = JSON.parse(worker.BetId);
  const line = apiWlb.getService('LineService').getLineById(lineId);
  if (!line) {
    throw new JsFailError('Линия не найдена');
  }
  if (line.V[oddNumber] === 1) {
    throw new JsFailError('Ставка не найдена');
  }

  const bet = createCoupon(line, oddNumber);

  if (!bet) {
    throw new JsFailError('Ошибка формирования ставки');
  }

  apiWlb.client.bets.push(bet);
  // apiWlb
  //   .getService('BetService')
  //   .calculateMaxSite([apiWlb.client.bets[0]], 0, 0);

  // clickCouponOrdinar();

  await checkMax();

  const betAdded = await awaiter(() => getStakeCount() === 1, 1000, 50);
  if (!betAdded) {
    throw new JsFailError('Ставка так не попала в купон');
  } else {
    log('Ставка попала в купон', 'steelblue');
  }
};

export default openBet;
