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
              icon:'error'
            })
        },
      })
    }

    backToProjectDisplay():void {
      this.router.navigateByUrl("/admin/project-display")
    }
}
