export default class Storage {
    // Get's data by name from localstorage
    protected GetData(i: string): string {
        return localStorage.getItem(i);
    }
    // Saves the widget data to the browser's local storage
    // @param {string} name - The ID to save the data with
    // @param {object} data - The data to be saved
    protected SaveData = (name: string, data: object) => {
        localStorage.setItem(name, JSON.stringify(data));
    }
}