import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../country';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.less']
})
export class CountryDetailsComponent implements OnInit {
  @Input() country: Country;
  scoreCategory: string[];

  constructor(public router: Router) {
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
  
  searchBlog() {
    this.router.navigate(['/blog'], { queryParams: { search: this.country.name } });
  }
}
