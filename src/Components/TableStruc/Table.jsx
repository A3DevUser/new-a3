import  { useEffect, useState } from 'react'
import { useBlockLayout, useTable } from 'react-table'
import { Styles } from './TableStyles'
import './TableStyle.css'
import { ColumnHeader } from './ColumnHeader'
import TableStruc from './TableStruc'
import { useSticky } from 'react-table-sticky'
import { useSelector } from 'react-redux'


const Table = ({col,dData,accArr,outPutData,parentHeader,setfinalOpData,setfileOpData,subSheet}) => {
  const [data,setdata]=useState([...dData])
  const [chngRow,setchngRow]=useState({})
  const [finalArr, setfinalArr] =useState([])
  const [opData,setopData]= useState([...outPutData])

  const MainPartyDataRed = useSelector((state)=>state.MainPartyDataRed)
  const mySelRowState = useSelector((state)=>state.selectedRowState)
  const AreaSchemeDateSetRed = useSelector((state)=>state.AreaSchemeDateSetRed)

  useEffect(()=>{


    if(MainPartyDataRed){
      setdata((old)=>{
        return old.map((res)=>{
          if(MainPartyDataRed.some(sres => (sres.id == res.id)&&(sres.testRef == res.testRef))){
            return MainPartyDataRed.filter((sres) =>{ return (sres.id == res.id)&&(sres.testRef == res.testRef)})[0]
          }else{
            return res
          }
        })
      })
    console.log('MainPartyDataRed',MainPartyDataRed)

    setfinalArr((old)=>{
      return old.map((res)=>{
        if(MainPartyDataRed.some(sres => (sres.accId==res.accId)&&(sres.testRef==res.testRef))){
          return MainPartyDataRed.filter((sres) => {return (sres.accId==res.accId)&&(sres.testRef==res.testRef)})[0]
        }else{
          return res
        }
      })
    })
    }

},[MainPartyDataRed])


  useEffect(()=>{
    const colKey =  col.filter((cres)=>{return cres.parentCell==='account'}).map((res)=>{return res.accessor})
    const accKey = outPutData.map((res)=>{ return res.accId})
    const selcRowId = mySelRowState.map((res)=>{return res.original.id})



    accArr.forEach((res)=>{
      colKey.map((cres)=>{
        // console.log(cres+'$#'+res.id)
        data.forEach((dres)=>{
if(AreaSchemeDateSetRed.type == 'Sample'){
  dres[cres+'$#'+res.id] = dres[cres];
}else{
  if(selcRowId.includes(dres.id)){
    dres[cres+'$#'+res.id] = dres[cres];
    dres['isDisable'] = false;
  }else{
    dres[cres+'$#'+res.id] = dres[cres];
    dres['isDisable'] = true;
      }
}
        })
      })
    })

    outPutData.map((res, i) => {
      colKey.forEach((cres) => {
        res[cres + '$#' + accKey[i]] = res[cres];
      });
    })

    console.log(outPutData)


const mergedObjects = {};
outPutData.forEach((obj) => {
  const id = obj.testRef;

  if (!mergedObjects[id]) {
    mergedObjects[id] = { ...obj };
  } else {
    Object.assign(mergedObjects[id], obj);
  }
});

const mergedArray = Object.values(mergedObjects)
mergedArray.forEach(res => colKey.forEach(cres => delete res[cres]))


setdata(data.map((res,i)=>{
  const obj1 = data[i];
  const obj2 = mergedArray.find((mres)=>mres.testRef === obj1.testRef)
  console.log('inside data',obj1)
  console.log('inside data',obj2)


  function mergeObjects(obj1, obj2) {
    const result = {};
  
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj1[key] !== undefined) {
        result[key] = obj1[key];
      }
    }
  
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key) && obj2[key] !== undefined) {
        result[key] = obj2[key];
      }
    }
  
    return result;
  }
  

  if(obj2){
    return mergeObjects(data[i], obj2)
    
  }else{
    return data[i]
  }

}))
},[])

