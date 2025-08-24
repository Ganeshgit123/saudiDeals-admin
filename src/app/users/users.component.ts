import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: false
})
export class UsersComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  getUsers = [];
  filtUserTypeValue: any;
  notifyForm: UntypedFormGroup;
  submitted = false;
  userId: any;
  fullUserData = [];
  remarkForm: UntypedFormGroup;
  isEdit = false;

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(private modalService: NgbModal, public fb: UntypedFormBuilder, public authService: AuthService,
    private toastr: ToastrService, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.displayedColumns = ['index', 'userName', 'mobileNumber', 'email', 'Notification', 'action', 'remarks'];

    this.authService.getUsers().subscribe(
      (res: any) => {
        this.fullUserData = res.data.reverse();
        this.getUsers = this.fullUserData.filter(item => item.active == 1)
        this.dataSource = new MatTableDataSource(this.getUsers);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      }
    );

    this.notifyForm = this.fb.group({
      message: ['', [Validators.required]],
    });

    this.remarkForm = this.fb.group({
      remarks: ['', [Validators.required]],
    });
  }

  get notifyF() { return this.notifyForm.controls; }
  get remarkF() { return this.remarkForm.controls; }

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

  onChangeUserTypeFilter(value) {
    this.filtUserTypeValue = this.fullUserData.filter(
      (data) => data.active == Number(value)
    )
    this.dataSource = new MatTableDataSource(this.filtUserTypeValue);
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
  }

  deleteUser(value) {
    if (value.active === 1) {
      var visible = 0
    } else {
      var visible = 1
    }
    const object = { active: visible }
    Swal.fire({
      title: this.translate.instant('Sure'),
      text: this.translate.instant('revert'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant('yesDelete'),
      cancelButtonText: this.translate.instant('cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          {
            title: this.translate.instant('deleted'),
            text: this.translate.instant('fileConfirm'),
            icon: "success",
            confirmButtonText: this.translate.instant('ok'),
          }),
          this.authService.deleteUser(object, value.id)
            .subscribe((res: any) => {
              if (res.success == true) {
                this.toastr.success('Success ', res.massage);
                this.ngOnInit();
              } else {
                this.toastr.warning('Enter valid ', res.massage);
              }
            });
      }
    })
  }

  sendNotify(id, Content) {
    this.userId = id;
    this.notifyForm.reset();
    this.submitted = false;
    this.modalService.open(Content, { centered: true });
  }

  onSubmitData() {
    this.submitted = true;
    if (this.notifyForm.invalid) {
      return;
    }
    this.notifyForm.value.type = 'adminNotification';
    this.notifyForm.value.userId = this.userId;
    this.authService.notifyPush(this.notifyForm.value)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.notifyForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }

  addRemarkValue(id, Remarks) {
    this.userId = id;
    this.remarkForm.reset();
    this.submitted = false;
    this.isEdit = false;
    this.modalService.open(Remarks, { centered: true });
  }

  editRemarkValue(data, Remarks) {
    this.modalService.open(Remarks, { centered: true });
    this.isEdit = true;
    this.userId = data['id'];

    this.remarkForm = this.fb.group({
      remarks: [data['remarks']]
    });
  }

  onRemarkSubmit() {
    this.submitted = true;
    if (this.remarkForm.invalid) {
      return;
    }

    if (this.isEdit) {
      this.remarkEditService(this.remarkForm.value)
      return;
    }
    this.submitted = false;
    this.authService.remarkAdd(this.remarkForm.value, this.userId)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.submitted = false;
          this.remarkForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }

  remarkEditService(data: any) {
    this.authService.remarkAdd(this.remarkForm.value, this.userId)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.submitted = false;
          this.remarkForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }
}
