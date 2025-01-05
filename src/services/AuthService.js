import $api from "../http";

export default class AuthService {
  static async login(email, password) {
    return $api.post('/login', {email, password});
  }

  static async logout() {
    return $api.post('/logout');
  }

  static async registration(email, password) {
    return $api.post('/registration', {email, password});
  }
}

// import axios from "axios";

// const API_URL = "http://localhost:5000/api"; // Updated to include /api

// export default class AuthService {
//   static async login(email, password) {
//     return await axios.post(`/login`, { email, password });
//   }

//   static async registration(email, password) {
//     return await axios.post(`/registration`, { email, password });
//   }
// }
