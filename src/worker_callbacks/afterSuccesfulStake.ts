import getCoefficientGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCoefficient';
import { log } from '@kot-shrodingera-team/germes-utils';

const getResultCoefficient = getCoefficientGenerator({
  coefficientSelector: '.coupon-final:first-child .coupon-final__coeff',
});

const afterSuccesfulStake = (): void => {
  log('Обновление итогового коэффициента', 'steelblue');
  const resultCoefficient = getResultCoefficient();
  if (resultCoefficient && resultCoefficient !== worker.StakeInfo.Coef) {
    log(
      `Коеффициент изменился: ${worker.StakeInfo.Coef} => ${resultCoefficient}`,
      'orange'
    );
    worker.StakeInfo.Coef = resultCoefficient;
    return;
  }
  log('Коеффициент не изменился', 'lightblue');
};

export default afterSuccesfulStake;
