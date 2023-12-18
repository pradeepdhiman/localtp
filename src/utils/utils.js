import { API_SERVER } from "config/constant";


// API_SERVER

export function saveObject(key = "", value = "") {
    if (window && window.localStorage) {
        window.localStorage.setItem(key, value);
    }
}

export function getObject(name) {
    if (window && window.localStorage) {
        return window.localStorage.getItem(name);
    }
    return false;
}

export function removeObject(key) {
    localStorage.removeItem(key);
}

export function getHeaders() {
    let userToken = getObject("access-token");
    if (userToken && userToken.length)
        return {
            "Authorization": `Bearer ${(userToken) || null}`,
        };
    return {}
}


export function apiPost(endPoint, data, device = '', headers = {}) {
    return apiReq(`${API_SERVER}/`+endPoint, device, data, "post", headers);
}

export function apiDelete(endPoint, data, device = '', headers = {}) {
    return apiReq(`${API_SERVER}/`+endPoint, device, data, "delete", headers);
}

export function apiGet(endPoint, data, device = '', headers = {}) {
    return apiReq(`${API_SERVER}/`+endPoint, device, data, "get", headers);
}

export function apiPut(endPoint, data, device = '', headers = {},) {
    return apiReq(`${API_SERVER}/`+endPoint, device, data, "put", headers);
}
export function apiPatch(endPoint, data, device = '', headers = {}) {
    return apiReq(`${API_SERVER}/`+endPoint, device, data, "patch", headers)
}

export function apiReq(endPoint, data, method, headers) {
    return new Promise((res, rej) => {

        headers = {
            ...getHeaders(),
            ...headers,
        };

        if (method === "get" || method === "delete") {
            data = {
                params: data,
                paramsSerializer: function (params) {
                    return qs.stringify(params);
                },
                headers,
            };
        }

        axios[method](endPoint, data, { headers })
            .then(result => {
                let { data = {} } = result || {};
                if (data && data.status === false) {
                    return rej(data);
                }
                return res(data);
            })
            .catch(err => {
                let { code = 0 } = (err && err.response && err.response.data) || {}
                if (code === 403 || code === 401) {
                    // logOut("access-token")
                    // logOut("login-user-info")
                    // history.push('/login')
                }
                return rej(err);
            });
    });
}