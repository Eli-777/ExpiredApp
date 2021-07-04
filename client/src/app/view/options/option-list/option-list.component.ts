import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ItemOption } from 'src/app/interfaces/itemOption';


@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent implements OnInit {
  @Input() list!: ItemOption
  @Output() deleteId = new EventEmitter<number>()
  @Output() changeName = new EventEmitter<ItemOption>()
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
    this.changeName.emit(this.list)
  }

  onEnter() {
    this.list.isEdit = false
    this.changeName.emit(this.list)
  }

  onDelete(id: number) {
    this.deleteId.emit(id)
  }

}
