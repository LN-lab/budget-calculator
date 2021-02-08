export class Spending {
  description: string;
  amount: number;
  key: string;
  constructor(description: string, amount: string, key?: string) {
    // key est un paramètre optionnel nullable
    this.description = description;
    this.amount = parseInt(amount);
    if (key == null) {
      this.key = "";
    } else {
      this.key = key.toString();
    }
  }
}