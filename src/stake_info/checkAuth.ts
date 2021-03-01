import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

export const authStateReady = authStateReadyGenerator({
  noAuthElementSelector: '.logout__btn_enter',
  authElementSelector: '.login_in',
  maxDelayAfterNoAuthElementAppeared: 5000,
  logging: true,
});

const checkAuth = checkAuthGenerator({
  authElementSelector: '.login_in',
});

export default checkAuth;
