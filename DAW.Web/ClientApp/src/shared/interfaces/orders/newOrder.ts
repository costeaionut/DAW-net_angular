import { Painting } from "../paintings/painting";

export interface NewOrder {
  userId: string,
  date: Date,
  totalPrice: number,
  orderedPaintings: Painting[]
}
