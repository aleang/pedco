import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../country';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.less']
})
export class CountryDetailsComponent implements OnInit {
  @Input() country: Country;

  constructor() { }

  ngOnInit() {
  }

}
