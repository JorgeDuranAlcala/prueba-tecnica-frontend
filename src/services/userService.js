 class UserService {
    constructor() {
        this.url = "http://localhost:4000/api/vbeta/users"
    }
    async post(userData) {
        try {
            const response = await fetch(this.url, { headers: {'Content-type': 'application/json'}, body: userData, method: "POST" });
            const data = await response.json();
            return data
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
}

export default new UserService()