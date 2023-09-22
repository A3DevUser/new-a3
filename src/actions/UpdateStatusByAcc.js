import axios from "axios"

export const sendStatusDataReq = (getAccData)=>{
    return{
        type:'sendStatusDataReq',
        payload : getAccData
    }
}

export const sendStatusDataSuccess = (getAccData)=>{
    return{
        type:'sendStatusDataSuccess',
        payload : getAccData
    }
}

export const sendStatusDataError = (getAccData)=>{
    return{
        type:'sendStatusDataError',
        payload : getAccData
    }
}

export const sendStatusData = (accounts,userId)=>{
    return function(dispatch){
        dispatch(sendStatusDataReq())
        axios.put(`http://localhost:8080/api/updateStatusByAccounts?accounts=${accounts}&status=In&Progress&userId=${userId}`)
        .then((res)=>{
            const accDt = res.data.map((acc=>acc))
            dispatch(sendStatusDataSuccess(accDt))
        })
        .catch((err)=>{
            dispatch(sendStatusDataError(err))
        })
    }
}

