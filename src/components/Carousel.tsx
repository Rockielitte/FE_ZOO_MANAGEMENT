import useCheckRole from '@/hooks/useCheckRole'
import { RoleEnum } from '@/types'
import { Carousel } from 'flowbite-react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { CiImageOff } from 'react-icons/ci'

export default function DefaultCarousel({ images }: { images: string[] }) {
  const user = useCheckRole()
  return (
    <div className='w-full relative h-full'>
      {images?.length > 0 ? (
        <Carousel
          className='w-full h-full'
          slideInterval={15000}
          leftControl={
            <AiOutlineLeft className='text-4xl text-primary p-2 active:ring-4 ring-primary text-white font-bold shadow-md bg-green-400 opacity-30 hover:opacity-100 transition-all rounded-full' />
          }
          rightControl={
            <AiOutlineRight className='text-4xl text-primary p-2 active:ring-4 ring-primary text-white font-bold shadow-md bg-green-400 opacity-30 hover:opacity-100 transition-all rounded-full' />
          }
        >
          {images?.map((item, index) => (
            <img key={index} alt='...' src={item} className='  w-full h-full object-contain ' />
          ))}
        </Carousel>
      ) : (
        <div className='w-full h-full rounded-xl bg-secondary shadow-lg border gap-2 flex flex-col justify-center items-center'>
          <CiImageOff className='text-8xl'></CiImageOff>
          <span className='uppercase font-bold'>No image found</span>
          {user.role && (user.role == RoleEnum.ADMIN || user.role == RoleEnum.STAFF) && (
            <p className='text-sm font-light'>
              Move to <span className='underline font-bold'>UPLOAD</span> to share your images
            </p>
          )}
        </div>
      )}
    </div>
  )
}
