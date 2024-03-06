import { Category } from './category';

export class CreateEntryDTO {
    amount: number;
    date: Date;
    currency: string;
    name: string;
    comment: string;
    category: Category;

    constructor(name:string, amount: number, date: Date, currency: string, comment: string, category: Category) {
        this.amount = amount;
        this.date = date;
        this.currency = currency;
        this.name = name;
        this.comment = comment;
        this.category = category;

    }
}