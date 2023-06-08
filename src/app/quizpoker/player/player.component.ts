import {Component, Input, OnInit} from '@angular/core';
import {Game, User} from "../domain/game";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input()
  game?: Game;

  @Input()
  player?: User;

  constructor() { }

  ngOnInit(): void {}

  get isMe(): boolean {
    return this.game !== undefined && this.player !== undefined && this.game.me !== null && this.game.me.id === this.player.id;
  }

  get isNoMoney(): boolean {
    return this.player !== undefined && this.player.money === 0;
  }

  get isAllin(): boolean {
    return this.player !== undefined && this.player.currentBid === this.player.money;
  }

  get moderatorView(): boolean {
    return this.game !== undefined && this.game.me !== null && this.game.me.moderator;
  }

}
