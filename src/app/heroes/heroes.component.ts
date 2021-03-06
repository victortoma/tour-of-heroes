import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../services/hero.service';

@Component({
   selector: 'app-heroes',
   templateUrl: './heroes.component.html',
   styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit, OnDestroy {
   public heroes: Hero[] = [];
   private sub!: Subscription;

   constructor(private heroService: HeroService, private location: Location) {}

   public getHeroes(): void {
      this.sub = this.heroService
         .getHeroes$()
         .subscribe((heroes) => (this.heroes = heroes));
   }
   public goForward(): void {
      this.location.forward();
   }
   public add(name: string): void {
      const x = this.heroes.map((hero) => hero.id);
      console.log(Math.max(...x));
      name = name.trim();
      if (!name) {
         return;
      }
      this.heroService.addHero$({ name } as Hero).subscribe((hero) => {
         this.heroes.push(hero);
      });
   }
   public delete(hero: Hero): void {
      this.heroes = this.heroes.filter((h) => h !== hero);
      this.heroService.deleteHero$(hero.id).subscribe();
   }

   ngOnInit(): void {
      this.getHeroes();
   }
   ngOnDestroy() {
      this.sub.unsubscribe();
   }
}
