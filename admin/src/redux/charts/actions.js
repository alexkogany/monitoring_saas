import {
    GET_CHART_7LAST_DAYS,
    GET_LIC_STATUS_LAST_MONTH
  } from 'Constants/actionTypes';
  
  export const receiveData_last7days = () => ({  
    type: GET_CHART_7LAST_DAYS,  
    payload: { }
  });

  export const licenseStatus_lastmonth = () => ({  
    type: GET_LIC_STATUS_LAST_MONTH,  
    payload: { }
  });


 
  
  /*export const MessageReceived = (message) => ({
    type: MESSAGE_RESEIVED,
    payload : message
  });*/