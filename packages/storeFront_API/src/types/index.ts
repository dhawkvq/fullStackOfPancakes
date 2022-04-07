export type User = {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
};

export type GenerateSqlReturn = {
  setSqlStatement: string;
  values: string[];
};

export type UpdateUserOptions = Partial<Omit<User, "id">>;

export type Product = {
  id: number;
  name: string;
  price: number;
};

export enum OrderStatus {
  ACTIVE = "active",
  COMPLETE = "complete",
  ALL = "all",
}

export type Status = Exclude<OrderStatus, OrderStatus.ALL>;

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export type OrderItems = Array<Pick<OrderItem, "product_id" | "quantity">>;

export type Order = {
  id: number;
  status: Status;
  user_id: number;
  order_items?: OrderItems;
};
