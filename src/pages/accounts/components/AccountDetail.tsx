import { FC } from 'react'

interface AccountDetailProps {}

const AccountDetail: FC<AccountDetailProps> = () => {
  return (
    <section className='w-full  h-full flex flex-col shadow-2xl rounded-[0.5rem] border bg-background   '>
      {/* title of border here  */}
      <div className=''>Account Detail</div>

      {/* border rounded here */}
    </section>
  )
}

export default AccountDetail
