import { Spending } from './Spending'



export class Categorie {
  name: string
  id: string
  spendings: Array<Spending>

  constructor(name: string, id: string, spendings: Array<Spending>) {
    this.name = name
    this.id = id
    this.spendings = new Array<Spending>()
    spendings.forEach((spending) => {
      this.spendings.push(spending)
    })
    }
}
