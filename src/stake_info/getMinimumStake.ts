// import getMinimumStakeGenerator, {
//   minimumStakeReadyGenerator,
// } from '@kot-shrodingera-team/germes-generators/stake_info/getMinimumStake';

// const minimumStakeSelector = '';
// const minimumStakeRegex = /(\d+(?:\.\d+)?)/;
// const replaceDataArray = [
//   {
//     searchValue: '',
//     replaceValue: '',
//   },
// ];
// const removeRegex = /[\s,']/g;

// export const minimumStakeReady = minimumStakeReadyGenerator({
//   minimumStakeSelector,
//   minimumStakeRegex,
//   replaceDataArray,
//   removeRegex,
//   context: () => document,
// });

// const getMinimumStake = getMinimumStakeGenerator({
//   minimumStakeSelector,
//   minimumStakeRegex,
//   replaceDataArray,
//   removeRegex,
//   disableLog: false,
//   context: () => document,
// });

const getMinimumStake = (): number => {
  return 50;
};

export default getMinimumStake;
