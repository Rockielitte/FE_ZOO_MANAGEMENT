import { Carousel } from 'flowbite-react'
import { CiImageOff } from 'react-icons/ci'

export default function DefaultCarousel({ images }: { images: string[] }) {
  return (
    <div className='w-full relative h-full'>
      {images?.length > 0 ? (
        <Carousel className='w-full h-full' slideInterval={15000}>
          {images?.map((item, index) => <img key={index} alt='...' src={item} />)}
        </Carousel>
      ) : (
        <div className='w-full h-full rounded-xl bg-secondary shadow-lg border gap-2 flex flex-col justify-center items-center'>
          <CiImageOff className='text-8xl'></CiImageOff>
          <span className='uppercase font-bold'>No Image</span>
          <p className='text-sm font-light'>
            Move to <span className='underline font-bold'>UPLOAD</span> to share your images
          </p>
        </div>
      )}
    </div>
  )
}
