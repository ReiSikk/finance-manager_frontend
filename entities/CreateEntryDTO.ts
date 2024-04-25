import { PermissionHookOptions } from 'expo-camera';
import { Category } from './category';

export class CreateEntryDTO {
    amount: number;
    date: Date;
    currency: string;
    name: string;
    comment: string;
    photo: string;
    category: Category;

    constructor(amount: number, date: Date, currency: string, name: string, comment: string, photo: string, category: Category) {
        this.amount = amount;
        this.date = date;
        this.currency = currency;
        this.name = name;
        this.comment = comment;
        this.photo = photo;
        this.category = category;

    }
}