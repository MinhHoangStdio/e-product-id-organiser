export interface Organizer {
  name: string;
  id: number;
  member: any[];
  owner_id: number;
}

export interface Member {
  email: string;
  name: string;
  id: any;
  is_active: boolean;
}
export interface OrganizerDetail {
  name: "string";
  id: any;
  members: any[];
  owner_id: any;
  list_member: Member[];
}

export interface ValidMember {
  email: string;
  name: string;
  id: number;
  is_active: boolean;
}
