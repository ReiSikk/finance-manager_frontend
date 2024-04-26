import { CreateEntryDTO } from '../entities/CreateEntryDTO';
import { SuperQueries } from './SuperQueries';
import * as SecureStore from 'expo-secure-store';
import { User } from '../entities/user';


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
        
        const token = await SecureStore.getItemAsync('token')
        console.log(token, "token in createEntry EntryQueries");
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
    

    static async deleteEntry(id: number) {
        console.log(id, "id in deleteEntry EntryQueries");
        const token = await SecureStore.getItemAsync('token')
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                 'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        console.log(data, "data in deleteEntry EntryQueries")
        return data;
    }
}