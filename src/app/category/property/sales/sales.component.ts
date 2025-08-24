import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.scss'],
    standalone: false
})
export class SalesComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  getCategList = [];
  saleCategoryForm: UntypedFormGroup;
  isEdit = false;
  categId: any;
  sure: any;
  revert: any;
  yesDelete: any;
  deleted: any;
  fileConfirm: any;
  cancel: any;
  ok: any;
  submitted = false;

  @ViewChild('empTbSort') empTbSort = new MatSort();

  @ViewChild('paginatorFirst') paginatorFirst: MatPaginator;

  constructor(public authService: AuthService, private modalService: NgbModal,
    private toastr: ToastrService, private router: Router, public fb: UntypedFormBuilder,) { }

  ngOnInit(): void {
    this.displayedColumns = ['index', 'en_name', 'ar_name', 'rowActionIcon'];
    // this.displayedColumns = ['index', 'en_name', 'ar_name','rowActionToggle','rowActionIcon'];

    this.authService.getPropertyCategory("SALE").subscribe(
      (res: any) => {
        const sortedByName = res.data.sort((a, b) => a.name.localeCompare(b.name));
        this.getCategList = sortedByName;
        this.dataSource = new MatTableDataSource(this.getCategList);
        this.dataSource.paginator = this.paginatorFirst;
        this.dataSource.sort = this.empTbSort;
      }
    );

    this.saleCategoryForm = this.fb.group({
      en_name: ['', [Validators.required]],
      ar_name: ['', [Validators.required]],
      type: [''],
    });

    if (localStorage.getItem("dir") == "ltr") {
      this.sure = 'Are you sure?';
      this.revert = "You won't be able to revert this!";
      this.yesDelete = "Yes, delete it!";
      this.deleted = "Deleted!";
      this.fileConfirm = "Your file has been deleted";
      this.cancel = 'Cancel';
      this.ok = 'Ok';
    } else {
      this.sure = 'هل أنت متأكد؟';
      this.revert = "لن تتمكن من التراجع عن هذا!";
      this.yesDelete = "نعم ، احذفها";
      this.deleted = "تم الحذف";
      this.fileConfirm = "تم حذف ملفك";
      this.cancel = 'الغاء';
      this.ok = 'موافق';
    }
  }

  get saleForm() { return this.saleCategoryForm.controls; }

  ngAfterViewInit(): void {
    if (localStorage.getItem("dir") == "ltr") {
      this.paginatorFirst._intl.itemsPerPageLabel = 'Items per page';
    } else {
      this.paginatorFirst._intl.itemsPerPageLabel = 'معلومات كل صفحة';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSaleModal(saleContent) {
    this.saleCategoryForm.reset();
    this.isEdit = false;
    this.modalService.open(saleContent, { centered: true });
  }

  onSubmitSaleData() {
    this.submitted = true;

    if (!this.saleCategoryForm.valid) {
      return false;
    }

    if (this.isEdit) {
      this.categoryEditService(this.saleCategoryForm.value)
      return;
    }

    this.saleCategoryForm.value.type = "SALE"
    this.submitted = false;

    this.authService.addPropertyCategory(this.saleCategoryForm.value)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.saleCategoryForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.error('Enter valid ', res.massage);
        }
      });
  }

  editSaleCategory(data, saleContent) {
    this.modalService.open(saleContent, { centered: true });
    this.isEdit = true;
    this.submitted = false;
    this.categId = data['id'];

    this.saleCategoryForm = this.fb.group({
      en_name: [data['en_name']],
      ar_name: [data['ar_name']],
      type: [data['type']],
    });
  }

  categoryEditService(data) {
    this.authService.editPropertyCategory(data, this.categId)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.saleCategoryForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.error('Enter valid ', res.massage);
        }
      });
  }

  deleteCategory(value) {
    Swal.fire({
      title: this.sure,
      text: this.revert,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: this.cancel,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.yesDelete
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: this.deleted,
          text: this.fileConfirm,
          icon: 'success',
          confirmButtonText: this.ok
        }),
          this.authService.deleteCategory(value).subscribe((res: any) => {
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

  changeStatus(value) {
    if (value.active === 1) {
      var visible = 0
    } else {
      var visible = 1
    }
    const object = { active: visible }

    this.authService.editPropertyCategory(object, value.id)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.ngOnInit();
        } else {
          this.toastr.error('Enter valid ', res.massage);
        }
      });
  }

}
