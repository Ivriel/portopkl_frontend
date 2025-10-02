// dashboard.component.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/auth.service';
import { ApiResponseDashboardSummary, DashboardSummary } from '../../../shared/interfaces/dashboard-summary';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import Swal from 'sweetalert2';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule, CommonModule, CardModule,MatIconModule,MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  adminEmail:string = "";
  adminName:string = "";
  adminAvatar:string = "";
  dashboardSummary!: DashboardSummary;
  private chart: Chart | undefined;
  currentTime:Date = new Date();

  constructor(private authService: AuthService, private adminService: AdminService, private router:Router) {}

  ngOnInit(): void {
    this.loadAdminEmail();
    this.getDashboardSummary();
    this.updateTime();
  }

  ngAfterViewInit(): void {
    // Chart akan dibuat setelah data summary tersedia
  }

  loadAdminEmail():void {
    const user = this.authService.getLoginUser();
    if(user) {
      this.adminEmail = user.email || ''
      this.adminName = user.nama || ''
      this.adminAvatar = user.avatar || ''
    }
  }

  updateTime():void {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  onAddProject():void {
    this.router.navigateByUrl('/admin/project-form/new')
  }

  onProfileClick():void {
    this.router.navigateByUrl("/admin/profile")
  }

  getDashboardSummary(): void {
    Swal.fire({
      title: 'Memuat data dashboard...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.adminService.getDashboardSummary().subscribe({
      next: (res: ApiResponseDashboardSummary<DashboardSummary>) => {
        this.dashboardSummary = res.data;
        console.log(this.dashboardSummary);
        
        // Create chart setelah data tersedia
        setTimeout(() => this.createChart(), 100);
      },
      error: (error: any) => {
        Swal.fire({
          title: 'Error',
          text: error?.error || 'Terjadi kesalahan saat memuat data dashboard',
          icon: 'error'
        });
        console.error("Error fetching dashboard summary: ", error);
      },
      complete: () => {
        Swal.close();
      }
    });
  }

  private createChart(): void {
    if (!this.chartCanvas || !this.dashboardSummary) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart if any
    if (this.chart) {
      this.chart.destroy();
    }

    const chartConfig: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: [
          'Total Portfolio',
          'On Progress',
          'Finished',
          'Industry',
          'Personal',
          'Web',
          'Mobile'
        ],
        datasets: [{
          label: 'Project Summary',
          data: [
            this.dashboardSummary.totalPortfolio,
            this.dashboardSummary.totalOnProgressProject,
            this.dashboardSummary.totalFinishedProject,
            this.dashboardSummary.totalIndustryProject,
            this.dashboardSummary.totalPersonalProject,
            this.dashboardSummary.totalWebProject,
            this.dashboardSummary.totalMobileProject
          ],
          backgroundColor: [
            'rgba(52, 211, 153, 0.8)',   // #34D399 - primary green
            'rgba(96, 165, 250, 0.8)',   // blue
            'rgba(74, 222, 128, 0.8)',   // light green
            'rgba(192, 132, 252, 0.8)',  // purple
            'rgba(251, 146, 60, 0.8)',   // orange
            'rgba(34, 211, 238, 0.8)',   // cyan
            'rgba(244, 114, 182, 0.8)'   // pink
          ],
          borderColor: [
            'rgba(52, 211, 153, 1)',
            'rgba(96, 165, 250, 1)',
            'rgba(74, 222, 128, 1)',
            'rgba(192, 132, 252, 1)',
            'rgba(251, 146, 60, 1)',
            'rgba(34, 211, 238, 1)',
            'rgba(244, 114, 182, 1)'
          ],
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: [
            'rgba(52, 211, 153, 1)',
            'rgba(96, 165, 250, 1)',
            'rgba(74, 222, 128, 1)',
            'rgba(192, 132, 252, 1)',
            'rgba(251, 146, 60, 1)',
            'rgba(34, 211, 238, 1)',
            'rgba(244, 114, 182, 1)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#D1D5DB',
              font: {
                size: 13,
                family: 'Inter, system-ui, sans-serif',
                weight: 'bold'
              },
              padding: 15,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(24, 24, 27, 0.95)',
            titleColor: '#F4F4F5',
            bodyColor: '#E4E4E7',
            borderColor: 'rgba(63, 63, 70, 0.8)',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            titleFont: {
              size: 13,
              weight: 'bold'
            },
            bodyFont: {
              size: 12
            },
            cornerRadius: 8
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#A1A1AA',
              stepSize: 1,
              font: {
                size: 11,
                weight: 'bold'
              },
              padding: 8
            },
            grid: {
              color: 'rgba(63, 63, 70, 0.3)',
              lineWidth: 1
            },
            border: {
              display: false
            }
          },
          x: {
            ticks: {
              color: '#A1A1AA',
              maxRotation: 45,
              minRotation: 45,
              font: {
                size: 10,
                weight: 'bold'
              },
              padding: 8
            },
            grid: {
              display: false
            },
            border: {
              display: false
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    };

    this.chart = new Chart(ctx, chartConfig);
  }

  onLogout(): void {
    Swal.fire({
      title: "Logout?",
      text: "Anda harus login kembali",
      color:"#ffffff",
      icon: "warning",
      background:"#212121",
      showCancelButton: true,
      confirmButtonColor: "#23BF8B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
