import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
   providedIn: 'root',
})
export class HeroService {
   private heroesUrl = 'api/heroes';
   private httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' }),
   };

   constructor(
      private readonly messageService: MessageService,
      private readonly http: HttpClient
   ) {}

   public getHeroes$(): Observable<Hero[]> {
      this.log('Hero Service: fetched heroessss');
      return this.http.get<Hero[]>(this.heroesUrl).pipe(
         tap((_) => this.log('fetched heroes')),
         catchError(this.handleError<Hero[]>('getHeroes,[]'))
      );
   }
   public getHero$(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
         tap((_) => this.log(`fetched hero id=${id}`)),
         catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
   }
   public updateHero$(hero: Hero): Observable<any> {
      return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
         tap((_) => this.log(`update hero id=${hero}`)),
         catchError(this.handleError<any>('updateHero'))
      );
   }
   public addHero$(hero: Hero): Observable<Hero> {
      return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
         tap((newHero: Hero) => this.log(`added hero id=${newHero.id}`)),
         catchError(this.handleError<Hero>('addHero'))
      );
   }
   public deleteHero$(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.delete<Hero>(url, this.httpOptions).pipe(
         tap((_) => this.log(`delete hero id = ${id}`)),
         catchError(this.handleError<Hero>('deleteHero'))
      );
   }
   public searchHeroes(term: string): Observable<Hero[]> {
      if (!term.trim()) {
         return of([]);
      }
      return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
         tap((x) =>
            x.length
               ? this.log(`found heroes matching "${term}"`)
               : this.log(`no heroes matching "${term}"`)
         ),
         catchError(this.handleError<Hero[]>('searchHeroes, []'))
      );
   }

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
}
