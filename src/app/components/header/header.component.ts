import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ItemsState } from '../../state/items.state';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  items$: Observable<string[]> | undefined;
  private subscription: Subscription | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    this.items$ = this.store.select(ItemsState.getItems);
    this.subscription = this.items$.subscribe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showBasket() {
    const modal = document.getElementById('basketModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeBasket() {
    const modal = document.getElementById('basketModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
