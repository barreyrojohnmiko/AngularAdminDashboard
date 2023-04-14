import { Component, ViewChild } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild(Carousel) carousel!: Carousel;

  numberFormat(x: number) {
    return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  images = [
    'https://w.wallhaven.cc/full/1p/wallhaven-1ppld1.jpg',
    'https://w.wallhaven.cc/full/m3/wallhaven-m3zjx1.jpg',
  ];

  prevSlide() {
    (this.carousel as any).prev();
  }
  
  nextSlide() {
    (this.carousel as any).next();
  }
}
