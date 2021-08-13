import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
   selector: 'app-heroes',
   templateUrl: './heroes.component.html',
   styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit, OnDestroy {
   heroes: Hero[] = [];
   sub!: Subscription;

   constructor(private heroService: HeroService, private location: Location) {}

   getHeroes(): void {
      this.sub = this.heroService
         .getHeroes()
         .subscribe((heroes) => (this.heroes = heroes));
   }
   goForward(): void {
      this.location.forward();
   }
   ngOnInit(): void {
      this.getHeroes();
   }
   ngOnDestroy() {
      this.sub.unsubscribe();
   }
}
