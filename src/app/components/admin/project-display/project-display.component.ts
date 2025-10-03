import { Component, OnInit } from '@angular/core';
import { GetPortfolioService } from '../../../shared/services/get-portfolio.service';
import { ApiResponsePortfolioAll, PortfolioAll } from '../../../shared/interfaces/portfolio-all';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-display',
  imports: [CommonModule,MatButtonModule,RouterLink],
  templateUrl: './project-display.component.html',
  styleUrl: './project-display.component.css'
})
export class ProjectDisplayComponent implements OnInit{
  projectList:PortfolioAll[] = [];

  constructor(private getPortfolioService:GetPortfolioService){}

  ngOnInit(): void {
    this.getAllProject()
  }

  getAllProject(){
    Swal.fire({
      title: 'Memuat data portfolio...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.getPortfolioService.getAllPortfolio().subscribe({
      next:(res:ApiResponsePortfolioAll<PortfolioAll[]>) => {
        this.projectList = res.data
        console.log(this.projectList)
        Swal.close()
      },
      error:(error:any)=> {
        Swal.close()
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
