import axios from "axios"

export const ENDPOINTS = {
    INVENTORY: "Inventory/All",
    INVENTORYBYID: "Inventory/GetProductById",
    INVENTORYPOST: "Inventory/PostProduct",
    INVENTORYPUT: "Inventory/UpdateProduct",
    INVENTORYDELETE: "Inventory/DeleteProduct",
    INVENTORYSEARCH: "Inventory/SearchProduct",
    DEALER: "Dealer/All",
    DEALERBYID: "Dealer/GetDealerById",
    DEALERPOST: "Dealer/PostDealer",
    DEALERPUT: "Dealer/UpdateDealer",
    DEALERDELETE: "Dealer/DeleteDealer",
    CATEGORY: "Category/All",
    CATEGORYBYID: "Category/GetCategoryById",
    CATEGORYPOST: "Category/PostCategory",
    CATEGORYPUT: "Category/UpdateCategory",
    CATEGORYDELETE: "Category/DeleteCategory",
    DEALERTYPE: "DealerType/All",
    SALE: "Sale/All",
    SALEPOST: "Sale/PostSale",
    SALEBYDEALERID: "Sale/GetSaleByDealerId",
    ORDER: "Order/All",
    ORDERPOST: "Order/PostOrder",
    ORDERBYID: "Order/GetOrderById",
    ORDERAPPROVEPUT: "Order/OrderApprove",
    ORDERBYDEALERID: "Order/GetOrderByDealerId",
    ORDERDESCENDING: "Order/GetAllDescending",
    ORDERDESCENDINGBYID: "Order/GetAllDescendingById",
    PAYMENT: "Payment/All",
    PAYMENTPOST: "Payment/PostPayment",
    PAYMENTBYID: "Payment/GetPaymentById",
    GETSALEONORDER: "Sale/SaleDetailsFromOrder",
    USER: "User/All",
    USERBYID: "User/GetUserById",
    USERPOST: "User/PostUser",
    USERPUT: "User/UpdateUser",
}

const api = axios.create({
    baseURL: "http://localhost:5058/api",
})

export const setAuthToken = (token = localStorage.getItem("token")) => {
    if (token) api.defaults.headers.common["Authorization"] = "Bearer " + token
    else delete api.defaults.headers.common["Authorization"]
}

export const createAPIEndpoint = (endpoint) => {
    let url = endpoint + "/"
    return {
        fetchAll: async () => await api.get(url),
        fetchById: async (id) => await api.get(url + id),
        create: async (newRecord) => await api.post(url, newRecord),
        update: async (id, updatedRecord) =>
            await api.patch(url + id, updatedRecord),
        delete: async (id) => await api.delete(url + id),
    }
}

export const uploadImage = async (data) =>
    await api.post(`/Inventory/UploadImage/`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })

export const getImage = async (image) =>
    await api.get(`/Inventory/UploadImage/${image}`, {
        responseType: "arraybuffer",
    })
