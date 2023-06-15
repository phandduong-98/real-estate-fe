import React from 'react'

const UpdateProperty = ({ params }: { params: { address: string } }) => {
  return (
    <div>{params.address}</div>
  )
}

export default UpdateProperty