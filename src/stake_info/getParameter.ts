import { getWorkerParameter, log } from '@kot-shrodingera-team/germes-utils';

const getParameter = (): number => {
  if (
    getWorkerParameter('fakeParameter') ||
    getWorkerParameter('fakeOpenStake')
  ) {
    const parameter = Number(JSON.parse(worker.ForkObj).param);
    if (Number.isNaN(parameter)) {
      return -6666;
    }
    return parameter;
  }

  const marketNameSelector = '.coupon-player__type';
  // const betNameSelector = '.coupon-rate__who';

  const marketNameElement = document.querySelector(marketNameSelector);
  if (!marketNameElement) {
    log('Не найден маркет ставки', 'crimson');
    return -9999;
  }
  // const betNameElement = document.querySelector(betNameSelector);
  // if (!betNameElement) {
  //   log('Не найдена роспись ставки', 'crimson');
  //   return -9999;
  // }

  const marketName = marketNameElement.textContent.trim();
  // const betName = betNameElement.textContent.trim();

  const parameterRegex = /\s([+-]?\d+(?:\.\d+)?)$/;
  const parameterMatch = marketName.match(parameterRegex);
  if (parameterMatch) {
    return Number(parameterMatch[1]);
  }
  return -6666;
};

export default getParameter;
