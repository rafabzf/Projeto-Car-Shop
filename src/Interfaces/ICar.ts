interface ICar {
  id?: string,
  model: string,
  year: number,
  color: string,
  buyValue: number,
  doorsQty: number,
  seatsQty: number,
  status?: boolean | false
}

export default ICar;