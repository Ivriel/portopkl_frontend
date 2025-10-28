import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetPortfolioService } from '../../../shared/services/get-portfolio.service';
import { ApiResponsePortfolioById, PortfolioById } from '../../../shared/interfaces/portfolio-by-id';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule,ButtonModule,Skeleton],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit{
  portfolioDetail!:PortfolioById;
  portfolioId:string | null = "";
  isLoading:boolean = true;
  isFullScreenOpen:boolean = false;
  currentImageIndex:number = 0;
  isViewingThumbnail:boolean = false;
  constructor(private route:ActivatedRoute, private getPortfolioService:GetPortfolioService, private title:Title, private router:Router){
    this.portfolioId = this.route.snapshot.paramMap.get('id')
    if(!this.portfolioId) return;
  }

    ngOnInit(): void {
      this.getDetailPortfolio();
    }

    getDetailPortfolio(): void {
      this.getPortfolioService.getPortfolioById(this.portfolioId!).subscribe({
        next:(res:ApiResponsePortfolioById<PortfolioById>) => {
          this.portfolioDetail = res.data;
          this.title.setTitle(`Portfolio Detail - ${res.data.title}`)
          console.log('Portfolio Detail DataL ',this.portfolioDetail)
          this.isLoading = false
        },
        error:(error:any) => {
          this.isLoading = false;
            Swal.fire({
              title:'Error',
              text:error?.error || 'Terjadi kesalahan saat memuat data detail portfolio',
              icon:'error',
              background: '#18181B',
              color: '#ffffff'
            })
        },
      })
    }

    backToProjectDisplay():void {
      this.router.navigateByUrl("/admin/project-display")
    }

    openFullScreen(index:number): void {
      this.currentImageIndex =index
      this.isFullScreenOpen = true
      this.isViewingThumbnail = false
      document.body.style.overflow = 'hidden'
    }

    openThumbnailFullScreen(): void {
      this.isFullScreenOpen = true
      this.isViewingThumbnail = true
      document.body.style.overflow = 'hidden'
    }

    closeFullScreen(): void {
      this.isFullScreenOpen = false
      this.isViewingThumbnail = false
     document.body.style.overflow = 'auto'
    }

    nextImage(event:Event): void {
      event.stopPropagation()
      if(this.portfolioDetail?.images && this.currentImageIndex < this.portfolioDetail.images.length - 1) {
        this.currentImageIndex++
      }
    }

    previousImage(event:Event):void {
      event.stopPropagation()
      if(this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    }

}
