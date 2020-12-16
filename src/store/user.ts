import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  displayName: string;
}

const initialState: UserState = {
  username: '',
  displayName: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }: { payload: UserState }) => {
      const { username, displayName } = payload;
      return { username, displayName };
    },
  },
});
