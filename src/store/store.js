import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { API_URL } from "../http";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(value) {
    this.isAuth = value;
  }

  setUser(user) {
    this.user = user;
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      console.log("LOGIN >>>>", response);

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

  async registration(email, password) {
    try {
      const response = await AuthService.registration(email, password);
      console.log("REGISTRATION >>>>", response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err) {
      console.log("Authorization error:", err);
    }
  }
}
