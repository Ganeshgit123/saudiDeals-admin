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
    selector: 'app-first-category',
    templateUrl: './first-category.component.html',
    styleUrls: ['./first-category.component.scss'],
    standalone: false
})
export class FirstCategoryComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  getvalue = [];
  categForm: UntypedFormGroup;
  isEdit = false;
  categId: any;
  submitted = false;

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(private modalService: NgbModal, public fb: UntypedFormBuilder, public authService: AuthService,
    private toastr: ToastrService, private router: Router,) { }

  ngOnInit(): void {
    this.displayedColumns = ['index', 'name', 'arName', 'rowActionIcon'];

    this.authService.getMotorCategory().subscribe(
      (res: any) => {
        this.getvalue = res.data;
        this.dataSource = new MatTableDataSource(this.getvalue);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      }
    );

    this.categForm = this.fb.group({
      name: ['', [Validators.required]],
      arName: ['', [Validators.required]],
    });
  }
  get categF() { return this.categForm.controls; }

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
    this.categForm.reset();
    this.isEdit = false;
    this.modalService.open(content, { centered: true });
  }

  editCategory(data, content) {
    this.modalService.open(content, { centered: true });
    this.isEdit = true;
    this.categId = data['id'];

    this.categForm = this.fb.group({
      name: [data['name']],
      arName: [data['arName']],
    });
  }

  onSubmitData(){
    this.submitted = true;

    if (this.categForm.invalid) {
      return;
    }

    this.submitted = false;
    this.authService.editMotorCategory(this.categForm.value,this.categId)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.submitted = false;
          this.categForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }

}
