import { useState } from 'react'

const TicketCounter = () => {
  const [value, setValue] = useState(0)
  const handleDecrement = () => {
    if (value > 0) setValue(value - 1)
  }

  const handleIncrement = () => {
    if (value >= 99) setValue(99)
    else setValue(value + 1)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setValue(0)
    else if (e.target.valueAsNumber > 99) setValue(99)
    else setValue(e.target.valueAsNumber)
  }

  return (
    <div className='flex gap-2 '>
      <p className=' text-[30px] cursor-pointer' onClick={() => handleDecrement()}>
        -
      </p>
      <input
        value={value}
        type='number'
        onChange={handleOnChange}
        className='text-black text-center text-2xl place-content-between rounded outline-none place-self-center w-[30px] h-[30px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
      />
      <p className=' text-[30px] cursor-pointer' onClick={() => handleIncrement()}>
        +
      </p>
    </div>
  )
}

export default TicketCounter
