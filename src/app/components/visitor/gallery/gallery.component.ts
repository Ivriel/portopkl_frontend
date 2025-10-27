// gallery.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  size: 'large' | 'medium' | 'small';
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule,GalleriaModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  
  galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: 'assets/3PM-Kantor.png',
      title: 'Kantor 3PM Solution',
      description: 'Gedung kantor modern tempat saya melaksanakan PKL',
      size: 'large'
    },
    {
      id: 2,
      image: 'assets/Foto-diri.png',
      title: 'Perkenalan Tim',
      description: 'Foto bersama tim developer di hari pertama PKL',
      size: 'medium'
    },
      {
      id: 3,
      image: 'assets/Foto-diri.png',
      title: 'Perkenalan Tim',
      description: 'Foto bersama tim developer di hari pertama PKL',
      size: 'medium'
    },
     {
      id: 4,
      image: 'assets/Foto-diri.png',
      title: 'Perkenalan Tim',
      description: 'Foto bersama tim developer di hari pertama PKL',
      size: 'medium'
    },
    {
      id: 4,
      image: 'assets/Foto-diri.png',
      title: 'Perkenalan Tim',
      description: 'Foto bersama tim developer di hari pertama PKL',
      size: 'medium'
    }
  ];

   responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

}