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
  selectedBackgroundType: 'color' | 'image' | 'svg' = 'color';

  backgroundImageVisitor!:File | null;
  backgroundImageVisitorPreview!:string | null;
  constructor(private getSettingService:GetSettingService, private adminService:AdminService,private router:Router){
    this.settingForm = this.formBuilder.group({
      backgroundColorVisitor:[''],
      backgroundSvgVisitor:['']
    })
  }

  ngOnInit(): void {
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
        
        // Set selected background type based on API boolean flags
        if (res.data.isBackgroundImageVisitor) {
          this.selectedBackgroundType = 'image';
        } else if (res.data.isBackgroundSvgVisitor) {
          this.selectedBackgroundType = 'svg';
        } else {
          this.selectedBackgroundType = 'color';
        }
        
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

  onBackgroundTypeChange(type: 'color' | 'image' | 'svg'): void {
    this.selectedBackgroundType = type;
  }

  patchFormValues(): void {
    this.settingForm.patchValue({
      backgroundColorVisitor:this.settingData.backgroundColorVisitor,
      backgroundSvgVisitor:this.settingData.backgroundSvgVisitor
    })
    this.backgroundImageVisitorPreview = this.settingData.backgroundImageVisitor
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
  formData.append('backgroundSvgVisitor',this.settingForm.value.backgroundSvgVisitor)
  
  // Add boolean flags based on selected background type
  formData.append('isBackgroundImageVisitor', (this.selectedBackgroundType === 'image').toString())
  formData.append('isBackgroundSvgVisitor', (this.selectedBackgroundType === 'svg').toString())
  formData.append('isBackgroundColorVisitor', (this.selectedBackgroundType === 'color').toString())
  
  if(this.backgroundImageVisitor) {
    formData.append('backgroundImageVisitor',this.backgroundImageVisitor)
  }
  
  console.log('Submitting with background type:', this.selectedBackgroundType);
  console.log('Boolean flags:', {
    isBackgroundImageVisitor: this.selectedBackgroundType === 'image',
    isBackgroundSvgVisitor: this.selectedBackgroundType === 'svg',
    isBackgroundColorVisitor: this.selectedBackgroundType === 'color'
  });
  
  // Debug: Log FormData contents
  console.log('FormData contents:');
  formData.forEach((value, key) => {
    console.log(`${key}:`, value, typeof value);
  });
  
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
