import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  isActive: boolean = false;
  isIncorrect: boolean = false;
  isPassword: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}

  setValueLogin() {
    if (this.username !== '' && this.password !== '') {
      // เรียก function findAll จาก apiService
      this.apiService
        .auth('/users/signin', {
          username: this.username,
          password: this.password,
        })
        .subscribe((res) => {
          console.log('result', res);
          if (res.code === 200) {
            localStorage.setItem('accessToken', res.data.token);
            this.router.navigate(['/tabs/tab1']);
          } else if (res.code === 404) {
            this.isIncorrect = true;
            setTimeout(() => {
              this.isIncorrect = false;
            }, 2000);
          } else if (res.code === 401) {
            this.isPassword = true;
            setTimeout(() => {
              this.isPassword = false;
            }, 2000);
          }
        });
    } else {
      this.isActive = true;
      setTimeout(() => {
        this.isActive = false;
      }, 2000);
    }
  }
}
