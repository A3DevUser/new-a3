import axios from "axios"

export const getOutputDataSliceReq = (getAccData)=>{
    return{
        type:'getOutputDataSliceReq',
        payload : getAccData
    }
}

export const getOutputDataSliceSuccess = (getAccData)=>{
    return{
        type:'getOutputDataSliceSuccess',
        payload : getAccData
    }
}

export const getOutputDataSliceError = (getAccData)=>{
    return{
        type:'getOutputDataSliceError',
        payload : getAccData
    }
}

export const fetchOutputDataSlice = (outputId,finalAccountData,tests)=>{
    return function(dispatch){
        let outputDt=[];
        dispatch(getOutputDataSliceReq())
        async function outputDtSlice(){
        await axios.get(`/apihttp://localhost:8080http://localhost:8080/api/getOutputByIds?outputId=${outputId.slice(0,2000)}`)
        .then(function(response){
            outputDt=[...response.data]
        })
        await axios.get(`/apihttp://localhost:8080http://localhost:8080/api/getOutputByIds?outputId=${outputId.slice(2000,(finalAccountData.length * tests.length))}`)
        .then(function(response){
            dispatch(getOutputDataSliceSuccess (...outputDt,...response.data))
            console.log()
        })
        .catch((err)=>{
            dispatch(getOutputDataSliceError(err))
        })
    }
    }
}

