import axios from 'axios';
import { LoginStatus } from '../types';

class ServerApi {
  private api = axios.create({
    baseURL: '/',
  });

  getLoginStatus = async (): Promise<LoginStatus> => {
    const { data } = await this.api.get('/status');
    console.log(data);
    return data === 'logged out' ? LoginStatus.LoggedOut : LoginStatus.LoggedIn;
  };

  login = async (username: string, password: string) => {
    const { data } = await this.api.post('/login', { username, password });
    console.log(data);
    return data;
  };
}

export default new ServerApi();
