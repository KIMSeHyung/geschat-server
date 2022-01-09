export type TSessionUser = {
  _id: string;
  name: string;
  ip: string;
};

export type TSessionData = {
  user?: TSessionUser;
};
