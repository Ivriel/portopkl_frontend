import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
@Component({
  selector: 'app-introduction',
  imports: [ButtonModule,TabsModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent {
  value: number = 0;
}
