// hero.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';
import { NgxWordRotationComponent } from '@omnedia/ngx-word-rotation';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, DividerModule,RouterLink,NgxWordRotationComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  words: string[] = ['Hello there', 'Welcome to', 'Porto PKL Ivriel'];
  
}