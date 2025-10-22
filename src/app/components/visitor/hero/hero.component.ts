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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Navbar muncul setelah scroll lebih dari 100px
    if(window.scrollY > 400){
      this.isScrolled = true;
    }else{
      this.isScrolled = false;
    }
  }
}