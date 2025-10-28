import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ListPortfolioComponent } from '../../visitor/list-portfolio/list-portfolio.component';
import { IntroductionComponent } from '../../visitor/introduction/introduction.component';
import { AboutComponent } from '../../visitor/about/about.component';
import { TimelineProjectComponent } from '../../visitor/timeline-project/timeline-project.component';
import { HeroComponent } from '../../visitor/hero/hero.component';
import { GalleryComponent } from '../../visitor/gallery/gallery.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { GetSettingService } from '../../../shared/services/get-setting.service';
import { ApiResponseSetting, Setting } from '../../../shared/interfaces/setting';

@Component({
  selector: 'app-visitor-layout',
  imports: [CommonModule,ListPortfolioComponent,IntroductionComponent,AboutComponent,TimelineProjectComponent,HeroComponent,GalleryComponent,FooterComponent],
  templateUrl: './visitor-layout.component.html',
  styleUrl: './visitor-layout.component.css'
})
export class VisitorLayoutComponent implements OnInit{
  showButton:boolean = false;
  bgTypeVisitor!:string;
  isBackgroundImage:boolean = false;
  isBackgroundColor:boolean = false;
  isBackgroundSvg:boolean = false;
  setting!:Setting;
  
  // Background values from API
  backgroundColorVisitor!: string;
  backgroundImageVisitor!: string;
  backgroundSvgVisitor!: string;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private getSettingService:GetSettingService) {}

  ngOnInit(): void {
    this.loadBackgroundTypeFromLocalStorage()
    this.getSetting()
    
    // Listen for changes in localStorage
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('storage', (e) => {
        if (e.key === 'bgTypeVisitor') {
          this.loadBackgroundTypeFromLocalStorage()
          this.updateBackgroundType()
        }
      });
    }
  }

  getSetting(): void {
    this.getSettingService.getSetting().subscribe({
      next: (res: ApiResponseSetting<Setting>) => {
        this.backgroundColorVisitor = res.data.backgroundColorVisitor;
        this.backgroundImageVisitor = res.data.backgroundImageVisitor;
        this.backgroundSvgVisitor = res.data.backgroundSvgVisitor;
        this.updateBackgroundType();
        this.setting = res.data;
        console.log(this.setting)
      },
      error: (error: any) => {
        console.error("Error getting setting data: ", error);
        // Fallback to default values
        this.backgroundColorVisitor = '#121212';
        this.backgroundImageVisitor = '';
        this.backgroundSvgVisitor = '';
        this.updateBackgroundType();
      }
    });
  }

  loadBackgroundTypeFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.bgTypeVisitor = localStorage.getItem('bgTypeVisitor') || 'color';
    } else {
      this.bgTypeVisitor = 'color';
    }
  }

  updateBackgroundType(): void {
    // Reset all boolean flags
    this.isBackgroundImage = false;
    this.isBackgroundColor = false;
    this.isBackgroundSvg = false;

    console.log('Background Type:', this.bgTypeVisitor);

    // Set the appropriate flag based on bgTypeVisitor
    switch (this.bgTypeVisitor) {
      case 'image':
        this.isBackgroundImage = true;
        break;
      case 'svg':
        this.isBackgroundSvg = true;
        break;
      case 'color':
      default:
        this.isBackgroundColor = true;
        break;
    }

    console.log('Background Flags:', {
      isBackgroundColor: this.isBackgroundColor,
      isBackgroundImage: this.isBackgroundImage,
      isBackgroundSvg: this.isBackgroundSvg
    });
  }

  // Getter untuk background SVG style dengan proper encoding
  get visitorSvgStyle() {
    if (!this.setting?.backgroundSvgVisitor) return {};
    // Clean escaped quotes jika ada
    const cleanSvg = this.setting.backgroundSvgVisitor.replace(/\\\'/g, "'");
    console.log('SVG Data:', cleanSvg);
    console.log('SVG Style:', {
      'background-color': '#181818',  // Pastikan warna background sesuai
      'background-image': `url("${cleanSvg}")`,
      'background-size': 'auto',
      'background-repeat': 'repeat'
    });
    return {
      'background-color': '#181818',  // Pastikan warna background sesuai
      'background-image': `url("${cleanSvg}")`,
      'background-size': 'auto',
      'background-repeat': 'repeat'
    };
  }

  @HostListener('window:scroll',[])
  onWindowScroll():void {
    if(isPlatformBrowser(this.platformId)) {
      const maxScrollBeforeFooter = document.body.scrollHeight - window.innerHeight - 200;
      if(window.scrollY >= 700 && window.scrollY <= maxScrollBeforeFooter) {
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
