import { take } from 'rxjs/operators';
import { ItemService } from './../../_services/item.service';
import { Item } from './../../interfaces/items';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item!: Item;

  constructor(public itemService: ItemService) { }

  ngOnInit(): void {
  }

  deleteItem( event: any ,id: number) {
    if (!this.itemService.isLoading) {
      this.itemService.isLoading = true
      event.cancelBubble = true
      event.preventDefault()
      this.itemService.deleteItem(id).pipe(take(1)).subscribe()
    }
  }

}
