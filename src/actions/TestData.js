import axios from "axios"

export const getTestDataReq = (getAccData)=>{
    return{
        type:'getTestDataReq',
        payload : getAccData
    }
}

export const getTestDataSuccess = (getAccData)=>{
    return{
        type:'getTestDataSuccess',
        payload : getAccData
    }
}

export const getTestDataError = (getAccData)=>{
    return{
        type:'getTestDataError',
        payload : getAccData
    }
}

export const fetchTestData = (schemeCode,areaName,sns)=>{
    return function(dispatch){
        // alert(schemeCode)
        // alert(freq)
        dispatch(getTestDataReq())
        axios.get(`http://localhost:8080/api/SampleTestByPortfolio?schemeCode=${schemeCode.replace('&','%26')}&areaName=${areaName}&sns=${sns}`)
        .then((res)=>{
            const accDt = res.data.map((acc=>acc))
            dispatch(getTestDataSuccess(accDt))
            // alert(schemeCode)
            // alert(auditId)
            // alert(JSON.stringify(accDt))
        })
        .catch((err)=>{
            dispatch(getTestDataError(err))
        })
    }
}

