import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';

@Component({
   selector: 'app-messages',
   templateUrl: './messages.component.html',
   styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
   constructor(
      public messageService: MessageService,
      public heroService: HeroService
   ) {}

   ngOnInit(): void {}
}
