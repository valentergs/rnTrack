import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerAPI from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      // se o usuario tiver um token qualquer mensagem de erro de login pode ser agagada.
      //   return { ...state, token: action.payload };
      return { errorMessage: "", token: action.payload };
    default:
      return state;
  }
};

const signup = dispatch => {
  return async ({ email, password }) => {
    // tentar fazer o login
    // se OK, atualizar o state
    try {
      const res = await trackerAPI.post("/signup", { email, password });
      // armazenar token no AsyncStorage
      await AsyncStorage.setItem("token", res.data.token);
      dispatch({ type: "signup", payload: res.data.token });

      // estando tudo OK vamos navegar para outra tela
      navigate("TrackList");
    } catch (error) {
      // se falhar, emitir mensagem de aviso
      dispatch({ type: "add_error", payload: "Alguma coisa deu errado" });
    }
  };
};

const signin = dispatch => {
  return ({ email, password }) => {
    // fazer um API request para cadastrar com email e senha
    // se o cadastro estiver OK, mudar o state a avisar que agora está autenticado
    // se o cadastro falhar, emitir uma mensagem de aviso
  };
};

const signout = dispatch => {
  return ({ email, password }) => {};
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, signout },
  //   { isSignedIn: false, errorMessage: "" }
  { token: null, errorMessage: "" }
);
