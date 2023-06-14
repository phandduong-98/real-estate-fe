"use client"
import {
    PROPERTY_MANAGER_ADDRESS,
    TEST_TOKEN_ADDRESS,
  } from "@/constants/contract-artifacts"
  
import { ethers } from "ethers"
import {
  usePropertyManagerWrite, 
  useTestTokenWrite,
  usePropertyManagerExchangeRatio
} from "@/lib/generated"

const page = () => {
    const message = GetTokenExchangeRatio()
    return (<div>
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={message} aria-label="MaticToken" id="maticToken"/>
        </div>
      </form>
      
      
      <br></br>
      <PurchaseTokens></PurchaseTokens>
      <br></br>
      <ApproveTestToken></ApproveTestToken>
    </div>)
  }

  function getTokenform(){

  }

  function ApproveTestToken() {
    const { data, isLoading, isSuccess, write } = useTestTokenWrite({
      address: TEST_TOKEN_ADDRESS,
      functionName: "approve",
      args: [PROPERTY_MANAGER_ADDRESS, ethers.MaxUint256],
    })

    return (
      <div>
        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button" onClick={() => write()}>Approve</button>
        { 
            isLoading? <p>Loading ..</p> : <p></p>
        } 
        {
          isSuccess? <p>Successfully Approved ..</p> : <p></p>
        }     
      </div>
    )
  }

  function PurchaseTokens() {
    const { data, isLoading, isSuccess, write } = usePropertyManagerWrite({
      address: PROPERTY_MANAGER_ADDRESS,
      functionName: "purchaseTokens",
      value: ethers.parseEther("0.1"),
    })
  
    return (
      <div>
        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button" onClick={() => write()}>Purchase</button>
        { 
            isLoading? <p>Checking Wallet</p> : <p></p>
          }
          { 
            isSuccess? <p>Transaction: {JSON.stringify(data)}</p> : <p></p>
          }
        
      </div>
    )
  }

  function GetTokenExchangeRatio() {
    const { data, isLoading, isSuccess} = usePropertyManagerExchangeRatio({
      address: PROPERTY_MANAGER_ADDRESS,
    })
    console.log(data)
    if (data != undefined)
      {
        const message = `1 MATIC TOKEN = ${data} Tokens`
        return message
  }}

export default page