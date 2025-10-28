// gallery.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  
  galleryItems: any[]= [
    {
      image: 'assets/gallery/3PM-Kantor.png',
      title: 'Kantor 3PM Solution',
      description: 'Gedung kantor modern tempat saya melaksanakan PKL',
      size: 'large'
    },
    {
      image: 'assets/gallery/area-game-developer.jpg',
      title: 'Area Game Developer',
      description: 'Area game developer di kantor 3PM Solution',
      size: 'large'
    },
      {
      image: 'assets/gallery/area-rapat.jpg',
      title: 'Area Rapat',
      description: 'Area rapat di kantor 3PM Solution',
      size: 'large'
    },
     {
      image: 'assets/gallery/parkiran-1.jpg',
      title: 'Parkiran',
      description: 'Parkiran di kantor 3PM Solution',
      size: 'large'
    },
    {
      image: 'assets/gallery/parkiran-2.jpg',
      title: 'Parkiran',
      description: 'Parkiran di kantor 3PM Solution',
      size: 'large'
    },
    {
      image: 'assets/gallery/pintu-masuk.jpg',
      title: 'Pintu Masuk',
      description: 'Pintu masuk di kantor 3PM Solution',
      size: 'large'
    },
     {
      image: 'assets/gallery/area-praktek-pkl.jpg',
      title: 'Area praktek',
      description: 'Tempat pkl selama di 3PM Solution',
      size: 'large'
    },
  ];

}