import * as actionTypes from "../actions/actionTypes";
const intialState = {
  cracks: [],
  crackInfo: null,
};

const crackReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.VIEW_CRACKS:
      return {
        ...state,
        cracks: action.cracks,
      };
    case actionTypes.VIEW_CRACK_INFO:
      return {
        ...state,
        crackInfo: action.crackInfo,
      };
    case actionTypes.RESET_CRACK_INFO:
      return {
        ...state,
        crackInfo: null,
      };
    default:
      return state;
  }
};

export default crackReducer;
