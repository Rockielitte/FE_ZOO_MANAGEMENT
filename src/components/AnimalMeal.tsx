import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import useCheckRole from '@/hooks/useCheckRole'
import { RoleEnum } from '@/types'
import MealAnimalStrategy from './MealAnimalStrategy'
import AnimalMealByDay from './AnimalMealByDay'

const AnimalMeal = () => {
  const user = useCheckRole()
  return (
    <div className='w-full h-full'>
      <Tabs defaultValue='meals' className='w-full  h-full flex-col flex  '>
        <TabsList className='w-fit'>
          <TabsTrigger
            value='meals'
            className='uppercase  data-[state=active]:bg-primary data-[state=active]:text-white'
          >
            Meals
          </TabsTrigger>
          {user && user?.role != RoleEnum.TRAINER && (
            <TabsTrigger
              value='strategy'
              className=' uppercase data-[state=active]:bg-primary data-[state=active]:text-white'
            >
              Meal Schedule
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value='meals' className='w-full flex-1  px-1 overflow-auto'>
          <AnimalMealByDay></AnimalMealByDay>
        </TabsContent>
        <TabsContent value='strategy' className='w-full flex-1  px-1 overflow-auto'>
          <MealAnimalStrategy />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AnimalMeal
