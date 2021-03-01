import { log } from '@kot-shrodingera-team/germes-utils';

const checkStakeStatus = (): boolean => {
  const cdkModal = document.querySelector('.cdk-global-overlay-wrapper');
  const modal = document.querySelector('.modal');

  if (cdkModal) {
    let placed = false;
    const cdkModalTitleElement = document.querySelector('.mat-dialog-title');
    if (!cdkModalTitleElement) {
      log('Не найден заголовок модального окна [cdk]', 'red');
    } else {
      const cdkModalTitle = cdkModalTitleElement.textContent.trim();
      if (cdkModalTitle === 'Купон принят') {
        placed = true;
      } else {
        log(cdkModalTitle, 'red');
      }
    }
    const closeButton = document.querySelector(
      '.mat-dialog-btn-close'
    ) as HTMLElement;
    if (!closeButton) {
      log('Не найдена кнопка закрытия модального окна', 'crimson');
    } else {
      log('Нажимаем кнопку закрытия модального окна', 'orange');
      closeButton.click();
    }
    if (placed) {
      log('Ставка принята', 'green');
      return true;
    }
    log('Ставка не принята', 'red');
    return false;
  }

  if (modal) {
    const modalTitleElement = document.querySelector('.g-popup-header');
    if (!modalTitleElement) {
      log('Не найден заголовок модального окна', 'red');
    } else {
      const modalTitle = modalTitleElement.textContent.trim();
      if (modalTitle === 'Купон не принят') {
        const modalContentElement = document.querySelector(
          '.g-popup-content:not(.error)'
        );
        if (!modalContentElement) {
          log('Не найден текст всплывающего окна', 'crimson');
        } else {
          const modalContent = modalContentElement.textContent.trim();
          if (
            modalContent ===
            'Коэффициент на одно или несколько событий изменился. Принять изменения?'
          ) {
            log('Коэффициент изменился', 'crimson');
          } else {
            log(modalContent, 'crimson');
          }
        }
      } else {
        log(modalTitle, 'red');
      }
    }
    const closeButton = document.querySelector('.btn-delete') as HTMLElement;
    if (!closeButton) {
      log('Не найдена кнопка закрытия модального окна', 'crimson');
    } else {
      log('Нажимаем кнопку закрытия модального окна', 'orange');
      closeButton.click();
    }
    log('Ставка не принята', 'red');
    return false;
  }

  log('Ставка не принята (неизвестный результат)', 'red');
  return false;
};

export default checkStakeStatus;
