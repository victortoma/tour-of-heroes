import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../interfaces/hero';
import { HeroService } from '../services/hero.service';

@Component({
   selector: 'app-hero-detail',
   templateUrl: './hero-detail.component.html',
   styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
   public hero: Hero | undefined;

   constructor(
      private route: ActivatedRoute,
      private heroService: HeroService,
      private location: Location
   ) {}

   public goBack(): void {
      this.location.back();
   }
   public save(): void {
      if (this.hero) {
         this.heroService.updateHero$(this.hero).subscribe(() => this.goBack());
      }
   }

   private getHero(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.heroService.getHero$(id).subscribe((hero) => (this.hero = hero));
   }

   ngOnInit(): void {
      this.getHero();
   }
}
