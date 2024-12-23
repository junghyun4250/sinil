import { call, put, takeEvery } from "@redux-saga/core/effects";
import {
  getUserList,
  editUser,
  addUser,
  removeUser,
  getAuthList,
  setAuth,
  addAuth,
  removeAuth,
  isIDinDB,
} from "../api/reservationApi";
import {
  userListSuccess,
  userListFailure,
  userIdDbCheckSuccess,
  userIdDbCheckFailure,
} from "./reservationSlice";
// import { openModal } from '../../../components/common/modal/module/modalSlice';

// 사용자 목록 불러오기
// function* userListAxios(action) {
//     try {
//         const data = yield call(getUserList, action.payload);
//         yield put(userListSuccess(data));
//     } catch (e) {
//         yield put(userListFailure(e));
//     }
// };

// 아이디 중복 체크
// function* userAddIdDbCheckAxios(action) {
//     try {
//         const data = yield call(isIDinDB, action.payload);
//         // 호출 결과를 사용하여 알림 메시지 띄우기
//         // 추후에 openModal의 message 컴포넌트로 대체
//         if (data.data.result === 'true') {
//             // alert('아이디 중복');
//             yield put(openModal({
//                 type: 'alert_warning',
//                 message: '이미 존재하는 아이디 입니다.'
//             }));
//         } else if (data.data.result === 'false') {
//             // alert('아이디 사용 가능');
//             yield put(openModal({
//                 type: 'alert_complete',
//                 message: '사용 가능한 아이디 입니다.'
//             }));
//         }
//         yield put(userIdDbCheckSuccess(data));
//     } catch (e) {
//         yield put(userIdDbCheckFailure(e));
//     }
// }

function* reservationSaga() {
  // yield takeEvery(userList, userListAxios);
}
export default reservationSaga;
