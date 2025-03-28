import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { TuiButton } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'welcome',
  imports: [HeaderComponent, FooterComponent, TuiButton, RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
