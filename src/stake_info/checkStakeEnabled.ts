import checkStakeEnabledGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkStakeEnabled';
import getStakeCount from './getStakeCount';

// const preCheck = (): boolean => {
//   return true;
// };

const checkStakeEnabled = checkStakeEnabledGenerator({
  // preCheck,
  getStakeCount,
  betCheck: {
    selector: '[data-coupon-bet="bet"] .coupon-sheet',
    errorClasses: [
      {
        className: 'no-market',
        message: 'заблокирована',
      },
    ],
  },
  // errorsCheck: [
  //   {
  //     selector: '',
  //     message: '',
  //   },
  // ],
});

export default checkStakeEnabled;
