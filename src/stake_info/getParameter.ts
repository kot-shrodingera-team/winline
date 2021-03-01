import { log } from '@kot-shrodingera-team/germes-utils';

const getParameter = (): number => {
  // const marketElement = document.querySelector('.b_ev_name');
  // if (!marketElement) {
  //   log('Не найден маркет ставки', 'crimson');
  //   return -9999;
  // }
  // const market = marketElement.textContent.trim();

  const outcomeElement = document.querySelector('.coupon-player__type');
  if (!outcomeElement) {
    log('Не найдена роспись ставки', 'crimson');
    return -9999;
  }

  const outcome = outcomeElement.textContent.trim();
  const parameterRegex = /\s([+-]?\d+(?:\.\d+)?)$/;
  const parameterMatch = outcome.match(parameterRegex);
  if (parameterMatch) {
    return Number(parameterMatch[1]);
  }
  // Draw No Bet = H(0)
  // if (market === 'Результат без ничьи') {
  //   return 0;
  // }
  return -6666;
};

export default getParameter;
