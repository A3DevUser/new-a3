import axios from "axios";

export const downloadFileReq = (val) =>{
    return{
        type :'downloadFileReq',
        payload : val
    }
}

export const downloadFileRes = (val) =>{
    return{
        type :'downloadFileRes',
        payload : val
    }
}

export const downloadFileErr = (val) =>{
    return{
        type :'downloadFileErr',
        payload : val
    }
}

export const downloadFile = (val)=>{
    return function(dispatch){
        dispatch(downloadFileReq())
        axios({
            url: `http://localhost:8080/api/downloadFile/${val}`,
            method: 'GET',
            responseType: 'blob', // important
            // origins: `http://localhost:3000`
          })
          .then((response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
            //   console.log(url)
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `${val}`); //or any other extension
              document.body.appendChild(link);
              link.click();
              dispatch(downloadFileRes(response))
            }).catch((err)=>{
                dispatch(downloadFileErr(err))
            })

    }
        }