import { getElement, log } from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';

const preCheck = async (): Promise<void> => {
  const couponTab = document.querySelector(
    `.coupon-tabs__link[data-ng-click="setPage('main')"]`
  ) as HTMLElement;
  if (!couponTab) {
    throw new JsFailError('Не найдена вкладка "Купон"');
  }
  if (!couponTab.classList.contains('coupon-tabs__link_active')) {
    log('Переключаемся на вкладку "Купон"', 'orange');
    couponTab.click();
  } else {
    return;
  }
  const couponTabActive = await getElement(
    `.coupon-tabs__link.coupon-tabs__link_active[data-ng-click="setPage('main')"]`
  );
  if (!couponTabActive) {
    throw new JsFailError('Не удалось переключиться на вкладку "Купон"');
  }
  log('Переключились на вкладку "Купон"', 'steelblue');
};

export default preCheck;
