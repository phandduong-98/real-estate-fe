import React, { useEffect, useState } from "react"

export const Track = ({ images }: { images: string[] }) => {
  const [mouseDown, setMouseDown] = useState(false)
  const [prevPercentage, setPrevPercentage] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const handleMouseDown = (e: MouseEvent) => {
    //@ts-ignore
    setMouseDown(e.clientX)
  }

  const handleMouseUp = () => {
    setMouseDown(false)
    setPrevPercentage(percentage)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!mouseDown) return
    //@ts-ignore
    const mouseDelta = mouseDown - e.clientX
    const maxDelta = window.innerWidth / 2
    const nextPercentage = prevPercentage + (mouseDelta / maxDelta) * -100
    setPercentage(Math.max(Math.min(nextPercentage, 0), -100))
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseDown, prevPercentage, percentage])

  return (
    <div
      id="image-track"
      style={{ transform: `translate(${percentage}%, -50%)` }}
      className="relative flex gap-4 overflow-hidden"
    >
      {/* Map over images */}
      {images?.map((i) => (
        <img
          height={400}
          width={400}
          src={`https://ipfs.io/ipfs/${i}`}
          key={i}
          className="image"
          style={{ objectPosition: `${100 + percentage}% center` }}
        />
      ))}
    </div>
  )
}

export default Track
