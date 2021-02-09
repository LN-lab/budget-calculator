import { Spending } from './Spending'



export class List {
  name: string
  spendings: Array<Spending>
 

  constructor(name: string, spendings: Array<Spending>) {
    this.name = name
    this.spendings = new Array<Spending>()
    spendings.forEach((spending) => {
      this.spendings.push(spending)
    })
    }
}
