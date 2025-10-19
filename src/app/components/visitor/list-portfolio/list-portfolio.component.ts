import { Component, OnInit } from '@angular/core';
import { GetPortfolioService } from '../../../shared/services/get-portfolio.service';
import { PortfolioAll, ApiResponsePortfolioAll } from '../../../shared/interfaces/portfolio-all';
import Swal from 'sweetalert2';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-list-portfolio',
  imports: [CardModule, ButtonModule, TagModule, TooltipModule, CommonModule,RouterLink,Skeleton],
  templateUrl: './list-portfolio.component.html',
  styleUrl: './list-portfolio.component.css'
})
export class ListPortfolioComponent implements OnInit {
  listPortfolio: PortfolioAll[] = []
  isLoading:boolean = true

  constructor(private getPortfolioService: GetPortfolioService) {}

  ngOnInit(): void {
    this.getAllPortfolio()
  }

  getAllPortfolio(): void {

    this.getPortfolioService.getAllPortfolio().subscribe({
      next: (res: ApiResponsePortfolioAll<PortfolioAll[]>) => {
        this.isLoading = false
        this.listPortfolio = res.data
        console.log(this.listPortfolio)
      },
      error: (error: any) => {
        this.isLoading = false
        Swal.fire({
          title: 'Error',
          text: error?.error || 'Terjadi kesalahan saat memuat data portfolio',
          icon: 'error'
        })
        console.error("Error loading data list portfolio: ", error)
      }
    })
  }

}