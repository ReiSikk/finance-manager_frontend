import { CreateCategoryDTO } from "../entities/CreateCategoryDTO";

export class CategoriesAPI {
    static baseUrl = 'http://172.17.233.3/categories'

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