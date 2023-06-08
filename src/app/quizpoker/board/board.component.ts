import {Component, ComponentRef, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SocketService} from "../service/socket.service";
import {Game, User} from "../domain/game";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Logger, LogService} from "../logger/log.service";
import {PacketId} from "../domain/Network";
import {GameService} from "../service/game.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('modWrapper')
  modWrapper?: ElementRef;

  canBeMod: boolean = false;
  dragging: boolean = false;

  data = new FormGroup({
    ip: new FormControl('localhost', Validators.required),
    port: new FormControl('3000', Validators.required),
    name: new FormControl('Test User', Validators.required),
    mod: new FormControl(false, Validators.required),

    guess: new FormControl(null, Validators.required),
    stake: new FormControl(null, Validators.required), // Wetteinsatz
  });

  constructor(
    private route: ActivatedRoute,

    private logService: LogService,
    private socketService: SocketService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.canBeMod = params.mod !== undefined && params.mod === '1';
    });
  }

  login(): void {
    this.gameService.login(this.data.value.ip, this.data.value.port, this.data.value.name, this.data.value.mod);
  }

  // -- MODERATOR

  startGuessPhase(): void {
    this.socketService.emit(PacketId.SET_GAME_STAGE, 1);
  }

  nextQuestion(): void {
    this.socketService.emit(PacketId.LOAD_QUESTION);
  }

  realoadQuestion(): void {
    this.socketService.emit(PacketId.RELOAD_QUESTION);
  }

  nextHint(): void {
    this.socketService.emit(PacketId.NEXT_HINT);
  }

  // --

  get GUESS() {
    return this.data.controls.guess as FormControl;
  }

  get STAKE() {
    return this.data.controls.stake as FormControl;
  }

  get game(): Game {
    return this.gameService.game;
  }

  static posX = 0;
  static posY = 0;
  static ref: ElementRef | null = null;

  startModWrapperMove(event: MouseEvent) {
    event.preventDefault();

    BoardComponent.posX = event.clientX;
    BoardComponent.posY = event.clientY;
    BoardComponent.ref = this.modWrapper || null;

    document.onmouseup = this.endModWrapperMove;
    document.onmousemove = this.dragWrapper;
  }

  endModWrapperMove() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  dragWrapper(event: MouseEvent) {
    event.preventDefault();

    if (BoardComponent.ref) {
      const dy = BoardComponent.posY - event.clientY;
      const dx = BoardComponent.posX - event.clientX;

      BoardComponent.posX = event.clientX;
      BoardComponent.posY = event.clientY;

      BoardComponent.ref.nativeElement.style.top = (BoardComponent.ref.nativeElement.offsetTop - dy) + 'px';
      BoardComponent.ref.nativeElement.style.left = (BoardComponent.ref.nativeElement.offsetLeft - dx) + 'px';
    }
  }

}
