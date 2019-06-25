import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    GET_CHART_7LAST_DAYS,
    GET_CHART_7LAST_DAYS_SUCCESS,
    GET_LIC_STATUS_LAST_MONTH,
    GET_LIC_STATUS_LAST_MONTH_SUCCESS
  
  } from 'Constants/actionTypes';
import {API_URL} from '../../config/config'

function* call2Server() {
    
    try {
        
        let url = API_URL +  "public/dashboard/getDailyActivityByDomain";
        //let return_value;
        //let data = {"username": email,"password":password};
        const json = yield fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
           // body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .catch(error=>alert(error));

        console.log(json);
        yield put({ type: GET_CHART_7LAST_DAYS_SUCCESS, json });        
       
    } catch (error) {
        // catch throw
        console.log('login error : ', error)
    }
}

function* call2Server2() {
    
    try {
        
        let url = API_URL +  "public/dashboard/getUserLicByUse";
        //let return_value;
        //let data = {"username": email,"password":password};
        const json = yield fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
           // body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .catch(error=>alert(error));

        console.log(json);
        yield put({ type: GET_LIC_STATUS_LAST_MONTH_SUCCESS, json });        
       
    } catch (error) {
        // catch throw
        console.log('login error : ', error)
    }
}


export function* watchGET_CHART_7LAST_DAYS() {
    yield takeEvery(GET_CHART_7LAST_DAYS, call2Server);
}

export function* watchGET_LIC_STATUS_LAST_MONTH() {
    yield takeEvery(GET_LIC_STATUS_LAST_MONTH, call2Server2);
}


export default function* rootSaga() {
    yield all([
        fork(watchGET_CHART_7LAST_DAYS),
        fork(watchGET_LIC_STATUS_LAST_MONTH),
    ]);
}