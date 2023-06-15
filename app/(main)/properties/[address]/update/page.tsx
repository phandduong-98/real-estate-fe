import React from 'react'

const UpdateProperty = ({ params }: { params: { address: string } }) => {
  console.log(params)
  return (
    <div>{params.address}</div>
  )
}

export default UpdateProperty