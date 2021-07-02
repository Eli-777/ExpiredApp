import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/interfaces/tag';

@Component({
  selector: 'app-option-lists',
  templateUrl: './option-lists.component.html',
  styleUrls: ['./option-lists.component.scss'],
})
export class OptionListsComponent implements OnInit {
  lists: Tag[] = [{tagName: '保養品', isEdit: false},{tagName: '水果', isEdit: false}];
  newList: string = ''

  constructor() {}

  ngOnInit(): void {}

  addList() {
    if(this.newList.trim().length > 0) {
      this.lists.push(new Tag(this.newList))
    }
    this.newList = ''
  }
}
