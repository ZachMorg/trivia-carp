import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class TriviaCarpApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    console.log(TriviaCarpApi.token);
    const headers = { Authorization: `Bearer ${TriviaCarpApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async register(data){
    let res = await this.request('auth/register/', data, 'post');
    return res.token;
  }

  static async login(data){
    let res = await this.request('auth/token/', data, 'post');
    return res.token;
  }

  static async logout(){
    TriviaCarpApi.token = null;
  }

  static async editProfile(username, data){
    let res = await this.request(`users/${username}`, data, 'patch');
    return res.user;
  }

  static async getCurrUser(username){
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getQuestions({amount = 10, category = 9, type = 'multiple'}){
    let res = await axios.get(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`
    )
    return res.data.results;
  }

  static async getCategories(){
    let res = await axios.get(
        `https://opentdb.com/api_category.php`
    )
    return res.data.trivia_categories;
  }

  static async addGameResults(data){
    console.log(data);
    await this.request('games/', data, 'post');
  }

  static async getAllGames(data){
    let res = await this.request(`games/`, {username: data}, 'get');
    return res.games;
  }

  static async getUsers(data){
    console.log(data);
    let res = await this.request(`users/`, {search: data}, 'get');
    return res.users;
  }

  static async addFriend(username, friendUsername){
    await this.request(`users/${username}/${friendUsername}`, {}, 'post');
  }

  static async removeFriend(username, friendUsername){
    await this.request(`users/${username}/${friendUsername}`, {}, 'delete')
  }

}

export default TriviaCarpApi;