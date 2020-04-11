import { Component, OnInit, ViewChild } from '@angular/core';
import { PHOTOS } from '../../assets/photo-data';
import { HostListener } from '@angular/core';
// @ts-ignore
import { EXIF } from 'exif-js';
//import { EXIF as exifShim, EXIFStatic } from 'exif-js/exif';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.less']
})

export class PhotoComponent implements OnInit {
  allPhotos = PHOTOS;
  currentImageIndex: number;
  showInfoBar: boolean;

  imageCaption: string;
  imageDate: Date;
  imageLatLon: string;
  imageLonLat: string;

  mapboxToken = 'pk.eyJ1IjoicGhlbmd0IiwiYSI6ImNrOHQzdjAxdDBsaDQzb3A5cnZmeTFtaGkifQ.9xxRrU9BWuSGUYsldAwa6A';
  
  constructor() { }

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
    }
    event.preventDefault();
  }

  getCurrentImageFileName(): string {
    return this.allPhotos[this.currentImageIndex];
  }

  getMapByApi(): string {
    if (this.imageLonLat) {
      return `https://api.mapbox.com/styles/v1/phengt/ck8vc5ral1zjw1ila2gxjl2au/` +
      `static/pin-s-star+285A98(${this.imageLonLat})/` + 
      `${this.imageLonLat},2,0/150x150@2x?access_token=${this.mapboxToken}`;
   }
  }
  nextPhoto(goRight: boolean) { 
    if (goRight) this.currentImageIndex++;
    else this.currentImageIndex--;

    if (this.currentImageIndex < 0) this.currentImageIndex = this.allPhotos.length-1;
    else if (this.currentImageIndex > this.allPhotos.length-1) this.currentImageIndex = 0;
  }

  randomPhoto() {
    let nextIndex = this.currentImageIndex;

    while (nextIndex === this.currentImageIndex) {
      nextIndex = Math.floor(Math.random() * this.allPhotos.length);
    }
    this.currentImageIndex = nextIndex;
  }

}