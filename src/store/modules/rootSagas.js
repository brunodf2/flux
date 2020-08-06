import { all } from "redux-saga/effects";

import cart from "../modules/cart/sagas";

export default function* rootSaga() {
  yield all([cart]);
}
