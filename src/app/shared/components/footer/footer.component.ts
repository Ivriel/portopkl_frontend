import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  year = new Date()
  isAdminRoute:boolean = false

  constructor(private router:Router){
    this.checkAdminRoute(router.url)

    this.router.events.subscribe(()=> {
      this.checkAdminRoute(this.router.url)
    })
  }

  checkAdminRoute(url:string): void {
    this.isAdminRoute = url.includes('admin')
  }
}
