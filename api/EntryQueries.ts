import { CreateEntryDTO } from '../entities/CreateEntryDTO';
import { SuperQueries } from './SuperQueries';

export class EntryQueries extends SuperQueries {
    static baseUrl = super.baseUrl + 'entry'

    static async fetchAll() {
        const response = await fetch(this.baseUrl);
        const data = await response.json();
        console.log("EntryQueries fetched all entries", data);
        return data;
    }

    static async createEntry(entry: CreateEntryDTO) {
        console.log("saving this entry", entry);
        
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        });
        const data = await response.json();
        return data;
    }
}