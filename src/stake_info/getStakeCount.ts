import getStakeCountGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeCount';

const getStakeCount = getStakeCountGenerator({
  stakeSelector: '[data-coupon-bet="bet"]',
  // context: () => document,
});

export default getStakeCount;
