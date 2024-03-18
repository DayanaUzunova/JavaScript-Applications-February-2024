//функция за заявките
async function _requester(method, url, data){
    const option = {
        method
    }
    if(data){
        option["headers"] = {
            "Content-Type": "application/json"
        };
        option.body = JSON.stringify(data);
    }
    try{
    const response = await fetch(url, option);
    const responseData = await response.json();
    return responseData;
    }
    catch(error){
        alert(error);
    }
}

async function get(url){
    return _requester("GET", url);
}

async function post(url, data){
    return _requester("POST", url, data);
}

export const dataApi = {
    get,
    post
}