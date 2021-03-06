export interface Product {
  id: number;
  barCode: string;
  productName: string;
  description: string;
  urlImage: string;
  colorId: number;
  sizeId: number;
  productModelId: number;
  purchasePrice: number;
  salePrice: number;
  active: boolean;
}
