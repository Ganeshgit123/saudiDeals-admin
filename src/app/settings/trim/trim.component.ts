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

@Component({
  selector: 'app-trim',
  templateUrl: './trim.component.html',
  styleUrls: ['./trim.component.scss'],
  standalone: false
})
export class TrimComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  getvalue = [];
  trimForm: UntypedFormGroup;
  isEdit = false;
  trimId: any;
  submitted = false;
  makeList = [];
  modelList = [];
  getTrimList = [];

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(private modalService: NgbModal, public fb: UntypedFormBuilder, public authService: AuthService,
    private toastr: ToastrService, private router: Router,) { }

  ngOnInit(): void {
    this.displayedColumns = ['index', 'brandName', 'modelName', 'enName', 'arName', 'rowActionToggle', 'rowActionIcon'];

    this.authService.getTrim().subscribe(
      (res: any) => {
        const sortedData = res.data.sort((a, b) => {
          const brandComparison = a.brandName.localeCompare(b.brandName);
          if (brandComparison !== 0) return brandComparison;

          const modelComparison = a.modelName.localeCompare(b.modelName);
          if (modelComparison !== 0) return modelComparison;

          return a.name.localeCompare(b.name);
        });
        this.getvalue = sortedData;
        this.dataSource = new MatTableDataSource(this.getvalue);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      }
    );

    this.authService.getMasterTrim().subscribe(
      (res: any) => {
        this.getTrimList = res.data;
      }
    );

    this.trimForm = this.fb.group({
      makeId: ['', [Validators.required]],
      modelId: ['', [Validators.required]],
      enName: ['', [Validators.required]],
      arName: [''],
    });

    this.authService.getMakes("CAR").subscribe(
      (res: any) => {
        const sortedByName = res.data.sort((a, b) => a.name.localeCompare(b.name));
        this.makeList = sortedByName;
      }
    );

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

  onModelChange(value) {
    this.authService.getModel("CAR").subscribe(
      (res: any) => {
        const modelArray = res.data.sort((a, b) => a.name?.localeCompare(b.name));
        this.modelList = modelArray.filter((obj) => {
          return obj.brandId == value;
        });
      }
    );
  }

  onTrimGet(value) {
    this.authService.getMasterTrim().subscribe(
      (res: any) => {
        const modelArray = res.data;
        modelArray.forEach(element => {
          if (value == element.enName) {
            this.trimForm.value.arName = element.arName;
          }
        });
      }
    );
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
      makeId: data['makeId'],
      modelId: [data['modelId']],
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
    // console.log("kii",this.trimForm.value)
    this.authService.addTrim(this.trimForm.value)
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
    this.authService.editTrim(data, this.trimId)
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

    this.authService.editTrim(object, value.id)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.ngOnInit();
        } else {
          this.toastr.error('Enter valid ', res.massage);
        }
      });
  }

  deleteTrim(value) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ),
          this.authService.deleteTrim(value).subscribe((res: any) => {
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
