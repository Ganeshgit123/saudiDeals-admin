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
  selector: 'app-property-posts',
  templateUrl: './property-posts.component.html',
  styleUrls: ['./property-posts.component.scss'],
  standalone: false
})
export class PropertyPostsComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  getMotorsList = [];
  rejectForm: UntypedFormGroup;
  submitted = false;
  postId: any;
  getPostedData = [];
  filtStatusValue: any;
  selectedStatus: string = '0'; // Default to "UnderReview"

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(private modalService: NgbModal, public fb: UntypedFormBuilder, public authService: AuthService,
    private toastr: ToastrService, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.displayedColumns = ['index', 'title', 'status', 'userId', 'provinceName', 'cityName', 'categoryName', 'price',
      'date', 'details', 'action'];

    // Restore selected status filter if saved
    const savedFilter = localStorage.getItem('propStatusFilter');
    if (savedFilter) {
      this.selectedStatus = savedFilter;
    }

    this.authService.getPropertyList(1).subscribe(
      (res: any) => {
        this.getMotorsList = res.data;
        let filteredData = [];

        if (this.selectedStatus === 'all') {
          filteredData = this.getMotorsList;
        } else if (this.selectedStatus === '3') {
          // Handle expired separately (but we load fresh in onChange, so no action here)
          filteredData = [];
        } else {
          filteredData = this.getMotorsList.filter(
            (data) => data.isApprove == Number(this.selectedStatus)
          );
        }

        const savedState = localStorage.getItem('propListState');
        let filter = '';
        let pageIndex = 0;
        let pageSize = 10;

        if (savedState) {
          const state = JSON.parse(savedState);
          filter = state.filter || '';
          pageIndex = state.pageIndex || 0;
          pageSize = state.pageSize || 10;

          if (filter) {
            filteredData = filteredData.filter(item =>
              JSON.stringify(item).toLowerCase().includes(filter.toLowerCase())
            );
          }
        }

        this.dataSource = new MatTableDataSource(filteredData);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
        this.dataSource.filter = filter;

        setTimeout(() => {
          this.matPaginator.pageIndex = pageIndex;
          this.matPaginator.pageSize = pageSize;
          this.matPaginator._changePageSize(pageSize);

          if (savedState) {
            const state = JSON.parse(savedState);
            window.scrollTo(0, state.scrollPosition || 0);
          }

          localStorage.removeItem('propListState');
        });
      });

    this.rejectForm = this.fb.group({
      rejectReason: ['', [Validators.required]],
    });
  }

  get rejectF() { return this.rejectForm.controls; }

  ngAfterViewInit(): void {
    if (localStorage.getItem("dir") == "ltr") {
      this.matPaginator._intl.itemsPerPageLabel = 'Items per page';
    } else {
      this.matPaginator._intl.itemsPerPageLabel = 'معلومات كل صفحة';
    }
  }


  goToDetails(id: number) {
    const state = {
      pageIndex: this.matPaginator.pageIndex,
      pageSize: this.matPaginator.pageSize,
      filter: this.dataSource.filter,
      scrollPosition: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };

    localStorage.setItem('propListState', JSON.stringify(state));

    this.router.navigate(['/view_property_posts', id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChangeStatus(value, id, Reason) {
    this.postId = id;
    var status = Number(value)

    if (status != 2) {
      const object = { isApprove: status }
      this.authService.approvePropertyPost(object, this.postId)
        .subscribe((res: any) => {
          if (res.success == true) {
            this.toastr.success('Success ', res.massage);
            this.ngOnInit();
          } else {
            this.toastr.error('Enter valid ', res.massage);
          }
        });
    } else {
      this.modalService.open(Reason, { centered: true });
    }
  }

  onSubmitData() {
    this.submitted = true;
    if (this.rejectForm.invalid) {
      return;
    }
    this.rejectForm.value.isApprove = 2;
    this.authService.rejecPropertyPost(this.rejectForm.value, this.postId)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success('Success ', res.massage);
          this.rejectForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.warning('Enter valid ', res.massage);
        }
      });
  }

  onChangeStatusTypeFilter(value: string) {
    this.selectedStatus = value;
    localStorage.setItem('propStatusFilter', value);

    if (value === '3') {
      this.authService.getExpiredProperty(1).subscribe((res: any) => {
        this.displayedColumns = ['index', 'title', 'userId', 'provinceName', 'cityName', 'categoryName', 'price',
          'date'];
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      });
      return;
    }

    this.displayedColumns = ['index', 'title', 'status', 'userId', 'provinceName', 'cityName', 'categoryName', 'price',
      'date', 'details', 'action'];

    let filtered = value === 'all'
      ? this.getMotorsList
      : this.getMotorsList.filter(data => data.isApprove == Number(value));

    this.dataSource = new MatTableDataSource(filtered);
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
  }

  deletePost(value) {
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
          this.authService.approvePropertyPost(object, value.id)
            .subscribe((res: any) => {
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

  ngOnDestroy(): void {
    const nextUrl = this.router.url;

    const isGoingToView = nextUrl.startsWith('/view_property_posts');

    if (!isGoingToView) {
      localStorage.removeItem('propStatusFilter');
    }

  }
}
