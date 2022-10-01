import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: string = '';
  password: string = '';
  name: string = '';
  phone: string = '';

  isActive: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}

  setValueLogin() {
    if (
      this.username !== '' &&
      this.password !== '' &&
      this.name !== '' &&
      this.phone !== ''
    ) {
      // เรียก function findAll จาก apiService
      this.apiService
        .auth('/users/signup', {
          username: this.username,
          password: this.password,
          name: this.name,
          phone: this.phone,
        })
        .subscribe((res) => {
          console.log('result', res);
          if (res.code === 200) {
            this.router.navigate(['/login']);
          }
        });
    } else {
      // console.log('test')
      this.isActive = true;
      setTimeout(() => {
        this.isActive = false;
      }, 2000);
    }
  }
}
