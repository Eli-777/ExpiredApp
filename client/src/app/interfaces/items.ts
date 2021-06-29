export interface Item {
  id: number;
  itemName: string;
  manufacturingDate?: Date | string;
  expiryDay?: Date | string;
  guaranteePeriod?: number;
  tag: string;
  location?: string;
  photoUrl?: string;
}
