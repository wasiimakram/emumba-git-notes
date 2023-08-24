import { UserAuthData } from "../common/typings/user";

export const loginRecord: UserAuthData[] = [
  {
    name: 'Johan Doe',
    userName: 'johan',
    password: '123',
    type: 'user',
    isFirstLogin: true,
  },
  {
    name: 'Mike Benzic',
    userName: 'mike',
    password: '123',
    type: 'user',
    isFirstLogin: false,
  },
  {
    name: 'Emumba Admin',
    userName: 'admin',
    password: '123',
    type: 'admin',
    isFirstLogin: false,
  },
]
