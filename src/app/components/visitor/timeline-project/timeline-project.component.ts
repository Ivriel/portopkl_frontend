import { Component } from '@angular/core';
import { Timeline } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { RouterLink } from "@angular/router";

interface TimelineItem {
  project?: string;
  description?:string;
  number?:number;
  date?: string;
  icon?: string;
  type?: string;
  image?: string;
  urlDetail?:string;
}

@Component({
  selector: 'app-timeline-project',
  imports: [Timeline, CardModule, ButtonModule, CommonModule, BadgeModule, OverlayBadgeModule, RouterLink],
  templateUrl: './timeline-project.component.html',
  styleUrl: './timeline-project.component.css'
})
export class TimelineProjectComponent {
  timeline: TimelineItem[];

  constructor() {
      this.timeline = [
          { project: 'Ticat', description:'osas huvuveve uglik uglik lorem ipsum dolor sit amet yntkts', number:1, date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', type: 'Website', image: 'game-controller.jpg', urlDetail:'portfolio/68e334cd0f5ca29f41551ea6' },
          { project: 'Dugi Website', description:'osas huvuveve uglik uglik lorem ipsum dolor sit amet yntkts', number:2, date: '15/10/2020 14:00', icon: 'pi pi-cog', type: 'Website', urlDetail:'portfolio/68c9171ad67404648420212d' },
          { project: 'Dugi Mobile', description:'osas huvuveve uglik uglik lorem ipsum dolor sit amet yntkts', number:3, date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', type: 'Mobile', urlDetail:'portfolio/68c96bd277bb1fdda33b057c' },
          { project: 'AKA', description:'osas huvuveve uglik uglik lorem ipsum dolor sit amet yntkts', number:4, date: '16/10/2020 10:00', icon: 'pi pi-check', type: 'Website',urlDetail:'portfolio/68d65d1a5fd39a5d0d4f4218' }
      ];
  }
}
