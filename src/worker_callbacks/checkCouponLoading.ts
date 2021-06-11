import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import { log, getElement, awaiter } from '@kot-shrodingera-team/germes-utils';
// import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
// import openBet from '../show_stake/openBet';
import { getDoStakeTime } from '../stake_info/doStakeTime';

const bookmakerName = '';

const timeout = 50000;
const getRemainingTimeout = (maximum?: number) => {
  const result = timeout - (new Date().getTime() - getDoStakeTime().getTime());
  if (maximum !== undefined && timeout > maximum) {
    return maximum;
  }
  return result;
};

const error = (message?: string) => {
  if (message !== undefined) {
    log(message, 'crimson');
  }
  window.germesData.betProcessingStep = 'error';
};
// const errorInform = (message: string) => {
//   log(message, 'crimson');
//   worker.Helper.SendInformedMessage(
//     `В ${bookmakerName} произошла ошибка принятия ставки:\n${message}\n`
//   );
//   window.germesData.betProcessingStep = 'error';
// };
const success = (message?: string) => {
  if (message !== undefined) {
    log(message, 'steelblue');
  }
  window.germesData.betProcessingStep = 'success';
};
// const reopen = async (message?: string) => {
//   if (message !== undefined) {
//     log(message, 'crimson');
//   }
//   window.germesData.betProcessingStep = 'reopen';
//   log('Переоткрываем купон', 'orange');
//   try {
//     await openBet();
//     log('Ставка успешно переоткрыта', 'green');
//     window.germesData.betProcessingStep = 'reopened';
//   } catch (reopenError) {
//     if (reopenError instanceof JsFailError) {
//       log(reopenError.message, 'red');
//       window.germesData.betProcessingStep = 'error';
//     } else {
//       log(reopenError.message, 'red');
//       window.germesData.betProcessingStep = 'error';
//     }
//   }
// };

const loaderSelector = 'wlb-counter-numbers, wlb-counter-no-numbers';
const cdkModalSelector = '.cdk-global-overlay-wrapper';
const cdkModalTitleSelector = '.mat-dialog-title';
const cdkModelCloseSelector = '.mat-dialog-btn-close';
const modalSelector = '.modal';
const modalTitleSelector = '.g-popup-header';
const modalTextSelector = '.g-popup-content:not(.error)';
const modalCloseSelector = '.btn-delete';
const historyTabActiveSelector =
  '.coupon-tabs__link.coupon-tabs__link_active[data-ng-click="setPage(\'history\')"]';

const asyncCheck = async () => {
  window.germesData.betProcessingStep = 'waitingForLoaderOrResult';

  await Promise.race([
    getElement(loaderSelector, getRemainingTimeout()),
    getElement(cdkModalSelector, getRemainingTimeout()),
    getElement(modalSelector, getRemainingTimeout()),
    getElement(historyTabActiveSelector, getRemainingTimeout()),
  ]);

  const loaderElement = document.querySelector(loaderSelector);

  if (loaderElement) {
    log('Появился индикатор', 'steelblue');
    window.germesData.betProcessingAdditionalInfo = 'индикатор';
    awaiter(
      () => {
        return document.querySelector(loaderSelector) === null;
      },
      getRemainingTimeout(),
      100
    ).then((loaderDissappeared) => {
      if (loaderDissappeared) {
        log('Исчез индикатор', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = null;
      }
    });

    window.germesData.betProcessingStep = 'waitingForResult';
    await Promise.race([
      getElement(cdkModalSelector, getRemainingTimeout()),
      getElement(modalSelector, getRemainingTimeout()),
      getElement(historyTabActiveSelector, getRemainingTimeout()),
    ]);
  }

  const cdkModalElement = document.querySelector(cdkModalSelector);
  const modalElement = document.querySelector(modalSelector);
  const historyTabActive = document.querySelector(historyTabActiveSelector);

  if (cdkModalElement) {
    let placed = false;
    const cdkModalTitleElement = document.querySelector(cdkModalTitleSelector);
    if (!cdkModalTitleElement) {
      log('Не найден заголовок модального окна [cdk]', 'crimson');
    } else {
      const cdkModalTitle = cdkModalTitleElement.textContent.trim();
      log(cdkModalTitle, 'tomato');
      if (cdkModalTitle === 'Купон принят') {
        placed = true;
      }
    }

    const cdkModelCloseButton = document.querySelector<HTMLElement>(
      cdkModelCloseSelector
    );
    if (!cdkModelCloseButton) {
      log('Не найдена кнопка закрытия модального окна [cdk]', 'crimson');
    } else {
      log('Нажимаем кнопку закрытия модального окна [cdk]', 'orange');
      cdkModelCloseButton.click();
    }
    if (placed) {
      return success();
    }
    return error();
  }

  if (modalElement) {
    const modalTitleElement = document.querySelector(modalTitleSelector);
    if (!modalTitleElement) {
      log('Не найден заголовок модального окна', 'crimson');
    } else {
      const modalTitle = modalTitleElement.textContent.trim();
      log(modalTitle, 'tomato');
      if (modalTitle === 'Купон не принят') {
        const modalTextElement = document.querySelector(modalTextSelector);
        if (!modalTextElement) {
          log('Не найден текст всплывающего окна', 'crimson');
        } else {
          const modalText = modalTextElement.textContent.trim();
          log(modalText, 'tomato');
        }
      }
    }

    const modalCloseButton = document.querySelector<HTMLElement>(
      modalCloseSelector
    );
    if (!modalCloseButton) {
      log('Не найдена кнопка закрытия модального окна', 'crimson');
    } else {
      log('Нажимаем кнопку закрытия модального окна', 'orange');
      modalCloseButton.click();
    }
    return error();
  }

  if (historyTabActive) {
    log(
      'Переключились на вкладку истории ставок. Считаем ставку принятой',
      'steelblue'
    );
    return success();
  }

  return error('Не дождались результата ставки');
};

const check = () => {
  const step = window.germesData.betProcessingStep;
  const additionalInfo = window.germesData.betProcessingAdditionalInfo
    ? ` (${window.germesData.betProcessingAdditionalInfo})`
    : '';
  switch (step) {
    case 'beforeStart':
      asyncCheck();
      return true;
    case 'error':
    case 'success':
    case 'reopened':
      log(`Обработка ставки завершена (${step})${additionalInfo}`, 'orange');
      return false;
    default:
      log(`Обработка ставки (${step})${additionalInfo}`, 'tan');
      return true;
  }
};

const checkCouponLoading = checkCouponLoadingGenerator({
  getDoStakeTime,
  bookmakerName,
  timeout,
  check,
});

export default checkCouponLoading;
