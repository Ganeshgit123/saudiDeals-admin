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
    selector: 'app-master-trim',
    templateUrl: './master-trim.component.html',
    styleUrls: ['./master-trim.component.scss'],
    standalone: false
})
export class MasterTrimComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  getvalue = [];
  trimForm: UntypedFormGroup;
  isEdit = false;
  trimId: any;
  submitted = false;

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(private modalService: NgbModal, public fb: UntypedFormBuilder, public authService: AuthService,
    private toastr: ToastrService, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {

    this.displayedColumns = ['index', 'enName', 'arName', 'rowActionIcon'];

    this.authService.getMasterTrim().subscribe(
      (res: any) => {
        const sortedByEnName = res.data.sort((a, b) => a.enName.localeCompare(b.enName));
        this.getvalue = sortedByEnName;
        this.dataSource = new MatTableDataSource(this.getvalue);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      }
    );

    this.trimForm = this.fb.group({
      enName: ['', [Validators.required]],
      arName: ['', [Validators.required]],
    });
  }

  get trimf() { return this.trimForm.controls; }

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
    this.trimForm.reset();
    this.isEdit = false;
    this.modalService.open(content, { centered: true });
  }

  editTrim(data, content) {
    this.modalService.open(content, { centered: true });
    this.isEdit = true;
    this.trimId = data['id'];
    this.trimForm = this.fb.group({
      arName: [data['arName']],
      enName: [data['enName']],
    });
  }

  onSubmitData() {
    this.submitted = true;

    if (this.trimForm.invalid) {
      return;
    }

    if (this.isEdit) {
      this.trimEditService(this.trimForm.value)
      return;
    }
    this.submitted = false;
    this.authService.addMasterTrim(this.trimForm.value)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.submitted = false;
          this.trimForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }

  trimEditService(data) {
    this.authService.editMasterTrim(data, this.trimId)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.trimForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }

  changeStatus(value) {
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
          }
        ),
          this.authService.editMasterTrim(object, value.id)
            .subscribe((res: any) => {
              if (res.success == true) {
                this.toastr.success('Success ', res.massage);
                this.ngOnInit();
              } else {
                this.toastr.error('Enter valid ', res.massage);
              }
            });
      }
    })
  }
}
