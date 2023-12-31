// import { Legend } from 'recharts'
export interface IUser {
  name?: string
  email?: string
  image?: string
  token?: string
}

export interface Jwt {
  token?: string
}
export type dataCredential = {
  aud: string
  azp: string
  email: string
  email_verified: boolean
  exp: number
  family_name: string
  given_name: string
  iss: string
  jti: string
  name: string
  nbf: number
  picture: string
  sub: string
}
export type dataSpecies = {
  // [x: string]: unknown
  // [x: string]: ReactNode
  id: number
  name: string
  description: string
  image: string
}
export type food = {
  id: number
  name: string
  type: string
  unit: string
  description: string
  image: string
}
export type credential = {
  clientId: string
  credential: string
  select_by: string
}
export type AccountType = {
  id: string
  email: string
  lname: string
  fname: string
  avt: string
  phone: string
  gender: string
  role: string
}
//enum
export enum AccountGenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum RoleEnum {
  STAFF = 'STAFF',
  TRAINER = 'TRAINER',
  ADMIN = 'ADMIN'
}

export enum AccountStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
//Quang define type
export type User = {
  updatedBy?: User | null
  avt: string
  createdAt: string
  createdBy: User | null
  email: string
  fname: string
  gender: AccountGenderEnum
  id: string
  lname: string
  newsList: [] | null
  phone: string
  role: RoleEnum
  status: AccountStatusEnum
}

export type Cage = {
  animals: Animal[]
  // animalSpecies: Species
  name: string
  capacity: number
  area: Area | null
  cageMeals: [] | null
  code: string
  createdBy: User | null
  description: string
  id: number
  managedBy: User | null
}
export type Species = {
  animalList: Animal[] | null
  cageList: Cage[] | null
  createdBy: User | null
  description: string
  id: number
  image: string
  name: string
}
export enum AnimalGenderEnum {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  HERMAPHRODITE = 'HERMAPHRODITE',
  ASEXUAL = 'ASEXUAL'
}
export enum AnimalStatusEnum {
  HEALTHY = 'HEALTHY',
  SICK = 'SICK',
  IN_DANGER = 'IN_DANGER',
  DEAD = 'DEAD'
}

export enum NewsStatusEnum {
  HIDDEN = 'HIDDEN',
  PUBLISHED = 'PUBLISHED'
}
export type AnimalStatusStatistics = {
  name: string
  value: number
}
export type SaleOverallStatistics = {
  totalMoney: number
  totalTicket: number
  name: string
}
export type OverallStatistics = {
  week: string
  month: string
  date: string
  year: number
  totalMoney: number
  totalTicket: number
}
export type TicketStatistic = {
  ticketName: string
  ticketId: number
  money: number
  quantity: number
}
export type SaleStatistics = {
  overallStatistics: OverallStatistics[] | []
  ticketDistribution: TicketStatistic[] | []
}

export type Animal = {
  cage: Cage
  createdAt: string
  createdBy: User
  dob: string
  gender: AnimalGenderEnum
  id: number
  imageList: string[]
  name: string
  nation: string
  note: string
  species: Species
  status: AnimalStatusEnum
  updatedAt: string
  updatedBy: User | null
  description: string
  weight: number
  height: number
  length: number
  feedingGuide: string
}
export type SpeciesStatistics = {
  speciesId: number
  speciesName: string
  totalAnimal: number
}
export type DateRangeType = {
  from: Date
  to: Date
}
export type ZooStatistics = {
  animalSpeciesStatistics: SpeciesStatistics[]
  totalAnimal: number
  totalAnimalInDanger: number
  totalAnimalSick: number
  totalAnimalSpecies: number
  totalArea: number
  totalCage: number
  totalNewsHidden: number
  totalNewsPublished: number
  totalStaff: number
  totalTrainer: number
}
export type ExistOrder = {
  id: string
  email: string
  phone: string
  name: string
  total: number
  status: string
  visitDate: Date
  createdAt: Date
  details: ExistOrderDetail[]
}

export type ExistOrderDetail = {
  quantity: number
  ticketPrice: number
  ticket: Ticket
}

export type OrderBeforeSaving = {
  email: string
  phone: string
  name: string
  total: number
  visitDate: Date
  details: OrderDetailBeforeSaving[]
}

export type OrderDetailBeforeSaving = {
  quantity: number
  ticketId: number
  ticketName: string
  ticketPrice: number
}

export type Area = {
  id: number
  code: string
  name: string
  location: string
  createdBy: User
  cages: Cage[]
  noCages: number
  noAnimals: number
}
export type NewType = {
  id: number
  content: string
  title: string
  postedAt: string
  author: User
  status: 'HIDDEN' | 'PUBLISHED'
}
export enum TicketStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export type Ticket = {
  id: number
  name: string
  description: string
  price: number
  createdBy: User
  status: TicketStatusEnum
}

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}
export interface OrderDetail {
  id: number
  quantity: number
  ticketPrice: number
  ticket: Ticket
}
export interface Order {
  id: string
  email: string
  phone: string
  name: string
  total: number
  visitDate: string
  status: OrderStatusEnum
  details: OrderDetail[]
  used: boolean
}
export type CageMeal = {
  id: number
  time: string
  food: string
  createdBy: User
}
export enum FeedStatusEnum {
  NOT_FEED = 'NOT_FEED',
  FED = 'FED'
}
export type MealReCord = {
  cageMeal: CageMeal
  id: number
  status: FeedStatusEnum
  createdAt: string
  updatedAt: string
  updatedBy: User
}

export type Food = {
  id: number
  type: FoodTypeEnum
  name: string
  unit: string
  description: string
}
export type FoodsDetail = {
  id: number
  food?: Food
  amount: number
}
export type AnimalMeal = {
  id: number
  time: string
  details: FoodsDetail[]
}
export type AnimalMealRecord = {
  id: number
  meal: AnimalMeal
  status: FeedStatusEnum
  createdAt: string
  updatedAt: string
}
export enum FoodTypeEnum {
  PROTEIN = 'PROTEIN',
  GRAIN_AND_CEREAL = 'GRAIN_AND_CEREAL',
  FRUIT_AND_VEGETABLE = 'FRUIT_AND_VEGETABLE'
}
