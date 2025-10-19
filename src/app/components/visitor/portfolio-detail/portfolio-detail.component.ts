import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiResponsePortfolioById, PortfolioById } from '../../../shared/interfaces/portfolio-by-id';
import Swal from 'sweetalert2';
import { GetPortfolioService } from '../../../shared/services/get-portfolio.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-portfolio-detail',
  imports: [CommonModule,ButtonModule,Skeleton],
  templateUrl: './portfolio-detail.component.html',
  styleUrl: './portfolio-detail.component.css'
})
export class PortfolioDetailComponent implements OnInit{
  portfolioId:string | null = "";
  portfolioDetail!:PortfolioById;
  isLoading:boolean = true;

  constructor(private route:ActivatedRoute, private getPortfolioService:GetPortfolioService, private title:Title, private router:Router){
    this.portfolioId = this.route.snapshot.paramMap.get('id')
    if(!this.portfolioId) return;
  }

  ngOnInit(): void {
    this.getDetailPortfolio()
  }

  getDetailPortfolio(): void {
    this.getPortfolioService.getPortfolioById(this.portfolioId!).subscribe({
      next:(res:ApiResponsePortfolioById<PortfolioById>) => {
        this.isLoading = false
        this.portfolioDetail = res.data
        this.title.setTitle(`Portfolio Detail - ${res.data.title}`)
        console.log('Portfolio Detail assigned:', this.portfolioDetail)
      },
      error:(error:any) => {
        this.isLoading = false
        console.error("Error getting detail portfolio data: ",error)
        Swal.fire({
          title:'Error',
          text:error?.error || 'Terjadi kesalahan saat memuat data detail portfolio',
          icon:'error'
        })
      }
    })

  }

  backToListPortfolio():void {
    this.router.navigateByUrl("")
  }


}
