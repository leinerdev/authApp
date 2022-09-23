export interface AuthResponse {
  ok: boolean
  uid?: string
  name?: string
  token?: string
  msg?: string
}

export interface User {
  name: string
  uid: string
}
