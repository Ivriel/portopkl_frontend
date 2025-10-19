import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ListPortfolioComponent } from '../list-portfolio/list-portfolio.component';
import { IntroductionComponent } from '../introduction/introduction.component';
import { AboutComponent } from '../about/about.component';
import { TimelineProjectComponent } from '../timeline-project/timeline-project.component';
import { HeroComponent } from '../hero/hero.component';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-visitor-parent',
  imports: [ListPortfolioComponent,IntroductionComponent,TimelineProjectComponent, AboutComponent,HeroComponent,CommonModule,GalleryComponent],
  templateUrl: './visitor-parent.component.html',
  styleUrl: './visitor-parent.component.css'
})
export class VisitorParentComponent {
  showButton:boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll',[])
  onWindowScroll():void {
    if(isPlatformBrowser(this.platformId)) {
      if(window.scrollY > 200) {
        this.showButton = true
      } else {
        this.showButton = false
      }
    }
  }
  scrollToTop():void {
    if(isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top:0,
        behavior:'smooth'
      })
    }
  }
}
