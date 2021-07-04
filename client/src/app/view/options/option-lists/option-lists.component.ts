import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { OptionService } from '../../../_services/option.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemOption } from 'src/app/interfaces/itemOption';

@Component({
  selector: 'app-option-lists',
  templateUrl: './option-lists.component.html',
  styleUrls: ['./option-lists.component.scss'],
})
export class OptionListsComponent implements OnInit {
  lists$!: Observable<any[]>;
  newList: string = '';
  page: string = ''

  constructor(
    private optionService: OptionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.page =this.route.snapshot.url[0].path
    this.dataInitial()

  }

  dataInitial() {
    this.lists$ = this.optionService.getOptions(this.page);
  }

  addList() {
    if (this.newList.trim().length > 0) {
      const newTag = new ItemOption(this.newList)
      this.optionService.addOption(this.page, newTag).pipe(take(1)).subscribe(() => {
        this.dataInitial()
      })
    }
    this.newList = '';
  }

  onChangeName(option: ItemOption) {
    this.optionService.updateOption(this.page, option).pipe(take(1)).subscribe(() => {
      this.dataInitial()
    })
  }

  onDelete(deleteId: number) {
    this.optionService.deleteOption(this.page, deleteId).pipe(take(1)).subscribe(() => {
      this.dataInitial()
    })

  }
}
