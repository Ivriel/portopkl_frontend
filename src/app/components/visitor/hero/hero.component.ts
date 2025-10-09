// hero.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, NgxTypewriterComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  words: string[] = ['Hello there', 'Welcome to', 'Porto PKL'];
  
  scrollToContent(): void {
    const element = document.getElementById('content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}