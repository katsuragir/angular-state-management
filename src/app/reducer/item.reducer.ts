import {ActionEx, ItemActionTypes} from '../action/items.actions';
export const initialState = [];
export function ListReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case ItemActionTypes.list:
      return [...state, action.payload];
    case ItemActionTypes.detail:
      return [...state, action.payload];
    case ItemActionTypes.reset:
      return state = undefined;
    default:
      return state;
  }
}