import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
   providedIn: 'root',
})
export class HeroService {
   constructor(
      private messageService: MessageService,
      private http: HttpClient
   ) {}
   private heroesUrl = 'api/heroes';
   private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
   }
   private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
         // TODO: send the error to remote logging infrastructure
         console.error(error); // log to console instead

         // TODO: better job of transforming error for user consumption
         this.log(`${operation} failed: ${error.message}`);

         // Let the app keep running by returning an empty result.v
         return of(result as T);
      };
   }

   getHeroes(): Observable<Hero[]> {
      this.log('Hero Service: fetched heroessss');
      return this.http.get<Hero[]>(this.heroesUrl).pipe(
         tap((_) => this.log('fetched heroes')),
         catchError(this.handleError<Hero[]>('getHeroes,[]'))
      );
   }
   getHero(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
         tap((_) => this.log(`fetched hero id=${id}`)),
         catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
   }
}
