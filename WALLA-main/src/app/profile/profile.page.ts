import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  datas: Array<{ string: any }> = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {

    this.apiService.findAll('/users/me').subscribe((res) => {
      this.datas = res.message;
      console.log('res', res)
    });

  }
}
