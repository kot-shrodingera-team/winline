import doStakeGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/doStake';
import getCoefficient from '../stake_info/getCoefficient';
import { clearDoStakeTime } from '../stake_info/doStakeTime';

// const preCheck = (): boolean => {
//   return true;
// };

const postCheck = (): boolean => {
  window.germesData.betProcessingStep = 'beforeStart';
  return true;
};

const doStake = doStakeGenerator({
  // preCheck,
  doStakeButtonSelector: '[data-ng-click="sendBet(0, index);"]',
  errorClasses: [
    {
      className: 'no-active',
      message: 'кнопка не активна',
    },
  ],
  // disabledCheck: false,
  getCoefficient,
  postCheck,
  clearDoStakeTime,
  context: () => document,
});

export default doStake;
