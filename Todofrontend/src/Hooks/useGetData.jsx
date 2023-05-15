import baseUrl from '../Api/baseURL'




const useGetData = async (url, parmas) => {

    const res = await baseUrl.get(url, parmas);
    return res.data;
}



// @desc get data woyj token 
const useGetDataToken = async (url) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const res = await baseUrl.get(url, config);
    return res.data;
}

export { useGetData, useGetDataToken };