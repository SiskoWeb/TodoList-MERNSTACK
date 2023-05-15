
import baseUrl from '../Api/baseURL'



const useGetData = async (url, parmas) => {

    const res = await baseUrl.get(url, parmas);
    return res.data;
}


const useInsertData = async (url, parmas) => {
    console.log(`params : ${parmas}`)

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const res = await baseUrl.post(url, parmas, config);
    console.log(`data redux :${res.data}`)
    return res;

}


const useInsertDataForTask = async (url, parmas) => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const res = await baseUrl.post(url, parmas, config);
    return res.data;
}
export { useGetData, useInsertData, useInsertDataForTask };