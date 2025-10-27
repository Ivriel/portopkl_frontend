import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ApiResponseSetting, Setting } from '../../../shared/interfaces/setting';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetSettingService } from '../../../shared/services/get-setting.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting-form',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './setting-form.component.html',
  styleUrl: './setting-form.component.css'
})
export class SettingFormComponent implements OnInit{
  settingForm!:UntypedFormGroup;
  formBuilder = inject(FormBuilder)
  settingData!:Setting;
  bgTypeVisitor!:string;
  bgTypeAdmin!:string;

  backgroundImageVisitor!:File | null;
  backgroundImageVisitorPreview!:string | null;
  backgroundImageAdmin!:File | null;
  backgroundImageAdminPreview!:string | null;
  constructor(private getSettingService:GetSettingService, private adminService:AdminService,private router:Router){
    this.settingForm = this.formBuilder.group({
      backgroundColorVisitor:[''],
      backgroundColorAdmin:[''],
      backgroundSvgVisitor:[''],
      backgroundSvgAdmin:['']
    })
  }

  ngOnInit(): void {
    this.loadBackgroundTypeFromLocalStorage()
    this.getSetting()    
  }

  getSetting():void {
    Swal.fire({
      title: 'Getting setting data...',
      background: '#18181B',
      color: '#ffffff',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.getSettingService.getSetting().subscribe({
      next:(res:ApiResponseSetting<Setting>) => {
        Swal.close()
        this.settingData =res.data
        console.log(this.settingData)
        this.patchFormValues()
      },
      error:(error:any)=> {
        Swal.close()
        Swal.fire({
          title: 'Error',
          text: error?.error?.message || 'Error getting setting data',
          icon: 'error',
          background: '#18181B',
          color: '#ffffff'
        })
        console.error("Error getting setting data: ",error)
      }
    })
  }

  backToSetting(): void {
    this.router.navigateByUrl("/admin/setting-display")
  }

  loadBackgroundTypeFromLocalStorage(): void {
    this.bgTypeVisitor = localStorage.getItem('bgTypeVisitor') || 'color'
    this.bgTypeAdmin = localStorage.getItem('bgTypeAdmin') || 'color'
  }

  saveBackgroundTypeToLocalStorage(type: 'visitor' | 'admin', value: string): void {
    if (type === 'visitor') {
      this.bgTypeVisitor = value
      localStorage.setItem('bgTypeVisitor', value)
    } else {
      this.bgTypeAdmin = value
      localStorage.setItem('bgTypeAdmin', value)
    }
  }

  patchFormValues(): void {
    this.settingForm.patchValue({
      backgroundColorVisitor:this.settingData.backgroundColorVisitor,
      backgroundColorAdmin:this.settingData.backgroundColorAdmin,
      backgroundSvgVisitor:this.settingData.backgroundSvgVisitor,
      backgroundSvgAdmin:this.settingData.backgroundSvgAdmin
    })
    this.backgroundImageVisitorPreview = this.settingData.backgroundImageVisitor
    this.backgroundImageAdminPreview = this.settingData.backgroundImageAdmin
  }

  onBackgroundImageVisitorSelect(event:Event):void {
    const input = event.target as HTMLInputElement
    if(input.files && input.files[0]) {
      const file = input.files[0]
      if(!file.type.startsWith('image/')) {
        Swal.fire('Error','Please select an image file','error')
        return;
      }
      this.backgroundImageVisitor = file
      const reader = new FileReader();
      reader.onload = (e:any)=> {
        this.backgroundImageVisitorPreview = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  removeBackgroundImageVisitor():void {
    this.backgroundImageVisitor = null
    this.backgroundImageVisitorPreview = null
  }

  onBackgroundImageAdminSelect(event:Event):void {
    const input = event.target as HTMLInputElement
    if(input.files && input.files[0]) {
      const file = input.files[0]
      if(!file.type.startsWith('image/')) {
        Swal.fire('Error','Please select an image file','error')
        return;
      }
      this.backgroundImageAdmin = file
      const reader = new FileReader();
      reader.onload = (e:any)=> {
        this.backgroundImageAdminPreview = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  removeBackgroundImageAdmin():void {
    this.backgroundImageAdmin = null
    this.backgroundImageAdminPreview = null
  }

  onColorChange(controlName: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.settingForm.patchValue({ [controlName]: input.value });
  }

  onSubmit():void {
    if(this.settingForm.invalid) {
      Swal.fire('Error','Please fill all required fields','error')
      return;
  }
  const formData = new FormData()
  formData.append('backgroundColorVisitor',this.settingForm.value.backgroundColorVisitor)
  formData.append('backgroundColorAdmin',this.settingForm.value.backgroundColorAdmin)
  formData.append('backgroundSvgVisitor',this.settingForm.value.backgroundSvgVisitor)
  formData.append('backgroundSvgAdmin',this.settingForm.value.backgroundSvgAdmin)
  if(this.backgroundImageVisitor) {
    formData.append('backgroundImageVisitor',this.backgroundImageVisitor)
  }
  if(this.backgroundImageAdmin) {
    formData.append('backgroundImageAdmin',this.backgroundImageAdmin)
  }
  this.adminService.updateSetting(formData).subscribe({
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
        title: "Berhasil Mengedit Setting"
      });
      this.router.navigateByUrl("/admin/setting-display")  
    },
    error:(error:any)=> {
      Swal.close()
      Swal.fire({
        title: 'Error',
        text: error?.error?.message || 'Failed to edit setting',
        icon: 'error',
        background: '#18181B',
        color: '#ffffff',
      });
      console.error("Error editing setting: ",error)
    }
  })
}

onBackToSetting(): void {
  this.router.navigateByUrl("/admin/setting-display")
}
}
