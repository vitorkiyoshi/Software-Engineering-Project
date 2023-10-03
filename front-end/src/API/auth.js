export const getToken = localStorage.getItem("authTOKEN");

export function storeToken(token)
{
    localStorage.setItem("authTOKEN", token);
    window.location.href = "/painel";
};

export function destroyToken()
{
    localStorage.removeItem("authTOKEN");
    window.location.href = "/";
};