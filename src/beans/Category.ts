import { Spending } from './Spending'



export class Category {
  id: string
  name: string
  spendings: Array<Spending>
 

  constructor(name: string, id: string, spendings: Array<Spending>) {
    this.id = id
    this.name = name
    this.spendings = new Array<Spending>()
    spendings.forEach((spending) => {
      this.spendings.push(spending)
    })
    }
}
