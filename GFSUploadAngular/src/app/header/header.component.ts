import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;

  constructor(private authService: AuthService) { }
  
  ngOnDestroy(): void {
    this.authService.user.unsubscribe();
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
    })
  }

  onLogOutClicked(){
    this.authService.logout();
  }

}
