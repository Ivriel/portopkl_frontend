import { Component } from '@angular/core';
import { NgxGalaxyComponent } from "@omnedia/ngx-galaxy";
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';

@Component({
  selector: 'app-hero',
  imports: [NgxGalaxyComponent,NgxTypewriterComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  words:string[] = ['Hello','Welcome to','Porto PKL']
}
