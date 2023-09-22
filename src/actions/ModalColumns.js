import axios from "axios"

export const getModColDataReq = (getAccData)=>{
    return{
        type:'getModColDataReq',
        payload : getAccData
    }
}

export const getModColDataSuccess = (getAccData)=>{
    return{
        type:'getModColDataSuccess',
        payload : getAccData
    }
}

export const getModColDataError = (getAccData)=>{
    return{
        type:'getModColDataError',
        payload : getAccData
    }
}

export const fetchModColData = (formId)=>{
    return function(dispatch){
        dispatch(getModColDataReq())
        axios.get(`http://localhost:8080/api/columnHeader/${formId}`)
        .then((res)=>{
            const accDt = res.data.map((acc=>acc))
            dispatch(getModColDataSuccess(accDt))
            // console.log(res.data)
        })
        .catch((err)=>{
            dispatch(getModColDataError(err))
        })
    }
}

