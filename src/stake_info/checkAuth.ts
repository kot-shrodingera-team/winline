import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

export const noAuthElementSelector = '.logout__btn_enter';
export const authElementSelector = '.login_in';

export const authStateReady = authStateReadyGenerator({
  noAuthElementSelector,
  authElementSelector,
  maxDelayAfterNoAuthElementAppeared: 5000,
  // context: () => document,
});

const checkAuth = checkAuthGenerator({
  authElementSelector,
  // context: () => document,
});

export default checkAuth;
