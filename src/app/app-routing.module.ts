import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
  { path:'', loadChildren: () => import('./login/login.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () => import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "admin_users",
        loadChildren: () => import("./admin-users/admin-users.module").then((m) => m.AdminUsersModule),
      },
      {
        path: "admin_roles",
        loadChildren: () => import("./admin-users/roles/roles.module").then((m) => m.RolesModule),
      },
      {
        path: "motor_category",
        loadChildren: () => import("./category/motors/motors.module").then((m) => m.MotorsModule),
      },
       {
        path: "property_category",
        loadChildren: () => import("./category/property/property.module").then((m) => m.PropertyModule),
      },
      {
        path: "users",
        loadChildren: () => import("./users/users.module").then((m) => m.UsersModule),
      },
      {
        path: "content_editor",
        loadChildren: () => import("./content-editor/content-editor.module").then((m) => m.ContentEditorModule),
      },
      {
        path: "provinces",
        loadChildren: () => import("./settings/province-cities/province-cities.module").then((m) => m.ProvinceCitiesModule),
      },
      {
        path: "makes",
        loadChildren: () => import("./settings/makes/makes.module").then((m) => m.MakesModule),
      },
      {
        path: "models",
        loadChildren: () => import("./settings/models/models.module").then((m) => m.ModelsModule),
      },
      {
        path: "trims",
        loadChildren: () => import("./settings/trim/trim.module").then((m) => m.TrimModule),
      },
      {
        path: "master_trims",
        loadChildren: () => import("./settings/master-trim/master-trim.module").then((m) => m.MasterTrimModule),
      },
      {
        path: "view_motors/:id",
        loadChildren: () => import("./motors/motor-post-details/motor-post-details.module").then((m) => m.MotorPostDetailsModule),
      },
      {
        path: "motors",
        loadChildren: () => import("./motors/motors.module").then((m) => m.MotorsModule),
      },
      {
        path: "property_posts",
        loadChildren: () => import("./property-posts/property-posts.module").then((m) => m.PropertyPostsModule),
      },
      {
        path: "motor_subscription",
        loadChildren: () => import("./subscription/motor-subsriiption/motor-subsriiption.module").then((m) => m.MotorSubsriiptionModule),
      },
      {
        path: "property_subscription",
        loadChildren: () => import("./subscription/property-subsriiption/property-subsriiption.module").then((m) => m.PropertySubsriiptionModule),
      },
      {
        path: "view_property_posts/:id",
        loadChildren: () => import("./property-posts/property-post-details/property-post-details.module").then((m) => m.PropertyPostDetailsModule),
      },
      {
        path: "contact_list",
        loadChildren: () => import("./contact-list/contact-list.module").then((m) => m.ContactListModule),
      },
      {
        path: "terms",
        loadChildren: () => import("./content-editor/content-editor.module").then((m) => m.ContentEditorModule),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
