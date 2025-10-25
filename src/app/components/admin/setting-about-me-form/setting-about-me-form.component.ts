import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ApiResponseSettingAboutMe, SettingAboutMe } from '../../../shared/interfaces/setting-about-me';
import { FormArray, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GetSettingService } from '../../../shared/services/get-setting.service';

@Component({
  selector: 'app-setting-about-me-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './setting-about-me-form.component.html',
  styleUrl: './setting-about-me-form.component.css'
})
export class SettingAboutMeFormComponent implements OnInit{
  settingAboutMeData!:SettingAboutMe;
  settingAboutMeForm!:UntypedFormGroup;
  selectedFile:File | null = null
  previewUrl:string | null = null

  constructor(private adminService:AdminService,private router:Router,private fb:FormBuilder, private getSettingService:GetSettingService ){}

  ngOnInit(): void {
    this.getSettingAboutMe()
    this.initForm()
  }

  initForm():void {
    this.settingAboutMeForm = this.fb.group({
      nama:[''],
      kelas:[''],
      description:[''],
      contacts:this.fb.array([]),
      imageAboutMe:['']
    })
  }

  getSettingAboutMe(): void {
    this.getSettingService.getSettingAboutMe().subscribe({
      next:(res:ApiResponseSettingAboutMe<SettingAboutMe>) => {
        this.settingAboutMeData = res.data
        this.populateForm()
      },
      error:(error:any)=> {
        console.error("Error getting setting about me: ",error)
      }
    })
  }

  populateForm(): void {
    this.settingAboutMeForm.patchValue({
      nama:this.settingAboutMeData.nama,
      kelas:this.settingAboutMeData.kelas,
      description:this.settingAboutMeData.description,
      imageAboutMe:this.settingAboutMeData.imageAboutMe
    })

    if(this.settingAboutMeData.contacts) {
      this.settingAboutMeData.contacts.forEach((contact:any)=> {
       const contactGroup = this.fb.group({
         icon:contact.icon,
         link:contact.link
       })
       this.contacts.push(contactGroup)
      })
    }
  }

  get contacts():FormArray {
    return this.settingAboutMeForm.get('contacts') as FormArray
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

  addContact():void {
    const contactGroup = this.fb.group({
      icon:['',Validators.required],
      link:['',Validators.required]
    })
    this.contacts.push(contactGroup)
  }

  removeContact(index:number):void {
    this.contacts.removeAt(index)
  }

  onSubmit(): void {
     if(this.settingAboutMeForm.invalid) {
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
    const formValue = this.settingAboutMeForm.value

    formData.append('nama',formValue.nama)
    formData.append('kelas',formValue.kelas)
    formData.append('description',formValue.description)
    if(this.selectedFile) {
      formData.append('imageAboutMe',this.selectedFile)
    }
    formData.append('contacts',JSON.stringify(formValue.contacts))


      Swal.fire({
      title: 'Updating setting about me...',
      background: '#18181B',
      color: '#ffffff',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.adminService.updateSettingAboutMe(formData).subscribe({
      next:()=> {
        Swal.close()
        this.router.navigateByUrl("/admin/setting-about-me")
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
          background: '#18181B',
          color: '#ffffff',
          title: "Setting about me updated successfully"
        })
      },
      error:(error:any)=> {
        Swal.close()
        Swal.fire({
          title: 'Update Failed',
          text: error?.error?.message || 'Failed to update setting about me',
          icon: 'error',
          confirmButtonColor: '#EF4444',
          background: '#18181B',
          color: '#ffffff'
        });
        console.error("Error updating setting about me: ",error)
      }
    })
  }

  onCancel(): void {
    this.router.navigateByUrl("/admin/setting-about-me")
  }

}
