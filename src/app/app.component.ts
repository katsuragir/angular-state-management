import { Component } from '@angular/core';
import { SserviceService } from './sservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-state-management';

  constructor(private service: SserviceService) {
  }
}
