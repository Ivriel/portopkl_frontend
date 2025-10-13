import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Chip } from 'primeng/chip';

@Component({
  selector: 'app-about',
  imports: [DividerModule,Chip],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
