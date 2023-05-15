
import baseUrl from '../Api/baseURL'



const useDeleteData = async (url, parmas) => {

    const res = await baseUrl.get(url, parmas);
    return res.data;
}


const useDeleteDataToken = async (url) => {


    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const res = await baseUrl.delete(url, config);
    return res.data;;
}

export { useDeleteData, useDeleteDataToken };