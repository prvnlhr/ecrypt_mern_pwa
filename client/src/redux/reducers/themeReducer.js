import { TOGGLE_THEME } from "../actions/types";

const initialAuthState = {
  theme : ""
};

const token = (state = initialAuthState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: action.theme,
      };

    default:
      return state;
  }
};
export default token;
