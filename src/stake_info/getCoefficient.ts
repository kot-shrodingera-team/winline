import getCoefficientGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCoefficient';

// const getCoefficientText = (): string => {
//   return null;
// };

const getCoefficient = getCoefficientGenerator({
  coefficientSelector: '[data-ng-bind="bet.V | koeff"]',
  // getCoefficientText,
  // replaceDataArray: [
  //   {
  //     searchValue: '',
  //     replaceValue: '',
  //   },
  // ],
  // removeRegex: /[\s,']/g,
  // coefficientRegex: /(\d+(?:\.\d+)?)/,
  // context: () => document,
});

export default getCoefficient;