const formData = new FormData()
  const updateMyData = (rowIndex, columnId, value, fileData,parentId,isCal) => {
if(fileData){
  formData.append('file',fileData)
  setfileOpData(formData)
}
if(isCal){
  setdata(old =>
    old.map((row, index) => {
      if (index == rowIndex) {
        if(value==0){
          return {
            ...old[rowIndex],
            [Object.keys(data[rowIndex]).filter((fil)=>{return fil.includes(`Calc$#${parentId}`)})[0]]: value,
            [Object.keys(row).filter((fil)=>{return fil.includes(`Ana$#${parentId}`)})[0]]: 0
          }
        }else{
          return {
            ...old[rowIndex],
            [Object.keys(data[rowIndex]).filter((fil)=>{return fil.includes(`Calc$#${parentId}`)})[0]]: value,
            [Object.keys(data[rowIndex]).filter((fil)=>{return fil.includes(`Ana$#${parentId}`)})[0]]: 
            row[
              Object.keys(row).filter((fil)=>{return fil.includes('$#')}).filter((fil)=>{return fil.includes('max')})[0]]
          }
        }
        
      }
      return row
    })
  )
 
}
    setchngRow({rowIndex,parentId})
    setdata(old =>
      old.map((row, index) => {
        if (index == rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
            ['accId'] :parentId,
            ['auditId'] : 'auditId'
          }
        }
        return row
      })
    )
  }

  useEffect(()=>{

      setfinalOpData(finalArr)
  },[finalArr])

  useEffect(()=>{
    if(subSheet.length > 0){
      console.log('line 401',subSheet) 
    }
  },[subSheet])

    const[columns]=useState(ColumnHeader(col,parentHeader,updateMyData,data.map((res)=>{return{id:res.id,dropDown :res.dropDown, logicDd : res.logic, mixVal : res.mixVal}}),accArr,))

    // console.log(ColumnHeader(col,parentHeader,updateMyData,data.map((res)=>{return{id:res.id,dropDown :res.dropDown, logicDd : res.logic, mixVal : res.mixVal}}),accArr,))
      useEffect(()=>{
        if(chngRow.rowIndex){
          let obj ={...data[chngRow.rowIndex]}
          console.log('theObj',obj)
           Object.keys(obj).filter((fil)=>{return fil.includes('$#')}).filter((fil)=>{return !fil.includes(chngRow.parentId)}).forEach((res)=>{ delete obj[res] })
          Object.keys(obj).filter((fil)=>{return fil.includes('$#')}).forEach((res)=>{obj[res.split('$#')[0]]=obj[res]; delete obj[res]})

          obj = {...obj,...accArr.filter((fil)=>{ return fil.id == obj.accId})[0]}

         const newObj =Object.keys(obj).filter((fil)=>{return obj[fil] !== null}).map((res)=>{return {[res] : obj[res]}}).reduce((accumulator, currentObject) => {
            return { ...accumulator, ...currentObject };
          }, {})

          if(finalArr.length==0 || finalArr.filter((fil)=>{ return (fil.id == newObj.id)&&(fil.testRef == newObj.testRef)}).length == 0){
            setfinalArr(finalArr.map((res)=>{return res}).concat(newObj))
          }else{
            setfinalArr(old =>{
              return old.map((res)=>{
                if((res.id == newObj.id)&&(res.testRef == newObj.testRef)){
                  return newObj
                }else{
                  return res
                }
              })}
              )
          }
        }

console.log('data',data)
console.log(columns)
   
        },[data])
      

    const tableInstance = useTable({
        columns,
        data
    },useBlockLayout,useSticky)

const {getTableProps,getTableBodyProps,headerGroups,prepareRow,rows} = tableInstance
  return (
    <div>
      <Styles>
      <TableStruc getTableBodyProps={getTableBodyProps} getTableProps={getTableProps}  headerGroups={headerGroups} prepareRow={prepareRow} rows={rows}/>
      </Styles>
    </div>
  )
}

export default Table
