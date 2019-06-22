
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from '../../firebase';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER
} from 'Constants/actionTypes';

import {
    loginUserSuccess,
    registerUserSuccess
} from './actions';

import React from 'react'
import { channel } from 'redux-saga'
import {API_URL} from '../../config/config'

//const downloadFileChannel = channel()
//import postData from '../../util/Utils'

const loginWithEmailPasswordAsync = async (email, password) =>
    await auth.signInWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);



function* loginWithEmailPassword({ payload }) {
    //alert('Login saga');
    const { email, password } = payload.user;
    const { history } = payload;
    try {
        
        let url = API_URL +  "public/login";
        let data = {"username": email,"password":password};
        const json = yield fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()); 



        sessionStorage.setItem('user_id', data.token);
        localStorage.setItem('user_email', email);
        yield put({ type: "LOGIN_USER_SUCCESS", json: json });
        history.push("/");

       
    } catch (error) {
        // catch throw
        console.log('login error : ', error)
    }
}


export function* watchDownloadFileChannel() {

    while (true) {
      const action = yield take(downloadFileChannel)
      yield put(action)
    }
  }


const registerWithEmailPasswordAsync = async (email, password) =>
    await auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);


function* registerWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload
    //alert('Register Login saga');
    try {
        const registerUser = yield call(registerWithEmailPasswordAsync, email, password);
        if (!registerUser.message) {
            //localStorage.setItem('user_id', registerUser.user.uid);
            localStorage.setItem('user_email', email);
            sessionStorage.setItem('user_id', loginUser.user.uid);
            yield put(registerUserSuccess(registerUser));
            history.push('/')
        } else {
            // catch throw
            console.log('register failed :', registerUser.message)
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}


const logoutAsync = async (history) => {
    await auth.signOut().then(authUser => authUser).catch(error => error);
    history.push('/')
}

function* logout({payload}) {
    const { history } = payload
    try {
        yield call(logoutAsync,history);
        localStorage.removeItem('user_id');
    } catch (error) {
    }
}


export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}


export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        //fork(watchMessageReseived)
    ]);
}