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
}

export default new ServerApi();
