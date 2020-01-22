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
  postsResult: WordPressPost[];
  fetchingData: boolean;
  showNoResult: boolean;

  constructor(private http: HttpClient) {
    this.wordpressApi = 'https://public-api.wordpress.com/rest/v1.1/sites/pedallingcontinents.wordpress.com/posts/?';
    this.blogLinks = ['tag/trip-status/', 'tag/dear-food-diary', 'category/report-card', 'tag/shoestring-travel'];
    this.queryTags = ['tag=trip-status/', 'tag=dear-food-diary', 'category=Report%20Card', 'tag=shoestring-travel'];
    this.requiredFields = ['title', 'short_URL', 'date'];
    this.fetchingData = false;
    this.showNoResult = false;
    this.postsResult = [];
  }

  ngOnInit(): void {}

  goTo(query: string) {
    window.open('https://pedallingcontinents.wordpress.com/' + query);
  }

  goToPost(url: string) {
    window.open(url);
  }

  @ViewChild("queryBox", {static: false}) queryField: ElementRef;
  focusOnSearch() {
    this.queryField.nativeElement.focus();
  }

  getPosts(code: number) {
    this.getPostsByQuery(this.queryTags[code]);
  }

  getRequiredFieldsQueryString(): string {
    return '&fields=' + this.requiredFields.reduce((prev, curr) => prev + ',' + curr);
  }
  getOrderByDate(): string{
    return '&order_by=date';
  }
  getPostBySearch(search: string) {
    this.getPostsByQuery('search=' + search.trim());
  }
  
  getPostsByQuery(query: string) {
    this.fetchingData = true;
    this.showNoResult = false;
    this.postsResult = [];

    this.http.get<WordPressPost>(this.wordpressApi + query + this.getOrderByDate() + this.getRequiredFieldsQueryString())
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

export class WordPressPost {
  title: string;
  short_URL: string;
  date: Date;
}
