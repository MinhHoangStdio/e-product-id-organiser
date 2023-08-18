export interface Product {
  name: string;
  price?: number | null;
  description: string;
  images: any[];
  payload?: any;
  category_id: number;
  id: number;
  approval_status: string;
  organizer_id: number;
  category: {
    name: string;
    parent_id: number;
    id: number;
  };
}
