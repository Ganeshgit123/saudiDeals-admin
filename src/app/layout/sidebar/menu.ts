import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'mdi mdi-view-dashboard',
    link: '/dashboard'
  },
  {
    label: 'Customers',
    icon: 'mdi mdi-account',
    link: '/users'
  },
  {
    label: 'Categories',
        icon: 'mdi mdi-tag',
        subItems: [
          {
            label: 'Motors',
            link: '/motor_category',
          },
          {
            label: 'Properties',
            link: '/property_category',
          },
        ]
  },
  {
    label: 'Motors Posts',
    icon: 'mdi mdi-motorbike',
    link: '/motors'
  },
  {
    label: 'Property Posts',
    icon: 'mdi mdi-hospital-building',
    link: '/property_posts'
  },
  {
    label: 'Master Settings',
        icon: 'mdi mdi-cog',
        subItems: [
          {
            label: 'Provinces & Cities',
            link: '/provinces',
          },
          {
            label: 'Makes',
            link: '/makes',
          },
          {
            label: 'Models',
            link: '/models',
          },
          {
            label: 'Master Trims',
            link: '/master_trims',
          },
          {
            label: 'Trims',
            link: '/trims',
          }
        ]
  },
  {
    label: 'Subscription',
        icon: 'mdi mdi-package',
        subItems: [
          {
            label: 'Motor Subscription',
            link: '/motor_subscription',
          },
          {
            label: 'Property Subscription',
            link: '/property_subscription',
          },
        ]
  },
  {
    label: 'Contact Lists',
    icon: 'mdi mdi-format-list-bulleted',
    link: '/contact_list'
  },
  {
    label: 'Terms of Use',
    icon: 'mdi mdi-pencil',
    link: '/terms'
  },
  // {
  //   label: 'Admin Users',
  //       icon: 'mdi mdi-account-multiple',
  //       subItems: [
  //         {
  //           label: 'Roles',
  //           link: '/admin_roles',
  //         },
  //         {
  //           label: 'Users',
  //           link: '/admin_users',
  //         },
  //       ]
  // },

];
