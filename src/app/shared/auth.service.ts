import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = environment.baseUrl;
  s3Endpoint = environment.s3Url;
  accToken = sessionStorage.getItem('access_token');

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials', 'true')
    .set('language', 'es');
  constructor(private http: HttpClient, private router: Router) { }

  // s3upload(user: any): Observable<any> {
  //   const apis3 = `http://13.55.52.81:8080/api/v1/users/upload`;
  //   return this.http.post(apis3, user).pipe(catchError(this.handleError));
  // }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.status === 401 || error.status === 403) {
        // this.injector.get(UserService).purgeAuth();
        // this.injector.get(ToasterService).showError(`Unauthorized`, errorMsg);
        // this.injector.get(Router).navigateByUrl(`/login`);
        this.router.navigate(['/login']);
        console.log('errorthrows');
      }

      console.log('error', msg);
    }
    return throwError(msg);
  }

  s3upload(user: any) {

    return this.http
      .post<any>(`${this.s3Endpoint}/upload`, user);
  }

  signIn(user: any) {

    return this.http
      .post<any>(`${this.endpoint}/login`, user);
  }
  getToken() {
    return sessionStorage.getItem('access_token');
  }


  doLogout(): Observable<any> {
    const param1 = new HttpParams()
    return this.http.get<any>(`${this.endpoint}/logout`,
      { params: param1 });
  }

  getContent() {
    const param1 = new HttpParams()
    return this.http.get<any>(`${this.endpoint}/setting`,
      { params: param1 });
  }

  updateContent(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/setting/${id}`, data);
  }

  changePassword(data: any) {
    return this.http
      .post<any>(`${this.endpoint}/changePassword/`, data);
  }
  readNotifyChange(data, id) {
    return this.http
      .post<any>(`${this.endpoint}/notification/${id}`, data);
  }

  getRoles(): Observable<any> {
    const param1 = new HttpParams()
    return this.http.get<any>(`${this.endpoint}/roleType`,
      { params: param1 });
  }

  addRole(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/roleType`, user);
  }

  editRole(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/roleType/${id}`, data);
  }

  deleteRole(id: any) {
    return this.http
      .delete<any>(`${this.endpoint}/roleType/${id}`,);
  }

  getUserAdmin(): Observable<any> {
    const param1 = new HttpParams()
    return this.http.get<any>(`${this.endpoint}/roles`,
      { params: param1 });
  }

  badgeStatus(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/roles/${id}`, data);
  }

  getAdminUser(): Observable<any> {
    const param1 = new HttpParams()
    var id = JSON.parse(sessionStorage.getItem("adminId"))
    return this.http.get<any>(`${this.endpoint}/roles/${id}`,
      { params: param1 });
  }

  addAdminUser(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/roles`, user);
  }

  getMotorCategory(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/motor/`);
  }

  getMotorSubCategory(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/motorCategory/`);
  }

  getMotorSubSubCategory(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/motorSubCategory/`);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/user/`);
  }

  getProvince(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/province`);
  }

  addProvince(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/province`, user);
  }

  editProvince(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/province/${id}`, data);
  }

  deleteProvince(id: any) {
    return this.http
      .delete<any>(`${this.endpoint}/province/delete/${id}`);
  }

  getCity(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/city`);
  }

  addCity(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/city`, user);
  }

  editCity(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/city/${id}`, data);
  }

  deleteCity(id: any) {
    return this.http
      .delete<any>(`${this.endpoint}/city/delete/${id}`);
  }

  getMakes(type: any): Observable<any> {
    const params = new HttpParams()
      .set('type', type)
    return this.http.get<any>(`${this.endpoint}/brand`,
      { params: params });
  }

  addMakes(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/brand`, user);
  }

  editMakes(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/brand/${id}`, data);
  }

  deleteMakes(id: any) {
    return this.http
      .delete<any>(`${this.endpoint}/brand/delete/${id}`);
  }

  getModel(type: any): Observable<any> {
    const params = new HttpParams()
      .set('type', type)
    return this.http.get<any>(`${this.endpoint}/model`,
      { params: params });
  }

  addModel(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/model`, user);
  }

  editModel(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/model/${id}`, data);
  }

  deleteModel(id: any) {
    return this.http
      .delete<any>(`${this.endpoint}/model/delete/${id}`);
  }

  getTrim(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/trim`);
  }

  addTrim(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/trim`, user);
  }

  editTrim(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/trim/${id}`, data);
  }

  deleteTrim(id: any) {
    return this.http
      .delete<any>(`${this.endpoint}/trim/delete/${id}`);
  }

  getMotorsList(id): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/motorPost`,
      {
        params: new HttpParams()
          .set('active', id)
          .set('offset', 1)
          .set('limit', '')
      });
  }

  getAllMotorsList(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/motorPost`,
      {
        params: new HttpParams()
          .set('offset', 1)
          .set('limit', '')
      });
  }

  getExpiredMotors(id): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/motorPost/expiryPost`,
      {
        params: new HttpParams()
          .set('active', id)
      });
  }

  getExpiredProperty(id): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/rent/expiryPost`,
      {
        params: new HttpParams()
          .set('active', id)
      });
  }

  getPostedPost(id: any): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/motorPost`,
      {
        params: new HttpParams()
          .set('motorPostId', id)
      });
  }

  approveMotorPost(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/motorPost/${id}`, data);
  }

  rejectMotorPost(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/motorPost/${id}`, data);
  }

  getPropertyCategory(type): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/rentCategory/`,
      {
        params: new HttpParams()
          .set('type', type)
      });
  }

  addPropertyCategory(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/rentCategory`, user);
  }

  editPropertyCategory(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/rentCategory/${id}`, data);
  }

  deleteCategory(id: any) {
    return this.http
      .delete<any>(`${this.endpoint}/rentCategory/delete/${id}`);
  }

  getPropertyList(value): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/rent`,
      {
        params: new HttpParams()
          .set('active', value)
          .set('offset', 1)
          .set('limit', '')
      });
  }

  getAllPropertyList(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/rent`,
      {
        params: new HttpParams()
          .set('offset', 1)
          .set('limit', '')
      });
  }

  getPostedPropertyPost(id: any): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/rent`,
      {
        params: new HttpParams()
          .set('rentId', id)
      });
  }

  approvePropertyPost(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/rent/${id}`, data);
  }

  rejecPropertyPost(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/rent/${id}`, data);
  }

  getSubcPackage(categType): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/subscription`,
      {
        params: new HttpParams()
          .set('type', categType)
      });
  }

  addSubcPackage(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/subscription`, user);
  }

  editSubcPackage(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/subscription/${id}`, data);
  }

  deleteSubcPackage(id: any) {
    return this.http
      .delete<any>(`${this.endpoint}/subscription/delete/${id}`);
  }

  addMasterTrim(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/masterTrim`, user);
  }

  editMasterTrim(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/masterTrim/${id}`, data);
  }

  getMasterTrim(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/masterTrim`);
  }

  deleteUser(data: any, id) {
    return this.http.post<any>(`${this.endpoint}/user/update/${id}`, data);
  }

  notifyPush(data) {
    return this.http
      .post<any>(`${this.endpoint}/notification/send`, data);
  }

  editMotorCategory(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/motor/${id}`, data);
  }

  editMotorSubCategory(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/motorCategory/${id}`, data);
  }

  editMotorSubSubCategory(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/motorSubCategory/${id}`, data);
  }

  getContacts(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/contact/`);
  }


  remarkAdd(data: any, id) {
    return this.http
      .post<any>(`${this.endpoint}/user/update/${id}`, data);
  }

  dashboard(): Observable<any> {
    const headers = new HttpHeaders()
    return this.http.get<any>(`${this.endpoint}/dashboard`,
      { headers: headers });
  }

}


