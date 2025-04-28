export function loadFromLocalStorage(key, defaultValue) {
    try {
      const value = localStorage.getItem(key);
    
      if (value) {
        try {
          return JSON.parse(value);
        } catch {
          return value; 
        }
      }
      
      return defaultValue;
    } catch (err) {
      console.error(`Error loading ${key} from localStorage:`, err);
      return defaultValue;
    }
  }
  
  export function saveToLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error saving ${key} to localStorage:`, err);
      throw err;
    }
  }