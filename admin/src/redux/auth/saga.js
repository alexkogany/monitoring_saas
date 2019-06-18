
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
        //const loginUser = yield call(loginWithEmailPasswordAsync, email, password);


        //const json = yield fetch('https://newsapi.org/v1/articles?source= cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
        //.then(response => response.json(), );    
        //yield put({ type: "NEWS_RECEIVED", json: json.articles, });

        

        //const json = yield postData('http://127.0.0.1:2017/public/login', {"email": email,"password":password})
        //.then(response => response.json(), ); 
        let url = "http://127.0.0.1:2017/public/login";
        let data = {"email": email,"password":password};
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

        //.then((data) => {
          
          //console.log(JSON.stringify(data))  
          //sessionStorage.setItem('user_id', data.token);
          //localStorage.setItem('user_email', email);
          //downloadFileChannel.put(loginUserSuccess(data.token));
          //watchDownloadFileChannel();
          //history.push("/");
          

        //}).catch((error)=>{console.error(error)}); 

        //yield delay(1000);
        //console.log(json);


        sessionStorage.setItem('user_id', data.token);
        localStorage.setItem('user_email', email);
        yield put({ type: "LOGIN_USER_SUCCESS", json: json });
        //alert("asdasd");
        history.push("/");

        //console.log(loginUser);
        //alert(loginUser);
        //if (!loginUser.message) {
            ////localStorage.setItem('user_id', loginUser.user.uid);
            //sessionStorage.setItem('user_id', loginUser.user.uid);
            //yield put(loginUserSuccess(loginUser));
            //history.push("/");
            //history.push('/app/second-menu/second');
        //} else {
            // catch throw
            //console.log('login failed :', loginUser.message)
        //}
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

/*function* MessageReseived() {
    
    alert('MESSAGE_RESEIVED');
   
}*/



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

////export function* watchMessageReseived() {
 //   yield takeEvery(MESSAGE_RESEIVED, MessageReseived);
//}


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