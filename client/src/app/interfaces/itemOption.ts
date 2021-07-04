export class ItemOption {
  id!: number;
  name: string = '';
  isEdit: boolean = false;

  constructor(name: string) {
    this.name = name
  }
}
