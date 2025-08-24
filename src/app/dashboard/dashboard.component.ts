import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  getData = [];
  getMotorsList = [];
  getPropList = [];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.dashboard().subscribe(
      (res: any) => {
        this.getData = res.data;
      });

    this.authService.getAllMotorsList().subscribe(
      (res: any) => {
        const totalMotorCount = res.data.length;
        this.authService.getExpiredMotors(1).subscribe((res: any) => {
          const totalExpiryList = res.data.length;
          const object = {
            totalPost: totalMotorCount,
            expiredPost: totalExpiryList,
            activePost: totalMotorCount - totalExpiryList,
          }
          this.getMotorsList.push(object);
        })
      });

    this.authService.getAllPropertyList().subscribe(
      (res: any) => {
        const totalPropCount = res.data.length;
        this.authService.getExpiredProperty(1).subscribe((res: any) => {
          const totalExpiryList = res.data.length;
          const object = {
            totalPost: totalPropCount,
            expiredPost: totalExpiryList,
            activePost: totalPropCount - totalExpiryList,
          }
          this.getPropList.push(object);
        })
      });
  }

}
