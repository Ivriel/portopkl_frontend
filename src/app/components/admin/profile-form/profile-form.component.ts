import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { ApiResponseProfile, Profile } from '../../../shared/interfaces/profile';
import {  FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent implements OnInit{
  profileData!:Profile
  profileForm!:FormGroup;
  selectedFile:File | null = null;
  previewUrl:string | null = null;

  constructor(
    private router:Router, 
    private adminService:AdminService,
    private fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.getProfileData()
    this.initForm()
  }

  initForm():void {
    this.profileForm = this.fb.group({
      nama:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      phone:[''],
      bio:[''],
      location:this.fb.group({
        city:[''],
        country:[''],
        street:[''],
        postal_code:['']
      }),
      social:this.fb.group({
        github:[''],
        linkedin:[''],
        instagram:[''],
        facebook:[''],
        website:['']
      }),
      skills:this.fb.array([])
    })
  }

  getProfileData():void {
    Swal.fire({
      title: 'Getting profile data...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.adminService.getProfile().subscribe({
      next:(res:ApiResponseProfile<Profile>) => {
          Swal.close()
          this.profileData = res.userData
          this.populateForm()
          console.log(this.profileData)
      },
      error:(error:any)=> {
        Swal.close()
        Swal.fire({
          title: 'Error',
          text: error?.error?.message || 'Error getting profile data',
          icon: 'error'
        });
        console.error("Error getting user data: ",error)

      }
    })
  }

  get skills():FormArray {
    return this.profileForm.get('skills') as FormArray
  }

  addSkill():void {
    const skillGroup = this.fb.group({
      name:['',Validators.required],
      category:['',Validators.required]
    })
    this.skills.push(skillGroup)
  }

  removeSkill(index:number):void {
    this.skills.removeAt(index)
  }

  populateForm():void {
    this.profileForm.patchValue({
      nama:this.profileData.nama || '',
      email:this.profileData.email || '',
      phone:this.profileData.phone || '',
      bio:this.profileData.bio || '',
      location:{
        city:this.profileData.location?.city || '',
        country:this.profileData.location?.country || '',
        street:this.profileData.location?.street || '',
        postal_code:this.profileData.location?.postal_code || ''
      },
      social: {
        github:this.profileData.social?.github || '',
        linkedin:this.profileData.social?.linkedin || '',
        instagram:this.profileData.social?.instagram || '',
        facebook:this.profileData.social?.facebook || '',
        website:this.profileData.social?.website || ''
      }
    })
    
    // set preview avatar
    if(this.profileData.avatar) {
      this.previewUrl = this.profileData.avatar 
    }

    // populasi skill
    if(this.profileData.skills && this.profileData.skills.length > 0) {
      this.profileData.skills.forEach(skill=> {
        const skillGroup = this.fb.group({
          name:[skill.name,Validators.required],
          category:[skill.category,Validators.required]
        })
        this.skills.push(skillGroup)
      })
    }
  }

  onFileSelected(event:any):void {
    const file = event.target.files[0]
    if(file) {
      this.selectedFile = file

      // preview gambar
      const reader = new FileReader()
      reader.onload = (e:any)=> {
        this.previewUrl = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  onSubmit():void {
    if(this.profileForm.invalid) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill all required fields',
        icon: 'warning',
        confirmButtonColor: '#EF4444',
        background: '#18181B',
        color: '#ffffff'
      });
      return;
    }

    const formData = new FormData()
    const formValue = this.profileForm.value

    formData.append('nama',formValue.nama)
    formData.append('email',formValue.email)
    formData.append('phone',formValue.phone || '')
    formData.append('bio',formValue.bio || '')

    // munculin avatar kalau dipilih
    if(this.selectedFile) {
      formData.append('avatar',this.selectedFile)
    }

    // munculin lokasi,social sama skills as JSON string
    formData.append('location',JSON.stringify(formValue.location))
    formData.append('social',JSON.stringify(formValue.social))
    formData.append('skills',JSON.stringify(formValue.skills))

    Swal.fire({
      title: 'Updating profile...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.adminService.editProfile(formData).subscribe({
      next:()=> {
        Swal.close()
        this.router.navigateByUrl("/admin/profile")
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
          title: "Profile updated successfully"
        })
      },
      error:(error:any)=> {
        Swal.close()
        Swal.fire({
          title: 'Update Failed',
          text: error?.error?.message || 'Failed to update profile',
          icon: 'error',
          confirmButtonColor: '#EF4444',
          background: '#18181B',
          color: '#ffffff'
        });
        console.error("Error updating profile: ",error)
      }
    })
  }

  goBack():void {
    this.router.navigateByUrl("/admin/profile")
  }

}
