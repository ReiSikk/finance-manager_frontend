import { CreateCategoryDTO } from "../entities/CreateCategoryDTO";
import { SuperQueries } from "./SuperQueries";

export class CategoryQueries extends SuperQueries {
    static baseUrl = SuperQueries.baseUrl + 'categories'


    static async fetchAll() {
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    static async createCategory(category: CreateCategoryDTO) {
        console.log("createCategory in categoriesAPI called with:", category);
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            
        }
        return await response.json();
    }
}