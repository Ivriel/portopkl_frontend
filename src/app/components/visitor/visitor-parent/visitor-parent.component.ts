import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPortfolioComponent } from '../list-portfolio/list-portfolio.component';

@Component({
  selector: 'app-visitor-parent',
  imports: [ListPortfolioComponent,CommonModule],
  templateUrl: './visitor-parent.component.html',
  styleUrl: './visitor-parent.component.css'
})
export class VisitorParentComponent {
  
}
