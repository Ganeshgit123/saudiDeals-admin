import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-property-subsriiption',
  templateUrl: './property-subsriiption.component.html',
  styleUrls: ['./property-subsriiption.component.scss'],
  standalone: false
})
export class PropertySubsriiptionComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  getPropertySubsc = [];
  submitted = false;
  subsId: any;
  isEdit = false;
  propertySubForm: UntypedFormGroup;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '0',
    maxHeight: '200px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: false,
    showToolbar: false,
    sanitize: false,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'poppins', name: 'Poppins' },
      { class: 'DroidKufi', name: 'DroidKufi' }
    ],
    // uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    // uploadWithCredentials: false,
    // sanitize: true,
    // toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['italic', 'insertImage', 'insertVideo', 'subscript', 'superscript',]
    ]
  };
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(private modalService: NgbModal, public fb: UntypedFormBuilder, public authService: AuthService,
    private toastr: ToastrService, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.displayedColumns = ['index', 'name', 'price', 'description', 'subscriptionsTime', 'totalPost',
      'rowActionToggle', 'rowActionIcon'];

    this.authService.getSubcPackage('PROPERTY').subscribe(
      (res: any) => {
        this.getPropertySubsc = res.data;
        this.dataSource = new MatTableDataSource(this.getPropertySubsc);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      }
    );

    this.propertySubForm = this.fb.group({
      userType: [''],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      subscriptionsTime: ['', [Validators.required]],
      totalPost: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  get propF() { return this.propertySubForm.controls; }

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
    this.propertySubForm.reset();
    this.isEdit = false;
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  onSubmitData() {
    this.submitted = true;

    if (this.propertySubForm.invalid) {
      return;
    }

    if (this.isEdit) {
      this.subscEditService(this.propertySubForm.value)
      return;
    }
    this.submitted = false;
    this.propertySubForm.value.type = "PROPERTY";
    this.propertySubForm.value.userType = "DEALER"
    this.authService.addSubcPackage(this.propertySubForm.value)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.submitted = false;
          this.propertySubForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }

  editSubsc(data, content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
    this.isEdit = true;
    this.subsId = data['id'];
    this.propertySubForm = this.fb.group({
      userType: data['userType'],
      name: [data['name']],
      price: [data['price']],
      subscriptionsTime: [data['subscriptionsTime']],
      totalPost: [data['totalPost']],
      description: [data['description']],
    });
  }

  subscEditService(data) {
    this.authService.editSubcPackage(data, this.subsId)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.propertySubForm.reset();
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

    this.authService.editSubcPackage(object, value.id)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.ngOnInit();
        } else {
          this.toastr.error('Enter valid ', res.massage);
        }
      });
  }

  deleteSubsc(value) {
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
          this.authService.deleteSubcPackage(value).subscribe((res: any) => {
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
