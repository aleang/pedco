import { Component, OnInit, ViewChild } from '@angular/core';
import { getPhotoList } from '../../assets/photo-data';
import { HostListener } from '@angular/core';
// @ts-ignore
import { EXIF } from 'exif-js';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['../app.component.less', './photo.component.less']
})

export class PhotoComponent implements OnInit {
  TEST_LOCAL_IMAGE = false;
  allPhotos = getPhotoList();
  currentImageIndex: number;
  showInfoBar: boolean;
  gettingNextPhoto: boolean;
  imageCaption: string;
  imageDate: Date;
  imageLatLon: string;
  imageLonLat: string;
  alreadySeenPhoto: Number[];

  mapboxToken = 'pk.eyJ1IjoicGhlbmd0IiwiYSI6ImNrOHQzdjAxdDBsaDQzb3A5cnZmeTFtaGkifQ.9xxRrU9BWuSGUYsldAwa6A';
  
  constructor() {
    this.gettingNextPhoto = false;
    this.alreadySeenPhoto = [];
  }

  ngOnInit() {
    this.currentImageIndex = 0;
    this.showInfoBar = true;
  }

  displayInfoBar() {
    return this.showInfoBar ? 'full-view' : 'no-view';
  }

  setPhotoData(info: string[]) {
    this.imageCaption = info[0].split('#').join(' <br/> ');
    this.imageDate = new Date(info[1].split(" ")[0].replace(/:/g, "-"));
    this.imageLonLat = `${info[3]},${info[2]}`;
    this.imageLatLon = `${info[2]},${info[3]}`;
  }

  onLoadImage() {
    this.alreadySeenPhoto.push(this.currentImageIndex);
    this.gettingNextPhoto = false;
    const photoElement = document.getElementById('photo');
    delete photoElement['exifdata'];
    const self = this;
    EXIF.getData(photoElement, function() {
      const convertGPSToDecimal = (degree, ref) => {
        if (degree) {
          return ((ref === 'W' || ref === 'S') ? '-' : '') +
            (degree[0] + degree[1]/60 + degree[2]/3600);
        }
      };
      // console.log(EXIF.getAllTags(photoElement));
      const caption = EXIF.getTag(photoElement, "ImageDescription");
      const date = EXIF.getTag(photoElement, "DateTimeOriginal");

      const lat = convertGPSToDecimal(
        EXIF.getTag(photoElement, "GPSLatitude"),
        EXIF.getTag(photoElement, "GPSLatitudeRef"));
      const lon = convertGPSToDecimal(
        EXIF.getTag(photoElement, "GPSLongitude"),
        EXIF.getTag(photoElement, "GPSLongitudeRef"));

      self.setPhotoData([
        caption, date, lat, lon
      ]);
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == 'ArrowLeft'){
      this.nextPhoto(false);
    } else if (event.key === 'ArrowRight') {
      this.nextPhoto(true);
    } else if (event.key === 'ArrowUp' ) {
      this.showInfoBar = true;
    } else if (event.key === 'ArrowDown') {
      this.showInfoBar = false;
    } else if (event.key === ' ') {
      this.randomPhoto();
    }
    event.preventDefault();
  }

  getCurrentImageFileName(): string {
    if (this.TEST_LOCAL_IMAGE) {
      return '../../assets/photos/originals/' + this.allPhotos[this.currentImageIndex];
    }
    return 'https://aleang.github.io/images/pedco/' + this.allPhotos[this.currentImageIndex];
  }

  getNextImageForPreload(): string {
    let nextPointer = this.currentImageIndex + 1;
    if (this.currentImageIndex === this.allPhotos.length - 1) {
      nextPointer = 0;
    }
    return (this.TEST_LOCAL_IMAGE ? '../../assets/photos/originals/' : 'https://aleang.github.io/images/pedco/')
      + this.allPhotos[nextPointer];
  }
  getPrevImageForPreload(): string {
    let nextPointer = this.currentImageIndex - 1;
    if (this.currentImageIndex === 0) {
      nextPointer = this.allPhotos.length - 1;
    }
    return (this.TEST_LOCAL_IMAGE ? '../../assets/photos/originals/' : 'https://aleang.github.io/images/pedco/')
      + this.allPhotos[nextPointer];
  }


  backgroundStyles(): Object {
    return {
      'background-image': `url(${this.getCurrentImageFileName()})`,
      'background-size': 'cover'
    }
  }
  getMapByApi(): string {
    if (this.TEST_LOCAL_IMAGE) {
      return '';
    }
    if (this.imageLonLat) {
      return `https://api.mapbox.com/styles/v1/phengt/ck8vc5ral1zjw1ila2gxjl2au/` +
      `static/pin-s-star+285A98(${this.imageLonLat})/` + 
      `${this.imageLonLat},2,0/150x150@2x?access_token=${this.mapboxToken}`;
   }
  }
  
  nextPhoto(goRight: boolean) { 
    if (this.gettingNextPhoto) return;
    if (goRight) this.currentImageIndex++;
    else this.currentImageIndex--;

    if (this.currentImageIndex < 0) this.currentImageIndex = this.allPhotos.length-1;
    else if (this.currentImageIndex > this.allPhotos.length-1) this.currentImageIndex = 0;
  }

  showCaption(show: boolean) {
    this.showInfoBar = show;
  }
  displayFullController() {
    return this.showInfoBar ? '' : 'no-view';
  }
  displayHiddenController() {
    return this.showInfoBar ? 'no-view' : '';
  }
  displayBiggerController() {
    return this.showInfoBar ? '' : 'biggy';
  }
  randomPhoto() {
    let nextIndex = this.currentImageIndex;

    if (this.alreadySeenPhoto.length >= this.allPhotos.length) {
      // alert('You have seen all the photos!');
      this.alreadySeenPhoto = [];
    }
    nextIndex = Math.floor(Math.random() * this.allPhotos.length);
    while (this.alreadySeenPhoto.includes(nextIndex)) {
      nextIndex = Math.floor(Math.random() * this.allPhotos.length);
    }
    this.currentImageIndex = nextIndex;
  }
}