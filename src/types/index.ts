export interface IUser {
  name?: string
  email?: string
  image?: string
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
  id: number
  name: string
  description: string
  image: string
}
