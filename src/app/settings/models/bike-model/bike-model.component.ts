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
  selector: 'app-bike-model',
  templateUrl: './bike-model.component.html',
  styleUrls: ['./bike-model.component.scss'],
  standalone: false
})
export class BikeModelComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  getvalue = [];
  modelForm: UntypedFormGroup;
  isEdit = false;
  modelId: any;
  submitted = false;
  makesList = [];

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(private modalService: NgbModal, public fb: UntypedFormBuilder, public authService: AuthService,
    private toastr: ToastrService, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.displayedColumns = ['index', 'brandName', 'modelName', 'arModelName', 'rowActionToggle', 'rowActionIcon'];

    this.authService.getModel("BIKE").subscribe(
      (res: any) => {
        const sortedData = res.data.sort((a, b) => {
          const brandComparison = a.brandName.localeCompare(b.brandName);
          if (brandComparison !== 0) {
            return brandComparison;
          }
          return a.modelName.localeCompare(b.modelName);
        });
        this.getvalue = sortedData;
        this.dataSource = new MatTableDataSource(this.getvalue);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      }
    );

    this.modelForm = this.fb.group({
      brandId: ['', [Validators.required]],
      modelName: ['', [Validators.required]],
      arModelName: ['', [Validators.required]],
      type: [],
    });

    this.authService.getMakes("BIKE").subscribe(
      (res: any) => {
        const sortedByName = res.data.sort((a, b) => a.name.localeCompare(b.name));
        this.makesList = sortedByName;
      }
    );
  }

  get modelf() { return this.modelForm.controls; }

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
    this.modelForm.reset();
    this.isEdit = false;
    this.modalService.open(content, { centered: true });
  }

  editModel(data, content) {
    this.modalService.open(content, { centered: true });
    this.isEdit = true;
    this.modelId = data['id'];
    this.modelForm = this.fb.group({
      brandId: data['brandId'],
      modelName: [data['modelName']],
      arModelName: [data['arModelName']],
      type: [data['type']],
    });
  }

  onSubmitData() {
    this.submitted = true;

    if (this.modelForm.invalid) {
      return;
    }

    if (this.isEdit) {
      this.modelEditService(this.modelForm.value)
      return;
    }
    this.submitted = false;
    this.modelForm.value.type = 'BIKE';
    this.authService.addModel(this.modelForm.value)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.submitted = false;
          this.modelForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }

  modelEditService(data) {
    this.authService.editModel(data, this.modelId)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.modelForm.reset();
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

    this.authService.editModel(object, value.id)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.ngOnInit();
        } else {
          this.toastr.error('Enter valid ', res.massage);
        }
      });
  }

  deleteModel(value) {
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
          this.authService.deleteModel(value).subscribe((res: any) => {
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
