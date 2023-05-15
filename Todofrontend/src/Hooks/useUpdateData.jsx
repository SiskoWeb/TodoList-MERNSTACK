
import baseUrl from '../Api/baseURL'



const useGetData = async (url, parmas) => {

    const res = await baseUrl.get(url, parmas);
    return res.data;
}


const useUpdateData = async (url, parmas) => {

    console.log(parmas)
    console.log(url)
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const res = await baseUrl.put(url, parmas, config);
    return res.data;
}

export { useGetData, useUpdateData };