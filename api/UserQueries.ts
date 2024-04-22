import { SuperQueries } from './SuperQueries';

export class UserQueries extends SuperQueries {
    static baseUrl = SuperQueries.baseUrl + 'auth/'

    static async login(username: string, password: string) {
console.log("calling...", this.baseUrl + "login");

        const response = await fetch(this.baseUrl + "login", { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
         });
         const data = await response.json();
        console.log(data);
        
        return data;
    }
    static async signup(username: string, password: string) {
        const response = await fetch(this.baseUrl + "signup", { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
         });
         const data = response.json();

         return data;
         }
         
    static async logout() {
        console.log("Not implemented yet");
    }
}