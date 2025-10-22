import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ListPortfolioComponent } from '../../visitor/list-portfolio/list-portfolio.component';
import { IntroductionComponent } from '../../visitor/introduction/introduction.component';
import { AboutComponent } from '../../visitor/about/about.component';
import { TimelineProjectComponent } from '../../visitor/timeline-project/timeline-project.component';
import { HeroComponent } from '../../visitor/hero/hero.component';
import { GalleryComponent } from '../../visitor/gallery/gallery.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-visitor-layout',
  imports: [ListPortfolioComponent,IntroductionComponent,AboutComponent,TimelineProjectComponent,HeroComponent,GalleryComponent,FooterComponent],
  templateUrl: './visitor-layout.component.html',
  styleUrl: './visitor-layout.component.css'
})
export class VisitorLayoutComponent {
  showButton:boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll',[])
  onWindowScroll():void {
    if(isPlatformBrowser(this.platformId)) {
      if(window.scrollY >= 700) {
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
