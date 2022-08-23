export type User = {
  id: number;
  email: string;
  name: string;
};

export type UserInput = {
  email: string;
  name?: string;
};
