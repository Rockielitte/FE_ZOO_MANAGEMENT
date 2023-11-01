// export const CustomInput = ({}) => ({

//       const [value, setValue] = useState(initialValue)
//       const [date, setDate] = useState<Date>(new Date(initialValue))
//       const onBlur = () => {
//         table.options.meta?.updateData(index, id, value)
//       }
//       // If the initialValue is changed externally, sync it up with our state
//       useEffect(() => {
//         setValue(initialValue)
//       }, [initialValue])

//       return type == 'input' ? (
//         <Input value={value as string} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />
//       ) : type == 'select' ? (
//         <Select
//           onValueChange={(e) => {
//             console.log()
//             table.options.meta?.updateData(index, id, e)
//           }}
//           value={value}
//         >
//           <SelectTrigger className='w-fit'>
//             <SelectValue placeholder='Select' />
//           </SelectTrigger>
//           <SelectContent defaultValue={value}>
//             {options?.map((option) => (
//               <SelectItem className='w-fit' value={option}>
//                 <span className='capitalize'>{option}</span>
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       ) : type == 'date' ? (
//         <Popover
//           onOpenChange={() => {
//             table.options.meta?.updateData(index, id, date)
//           }}
//         >
//           <PopoverTrigger asChild>
//             <Button
//               variant={'outline'}
//               className={cn('w-[190px] justify-start text-left font-normal  ', !date && 'text-muted-foreground')}
//             >
//               <BsFillCalendar2WeekFill className='mr-2 h-4 w-4' />
//               {date ? <span className='text-ellipsis'>{format(date, 'PPP')}</span> : <span>Pick a date</span>}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className='w-auto p-0'>
//             <Calendar mode='single' selected={date} onSelect={setDate as SelectSingleEventHandler} initialFocus />
//           </PopoverContent>
//         </Popover>
//       ) : (
//         <span>{value as string}</span>
//       )
//     }
//   })
