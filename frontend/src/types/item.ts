export interface Item {
  id: number;
  name: string;
  description?: string;
  price?: number;
}

export interface CreateItemDto {
  name: string;
  description?: string;
  price?: number;
}
