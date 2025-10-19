// hero.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, NgxTypewriterComponent,DividerModule,RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  words: string[] = ['Hello there', 'Welcome to', 'Porto PKL'];
  
}