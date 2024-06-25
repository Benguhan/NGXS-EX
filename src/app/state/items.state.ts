import { State, Action, StateContext, Selector } from '@ngxs/store';

export class AddItem {
  static readonly type = '[Items] Add Item';
  constructor(public payload: string) {}
}

export class AddAllItems {
  static readonly type = '[Items] Add All Items';
  constructor(public payload: string[]) {}
}

export class DeleteItem {
  static readonly type = '[Items] Delete Item';
  constructor(public index: number) {}
}

export class UpdateItem {
  static readonly type = '[Items] Update Item';
  constructor(public payload: { index: number, newItem: string }) {}
}

export interface ItemsStateModel {
  items: string[];
}

@State<ItemsStateModel>({
  name: 'items',
  defaults: {
    items: []
  }
})
export class ItemsState {
  @Selector()
  static getItems(state: ItemsStateModel) {
    return state.items;
  }

  @Action(AddItem)
  add(ctx: StateContext<ItemsStateModel>, action: AddItem) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      items: [...state.items, action.payload]
    });
  }

  @Action(AddAllItems)
  addAll(ctx: StateContext<ItemsStateModel>, action: AddAllItems) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      items: [...state.items, ...action.payload]
    });
  }

  @Action(DeleteItem)
  delete(ctx: StateContext<ItemsStateModel>, action: DeleteItem) {
    const state = ctx.getState();
    const filteredArray = state.items.filter((_, i) => i !== action.index);
    ctx.setState({
      ...state,
      items: filteredArray
    });
  }

  @Action(UpdateItem)
  update(ctx: StateContext<ItemsStateModel>, action: UpdateItem) {
    const state = ctx.getState();
    const updatedArray = state.items.map((item, i) =>
      i === action.payload.index ? action.payload.newItem : item
    );
    ctx.setState({
      ...state,
      items: updatedArray
    });
  }
}
