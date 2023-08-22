export interface Consignment {
  name: string;
  amount: number;
  description: string;
  payload?: any;
  product_id: number;
  id: number;
  organizer_id: number;
  is_sold_out: boolean;
}
