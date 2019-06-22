import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import chartSagas from './charts/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    chartSagas()
  ]);
}
