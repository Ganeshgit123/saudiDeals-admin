import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent implements OnInit {
  updatedby: any;
  role: any;
  adminName: any;
  adminEmail: any;
  signoutform: UntypedFormGroup;
  passwordData: UntypedFormGroup;
  submitted = false;
  lang: any;
  dir: any;
  notificationList:any;
  notifyCount:any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    public fb: UntypedFormBuilder,
    public authService: AuthService, private toastr: ToastrService,
    private modalService: NgbModal, public translate: TranslateService
  ) {

  }

  ngOnInit(): void {
    this.lang = localStorage.getItem("lang") || "en";
    this.translate.use(this.lang);
    this.dir = localStorage.getItem("dir") || "ltr";
    this.updatedby = sessionStorage.getItem('adminId');
    this.signoutform = this.fb.group({
      lang: "en"
    });

    this.passwordData = this.fb.group({
      email: ["", [Validators.required]],
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],
    });


    // this.authService.getadminotifiaction().subscribe(
    //   (res: any) => {
    //     this.notificationList = res.data;
    //     this.notifyCount = res.count;
    //   }
    // );
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout() {
    this.authService.doLogout()
      .subscribe((res: any) => {
        if (res.success == true) {
          // Success
          this.toastr.success("Success", res.massage);
          sessionStorage.clear();
          this.router.navigate(['/']);
        } else {
          // Query Error
          this.toastr.error(res.massage);
        }
      });
  }

  changePassword(passwordModal: any) {
    this.passwordData.reset();
    this.modalService.open(passwordModal, { centered: false });
  }

  onPaswordChangeFunc() {
    if (this.passwordData.invalid) {
      this.submitted = true;
    } else {
      this.authService.changePassword(this.passwordData.value)
        .subscribe((res: any) => {
          if (res.success == true) {
            this.toastr.success('Success ', res.massage);
            this.ngOnInit();
            this.modalService.dismissAll();
          } else {
            this.toastr.error('Enter valid ', res.msg);
          }
        });
    }
  }

  readStatusChange(data){
      var visible = 1
    const object = {isRead : visible}
   this.authService.readNotifyChange(object,data.id)
   .subscribe((res: any) => {
     if (res.success == true) {
       this.toastr.success('Success ', res.massage);
       this.ngOnInit();
     } else {
       this.toastr.warning('Enter valid ', res.massage);
     }
   });
  }

  switchLang(lang: any) {
    if (lang == "ar") {
      var dir = "rtl";
    } else {
      var dir = "ltr";
    }
    localStorage.setItem("lang", lang);
    localStorage.setItem("dir", dir);
    // console.log("lang",localStorage)
    window.location.reload();

  }

}
