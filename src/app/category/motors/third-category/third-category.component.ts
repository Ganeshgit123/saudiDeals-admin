import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-third-category',
    templateUrl: './third-category.component.html',
    styleUrls: ['./third-category.component.scss'],
    standalone: false
})
export class ThirdCategoryComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  getvalue = [];
  subSubbCategForm: UntypedFormGroup;
  isEdit = false;
  submitted = false;
  subSubCategId: any;

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(private modalService: NgbModal, public fb: UntypedFormBuilder, public authService: AuthService,
    private toastr: ToastrService, private router: Router,) { }

  ngOnInit(): void {
    this.displayedColumns = ['index', 'motorSubCategoriesName', 'arMotorSubCategoriesName', 'rowActionIcon'];

    this.authService.getMotorSubSubCategory().subscribe(
      (res: any) => {
        const sortedByName = res.data.sort((a, b) => a.motorSubCategoriesName.localeCompare(b.motorSubCategoriesName));
        this.getvalue = sortedByName;
        this.dataSource = new MatTableDataSource(this.getvalue);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      }
    );

    this.subSubbCategForm = this.fb.group({
      motorSubCategoriesName: ['', [Validators.required]],
      arMotorSubCategoriesName: ['', [Validators.required]],
    });
  }

  get subSubCateg() { return this.subSubbCategForm.controls; }

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
    this.subSubbCategForm.reset();
    this.isEdit = false;
    this.modalService.open(content, { centered: true });
  }

  editSubSubCategory(data, content) {
    this.modalService.open(content, { centered: true });
    this.isEdit = true;
    this.subSubCategId = data['id'];

    this.subSubbCategForm = this.fb.group({
      motorSubCategoriesName: [data['motorSubCategoriesName']],
      arMotorSubCategoriesName: [data['arMotorSubCategoriesName']],
    });
  }

  onSubmitData() {
    this.submitted = true;

    if (this.subSubbCategForm.invalid) {
      return;
    }

    this.submitted = false;
    this.authService.editMotorSubSubCategory(this.subSubbCategForm.value, this.subSubCategId)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.submitted = false;
          this.subSubbCategForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }
}
