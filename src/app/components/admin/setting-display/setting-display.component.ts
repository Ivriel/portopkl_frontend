import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiResponseSetting, Setting } from '../../../shared/interfaces/setting';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetSettingService } from '../../../shared/services/get-setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting-display',
  imports: [CommonModule,FormsModule],
  templateUrl: './setting-display.component.html',
  styleUrl: './setting-display.component.css'
})
export class SettingDisplayComponent implements OnInit {
  setting!: Setting;
  bgType!:string;
  
  constructor(private getSettingService: GetSettingService, private router: Router) {}

  ngOnInit(): void {
    this.getSetting()
  }

  getSetting(): void {
    Swal.fire({
      title: 'Loading setting...',
      background: '#18181B',
      color: '#ffffff',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.getSettingService.getSetting().subscribe({
      next: (res: ApiResponseSetting<Setting>) => {
        Swal.close()
        this.setting = res.data;
        console.log(this.setting);
      },
      error: (error: any) => {
        Swal.close()
        console.error("Error fetching setting: ", error);
      }
    })
  }

  onEditSetting(): void {
    this.router.navigateByUrl("/admin/edit-setting");
  }

  // ✅ Getter untuk background SVG style
  get visitorSvgStyle() {
    if (!this.setting?.backgroundSvgVisitor) return {};
    return {
      'background-image': `url("${this.setting.backgroundSvgVisitor}")`,
      'background-size': 'auto',
      'background-repeat': 'repeat'
    };
  }
}