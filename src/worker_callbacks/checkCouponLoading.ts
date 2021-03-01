import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import { log } from '@kot-shrodingera-team/germes-utils';
import { getDoStakeTime } from '../stake_info/doStakeTime';

const check = () => {
  const loader = document.querySelector(
    'wlb-counter-numbers, wlb-counter-no-numbers'
  );
  const cdkModal = document.querySelector('.cdk-global-overlay-wrapper');
  const modal = document.querySelector('.modal');

  if (loader) {
    log('Обработка ставки (индикатор)', 'tan');
    return true;
  }

  if (cdkModal) {
    const cdkModalTitleElement = document.querySelector('.mat-dialog-title');
    if (!cdkModalTitleElement) {
      log(
        'Обработка ставки завершена (модальное окно [cdk] без заголовка)',
        'orange'
      );
      return false;
    }
    const cdkModalTitle = cdkModalTitleElement.textContent.trim();
    log(`Обработка ставки завершена (${cdkModalTitle})`, 'orange');
    return false;
  }

  if (modal) {
    const modalTitleElement = document.querySelector('.g-popup-header');
    if (!modalTitleElement) {
      log(
        'Обработка ставки завершена (модальное окно без заголовка)',
        'orange'
      );
      return false;
    }
    const modalTitle = modalTitleElement.textContent.trim();
    log(`Обработка ставки завершена (${modalTitle})`, 'orange');
    return false;
  }
  log('Обработка ставки (нет индикатора)', 'tan');
  return true;
};

const checkCouponLoading = checkCouponLoadingGenerator({
  getDoStakeTime,
  bookmakerName: '',
  timeout: 50000,
  check,
});

export default checkCouponLoading;
