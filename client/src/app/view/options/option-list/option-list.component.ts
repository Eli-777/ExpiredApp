import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Tag } from 'src/app/interfaces/tag';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent implements OnInit {
  @Input() list: Tag = {tagName: '保養品', isEdit: false}
  @ViewChild('listInput') listInput!: ElementRef

  constructor() { }

  ngOnInit(): void {
  }

  onDoubleClick(event: any) {
    this.list.isEdit = !this.list.isEdit
    setTimeout(() => this.listInput.nativeElement.focus());
  }


  onBlur() {
    this.list.isEdit = false
  }

  onEnter() {
    this.list.isEdit = false
  }

}
