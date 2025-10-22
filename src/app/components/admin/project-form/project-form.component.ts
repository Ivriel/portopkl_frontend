import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, UntypedFormGroup, ReactiveFormsModule, Validators, FormArray, FormGroup } from '@angular/forms';
import { ApiResponsePortfolioById,PortfolioById } from '../../../shared/interfaces/portfolio-by-id';
import { Title } from '@angular/platform-browser';
import { GetPortfolioService } from '../../../shared/services/get-portfolio.service';
import Swal from 'sweetalert2';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent implements OnInit{
  id:string;
  isEditMode:boolean = false;
  projectForm:UntypedFormGroup;
  formBuilder = inject(FormBuilder)
  portfolioDetail!:PortfolioById;

  thumbnailFile:File | null = null
  thumbnailPreview:string | null = null
  imagesFiles:File[] = []
  imagesPreviews:string[] = []

  isLoading:boolean = false

  constructor(
    private route:ActivatedRoute, 
    private getPortfolioService:GetPortfolioService, 
    private title:Title, 
    private adminService:AdminService,
    private router:Router
  ){
    this.id = this.route.snapshot.paramMap.get('id') || ''
    if(this.id === 'new') {
      this.isEditMode = false
      this.title.setTitle('Admin - Add Project')
    } else {
      this.isEditMode = true
    }
  
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      status: ['', Validators.required],
      typeProject: ['', Validators.required],
      githubUrl: ['', Validators.pattern('https?://.+')],
      technologies: this.formBuilder.array([])
    });
    
  }

  ngOnInit(): void {
    if(this.isEditMode) {
     this.GetPortfolioById();
    } else {
      this.addTechnology()
    }
  }

  GetPortfolioById():void {
    Swal.fire({
      title: 'Getting detail project...',
      background: '#18181B',
      color: '#ffffff',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.getPortfolioService.getPortfolioById(this.id).subscribe({
      next:(res:ApiResponsePortfolioById<PortfolioById>) => {
        Swal.close()
        this.portfolioDetail = res.data
        console.log(this.portfolioDetail)
        this.title.setTitle(this.isEditMode ? `Edit Project - ${this.portfolioDetail.title}` : 'Tambah Project')
        this.patchFormValues()
      },
      error:(error:any)=> {
        Swal.close()
        console.error(error)
      }
    })
  }

  patchFormValues():void {
    this.projectForm.patchValue({
      title:this.portfolioDetail.title,
      description:this.portfolioDetail.description,
      category:this.portfolioDetail.category,
      status:this.portfolioDetail.status,
      typeProject:this.portfolioDetail.typeProject,
      githubUrl:this.portfolioDetail.githubUrl
    });

    this.thumbnailPreview = this.portfolioDetail.thumbnail;

    this.imagesPreviews = this.portfolioDetail.images || []

    this.portfolioDetail.technologies?.forEach(tech => {
      this.addTechnology(tech.name,tech.color)
    })
  }

  get technologies():FormArray {
    return this.projectForm.get('technologies') as FormArray
  }

  createTechnologyFormGroup(name:string = '',color:string = ''):FormGroup {
    return this.formBuilder.group({
      name:[name,Validators.required],
      color:[color,Validators.required]
    })
  }

  addTechnology(name:string = '',color:string =''):void {
    this.technologies.push(this.createTechnologyFormGroup(name,color))
  }

  removeTechnology(index:number):void {
    this.technologies.removeAt(index)
  }

  onThumbnailSelect(event:Event):void {
    const input = event.target as HTMLInputElement
    if(input.files && input.files[0]) {
      const file = input.files[0]

      if(!file.type.startsWith('image/')) {
        Swal.fire('Error','Please select an image file','error')
        return;
      }
      this.thumbnailFile = file

      // bikin preview
      const reader = new FileReader();
      reader.onload = (e:any)=> {
        this.thumbnailPreview = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  removeThumbnail():void {
    this.thumbnailFile = null;
    this.thumbnailPreview = null
  }

  onImagesSelect(event:Event):void {
    const input = event.target as HTMLInputElement
    if(input.files) {
      Array.from(input.files).forEach(file => {
        if(!file.type.startsWith('image/')) {
          Swal.fire('Error','Please select only image files','error')
          return;
        }
        this.imagesFiles.push(file)

        // bikin preview
        const reader = new FileReader()
        reader.onload = (e:any)=>{
          this.imagesPreviews.push(e.target.result)
        }
        reader.readAsDataURL(file)
      })
    }
  }

  removeImage(index:number):void {
    this.imagesFiles.splice(index,1)
    this.imagesPreviews.splice(index,1)
  }

  onSubmit():void {
    if (this.projectForm.invalid) {
      Swal.fire('Error', 'Please fill all required fields', 'error');
      return;
    }

    if (!this.isEditMode && !this.thumbnailFile) {
      Swal.fire('Error', 'Please select a thumbnail image', 'error');
      return;
    }

    if (!this.isEditMode && this.imagesFiles.length === 0) {
      Swal.fire('Error', 'Please select at least one project image', 'error');
      return;
    }

    const formData = new FormData()

    formData.append('title',this.projectForm.value.title)
    formData.append('description',this.projectForm.value.description)
    formData.append('category', this.projectForm.value.category);
    formData.append('status', this.projectForm.value.status);
    formData.append('typeProject', this.projectForm.value.typeProject);
    formData.append('githubUrl', this.projectForm.value.githubUrl || '');

       // Append thumbnail
       if (this.thumbnailFile) {
        formData.append('thumbnail', this.thumbnailFile);
      }
  
      // Append images
      this.imagesFiles.forEach((file) => {
        formData.append('images', file);
      });

        // Append technologies as JSON string
    formData.append('technologies', JSON.stringify(this.projectForm.value.technologies));

    // Submit
    if (this.isEditMode) {
      this.updateProject(formData);
    } else {
      this.addProject(formData);
    }

  }

  addProject(formData:FormData):void {
    Swal.fire({
      title: 'Adding project...',
      background: '#18181B',
      color: '#ffffff',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.adminService.addPortfolio(formData).subscribe({
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
          title: "Berhasil Menambahkan Project"
        });
        this.router.navigateByUrl("/admin/project-display")  
      },
      error:(error:any)=> {
        Swal.close()
        Swal.fire({
          title: 'Error',
          text: error?.error?.message || 'Failed to add project',
          icon: 'error',
          background: '#18181B',
          color: '#ffffff',
        });
        console.error("Error adding project: ",error)
      }
    })

  }

  updateProject(formData:FormData):void {
    Swal.fire({
      title: 'Updating project...',
      allowOutsideClick: false,
      background: '#18181B',
      color: '#ffffff',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.adminService.editPortfolio(this.id,formData).subscribe({
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
          title: "Berhasil Mengedit Project"
        });
        this.router.navigateByUrl("/admin/project-display")  
      },
      error:(error:any)=> {
        Swal.close()
        Swal.fire({
          title: 'Error',
          text: error?.error?.message || 'Failed to edit project',
          icon: 'error',
          background: '#18181B',
          color: '#ffffff',
        });
        console.error("Error editing project: ",error)
      }
    })

  }

  onCancel(): void {
    this.router.navigate(['/admin/project-display']);
  }

}
