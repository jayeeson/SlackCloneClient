import axios from 'axios';
import { LoginStatus } from '../types';

class ServerApi {
  private api = axios.create({
    baseURL: '/',
  });

  getLoginStatus = async (): Promise<LoginStatus> => {
    const { data } = await this.api.get('/status');
    return data === 'logged out' ? LoginStatus.LoggedOut : LoginStatus.LoggedIn;
  };

  register = async (username: string, password: string) => {
    const { data } = await this.api.post('/register', { username, password });

    return data;
  };

  login = async (username: string, password: string) => {
    const { data } = await this.api.post('/login', { username, password });
    return data;
  };

  logout = async () => {
    const { data } = await this.api.get('/logout');
    return data;
  };

  getStartupData = async () => {
    const { data } = await this.api.get('/getStartupData');
    return data;
  };
}

export default new ServerApi();
