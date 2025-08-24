import { Component, OnInit,ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-admin-users',
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss'],
    standalone: false
})
export class AdminUsersComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  getAdminUsers = [];
  adminUserForm: UntypedFormGroup;
  isEdit = false;
  adminUserId:any;
  getRoles = [];

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(private modalService: NgbModal, public fb: UntypedFormBuilder, public authService: AuthService,
    private toastr: ToastrService,private router: Router,) { }

  ngOnInit(): void {
    this.displayedColumns = ['index', 'firstName','lastName','mobileNumber','email','roleName','rowActionIcon'];

    this.authService.getAdminUser().subscribe(
      (res: any) => {
        this.getAdminUsers = res.data;
        this.dataSource = new MatTableDataSource(this.getAdminUsers);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      }
    );

    this.authService.getRoles().subscribe(
      (res: any) => {
        this.getRoles = res.data;
      }
    );

    this.adminUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      mobileNumber: [''],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      userType: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem("dir") == "ltr") {
      this.matPaginator._intl.itemsPerPageLabel = 'Items per page';
    } else {
      this.matPaginator._intl.itemsPerPageLabel = 'معلومات كل صفحة';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  openModal(content) {
    this.adminUserForm.reset();
    this.isEdit = false;
    this.modalService.open(content, { centered: true });
  }

  editAdminUser(data,content){
    this.modalService.open(content, { centered: true });
    this.isEdit = true;
    this.adminUserId = data['id'];

    this.adminUserForm = this.fb.group({
      roleName:  [data['roleName']],
    });
  }

  onSubmitData(){
    if(!this.adminUserForm.valid){
      this.toastr.error('Please Fill the mandatory field');
      return false;
    }

    this.authService.addAdminUser(this.adminUserForm.value)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.adminUserForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }


}
