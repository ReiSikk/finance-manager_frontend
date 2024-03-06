import { CreateEntryDTO } from "../entities/CreateEntryDTO";

export class EntriesAPI {
    static baseUrl = 'http://localhost:3000/entry'

    static async fetchAll() {
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    static async createEntry(entry: CreateEntryDTO) {
        console.log("createEntry in entriesAPI called with:", entry);
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
}