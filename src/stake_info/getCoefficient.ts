import getCoefficientGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCoefficient';

const getCoefficient = getCoefficientGenerator({
  coefficientSelector: '[data-ng-bind="bet.V | koeff"]',
});

export default getCoefficient;
