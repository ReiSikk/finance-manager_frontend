import { CreateEntryDTO } from '../entities/CreateEntryDTO';
import { SuperQueries } from './SuperQueries';
import * as SecureStore from 'expo-secure-store';

export class EntryQueries extends SuperQueries {
    static baseUrl = SuperQueries.baseUrl + 'entry'

    static async fetchAll() {
        const token = await SecureStore.getItemAsync('token')
        const response = await fetch(this.baseUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        
        });
        const data = await response.json();
        console.log(data, "data in fetchAll EntryQueries");
        return data;
    }

    static async createEntry(entry: CreateEntryDTO) {
        const token = await SecureStore.getItemAsync('token')
        
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(entry)
        });
        const data = await response.json();
        return data;
    }
}