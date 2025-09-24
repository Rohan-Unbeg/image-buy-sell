// Email validation using regex
export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Name validation: at least 2 characters, only letters and spaces
export function validateName(name) {
    return typeof name === "string" && /^[A-Za-z ]{2,}$/.test(name);
}

// Password validation: at least 6 characters
export function validatePassword(password) {
    return typeof password === "string" && password.length >= 6;
}
