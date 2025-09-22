import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioById } from '../../../shared/interfaces/portfolio-by-id';
import Swal from 'sweetalert2';
import { GetPortfolioService } from '../../../shared/services/get-portfolio.service';

@Component({
  selector: 'app-portfolio-detail',
  imports: [],
  templateUrl: './portfolio-detail.component.html',
  styleUrl: './portfolio-detail.component.css'
})
export class PortfolioDetailComponent implements OnInit{
  portfolioDetail!:PortfolioById;

  constructor(private route:ActivatedRoute, private getPortfolioService:GetPortfolioService){}

  ngOnInit(): void {
    this.getDetailPortfolio()
  }

  getDetailPortfolio(): void {
    Swal.fire({
      title: 'Loading detail portfolio...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const portfolioId = this.route.snapshot.paramMap.get('id')
    if(!portfolioId) return;

    this.getPortfolioService.getPortfolioById(portfolioId).subscribe({
      next:(res:PortfolioById) => {
        Swal.close()
        this.portfolioDetail = res
        console.log(this.portfolioDetail)
      },
      error:(error:any) => {
        Swal.close()
        console.error("Error getting detail portfolio data: ",error)
        Swal.fire({
          title:'Error',
          text:error?.error || 'Terjadi kesalahan saat memuat data detail portfolio',
          icon:'error'
        })
      }
    })

  }


}
