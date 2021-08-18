import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../services/hero.service';

@Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
   public heroes: Hero[] = [];

   constructor(private heroService: HeroService) {}

   private getHeroes(): void {
      this.heroService
         .getHeroes$()
         .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
   }

   ngOnInit() {
      this.getHeroes();
   }
}
