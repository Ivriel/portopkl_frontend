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

@Component({
  selector: 'app-list-portfolio',
  imports: [CardModule, ButtonModule, TagModule, TooltipModule, CommonModule,RouterLink],
  templateUrl: './list-portfolio.component.html',
  styleUrl: './list-portfolio.component.css'
})
export class ListPortfolioComponent implements OnInit {
  listPortfolio: PortfolioAll[] = []

  constructor(private getPortfolioService: GetPortfolioService) {}

  ngOnInit(): void {
    this.getAllPortfolio()
  }

  getAllPortfolio(): void {
    Swal.fire({
      title: 'Memuat data portfolio...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.getPortfolioService.getAllPortfolio().subscribe({
      next: (res: ApiResponsePortfolioAll<PortfolioAll[]>) => {
        this.listPortfolio = res.data
        console.log(this.listPortfolio)
      },
      error: (error: any) => {
        Swal.fire({
          title: 'Error',
          text: error?.error || 'Terjadi kesalahan saat memuat data portfolio',
          icon: 'error'
        })
        console.error("Error loading data list portfolio: ", error)
      },
      complete:()=> {
        Swal.close()
      }
    })
  }

}