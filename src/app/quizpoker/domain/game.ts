export interface User {

  id: string;
  username: string;
  moderator: boolean;

  money: number;
  currentBid: number | null;
  guess: string | null;

}

export interface GameEvent {

  id: string;
  message: string;

}

export interface Question {

  question: string;
  hint0: string;
  hint1: string;
  solution: string;

}

export class Game {

  // -- Local Data

  me: User | null = null;

  // -- Shared Data

  archivedLog: GameEvent[] = [];

  // -- Server Data

  /*
   *
   */
  stage: number = 0;

  players: User[] = [];

  activePlayer: User | null = null;

  // Game Specific

  smallBlind: number = 0;
  bigBlind: number = 0;

  question: Question | null = null;
  hintLevel: number = 0;

  constructor() {
    /*
    this.me = Game.createPlayer('123', 'Max Mustermann');
    this.me.moderator = true;
    this.players = [this.me, ...this.players];

     */

    this.a();
  }

  a(): void {
  }

  static createPlayer(id: string, name: string): User {
    return { id, username: name, money: 0, currentBid: null } as User;
  }

  loadQuestion(q: Question): void {
    this.question = q;
  }

  log(event: GameEvent): void {
    // e.g log(PlayerBidEvent(player, round, amount))
  }

  get leftPlayerList(): User[] {
    return this.players.filter((u, i) => i % 2 == 1 && !u.moderator);
  }

  get rightPlayerList(): User[] {
    return this.players.filter((u, i) => i % 2 == 0 && !u.moderator);
  }

}
