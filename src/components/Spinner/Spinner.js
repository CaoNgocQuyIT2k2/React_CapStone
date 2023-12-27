import React from 'react'
import {ClimbingBoxLoader} from "react-spinners"
import {useSelector} from 'react-redux'



export default function Spinner() {
  let isLoading = useSelector((state) => state.spinnerReducer.isLoading)
  console.log(" 😂 ~ Spinner ~ isLoading:", isLoading)
  return isLoading ? (
    <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      position: "fixed",
      zIndex: 1,
      top: 0,
      left: 0,
      background: "black",
      justifyContent: 'center',
      alignItems: 'center',
      
      
    }}
    ><ClimbingBoxLoader size={150} speedMultiplier={3} color="red" /></div>
  ): <></>
}
