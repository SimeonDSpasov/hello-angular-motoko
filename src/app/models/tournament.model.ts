
export enum TournamentStatus {
    Upcoming = 'upcoming',
    Started = 'started', 
    Ongoing = 'ongoing',
    Finished = 'finished'
  }
  
export interface IParticipant {
  result: number;
  initialEquity: number;
  adjustedEquity: number;
  userId: string;
}
  
export interface ITournament {
  title: string;
  startTime: Date;
  endTime: Date;
  status: TournamentStatus;
  participants?: IParticipant[];
}

export interface AddUserToTournamentBody {
  tournamentTitle: string;
}

export interface removeUserFromTournamentBody extends AddUserToTournamentBody {

}
