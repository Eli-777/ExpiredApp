export class ItemParams {
  fromExpiredDay: number = -1;
  isExpired: boolean = false;

  constructor(fromExpiredDay: number = -1, isExpired: boolean = false){
    this.fromExpiredDay = fromExpiredDay
    this.isExpired = isExpired
  }
}
