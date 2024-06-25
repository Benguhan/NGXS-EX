import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { Store } from '@ngxs/store';
import { AddAllItems, AddItem, DeleteItem, UpdateItem } from '../../state/items.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isUpdateFormActive: boolean = false;
  item: string = "";
  updateItem: string = "";
  items: string[] = [];
  index: number = 0;

  constructor(private store: Store) {}

  save() {
    this.store.dispatch(new AddItem(this.item));
    this.items.push(this.item);

    this.index++;
    this.item = "";
    console.log(this.index);
  }

  delete(index: number) {
    let result: boolean = confirm("Are you sure you want to delete ?");

    if (result) {
      this.store.dispatch(new DeleteItem(index));
      this.items.splice(index, 1);
    }

    this.index--;
    console.log(this.index);
  }

  get(element: string, index: number) {
    this.updateItem = element;
    this.index = index;
    this.isUpdateFormActive = true;
  }

  update() {
    this.store.dispatch(new UpdateItem({ index: this.index, newItem: this.updateItem }));
    this.items[this.index] = this.updateItem;

    this.cancel();
  }

  cancel() {
    this.isUpdateFormActive = false;
  }
  
  changeInputClass() {
    if (this.item.length < 1) {
      return "is-invalid";
    }
    return "is-valid";
  }
}
