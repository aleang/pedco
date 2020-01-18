import { Component, OnInit } from '@angular/core';
import { COUNTRIES } from '../../assets/trip-data';
import { Country } from '../country';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.less', '../app.component.less']
})

export class CountriesComponent implements OnInit {
  allCountry = COUNTRIES;
  selectedCountry?: Country;

  constructor() { }

  ngOnInit() {

  }

  onSelect(country?: Country): void {
    this.selectedCountry = country;
  }
}
