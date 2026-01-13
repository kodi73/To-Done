const STORAGE_KEY = "ToDoneAppData";

export function saveAppState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadAppState() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
}