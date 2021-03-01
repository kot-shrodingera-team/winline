import doStakeGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/doStake';
import getCoefficient from '../stake_info/getCoefficient';
import { clearDoStakeTime } from '../stake_info/doStakeTime';

// const preCheck = (): boolean => {
//   return true;
// };

// const postCheck = (): boolean => {
//   return true;
// };

const doStake = doStakeGenerator({
  // preCheck,
  doStakeButtonSelector: '[data-ng-click="sendBet(0, index);"]',
  getCoefficient,
  // disabledCheck: true,
  errorClasses: [
    {
      className: 'no-active',
      message: 'кнопка не активна',
    },
  ],
  // postCheck,
  clearDoStakeTime,
});

export default doStake;
