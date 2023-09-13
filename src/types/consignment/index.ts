import { Chain } from "../chain";
import { Product } from "../product";

export interface Consignment {
  name: string;
  amount: number;
  description: string;
  payload?: any;
  product_id: number;
  id: number;
  organizer_id: number;
  is_sold_out: boolean;
  product: Product;
}

export interface ConsignmentDetail {
  name: string;
  amount: number;
  description: string;
  payload?: any;
  product_id: number;
  id: number;
  organization_id: number;
  is_sold_out: boolean;
  product?: Product;
  chains?: Chain[];
}

export interface PublicOrganizerDetail {
  name: string;
  id: number;
  owner_id: number;
  member_count: number;
  owner: {
    id: number;
    name: string;
  };
}
