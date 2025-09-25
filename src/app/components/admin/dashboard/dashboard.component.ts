import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/auth.service';
import { ApiResponseDashboardSummary, DashboardSummary } from '../../../shared/interfaces/dashboard-summary';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule,CommonModule,CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  dashboardSummary!:DashboardSummary;
  constructor(private authService:AuthService, private adminService:AdminService){}

  ngOnInit(): void {
    this.getDashboardSummary()
  }

  getDashboardSummary():void {
     Swal.fire({
          title: 'Memuat data dashboard...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
    

    this.adminService.getDashboardSummary().subscribe({
      next:(res:ApiResponseDashboardSummary<DashboardSummary>) => {
        this.dashboardSummary = res.data
        console.log(this.dashboardSummary)
      },
      error:(error:any) => {
        Swal.fire({
          title: 'Error',
          text: error?.error || 'Terjadi kesalahan saat memuat data dashboard',
          icon: 'error'
        })
        console.error("Error fetching dashboard summary: ",error)
      },
      complete:()=> {
        Swal.close()
      }
    })
  }
  
  onLogout(): void {
    this.authService.logout()
  }

}
