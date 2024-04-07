export enum UserRole {
  Member,
  Moderator,
  Admin
}

export interface tournamentPartial {
  status: string,
  title: string,
  _id: string
}

export  interface User {
  id: string;
  role: UserRole;
  email: string;
  password: string;
  username: string;
  suspended: boolean,
  createdAt: Date;
  tournamentsId: tournamentPartial[];
  winrate: number;
  wins:  number;
  elo: number;
  api_secret: string;
  api_public: string;
}
