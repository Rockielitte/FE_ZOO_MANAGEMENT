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
  animalSpecies: Species
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
}
export type Ticket = {
  id: number
  name: string
  description: string
  price: number
  createdBy: User
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
}
