import axios from "axios"

export const getModDataReq = (getAccData)=>{
    return{
        type:'getModDataReq',
        payload : getAccData
    }
}

export const getModDataSuccess = (getAccData)=>{
    return{
        type:'getModDataSuccess',
        payload : getAccData
    }
}

export const getModDataError = (getAccData)=>{
    return{
        type:'getModDataError',
        payload : getAccData
    }
}

export const fetchModData = (acc,portfolio,auditId)=>{
    return function(dispatch){
        dispatch(getModDataReq())
        axios.get(`http://localhost:8080/api/getOutputData?accountId=${acc}&portfolio=${portfolio.replace('&','%26')}&auditId=${auditId}`)
        .then((res)=>{
            const accDt = res.data.map((acc=>acc))
            dispatch(getModDataSuccess(accDt))
        })
        .catch((err)=>{
            dispatch(getModDataError(err))
        })
    }
}

