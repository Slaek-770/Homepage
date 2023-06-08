import { Injectable } from '@angular/core';
import { Game } from "../domain/game";
import {SocketService} from "./socket.service";
import {GameOverview, PacketId} from "../domain/Network";
import {Logger, LogService} from "../logger/log.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game = new Game();

  constructor(
    private socket: SocketService,
    private logService: LogService
  ) {}

  login(ip: string, port: number, name: string, forceMod?: boolean): void {
    if (this.socket.isConnected())
      return;

    this.socket.connect(`http://${ip}`, +port, {
      username: name,
      moderator: forceMod || undefined
    }).subscribe(result => {
      if (result) {
        this.game.me = Game.createPlayer(result.id, result?.username);
        this.game.me.moderator = result.moderator;

        this.handlePackets();
      } else {
        // error
      }
    });
  }

  handlePackets(): void {
    this.socket.socket?.onAny((event, ...args) => {
      console.log(`<< ${event}`, args)
    });

    this.socket.listen(PacketId.PLAYER_CONNECTION, player => {
      Logger.begin('User ').next(player.username).colored('red').next(' joined the game.').log(this.logService);

      this.game.players.push(player);
    });

    this.socket.listen(PacketId.GAME_OVERVIEW, ov => {
      console.log('Game Overview =', ov);

      this.game.players = ov.players;
    });

    this.socket.listen(PacketId.LOAD_QUESTION, q => {
      this.game.question = q;

      if (q) {
        Logger.begin("Loaded question ").next(q.question).colored('green').log(this.logService);
      } else {
        Logger.begin("No new question available!").colored('red').log(this.logService);
      }
    });

    this.socket.listen(PacketId.NEXT_HINT, hint => {
      if (hint === -1 || hint > 2) {
        Logger.begin("No new hints available!").colored('red').log(this.logService);
      } else {
        this.game.hintLevel = hint + 1;

        Logger.begin("Set hint level to ").next(hint + 1).colored('green').log(this.logService);
      }
    });

    this.socket.listen(PacketId.COLLECT_GUESSES, () => {
      this.socket.emit(PacketId.SUBMIT_GUESS, this.game.me?.guess || null);
    });

    this.socket.listen(PacketId.SET_GAME_STAGE, stage => {
      this.game.stage = stage;
    });
  }

  checkGuess(): void {

  }

}
