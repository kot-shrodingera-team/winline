import clearCouponGenerator from '@kot-shrodingera-team/germes-generators/show_stake/clearCoupon';
import getStakeCount from '../stake_info/getStakeCount';

// const preCheck = async (): Promise<boolean> => {
//   return true;
// };

// const apiClear = (): void => {};

// const postCheck = async (): Promise<boolean> => {
//   return true;
// };

const clearCoupon = clearCouponGenerator({
  // preCheck,
  getStakeCount,
  // apiClear,
  // clearSingleSelector: '',
  clearAllSelector: '.coupon-total__clear',
  // postCheck,
  // context: () => document,
});

export default clearCoupon;
