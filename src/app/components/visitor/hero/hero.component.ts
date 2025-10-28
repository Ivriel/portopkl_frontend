// hero.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';
import { NgxWordRotationComponent } from '@omnedia/ngx-word-rotation';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, DividerModule,RouterLink,NgxWordRotationComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  words: string[] = ['Hello there', 'Welcome to', 'Porto PKL Ivriel'];
  isScrolled = false;
  activeSection: string = '';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Navbar muncul setelah scroll lebih dari 400px
    if(window.scrollY > 400){
      this.isScrolled = true;
    }else{
      this.isScrolled = false;
    }

    // Detect active section
    this.updateActiveSection();
  }

  updateActiveSection() {
    // Jangan set active section kalau navbar belum floating (belum scroll 400px)
    if (window.scrollY <= 400) {
      this.activeSection = '';
      return;
    }

    const sections = ['introduction', 'about', 'timeline', 'list-project', 'gallery'];
    const scrollPosition = window.scrollY + 200; // Offset untuk deteksi lebih awal

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }
}