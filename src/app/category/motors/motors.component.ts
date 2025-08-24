import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-motors',
    templateUrl: './motors.component.html',
    styleUrls: ['./motors.component.scss'],
    standalone: false
})
export class MotorsComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  getCategList  = [];
  categForm: UntypedFormGroup;
  submitted = false;
  categId:any;

  constructor(public authService: AuthService,
    private toastr: ToastrService, private router: Router,public fb: UntypedFormBuilder,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.displayedColumns = ['index', 'name','arName','rowActionIcon'];

    this.authService.getMotorCategory().subscribe(
      (res: any) => {
        this.getCategList = res.data;
        this.dataSource = new MatTableDataSource(this.getCategList);
        // this.dataSource.paginator = this.paginatorFirst;
        // this.dataSource.sort = this.empTbSort;
      });

      this.categForm = this.fb.group({
        name: ['', [Validators.required]],
        arName: ['', [Validators.required]],
      });
  }

  get categF() { return this.categForm.controls; }


  ngAfterViewInit(): void {
    // if (localStorage.getItem("dir") == "ltr") {
    //   this.paginatorFirst._intl.itemsPerPageLabel = 'Items per page';
    // } else {
    //   this.paginatorFirst._intl.itemsPerPageLabel = 'معلومات كل صفحة';
    // }
  }

 }
