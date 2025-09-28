import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPortfolioComponent } from '../list-portfolio/list-portfolio.component';
import { IntroductionComponent } from '../introduction/introduction.component';
import { AboutComponent } from '../about/about.component';
import { TimelineProjectComponent } from '../timeline-project/timeline-project.component';

@Component({
  selector: 'app-visitor-parent',
  imports: [ListPortfolioComponent,IntroductionComponent,TimelineProjectComponent, AboutComponent,CommonModule],
  templateUrl: './visitor-parent.component.html',
  styleUrl: './visitor-parent.component.css'
})
export class VisitorParentComponent {

}
