export const APP_THEME = "APP_THEME";
export const FONT_SIZE = "FONT_SIZE";

const INITIAL_STATE = {
  lightTheme: false,
  fontSize: 14,
};

export default (state = INITIAL_STATE, action) => {
  switch (action?.type) {
    case APP_THEME:
      return {
        ...state,
        lightTheme: action?.payload,
      };
    case FONT_SIZE:
      return {
        ...state,
        fontSize: action?.payload,
      };

    default:
      return state;
  }
};
