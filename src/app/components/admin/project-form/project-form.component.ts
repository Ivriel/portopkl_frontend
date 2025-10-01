import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-form',
  imports: [],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  id:string;
  isEditMode:boolean = false;
  constructor(private route:ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id') || ''
    if(this.id === 'new') {
      this.isEditMode = false
    } else {
      this.isEditMode = true
    }
  }
}
