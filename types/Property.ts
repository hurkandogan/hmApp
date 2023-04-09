export default interface Property {
  id: string;
  name: string;
  sort_number: number;
  available_categories?: { val: string; label: string }[];
  sub_property?: SubProperty[];
}

export interface SubProperty extends Property {}
