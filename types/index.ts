export interface Product {
  id: string;
  name: string;
  price: string; // O number, según lo manejes (recuerda que Square lo da en cents o string)
  image: string;
  [key: string]: any;
}

export interface CartItem extends Product {
  quantity: number;
}
