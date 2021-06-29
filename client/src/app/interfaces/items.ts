export interface Item {
  id: number;
  itemName: string;
  manufacturingDate?: Date;
  expiryDay?: Date;
  guaranteePeriod?: number;
  tag: string;
  location?: string;
  photoUrl?: string;
}
