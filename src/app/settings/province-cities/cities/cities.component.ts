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
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  standalone: false
})
export class CitiesComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  getvalue = [];
  cityForm: UntypedFormGroup;
  isEdit = false;
  cityId: any;
  submitted = false;
  provinceList = [];

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(private modalService: NgbModal, public fb: UntypedFormBuilder, public authService: AuthService,
    private toastr: ToastrService, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.displayedColumns = ['index', 'provincesName', 'city', 'arCity', 'rowActionToggle', 'rowActionIcon'];

    this.authService.getCity().subscribe(
      (res: any) => {
        const sortedData = res.data.sort((a, b) => {
          const provinceComparison = a.provincesName.localeCompare(b.provincesName);
          if (provinceComparison !== 0) return provinceComparison;

          return a.city.localeCompare(b.city);
        });
        this.getvalue = sortedData;
        this.dataSource = new MatTableDataSource(this.getvalue);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      }
    );

    this.cityForm = this.fb.group({
      provinceId: ['', [Validators.required]],
      city: ['', [Validators.required]],
      arCity: ['', [Validators.required]],
    });

    this.authService.getProvince().subscribe(
      (res: any) => {
        const sortedByName = res.data.sort((a, b) => a.name.localeCompare(b.name));
        this.provinceList = sortedByName;
      }
    );
  }

  get cityf() { return this.cityForm.controls; }

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
    this.cityForm.reset();
    this.isEdit = false;
    this.modalService.open(content, { centered: true });
  }

  editCity(data, content) {
    this.modalService.open(content, { centered: true });
    this.isEdit = true;
    this.cityId = data['id'];
    this.cityForm = this.fb.group({
      provinceId: data['provinceId'],
      city: [data['city']],
      arCity: [data['arCity']],
    });
  }

  onSubmitData() {
    this.submitted = true;

    if (this.cityForm.invalid) {
      return;
    }

    if (this.isEdit) {
      this.cityEditService(this.cityForm.value)
      return;
    }
    this.submitted = false;
    this.authService.addCity(this.cityForm.value)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.submitted = false;
          this.cityForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }

  cityEditService(data) {
    this.authService.editCity(data, this.cityId)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.cityForm.reset();
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

    this.authService.editCity(object, value.id)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.ngOnInit();
        } else {
          this.toastr.error('Enter valid ', res.massage);
        }
      });
  }

  deleteCity(value) {
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
          this.authService.deleteCity(value).subscribe((res: any) => {
            if (res.success == true) {
              this.toastr.success('Success ', res.message);
              this.ngOnInit()
            } else {
              this.toastr.error('Error', res.message);
            }
          });
      }
    })
  }
}
