import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService) { }

  getHeroes() : Observable<Hero[]> {
    this.messageService.add('Hero service: Heroes fetched');
    return this.httpClient
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('Heroes fetched')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number) : Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  addHero(hero: Hero) :Observable<Hero> {
    return this.httpClient.post(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`added hero id=${hero.id}`)),
      catchError(this.handleError<any>('addedHero'))
    );
  }

  updateHero(hero: Hero) :Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
  
    return this.httpClient.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  private log(message: string) : void {
    this.messageService.add(`Hero service: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
