import axios from "axios"

export const getAccDataReq = (getAccData)=>{
    return{
        type:'getAccDataReq',
        payload : getAccData
    }
}

export const getAccDataSuccess = (getAccData)=>{
    return{
        type:'getAccDataSuccess',
        payload : getAccData
    }
}

export const getAccDataError = (getAccData)=>{
    return{
        type:'getAccDataError',
        payload : getAccData
    }
}

export const getAccSPDataReq = (getAccData)=>{
    return{
        type:'getAccSPDataReq',
        payload : getAccData
    }
}

export const getAccSPDataSuccess = (getAccData)=>{
    return{
        type:'getAccSPDataSuccess',
        payload : getAccData
    }
}

export const getAccSPDataError = (getAccData)=>{
    return{
        type:'getAccSPDataError',
        payload : getAccData
    }
}

export const fetchAccData = (solId)=>{
    return function(dispatch){
        dispatch(getAccDataReq())
        axios.get(`http://localhost:8080/api/accbysolid?solId=${solId}`)
        .then((res)=>{
            const accDt = res.data.map((acc=>acc))
            dispatch(getAccDataSuccess(accDt))
            // console.log(accDt)
        })
        .catch((err)=>{
            dispatch(getAccDataError(err))
        })
    }
}

export const fetchAccSPData = (solId,schemeCode,auditType)=>{
    return function(dispatch){
        dispatch(getAccSPDataReq())
        // if(auditType==='RBIA')
        // {
        axios.get(`http://localhost:8080/api/accbysolandportfolio?solId=${solId}&portfolioId=${schemeCode}`)
        .then((res)=>{
            // console.log(res.data)
            const accDt = res.data.map((acc=>acc))
            dispatch(getAccSPDataSuccess(accDt))
        })
        .catch((err)=>{
            dispatch(getAccSPDataError(err))
        })

// }else if(auditType==='Universal Audit'){
//     axios.get(`http://localhost:8080/api/uniAccbysolandportfolio?solId=${solId}&portfolioId=${schemeCode}`)
//     .then((res)=>{
//         // console.log(res.data)
//         const accDt = res.data.map((acc=>acc))
//         dispatch(getAccSPDataSuccess(accDt))
//     })
//     .catch((err)=>{
//         dispatch(getAccSPDataError(err))
//     })
// }else if(auditType==='CAMP Audit'){
//     axios.get(`http://localhost:8080/api/campAccbysolandportfolio?solId=${solId}&portfolioId=${schemeCode}`)
//     .then((res)=>{
//         // console.log(res.data)
//         const accDt = res.data.map((acc=>acc))
//         dispatch(getAccSPDataSuccess(accDt))
//     })
//     .catch((err)=>{
//         dispatch(getAccSPDataError(err))
//     })
// }    

}
}
