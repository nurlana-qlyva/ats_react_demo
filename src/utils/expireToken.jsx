export function setItemWithExpiration(key, value, expirationHours) {
    const currentTime = new Date().getTime();
    const expirationTime = currentTime + (expirationHours * 60 * 60 * 1000);

    const item = {
        value: value,
        expiration: expirationTime
    };
    localStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithExpiration(key, setHasToken) {
    const itemString = localStorage.getItem(key);
    if (!itemString) return null;

    const item = JSON.parse(itemString);
    const currentTime = new Date().getTime();

    if (currentTime >= item.expiration) {
        setHasToken(false)
        localStorage.removeItem(key);
        return null;
    }else {
        setHasToken(true)
    }

    return item.value;
}
