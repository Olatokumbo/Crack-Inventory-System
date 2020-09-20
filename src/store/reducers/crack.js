import * as actionTypes from "../actions/actionTypes";
const intialState = {
  cracks: null,
  crackInfo: null,
};

const crackReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CRACK:
      return {
        ...state,
        cracks: action.cracks,
      };
    case actionTypes.VIEW_CRACK_INFO:
      return {
        ...state,
        crackInfo: action.crackInfo,
      };
    default:
        return state
  }
};


export default crackReducer;