import { AsyncStorage } from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
import createDataContext from "./createDataContext";
import trackerAPI from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin" });
    // dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("Signin");
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = dispatch => {
  return async ({ email, password }) => {
    // tentar fazer o login
    // se OK, atualizar o state

    try {
      const res = await trackerAPI.post("/signup", { email, password });
      // armazenar token no AsyncStorage
      await AsyncStorage.setItem("token", res.data.token);
      dispatch({ type: "signin", payload: res.data.token });

      // estando tudo OK vamos navegar para outra tela
      navigate("TrackList");
    } catch (error) {
      // se falhar, emitir mensagem de aviso
      dispatch({ type: "add_error", payload: "Alguma coisa deu errado" });
    }
  };
};

const signin = dispatch => {
  return async ({ email, password }) => {
    // fazer um API request para cadastrar com email e senha
    // se o cadastro estiver OK, mudar o state a avisar que agora está autenticado
    // se o cadastro falhar, emitir uma mensagem de aviso

    try {
      const res = await trackerAPI.post("/signin", { email, password });
      await AsyncStorage.setItem("token", res.data.token);
      navigate("TrackList");
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Alguma coisa deu errado com o Signin"
      });
    }
  };
};

// const signout = dispatch => {
//   return ({ email, password }) => {};
// };

const signout = dispatch => async () => {
  try {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("loginFlow");
  } catch (error) {
    console.log(error);
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  //   { isSignedIn: false, errorMessage: "" }
  { token: null, errorMessage: "" }
);
