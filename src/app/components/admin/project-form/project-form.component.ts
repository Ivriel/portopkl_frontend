import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, UntypedFormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { ApiResponsePortfolioById, PortfolioById } from '../../../shared/interfaces/portfolioById';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent implements OnInit{
  id:string;
  isEditMode:boolean = false;
  projectForm:UntypedFormGroup;
  formBuilder = inject(FormBuilder)
  temporaryDataContainer!:PortfolioById;

  constructor(private route:ActivatedRoute, private adminService: AdminService, private title:Title){
    this.id = this.route.snapshot.paramMap.get('id') || ''
    if(this.id === 'new') {
      this.isEditMode = false
    } else {
      this.isEditMode = true
    }
  
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      images: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ]),
      technologies: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', Validators.required],
          color: ['', Validators.required]
        })
      ]),
      category: ['', Validators.required],
      status: [''],           
      typeProject: [''],         
      githubUrl: ['', Validators.pattern('https?://.+')]
    });
    
  }

  ngOnInit(): void {
    if(this.isEditMode) {
     this.GetPortfolioById();
    }
  }

  GetPortfolioById():void {
    this.adminService.getPortfolioById(this.id).subscribe({
      next:(res:ApiResponsePortfolioById<PortfolioById>) => {
        this.temporaryDataContainer = res.data
        console.log(this.temporaryDataContainer)
        this.title.setTitle(this.isEditMode ? `Edit Project - ${this.temporaryDataContainer.title}` : 'Tambah Project')
      },
      error:(error:any)=> {
        console.error(error)
      }
    })
  }

}
