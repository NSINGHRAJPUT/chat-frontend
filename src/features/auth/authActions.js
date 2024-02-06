import Cookies from "universal-cookie";
import { setUser, setToken, setError, clearError } from "./authSlice";
import axios from "axios";

const API_URL = "http://localhost:8080/auth";
const cookies = new Cookies();

export const signup = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    cookies.set("token", response.data.token);
    cookies.set("name", response.data.name);
    dispatch(setUser(response.data));
    dispatch(setToken(response.data.token));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError(error.response.data.error));
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    cookies.set("token", response.data.token);
    cookies.set("name", response.data.name);
    dispatch(setUser(response.data));
    dispatch(setToken(response.data.token));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError(error.response.data.error));
  }
};
