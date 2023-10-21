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
