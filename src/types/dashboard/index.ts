export interface ProductStatistic {
  products_count: {
    total: number;
    approved: number;
    rejected: number;
    banned: number;
    requesting: number;
    pending: number;
    total_view: number;
  };
}

export interface ConsignmentStatistic {
  consignments_count: { total: number; qr_release: number };
}

export interface MemberStatistic {
  members_count: 0;
}
