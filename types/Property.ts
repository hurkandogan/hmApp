export interface Property {
  id: string;
  name: string;
  sort_number: number;
  available_categories?: Category[];
  sub_property?: SubProperty[];
  totals?: { name: string; total: number }[];
}

export interface Category {
  val: string;
  label: string;
}

export interface SubProperty extends Property {}
