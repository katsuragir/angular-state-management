
import {Action} from '@ngrx/store';


export enum ItemActionTypes {
  list = '[Item Component] list',
  detail = '[Item Component] detail',
  reset = '[reset] reset'
}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class ItemsList implements ActionEx {
  readonly type = ItemActionTypes.list;
  constructor(public payload: any) {
  }
}
export class ItemDetail implements ActionEx {
  readonly type = ItemActionTypes.detail;
  constructor(public payload: any) {
  }
}
export class ItemReset implements Action {
  readonly type = ItemActionTypes.reset;
}