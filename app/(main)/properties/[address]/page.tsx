import React from 'react'

const Property = ({params} : { params: { address: string } }) => {
  return (
    <div>{params.address}</div>
  )
}

export default Property