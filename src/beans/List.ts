import { Spending } from './Spending'



export class List {
  name: string
  spendings: Array<Spending>
  totalSpendings: number
  id: string

 

  constructor(name: string, spendings: Array<Spending>, totalSpendings: number) {
    this.name = name
    this.spendings = new Array<Spending>()
    spendings.forEach((spending) => {
      this.spendings.push(spending)
    })
    this.totalSpendings = totalSpendings
    this.id = ""
    }
}
