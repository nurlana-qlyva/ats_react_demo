export function setItemWithExpiration(key, value, expirationHours) {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const expirationTime = today.getTime() + (expirationHours * 60 * 60 * 1000);

    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(`${key}_expire`, JSON.stringify(expirationTime));
}

export function getItemWithExpiration(key) {
    const item = localStorage.getItem(key);
    const itemExpire = localStorage.getItem(`${key}_expire`);

    if (!item || !itemExpire) {
        return null;
    }

    const expirationTime = JSON.parse(itemExpire);
    const currentTime = new Date().getTime();

    if (currentTime > expirationTime) {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_expire`);
        return null;
    }

    return JSON.parse(item);
}
