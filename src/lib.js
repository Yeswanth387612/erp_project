export const BASEURL = "http://localhost:5000/";

// Save Data in Cookie
export function setSession(sesName, sesValue, expInDays) {
    let D = new Date();
    D.setTime(D.getTime() + expInDays * 86400000);
    document.cookie = `${sesName}=${sesValue};expires=${D.toUTCString()};path=/;secure`;
}

// Read Data from Cookie
export function getSession(sesName) {
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieData = decodedCookie.split(";");
    for (let x in cookieData) {
        if (cookieData[x].includes(sesName)) {
            return cookieData[x].substring(cookieData[x].indexOf(sesName) + sesName.length + 1);
        }
    }
    return "";
}

export function callApi(reqMethod, url, data, responseHandler) {
    let options;

    if (reqMethod === "GET" || reqMethod === "DELETE") {
        options = {
            method: reqMethod,
            headers: { 'Content-Type': 'application/json' }
        };
    } else {
        options = {
            method: reqMethod,
            headers: { 'Content-Type': 'application/json' },
            body: data
        };
    }

    fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status + ': ' + response.statusText);
            }
            return response.text();
        })
        .then((res) => responseHandler(res))
        .catch((err) => {
            console.error("API Error:", err);
            alert(err);
        });
}
