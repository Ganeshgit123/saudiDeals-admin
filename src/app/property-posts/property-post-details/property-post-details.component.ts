import { Component, OnInit,ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-property-post-details',
    templateUrl: './property-post-details.component.html',
    styleUrls: ['./property-post-details.component.scss'],
    standalone: false
})
export class PropertyPostDetailsComponent implements OnInit {
  params: any;
  getPostData:any;
  postId:any;
  rejectForm: UntypedFormGroup;
  submitted = false;
  imageArray = [];

  constructor(public authService: AuthService, private toastr: ToastrService, private route: ActivatedRoute,
    private modalService: NgbModal,public fb: UntypedFormBuilder,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.params = params.id;
    });
    this.authService.getPostedPropertyPost(this.params).subscribe(
      (res: any) => {
        this.getPostData = res.data;
        this.imageArray = res.data[0].image.sort(function (first, second) {
          return first.order - second.order;
        });
      }
    );

    this.rejectForm = this.fb.group({
      rejectReason: ['', [Validators.required]],
    });
  }

  get rejectF() { return this.rejectForm.controls; }

  approve(value){
    var postId = value;

    const object = {isApprove : 1}

    this.authService.approvePropertyPost(object,postId)
     .subscribe((res: any) => {
       if (res.success == true) {
         this.toastr.success('Success ', res.massage);
         this.ngOnInit();
       } else {
         this.toastr.error('Enter valid ', res.massage);
       }
     });
  }

  reject(Reason,id){
    this.postId = id;
    this.modalService.open(Reason, { centered: true });
  }

  onSubmitData(){
    this.submitted = true;
    if (this.rejectForm.invalid) {
      return;
    }
    this.rejectForm.value.isApprove = 2;
    this.authService.rejecPropertyPost(this.rejectForm.value,this.postId)
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

}
