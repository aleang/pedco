import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  searchString: string;
  postsResult: WordPressPost[];
  fetchingData: boolean;
  showNoResult: boolean;
  selectedPost: WordPressPost;
  selectedPostUrl: SafeResourceUrl;

  constructor(private http: HttpClient, private route: ActivatedRoute, protected sanitizer: DomSanitizer) {
    this.wordpressApi = 'https://public-api.wordpress.com/rest/v1.1/sites/pedallingcontinents.wordpress.com/posts/?';
    this.blogLinks = ['tag/trip-status/', 'tag/dear-food-diary', 'category/report-card', 'tag/shoestring-travel'];
    this.queryTags = ['tag=trip-status/', 'tag=dear-food-diary', 'category=Report%20Card', 'tag=shoestring-travel'];
    this.requiredFields = ['title', 'short_URL', 'date'];
    this.fetchingData = false;
    this.showNoResult = false;
    this.postsResult = [];
    this.selectedPost = null;
    this.selectedPostUrl = null;
  }

  ngOnInit(): void {
    this.searchString = this.route.snapshot.queryParamMap.get("search");
    if (this.searchString) {
      document.querySelector('#search-box').scrollIntoView();
      this.getPostsBySearch(this.searchString);
    }
  }

  haveQuery(): string {
    return this.route.snapshot.queryParamMap.get("search") ? 'highlight' : '';
  }

  goToPost(url: string) {
    window.open(url);
  }

  selectPost(post: WordPressPost) {
    this.selectedPost = post;
    this.selectedPostUrl = this.sanitizer.bypassSecurityTrustResourceUrl(post.short_URL);
  }

  unselectPost() {
    this.selectedPost = this.selectedPostUrl = null;
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

  getPostsBySearch(search: string) {
    if (search.length === 0) return;
    this.searchString = search;
    this.getPostsByQuery('search=' + this.searchString.trim());
  }
  
  getPostsByQuery(query: string) {
    document.querySelector('.loading-results').scrollIntoView();
    this.fetchingData = true;
    this.showNoResult = false;
    this.postsResult = [];
    this.unselectPost();
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
        setTimeout(() => {
          document.querySelector('#github-link').scrollIntoView();
        }, 500);
        
      },

      error => {
        this.fetchingData = false;
        this.showNoResult = true;
        return;
      }
    );
  }

  goToPedcoQuiz() {
    window.open('https://aleang.github.io/pedco-quiz/');
  }
}

export class WordPressPost {
  title: string;
  short_URL: string;
  date: Date;
}
