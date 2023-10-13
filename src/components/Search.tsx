import { Input } from './ui/input'
import { AiOutlineSearch } from 'react-icons/ai'
import AvatarFull from './AvatarFull'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  searchQuery: string
}
const Search = () => {
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  return (
    <div className='px-2 lg:px-6 py-2 rounded-md shadow-lg flex items-center border gap-4'>
      <form className='flex-1 flex gap-4 items-center' onSubmit={handleSubmit(onSubmit)}>
        <button type='submit'>
          <AiOutlineSearch className='text-3xl' />
        </button>
        <div className='flex-1'>
          <Input
            placeholder='Search everything here . . .'
            className='tracking-wide'
            {...register('searchQuery', { required: true })}
          />
        </div>
      </form>
      <div className='pl-4 border-l-2'>
        <AvatarFull />
      </div>
    </div>
  )
}

export default Search
