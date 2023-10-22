const DemoPage = () => {
  return (
    <div className='grid xl:grid-cols-2 gap-4 h-screen justify-items-center items-center '>
      <div className='w-[500px] h-[300px] rounded-[30px] bg-[#30AF21]'>
        <p className='text-[30px] text-white flex font-bold justify-center mt-5 text-background'>Ticket Type</p>
        <div className='flex gap-6 justify-center mt-5'>
          <input type='checkbox' value='' className='w-5 h-5 place-self-center' />
          <div className='rounded-lg p-[10px] w-[250px] bg-background flex place-content-between '>
            <img src='/src/assets/logo.webp' alt='' className='bg-black w-[40px] rounded' />
            <div>
              <p className='text-[15px] text-foreground'>Adult Ticket</p>
              <p className='text-[9px] text-foreground'>For people above 12 years old</p>
            </div>
            <p className='font-bold text-foreground'>20$</p>
          </div>
          <div className='flex gap-2 '>
            <p className='text-white text-[30px] cursor-pointer'>-</p>
            <input
              min={0}
              defaultValue={0}
              type='number'
              className='text-black text-center place-content-between rounded outline-none place-self-center w-[30px] h-[30px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            />
            <p className='text-white text-[30px] cursor-pointer'>+</p>
          </div>
        </div>
        <div className='flex gap-6 justify-center mt-5'>
          <input type='checkbox' value='' className='w-5 h-5 place-self-center' />
          <div className='rounded-lg p-[10px] w-[250px] bg-background flex place-content-between '>
            <img src='/src/assets/logo.webp' alt='' className='bg-black w-[40px] rounded' />
            <div>
              <p className='text-[15px] text-foreground'>Adult Ticket</p>
              <p className='text-[9px] text-foreground'>For people above 12 years old</p>
            </div>
            <p className='font-bold text-foreground'>20$</p>
          </div>
          <div className='flex gap-2 '>
            <p className='text-white text-[30px] cursor-pointer'>-</p>
            <input
              defaultValue={1}
              type='number'
              className='text-black text-center place-content-between rounded outline-none place-self-center w-[30px] h-[30px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            />
            <p className='text-white text-[30px] cursor-pointer'>+</p>
          </div>
        </div>
      </div>
      <div
        className='w-[500px] h-[600px] rounded-[30px] px-[50px]'
        style={{ backgroundColor: 'rgba(48, 175, 33, 0.13)' }}
      >
        <p className='text-[30px] text-primary flex font-bold justify-center mt-5'>Order Information</p>
        <div className='mt-10'>
          <label htmlFor='name'>Name:</label>
          <br />
          <input
            className='rounded w-full py-1 outline-none p-2'
            type='text'
            id='name'
            name='name'
            placeholder='Name'
          />
        </div>
        <div className='mt-10'>
          <label htmlFor='name'>Email:</label>
          <br />
          <input
            className='rounded w-full py-1 outline-none p-2'
            type='text'
            id='name'
            name='name'
            placeholder='Email'
          />
        </div>
        <div className='visit-date flex gap-10 mt-10 '>
          <div>
            <label htmlFor='name'>Date to go:</label>
            <br />
            <input className='rounded w-full py-1 outline-none p-2' type='date' id='name' name='name' />
          </div>
          <div>
            <label htmlFor='name'>Time:</label>
            <br />
            <div>
              <select className='rounded w-full py-1 outline-none p-2' id='time' name='time'>
                <option value='10:00 AM - 11:00 AM'>10:00 AM - 11:00 AM</option>
                <option value='11:00 AM - 12:00 PM'>11:00 AM - 12:00 PM</option>
                <option value='12:00 PM - 1:00 PM'>12:00 PM - 1:00 PM</option>
                <option value='1:00 PM - 2:00 PM'>1:00 PM - 2:00 PM</option>
                <option value='2:00 PM - 3:00 PM'>2:00 PM - 3:00 PM</option>
                <option value='3:00 PM - 4:00 PM'>3:00 PM - 4:00 PM</option>
                <option value='4:00 PM - 5:00 PM'>4:00 PM - 5:00 PM</option>
                <option value='5:00 PM - 6:00 PM'>5:00 PM - 6:00 PM</option>
              </select>
            </div>
          </div>
        </div>
        <hr className='border-[#30AF21] mt-10 ' />
        <div className='info flex mt-5 justify-around'>
          <div>
            <p className='text-xl opacity-50'>Quantity:</p>
            <br />
            <p className='text-2xl'>Total Price:</p>
          </div>
          <div>
            <p className='text-xl opacity-50'>5 tickets</p>
            <br />
            <p className='text-2xl'>100$</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoPage
