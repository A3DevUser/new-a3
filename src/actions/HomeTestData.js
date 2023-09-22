import axios from "axios"

export const getNewAccReq = (getAccData)=>{
    return{
        type:'getNewAccReq',
        payload : getAccData
    }
}

export const getNewAccSuccess = (getAccData)=>{
    return{
        type:'getNewAccSuccess',
        payload : getAccData
    }
}

export const getNewAccError = (getAccData)=>{
    return{
        type:'getNewAccError',
        payload : getAccData
    }
}

export const fetchHomeTestData = (schemeCode,areaName,sns)=>{
    return function(dispatch){
        dispatch(getNewAccReq())
        axios.get(`http://localhost:8080/api/SampleTestByPortfolio?schemeCode=${schemeCode.replace('&','%26')}&areaName=${areaName}&sns=${sns}`)
        .then((res)=>{
            const accDt = res.data.map((acc=>acc))
            dispatch(getNewAccSuccess(accDt))
            // alert(JSON.stringify(accDt))
        })
        .catch((err)=>{
            dispatch(getNewAccError(err))
        })
    }
}

