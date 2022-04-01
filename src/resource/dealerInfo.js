import { createAPIEndpoint, ENDPOINTS } from "../api"

export const GetAllDealer = async () => {
    const { data } = await createAPIEndpoint(ENDPOINTS.DEALER).fetchAll()
    return data
}

export const GetAllOrder = async () => {
    const { data } = await createAPIEndpoint(ENDPOINTS.ORDER).fetchAll()
    return data
}

export const GetAllPayment = async () => {
    const { data } = await createAPIEndpoint(ENDPOINTS.PAYMENT).fetchAll()
    return data
}

export const GetOrderDealers = (dealers, orders) => {
    const result = dealers.map((d) => {
        let total = 0
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].dealerId === d.dealerId) {
                total++
            }
        }
        return {
            dealerId: d.dealerId,
            dealerName: d.dealerName,
            totalOrder: total,
        }
    })
    return result
}

// [
//     {
//         dealerId: ...,
//         orders: {

//         }
//     },
//     {
//         dealerId: ...,
//         orders: {

//         }
//     }

// ]

export const GetSpendingForDealer = (dealers, orders, payment) => {
    const result = dealers.map((d) => {
        let orderIds = []
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].dealerId === d.dealerId) {
                orderIds.push(orders[i].orderId)
            }
        }
        return { dealerId: d.dealerId, orderList: orderIds }
    })

    const totalSpending = result.map((r) => {
        let total = 0
        const { dealerId, orderList } = r

        for (let i = 0; i < orderList.length; i++) {
            for (let j = 0; j < payment.length; j++) {
                if (payment[j].orderId === orderList[i]) {
                    total += payment[j].amountPaid
                    break
                }
            }
        }
        return { dealerId, total }
    })
    return totalSpending
}
