export function setItemWithExpiration(key, value, expirationHours) {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

    const expirationTime = today.getTime() + (expirationHours * 60 * 60 * 1000);

    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem("expire", JSON.stringify(expirationTime));
}

export function getItemWithExpiration(key) {
    const token = JSON.parse(localStorage.getItem(key));
    const exp = localStorage.getItem("expire");

    if (!exp) return null;

    const item = JSON.parse(exp);
    const currentTime = new Date().getTime();

    if (currentTime >= item.expiration) {
        localStorage.removeItem(key);
        return null;
    }

    return token;
}
