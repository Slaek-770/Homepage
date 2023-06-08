import {User} from "./game";

export class Packet {

  id: string = '@invalid-id';
  sender: string = '@invalid-sender';

}

export class GameOverview {

  players: User[] = [];

}

export enum PacketId {

  COLLECT_GUESSES = "collect-guesses",
  SUBMIT_GUESS = "submit-guess",

  GAME_OVERVIEW = 'game-overview',

  // -- MODERATOR & STATE

  SET_GAME_STAGE = 'set-game-stage',
  LOAD_QUESTION = 'load-question',
  RELOAD_QUESTION = 'reload-question', // @SendOnly
  NEXT_HINT = 'next-hint',

  // -- PLAYER ACTIONS

  PLAYER_CONNECTION = 'player-connection',
  PLAYER_DISCONNECTION = 'player-disconnection', // iskick: boolean, reason: string

  SET_GUESS = 'set-guess', // guess: string // Validity should be checked on client
  SET_BID = 'set-bid', // bid: number // Validity should be checked on client

}
