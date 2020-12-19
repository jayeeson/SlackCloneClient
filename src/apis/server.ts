import axios from 'axios';
import { CreateChannelRequest, LoginStatus } from '../types';

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

  createServer = async (serverName: string) => {
    const { data } = await this.api.post('/createServer', { serverName });
    return data;
  };

  createChannel = async (payload: CreateChannelRequest) => {
    const { data } = await this.api.post('/createChannel', payload);
    return data;
  };

  getOldestMessages = async (quantity: number, offset?: number) => {
    const { data } = await this.api.post('/getOldestMessages', { quantity, offset });
    return data;
  };
}

export default new ServerApi();
