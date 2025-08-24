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
    selector: 'app-second-category',
    templateUrl: './second-category.component.html',
    styleUrls: ['./second-category.component.scss'],
    standalone: false
})
export class SecondCategoryComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  getvalue = [];
  subCategForm: UntypedFormGroup;
  isEdit = false;
  subCategId: any;
  submitted = false;

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(private modalService: NgbModal, public fb: UntypedFormBuilder, public authService: AuthService,
    private toastr: ToastrService, private router: Router,) { }

  ngOnInit(): void {
    this.displayedColumns = ['index', 'motorCategoriesName', 'arMotorCategoriesName', 'rowActionIcon'];

    this.authService.getMotorSubCategory().subscribe(
      (res: any) => {
        const sortedByName = res.data.sort((a, b) => a.motorCategoriesName.localeCompare(b.motorCategoriesName));
        this.getvalue = sortedByName;
        this.dataSource = new MatTableDataSource(this.getvalue);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      }
    );

    this.subCategForm = this.fb.group({
      motorCategoriesName: ['', [Validators.required]],
      arMotorCategoriesName: ['', [Validators.required]],
    });
  }

  get subCateg() { return this.subCategForm.controls; }

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
    this.subCategForm.reset();
    this.isEdit = false;
    this.modalService.open(content, { centered: true });
  }

  editSubCategory(data, content) {
    this.modalService.open(content, { centered: true });
    this.isEdit = true;
    this.subCategId = data['id'];

    this.subCategForm = this.fb.group({
      motorCategoriesName: [data['motorCategoriesName']],
      arMotorCategoriesName: [data['arMotorCategoriesName']],
    });
  }

  onSubmitData() {
    this.submitted = true;

    if (this.subCategForm.invalid) {
      return;
    }

    this.submitted = false;
    this.authService.editMotorSubCategory(this.subCategForm.value, this.subCategId)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.submitted = false;
          this.subCategForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }
}
