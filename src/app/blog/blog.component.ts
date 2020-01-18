import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['../app.component.less', './blog.component.less']
})
export class BlogComponent implements OnInit {
  private blogLinks: string[];
  private queryTags: string[];
  private wordpressApi: string;
  postsResult: any[];
  fetchingData: boolean;

  constructor(private http: HttpClient) {
    this.wordpressApi = 'https://public-api.wordpress.com/rest/v1.1/sites/pedallingcontinents.wordpress.com/posts/';
    this.blogLinks = ['tag/trip-status/', 'tag/dear-food-diary', 'category/report-card', 'tag/shoestring-travel'];
    this.queryTags = ['tag=trip-status/', 'tag=dear-food-diary', 'category=Report%20Card', 'tag=shoestring-travel'];
    this.postsResult = [];
    this.fetchingData = false;
  }

  ngOnInit(): void {}

  goTo(code: number): void {
    window.open('https://pedallingcontinents.wordpress.com/' + this.blogLinks[code]);
  }

  getPosts(code: number): void {
    this.fetchingData = true;
    this.postsResult = [];

    this.http.get(this.wordpressApi + this.queryTags[code])
    .subscribe(
      data => {
        // take away the loading gif
        this.fetchingData = false;
        
        if (data['found'] <= 0) {
          return;
        }
        for (const key in data['posts']) {
          this.postsResult.push(data['posts'][key]);
        }
      },
      error => {
        this.fetchingData = false;
        this.goTo(code);
      }
    );
  }
}
