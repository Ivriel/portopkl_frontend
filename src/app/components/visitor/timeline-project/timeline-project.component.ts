import { Component } from '@angular/core';
import { Timeline } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TimelineItems } from '../../../shared/interfaces/timeline-items';

@Component({
  selector: 'app-timeline-project',
  imports: [Timeline, CardModule, ButtonModule, CommonModule, BadgeModule, OverlayBadgeModule],
  templateUrl: './timeline-project.component.html',
  styleUrl: './timeline-project.component.css'
})
export class TimelineProjectComponent {
  timeline: TimelineItems[];

  constructor() {
      this.timeline = [
          { project: 'Ticat', description:'Project web untuk mengelola data user,equipment, dan tiket dengan metode CRUD (Create,Read,Update,Delete) yang berintegrasi dengan API (Aplication Programming Interface). ',number:1, icon:'pi pi-globe', dateStart: '23/06/2025', dateEnd: '10/07/2025', type: 'Website' },
          { project: 'Dugi Website', description:'Project  absensi karyawan (produk dari 3PM Solution) versi website. ',number:2,icon:'pi pi-globe', dateStart: '11/07/2025', dateEnd: '06/08/2025', type: 'Website' },
          { project: 'Dugi Mobile', description:'Project  absensi karyawan (produk dari 3PM Solution) versi mobile. ',number:3, icon:'pi pi-mobile', dateStart: '19/08/2025', dateEnd: '12/09/2025', type: 'Mobile' },
          { project: 'AKA', description:'Project web untuk client pabrik rokok AKA (Agung Karya Atta). ',number:4, icon:'pi pi-globe', dateStart:'02/09/2025', dateEnd: '31/10/2025', type: 'Website' }
      ];
  }
}
