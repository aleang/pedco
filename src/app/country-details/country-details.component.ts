import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../country';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.less']
})
export class CountryDetailsComponent implements OnInit {
  @Input() country: Country;
  scoreCategory: string[];

  constructor() {
    this.scoreCategory = [
      'People & Culture',
      'Infrastructure, Safety and Politics',
      'Landscape & Nature',
      'Value for Money',
      'Camping & Outdoor Living',
    ];
  }

  ngOnInit() {
  }

}
