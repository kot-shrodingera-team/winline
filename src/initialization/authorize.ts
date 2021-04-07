import authorizeGenerator from '@kot-shrodingera-team/germes-generators/initialization/authorize';
import {
  awaiter,
  getElement,
  getPhoneLoginData,
  log,
} from '@kot-shrodingera-team/germes-utils';
import { authElementSelector } from '../stake_info/checkAuth';
import { updateBalance, balanceReady } from '../stake_info/getBalance';
// import afterSuccesfulLogin from './afterSuccesfulLogin';

const setLoginType = async (): Promise<boolean> => {
  const anyTab = await getElement('.logout__tabs li');
  if (!anyTab) {
    log('Не найдено ни одной вкладки формы авторизации', 'crimson');
    return false;
  }
  await awaiter(() => {
    return anyTab.textContent !== '';
  });
  const tabs = [...document.querySelectorAll<HTMLElement>('.logout__tabs li')];
  const phoneData = getPhoneLoginData();
  if (phoneData) {
    if (!phoneData.country) {
      log('Не удалось определить страну номера телефона', 'crimson');
      return false;
    }
    log('Авторизация по телефону', 'steelblue');
    const phoneTab = tabs.find((tab) => {
      return tab.textContent.trim() === 'Телефон';
    });
    if (!phoneTab.classList.contains('active')) {
      phoneTab.click();
      const tabActive = await awaiter(() => {
        return phoneTab.classList.contains('active');
      });
      if (!tabActive) {
        log(
          'Не удалось переключиться на вкладку авторизации по телефону',
          'crimson'
        );
        return false;
      }
      log('Переключились на вкладку авторизации по телефону', 'steelblue');
    }
    const phoneInput = await getElement('[wlbphoneinput], [name="phone-body"]');
    if (!phoneInput) {
      log('Не найдено поле ввода телефона', 'crimson');
      return false;
    }
    if (worker.IsRu) {
      if (phoneData.country !== 'Россия') {
        log('Телефон не РФ', 'crimson');
        return false;
      }
      return true;
    }
    const currentCodeElement = document.querySelector<HTMLElement>(
      '.logout__code'
    );
    if (!currentCodeElement) {
      log('Не найден текущий код страны');
      return false;
    }
    if (currentCodeElement.textContent.trim() !== phoneData.callingCode) {
      currentCodeElement.click();
      const countryList = await getElement('.logout__country');
      if (!countryList) {
        log('Не найден список стран', 'crimson');
        return false;
      }
      const targetCountry = [
        ...document.querySelectorAll<HTMLElement>('.logout__country li > span'),
      ].find((countryElement) => {
        return countryElement.textContent.trim() === phoneData.country;
      });
      if (!targetCountry) {
        log(`Не найдена нужная страна ${phoneData.country}`, 'crimson');
        return false;
      }
      targetCountry.click();
    }
    return true;
  }
  if (worker.Login.includes('@')) {
    log('Авторизация по E-mail', 'steelblue');
    const emailTab = tabs.find((tab) => {
      return tab.textContent.trim() === 'E-mail';
    });
    if (!emailTab.classList.contains('active')) {
      emailTab.click();
      const tabActive = await awaiter(() => {
        return emailTab.classList.contains('active');
      });
      if (!tabActive) {
        log(
          'Не удалось переключиться на вкладку авторизации по E-mail',
          'crimson'
        );
        return false;
      }
      log('Переключились на вкладку авторизации по E-mail', 'steelblue');
    }
    const emailInput = await getElement('[name="email"]');
    if (!emailInput) {
      log('Не найдено поле ввода E-mail', 'crimson');
      return false;
    }
    return true;
  }
  log('Авторизация по логину', 'steelblue');
  const loginTab = tabs.find((tab) => {
    return tab.textContent.trim() === 'Логин';
  });
  if (!loginTab.classList.contains('active')) {
    loginTab.click();
    const tabActive = await awaiter(() => {
      return loginTab.classList.contains('active');
    });
    if (!tabActive) {
      log(
        'Не удалось переключиться на вкладку авторизации по логину',
        'crimson'
      );
      return false;
    }
    log('Переключились на вкладку авторизации по логину', 'steelblue');
  }
  const loginInput = await getElement('[name="login"]');
  if (!loginInput) {
    log('Не найдено поле ввода логина', 'crimson');
    return false;
  }
  return true;
};

const authorize = authorizeGenerator({
  openForm: {
    selector: '.logout__btn_enter',
    openedSelector: '.logout__form',
    // loopCount: 10,
    // triesInterval: 1000,
    // afterOpenDelay: 0,
  },
  setLoginType,
  loginInputSelector: '.logout__input input:not([name="passw"])',
  passwordInputSelector: '.logout__input input[name="passw"]',
  submitButtonSelector: '.logout__btn_enter[type="submit"]',
  // inputType: 'fireEvent',
  // fireEventNames: ['input'],
  // beforeSubmitDelay: 0,
  // captchaSelector: '',
  loginedWait: {
    loginedSelector: authElementSelector,
    balanceReady,
    updateBalance,
    // afterSuccesfulLogin,
  },
});

export default authorize;
