import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'business_center'
  },
  {
    state: 'component',
    name: 'Start-up',
    type: 'sub',
    icon: 'av_timer',
    children: [
        { state: 'request', name: 'Pitch Manager', type: 'link' },
        { state: 'product', name: 'Product', type: 'link'}
    ]
},
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
