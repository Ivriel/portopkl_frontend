import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
