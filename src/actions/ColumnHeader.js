import axios from "axios"

export const getColDataReq = (getAccData)=>{
    return{
        type:'getColDataReq',
        payload : getAccData
    }
}

export const getColDataSuccess = (getAccData)=>{
    return{
        type:'getColDataSuccess',
        payload : getAccData
    }
}

export const getColDataError = (getAccData)=>{
    return{
        type:'getColDataError',
        payload : getAccData
    }
}

export const fetchColData = (formId,audType,areaName,sns)=>{
    return function(dispatch){
        dispatch(getColDataReq())
        axios.get(`http://localhost:8080/api/getByFormIdAndAuditTypeAndArea?formId=${formId}&auditType=${audType}&areaName=${areaName}&sns=${sns}`)
        .then((res)=>{
            const accDt = res.data.map((acc=>acc))
            dispatch(getColDataSuccess(accDt))
        })
        .catch((err)=>{
            dispatch(getColDataError(err))
        })
    }
}

export const fetchHomeColData = (formId,audType,areaName,portfolio,sns)=>{
    return function(dispatch){
        dispatch(getColDataReq())
        axios.get(`http://localhost:8080/api/getColumnHeader?formId=${formId}&auditType=${audType}&areaName=${areaName}&portfolio=${portfolio.replace('&','%26')}&sns=${sns}`)
        .then((res)=>{
            const accDt = res.data.map((acc=>acc))
            dispatch(getColDataSuccess(accDt))
            // alert(JSON.stringify(accDt))
        })
        .catch((err)=>{
            dispatch(getColDataError(err))
        })
    }
}

