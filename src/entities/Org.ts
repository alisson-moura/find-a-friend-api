import { Coordinate } from "./value-objects/Coordinate"

export class Org {
  #id: string
  #name: string
  #nameOfOwner: string
  #email: string
  #password: string
  #cep: string
  #address: string
  #coordinate: Coordinate
  #phone: string
}