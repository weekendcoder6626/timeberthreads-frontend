export function setToken(token: string) {
    localStorage.setItem("token", token);
}

export function getToken(): string {
    return (localStorage.getItem("token") as string);
}

export function removeToken() {
    localStorage.removeItem("token");
    return !isLoggedIn();
}

export function isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
}