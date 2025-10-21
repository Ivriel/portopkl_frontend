// gallery.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  size: 'large' | 'medium' | 'small';
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
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
      image: 'assets/gallery/workspace.jpg',
      title: 'Workspace',
      description: 'Meja kerja dengan setup lengkap untuk coding',
      size: 'small'
    },
    {
      id: 4,
      image: 'assets/gallery/meeting.jpg',
      title: 'Daily Meeting',
      description: 'Diskusi project dan sprint planning bersama mentor',
      size: 'small'
    },
    {
      id: 5,
      image: 'assets/gallery/coding.jpg',
      title: 'Coding Session',
      description: 'Sesi ngoding mengembangkan fitur aplikasi web',
      size: 'medium'
    },
    {
      id: 6,
      image: 'assets/gallery/presentation.jpg',
      title: 'Project Presentation',
      description: 'Presentasi hasil project di akhir sprint',
      size: 'large'
    },
    {
      id: 7,
      image: 'assets/gallery/team.jpg',
      title: 'Team Building',
      description: 'Kegiatan team building dan networking session',
      size: 'small'
    }
  ];
}