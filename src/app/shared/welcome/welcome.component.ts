import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'welcome',
  imports: [TuiButton, RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
