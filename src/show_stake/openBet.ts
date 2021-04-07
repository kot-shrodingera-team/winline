import {
  getWorkerParameter,
  log,
  repeatingOpenBet,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import getStakeCount from '../stake_info/getStakeCount';
import checkMax from './helpers/checkMax';
import createCoupon from './helpers/createCoupon';

const openBet = async (): Promise<void> => {
  // Получение данных из меты
  const { lineId, cfId: oddNumber } = JSON.parse(worker.BetId);

  // Формирование данных для поиска
  const line = apiWlb.getService('LineService').getLineById(lineId);
  if (!line) {
    throw new JsFailError('Линия не найдена');
  }
  if (line.V[oddNumber] === 1) {
    throw new JsFailError('Ставка не найдена');
  }

  const openingAction = async () => {
    const bet = createCoupon(line, oddNumber);

    if (!bet) {
      throw new JsFailError('Ошибка формирования ставки');
    }

    apiWlb.client.bets.push(bet);
    // apiWlb
    //   .getService('BetService')
    //   .calculateMaxSite([apiWlb.client.bets[0]], 0, 0);

    // clickCouponOrdinar();

    if (!getWorkerParameter('fakeAuth')) {
      await checkMax();
    }
  };
  await repeatingOpenBet(openingAction, getStakeCount, 5, 1000, 50);

  const eventNameSelector = '.coupon-player__event';
  const marketNameSelector = '.coupon-player__type';
  const betNameSelector = '.coupon-rate__who';

  const eventNameElement = document.querySelector(eventNameSelector);
  const marketNameElement = document.querySelector(marketNameSelector);
  const betNameElement = document.querySelector(betNameSelector);

  if (!eventNameElement) {
    throw new JsFailError('Не найдено событие открытой ставки');
  }
  if (!marketNameElement) {
    throw new JsFailError('Не найден маркет открытой ставки');
  }
  if (!betNameElement) {
    throw new JsFailError('Не найдена роспись открытой ставки');
  }

  const eventName = eventNameElement.textContent.trim();
  const marketName = marketNameElement.textContent.trim();
  const betName = betNameElement.textContent.trim();

  log(`Открыта ставка\n${eventName}\n${marketName}\n${betName}`, 'steelblue');
};

export default openBet;
