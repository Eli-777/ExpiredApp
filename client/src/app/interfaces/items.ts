export interface Item {
  id: number;
  itemName: string;
  manufacturingDate?: Date;
  expiryDate?: Date;
  guaranteePeriod?: number;
  tag: string;
  location?: string;
  photoUrl?: string;
}
