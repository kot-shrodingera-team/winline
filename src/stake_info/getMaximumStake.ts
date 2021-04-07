import getMaximumStakeGenerator, {
  maximumStakeReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getMaximumStake';

const maximumStakeSelector = '.coupon-bet__summ[data-ng-if="bet.isMaxShown"]';
// const maximumStakeRegex = /(\d+(?:\.\d+)?)/;
// const replaceDataArray = [
//   {
//     searchValue: '',
//     replaceValue: '',
//   },
// ];
// const removeRegex = /[\s,']/g;

export const maximumStakeReady = maximumStakeReadyGenerator({
  maximumStakeSelector,
  // maximumStakeRegex,
  // replaceDataArray,
  // removeRegex,
  // context: () => document,
});

const getMaximumStake = getMaximumStakeGenerator({
  maximumStakeSelector,
  // maximumStakeRegex,
  // replaceDataArray,
  // removeRegex,
  // disableLog: false,
  // context: () => document,
});

export default getMaximumStake;
