import { Carousel } from 'flowbite-react'

export default function DefaultCarousel({ images }: { images: string[] }) {
  return (
    <div className='w-full relative h-full'>
      <Carousel className='w-full h-full' slideInterval={15000}>
        {images?.map((item, index) => <img key={index} alt='...' src={item} />)}
      </Carousel>
    </div>
  )
}
