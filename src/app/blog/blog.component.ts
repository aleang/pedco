import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['../app.component.less', './blog.component.less']
})
export class BlogComponent implements OnInit {
  private blogLinks: string[];
  private queryTags: string[];
  private requiredFields: string[];
  private wordpressApi: string;
  postsResult: any[];
  fetchingData: boolean;
  showNoResult: boolean;

  constructor(private http: HttpClient) {
    this.wordpressApi = 'https://public-api.wordpress.com/rest/v1.1/sites/pedallingcontinents.wordpress.com/posts/?';
    this.blogLinks = ['tag/trip-status/', 'tag/dear-food-diary', 'category/report-card', 'tag/shoestring-travel'];
    this.queryTags = ['tag=trip-status/', 'tag=dear-food-diary', 'category=Report%20Card', 'tag=shoestring-travel'];
    this.requiredFields = ['title', 'short_URL', 'date'];
    this.postsResult = [];
    this.fetchingData = false;
    this.showNoResult = false;
  }

  ngOnInit(): void {}

  goTo(query: string): void {
    window.open('https://pedallingcontinents.wordpress.com/' + query);
  }
  goToPost(url: string): void {
    window.open(url);
  }
  @ViewChild("queryBox", {static: false}) queryField: ElementRef;
  focusOnSearch(): void {
    this.queryField.nativeElement.focus();
  }
  getPosts(code: number): void {
    this.getPostsByQuery(this.queryTags[code]);
  }
  getRequiredFieldsQueryString(): string {
    return '&fields=' + this.requiredFields.reduce((prev, curr) => prev + ',' + curr);
  }
  getPostsByQuery(query: string): void {
    this.fetchingData = true;
    this.postsResult = [];

    this.http.get(this.wordpressApi + query + this.getRequiredFieldsQueryString())
    .subscribe(
      data => {
        this.fetchingData = false;

        if (data['found'] <= 0) {
          this.showNoResult = true;
          return;
        }
        
        this.showNoResult = false;
        
        for (const key in data['posts']) {
          this.postsResult.push(data['posts'][key]);
        }
      },

      error => {
        this.fetchingData = false;
        this.showNoResult = true;
        return;
      }
    );
  }
}
