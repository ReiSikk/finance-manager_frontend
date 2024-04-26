import { Category } from './category';
export class Entry {
    id: number;
    amount: number;
    date: Date;
    currency: string;
    name: string;
    comment: string;
    description: string;
    photo: string;
    category: Category; // Category type
  
    constructor(
      id: number,
      amount: number,
      date: Date,
      currency: string,
      name: string,
      comment: string,
      description: string,
      category: Category,
      photo: any
    ) {
      this.id = id;
      this.amount = amount;
      this.date = date;
      this.currency = currency;
      this.name = name;
      this.comment = comment;
      this.description = description;
      this.category = category;
      this.photo = photo;
    }
  }