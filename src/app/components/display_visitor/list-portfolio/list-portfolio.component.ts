import { Component, OnInit } from '@angular/core';
import { GetPortfolioService } from '../../../shared/services/get-portfolio.service';
import { PortfolioAll } from '../../../shared/interfaces/portfolio-all';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-portfolio',
  imports: [],
  templateUrl: './list-portfolio.component.html',
  styleUrl: './list-portfolio.component.css'
})
export class ListPortfolioComponent implements OnInit{
  listPortfolio:PortfolioAll[] = []

  constructor(private getPortfolioService:GetPortfolioService){}

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
      next:(res:PortfolioAll[]) => {
        Swal.close()
        this.listPortfolio = res
        console.log(this.listPortfolio)
      },
      error:(error:any)=> {
        Swal.close()
        Swal.fire({
          title:'Error',
          text:error?.error || 'Terjadi kesalahan saat memuat data portfolio',
          icon:'error'
        })
        console.error("Error loading data list portfolio: ",error)
      }
    })
  }

}
