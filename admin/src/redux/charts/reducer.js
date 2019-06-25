import {
  GET_CHART_7LAST_DAYS,
  GET_CHART_7LAST_DAYS_SUCCESS,
  GET_LIC_STATUS_LAST_MONTH,
  GET_LIC_STATUS_LAST_MONTH_SUCCESS
} from 'Constants/actionTypes';

  
  export default (state , action) => {
    //alert("chart Type-" + action.type +  " Action->" + action);
    switch (action.type) {
      case GET_CHART_7LAST_DAYS:
        return { ...state };
      case GET_LIC_STATUS_LAST_MONTH:
            return { ...state };
      case GET_CHART_7LAST_DAYS_SUCCESS:
          console.groupCollapsed("============GET_CHART_7LAST_DAYS_SUCCESS===============");
          console.log(action);
          console.groupEnd();
          //state.last7days = action.json;
        return { ...state , last7days:action.json ,testvalue:6};
      case GET_LIC_STATUS_LAST_MONTH_SUCCESS:
          console.groupCollapsed("============GET_LIC_STATUS_LAST_MONTH===============");
          console.log(action);
          console.groupEnd();  
          return { ...state , liclastmonth:action.json};      
      default:
        return { ...state };
    }
  };
  