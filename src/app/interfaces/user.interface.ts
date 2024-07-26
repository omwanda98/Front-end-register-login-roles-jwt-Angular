export interface User {
    userId?: number;
    username: string;
    password: string;
    authorities?: {
      roleId: number;
      authority: string;
    }[];
    enabled?: boolean;
    accountNonLocked?: boolean;
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
    jwt: string;
  }
//   create user interface
  export interface CreateUser {
    username: string;
    password: string;
  }