import { AuthService } from './auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'heroesApp';

  ngOnInit(): void {
    this.authService.checkAuthentication().subscribe(() => {
      console.log('chechAuthentication finished')
    })
  }
  constructor( private authService: AuthService ){}
}
