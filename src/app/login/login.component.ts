import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted = false;
  returnUrl: string;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  errorMessge: string;
  isShow = false;
  showPassword = false;
  showModalPassword = false;
  input: any;
  logOutForm: UntypedFormGroup;

  constructor(private router: Router, private route: ActivatedRoute, public fb: UntypedFormBuilder, public authService: AuthService, private toastr: ToastrService) 
  {}


  ngOnInit(): void {
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
  
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["",[Validators.required]],
    });
  }

  changeText(){
    this.isShow = false;
  }
  onSubmit() {
    this.submitted = true;

    // console.log("form",this.loginForm)

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return false;
    } 

    this.isShow = false;
    this.authService.signIn(this.loginForm.value)
    .subscribe((res: any) => {
      if (res.success == true) {
        sessionStorage.setItem("access_token", res.token);
        sessionStorage.setItem("adminId", res.id);
        this.router.navigate([this.returnUrl]);
        this.toastr.success('Success',res.massage);
        localStorage.setItem("dir","ltr")
      } else{
        this.toastr.error('Error',res.massage);
      }
    })
  }

  }

