class GMapsAPI {
    constructor() {
        this.baseUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`;
        // ?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=YOUR_API_KEY
    }
    async requestPizzaPlacesAroundCenter({ south, west, north, east }) {
        const searchTerm = 'pizza';
        const searchFields = ['place_id', 'geometry', 'name', 'photos', 'permanently_closed', 'formatted_address'];
        const requestUrl = `${this.baseUrl}?input=${searchTerm}&inputtype=textquery&fields=${searchFields.join(
            ','
        )}.locationbias=rectangle:${south},${west}|${north},${east}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
        return requestUrl;
    }
}

export default GMapsAPI;
