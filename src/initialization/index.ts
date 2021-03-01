import initializeGenerator from '@kot-shrodingera-team/germes-generators/initialization/initialize';
import checkAuth, { authStateReady } from '../stake_info/checkAuth';
import { balanceReady, updateBalance } from '../stake_info/getBalance';
import authorize from './authorize';
// import afterSuccesfulLogin from './afterSuccesfulLogin';

const initialize = initializeGenerator({
  authStateReady,
  checkAuth,
  balanceReady,
  updateBalance,
  authorize,
  // afterSuccesfulLogin,
  // authStateReadyTimeout: 5000,
});

export default initialize;
