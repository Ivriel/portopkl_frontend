import { Component, OnInit } from '@angular/core';
import { GetPortfolioService } from '../../../shared/services/get-portfolio.service';
import { ApiResponsePortfolioAll, PortfolioAll } from '../../../shared/interfaces/portfolio-all';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { AdminService } from '../admin.service';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-project-display',
  imports: [CommonModule,MatButtonModule,FormsModule,RouterLink,Skeleton],
  templateUrl: './project-display.component.html',
  styleUrl: './project-display.component.css'
})
export class ProjectDisplayComponent implements OnInit{
  projectList:PortfolioAll[] = [];
  searchTerm: string = '';
  filterStatus: string = '';
  filterType: string = '';
  filterCategory: string = '';
  isLoading:boolean = true;
  qtyDisplaySkeletonCardProject = Array.from({length:6})
  qtyDisplaySkeletonNumberStatsBar = Array.from({length:4})

  constructor(private getPortfolioService:GetPortfolioService, private router:Router, private adminService:AdminService){}

  ngOnInit(): void {
    this.getAllProject()
  }

  getAllProject(){
    this.getPortfolioService.getAllPortfolio().subscribe({
      next:(res:ApiResponsePortfolioAll<PortfolioAll[]>) => {
        this.projectList = res.data
        console.log(this.projectList)
        this.isLoading = false
      },
      error:(error:any)=> {
        Swal.fire({
          title: 'Error',
          text: error?.error || 'Terjadi kesalahan saat memuat data portfolio',
          icon: 'error'
        })
        console.error("Error loading data list portfolio: ", error)
        this.isLoading = false
      }
    })
  }

  onAddProject(): void {
    this.router.navigate(['/admin/project-form/new']);
  }
  
  goToDetail(projectId: string): void {
    this.router.navigate(['/admin/project-detail', projectId]);
  }
  
  onEditProject(projectId: string): void {
    this.router.navigate(['/admin/project-form/', projectId]);
  }
  
  onDeleteProject(projectId: string): void {
    Swal.fire({
      title: 'Delete Project?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      background: '#18181B',
      color: '#ffffff',
      customClass: { popup: 'border border-zinc-800' }
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title:'Menghapus portfolio...',
          allowOutsideClick:false,
          didOpen:()=> {
            Swal.showLoading()
          }
        })

        this.adminService.deletePortfolio(projectId).subscribe({
          next:()=> {
            Swal.close()
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Berhasil menghapus portfolio"
            });

            this.getAllProject()
          },
          error:(error:any)=> {
            Swal.close()
            Swal.fire({
              title:'Error',
              text:error?.error || 'Terjadi kesalahan saat menghapus portfolio',
              icon:'error'
            })
            console.error("Gagal menghapus portfolio: ",error)
          }
        })
      }
    });
  }
  
  getStatusCount(status: string): number {
    return this.projectList?.filter(p => p.status.toLowerCase() === status.toLowerCase()).length || 0;
  }
  
  getTypeCount(type: string): number {
    return this.projectList?.filter(p => p.typeProject.toLowerCase() === type.toLowerCase()).length || 0;
  }
  
  onSearch(): void {
    // Implement search logic
  }
  
  onFilterChange(): void {
    // Implement filter logic
  }

}
