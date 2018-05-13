import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';
import { Hero } from './../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input()
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.getHero(id);
  }

  getHero(id: number) {
    this.heroService
      .getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  save() {
    this.heroService.updateHero(this.hero).subscribe(_ => {
      this.location.back();
    });
  }

  goBack() {
    this.location.back();
  }
}
