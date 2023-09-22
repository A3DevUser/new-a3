import {React,useEffect,useState} from 'react'
import axios from 'axios'

function ProgressCard(props) {

  const[userDetails,setUserDetails] = useState();
  const[isEmpty,setIsEmpty] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/UserDataByAuditId?auditId=${props.auditId}`)
      .then(function(response){
        setUserDetails(response.data); 
        if(response.data.length == 0)
        setIsEmpty(true)
      });

  },[])
    return (
      <>
    {/* // <div class="card card-style text-white my-3">
    //   <div class="card-body">
    //     <h5 class="card-title">Progress Report</h5>
    //     <p class="card-text">Failed Accounts: </p>
    //     <p class="card-text">Passed Accounts: </p>
    //     <p class="card-text">Not Attempted: </p>
    //   </div>
    // </div> */}
    {userDetails && userDetails.map((u) => (<p>{u.map((dat) => (<li>{dat}</li>))}</p>))}
    </>
    )
}

export default ProgressCard
