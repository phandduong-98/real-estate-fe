import "react-responsive-carousel/lib/styles/carousel.min.css"
// requires a loader
import { Carousel } from "react-responsive-carousel"

export const MyCarousel = ({
  images,
  name,
}: {
  images: string[]
  name: string
}) => {
  return (
    <Carousel infiniteLoop dynamicHeight={false} thumbWidth={400}>
      {images?.map((cid, id) => (
        <div id={`${id}`}>
          <img
            className="h-80 w-80 object-cover"
            src={`https://cloudflare-ipfs.com/ipfs/${cid}`}
          />
          <p className="legend">{name}</p>
        </div>
      ))}
    </Carousel>
  )
}
