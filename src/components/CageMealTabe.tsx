import MealByDay from './MealByDay'
import MealStrategy from './MealStrategy'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const CageMealTabe = () => {
  return (
    <div className='w-full h-full flex flex-col gap-2'>
      <Tabs defaultValue='meals' className='w-full  h-full flex-col flex  '>
        <TabsList className='w-fit'>
          <TabsTrigger
            value='meals'
            className='uppercase  data-[state=active]:bg-primary data-[state=active]:text-white'
          >
            Meals
          </TabsTrigger>
          <TabsTrigger
            value='strategy'
            className=' uppercase data-[state=active]:bg-primary data-[state=active]:text-white'
          >
            Meal Schedule
          </TabsTrigger>
        </TabsList>
        <TabsContent value='meals' className='w-full flex-1 overflow-auto  px-1'>
          <MealByDay />
        </TabsContent>
        <TabsContent value='strategy' className='w-full flex-1 overflow-auto px-1'>
          <MealStrategy />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CageMealTabe
