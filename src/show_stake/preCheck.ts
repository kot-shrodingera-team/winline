import {
  checkBookerHost,
  getElement,
  log,
} from '@kot-shrodingera-team/germes-utils';
import {
  NewUrlError,
  JsFailError,
} from '@kot-shrodingera-team/germes-utils/errors';
import checkAuth, { authStateReady } from '../stake_info/checkAuth';
import { updateBalance } from '../stake_info/getBalance';
import clearCoupon from './clearCoupon';

const preCheck = async (): Promise<void> => {
  if (!checkBookerHost()) {
    log('Открыта не страница конторы (или зеркала)', 'crimson');
    window.location.href = new URL(worker.BookmakerMainUrl).href;
    throw new NewUrlError('Открываем страницу БК');
  }

  await authStateReady();
  worker.Islogin = checkAuth();
  worker.JSLogined();
  if (!worker.Islogin) {
    throw new JsFailError('Нет авторизации');
  }
  log('Есть авторизация', 'steelblue');
  updateBalance();

  const couponTab = await getElement<HTMLElement>(
    `.coupon-tabs__link[data-ng-click="setPage('main')"]`
  );
  if (!couponTab) {
    throw new JsFailError('Не найдена вкладка "Купон"');
  }
  if (!couponTab.classList.contains('coupon-tabs__link_active')) {
    log('Переключаемся на вкладку "Купон"', 'orange');
    couponTab.click();
    const couponTabActive = await getElement(
      `.coupon-tabs__link.coupon-tabs__link_active[data-ng-click="setPage('main')"]`
    );
    if (!couponTabActive) {
      throw new JsFailError('Не удалось переключиться на вкладку "Купон"');
    }
    log('Переключились на вкладку "Купон"', 'steelblue');
  }

  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    throw new JsFailError('Не удалось очистить купон');
  }

  const freebetModal = document.querySelector(
    '.cdk-overlay-container .bonus-freebet'
  );
  if (freebetModal) {
    const modalContainer = document.querySelector('.cdk-overlay-container');
    log('Удаляем окно о фрибете', 'orange');
    modalContainer.remove();
  }
};

export default preCheck;
