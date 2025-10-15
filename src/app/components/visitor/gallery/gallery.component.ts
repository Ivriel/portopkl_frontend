// gallery.component.ts
import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [GalleriaModule, FormsModule, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  images = [
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=150&fit=crop',
      alt: 'Coding workspace with laptop and coffee',
      title: 'Development Setup'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=150&fit=crop',
      alt: 'Clean code on monitor screen',
      title: 'Code Quality'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=150&fit=crop',
      alt: 'Modern workspace with MacBook',
      title: 'Workspace Goals'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=150&fit=crop',
      alt: 'Programming setup with multiple monitors',
      title: 'Multi-Monitor Setup'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=200&h=150&fit=crop',
      alt: 'Team collaboration on project',
      title: 'Team Work'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=150&fit=crop',
      alt: 'Project planning and brainstorming',
      title: 'Planning Phase'
    }
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '991px',
      numVisible: 3
    },
    {
      breakpoint: '767px',
      numVisible: 2
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];
}