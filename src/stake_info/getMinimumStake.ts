// import getMinimumStakeGenerator, {
//   minimumStakeReadyGenerator,
// } from '@kot-shrodingera-team/germes-generators/stake_info/getMinimumStake';

// export const minimumStakeReady = minimumStakeReadyGenerator({
//   minimumStakeElementSelector: '',
//   minimumStakeRegex: /(\d+(?:\.\d+)?)/,
//   replaceDataArray: [
//     {
//       searchValue: '',
//       replaceValue: '',
//     },
//   ],
//   removeRegex: /[\s,']/g,
// });

// const getMinimumStake = getMinimumStakeGenerator({
//   minimumStakeElementSelector: '',
//   minimumStakeRegex: /(\d+(?:\.\d+)?)/,
//   replaceDataArray: [
//     {
//       searchValue: '',
//       replaceValue: '',
//     },
//   ],
//   removeRegex: /[\s,']/g,
// });

const getMinimumStake = (): number => {
  return 50;
};

export default getMinimumStake;
