import axios from 'axios'
import React from 'react'

const Dashboard = () => {
  var tkid;
  axios.get("http://claptek.centralindia.cloudapp.azure.com:8080/smartenhttp://localhost:8080http://localhost:8080/api/getToken?username=admin&password=admin&objectid=g18123a38432.grf",).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
  return (
    <>
    
    </>
  )
}

export default Dashboard