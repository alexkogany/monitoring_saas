import {
    GET_CHART_7LAST_DAYS,
    GET_CHART_7LAST_DAYS_SUCCESS
  } from 'Constants/actionTypes';
  
  export const receiveData_last7days = () => ({  
    type: GET_CHART_7LAST_DAYS,  
    payload: { }
  });


 
  
  /*export const MessageReceived = (message) => ({
    type: MESSAGE_RESEIVED,
    payload : message
  });*/