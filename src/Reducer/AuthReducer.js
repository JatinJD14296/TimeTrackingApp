export const LOGIN_DATA = "LOGIN_DATA";
export const REGISTER_USER = "REGISTER_USER";
export const REMOVE_RAGISTER_USER = "REMOVE_RAGISTER_USER";

const INITIAL_STATE = {
  loginUser: [],
  registerUser: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_DATA:
      return { ...state, loginUser: action.payload };
    case REGISTER_USER:
      return {
        ...state,
        registerUser: [...state.registerUser, action.payload],
      };
    case REMOVE_RAGISTER_USER:
      return {
        ...state,
        registerUser: state.registerUser.filter(
          (user) => user.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};
