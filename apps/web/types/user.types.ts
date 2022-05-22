export declare module User {
  export type User = {
    id: string;
    name: string;
    email: string;
    picture: string;
  };

  export type LoginInput = {
    email: string;
    password: string;
  };

  export type RegisterInput = {
    name: string;
    email: string;
    password: string;
  };
}
