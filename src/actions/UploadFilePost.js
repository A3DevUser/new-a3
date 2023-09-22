import { jsx } from "@emotion/react"
import axios from "axios"

export const uploadFileReq = (getAccData)=>{
    return{
        type:'uploadFileReq',
        payload : getAccData
    }
}

export const uploadFileSuccess = (getAccData)=>{
    return{
        type:'uploadFileSuccess',
        payload : getAccData
    }
}

export const uploadFileError = (getAccData)=>{
    return{
        type:'uploadFileError',
        payload : getAccData
    }
}

export const UploadFileData = (fileData)=>{
    return function(dispatch){
        dispatch(uploadFileReq())
        axios.post(`http://localhost:8080/api/upload`,fileData)
        .then((res)=>{
            const accDt = res.data.map((acc=>acc))
            dispatch(uploadFileSuccess(accDt))
            // console.log(JSON.stringify(res.data))
        })
        .catch((err)=>{
            dispatch(uploadFileError(err))
        })
    }
}