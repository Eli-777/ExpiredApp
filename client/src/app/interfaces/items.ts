import { ItemOption } from 'src/app/interfaces/itemOption';


export interface Item {
  id: number;
  itemName: string;
  manufacturingDate?: Date;
  expiryDate?: Date;
  guaranteePeriod?: number;
  tag: ItemOption;
  location: ItemOption;
  photoUrl?: string;
}
