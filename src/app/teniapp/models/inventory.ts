export interface Inventory {
  id: number;
  barCode: string;
  productName: string;
  description: string;
  urlImage: string;
  colorId: number;
  sizeId: number;
  productModelId: number;
  stock: number;
  availability: number;
  minimumStock: number;
}
