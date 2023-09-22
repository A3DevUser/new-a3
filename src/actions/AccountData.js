import axios from "axios"

export const getAccDataIdReq = (getAccData)=>{
    return{
        type:'getAccDataIdReq',
        payload : getAccData
    }
}

export const getAccDataIdSuccess = (getAccData)=>{
    return{
        type:'getAccDataIdSuccess',
        payload : getAccData
    }
}

export const getAccDataIdError = (getAccData)=>{
    return{
        type:'getAccDataIdError',
        payload : getAccData
    }
}

export const fetchAccDataId = (accounts,auditType)=>{
    return function(dispatch){

        dispatch(getAccDataIdReq())
        // if(auditType==='RBIA')
        // {
        axios.get(`http://localhost:8080/api/getSampleAccountsByIds?accountId=${accounts}`)
        .then((res)=>{
            const accDt = res.data.map((acc=>acc))
            dispatch(getAccDataIdSuccess(accDt))
        })
        .catch((err)=>{
            dispatch(getAccDataIdError(err))
        })
    // }else if(auditType==='Universal Audit')
    // {
    //     axios.get(`http://localhost:8080/api/getUniAccountsByIds?accountId=${accounts}`)
    //     .then((res)=>{
    //         const accDt = res.data.map((acc=>acc))
    //         dispatch(getAccDataIdSuccess(accDt))
    //     })
    //     .catch((err)=>{
    //         dispatch(getAccDataIdError(err))
    //     })
    // }else if(auditType==='CAMP Audit')
    // {
    //     axios.get(`http://localhost:8080/api/getCampAccountsByIds?accountId=${accounts}`)
    //     .then((res)=>{
    //         const accDt = res.data.map((acc=>acc))
    //         dispatch(getAccDataIdSuccess(accDt))
    //     })
    //     .catch((err)=>{
    //         dispatch(getAccDataIdError(err))
    //     })
    // }
    }
}

