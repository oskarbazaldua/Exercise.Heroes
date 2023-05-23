
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero-interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById( id: string ):Observable<Hero | undefined> {
    return this.http.get<Hero>(`${ this.baseUrl}/heroes/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getSuggestion( query: string ):Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${ query }&_limit=6`)
  }

  addHero(hero: Hero):Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero );
  }

  updateHero(hero: Hero):Observable<Hero> {
    if (!hero.id) throw Error('Hero id is required');

    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${ hero.id}`, hero );
  }

  detetHeroById(id: string):Observable<boolean> {

    return this.http.delete(`${this.baseUrl}/heroes/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false)),
      )
  }




}
