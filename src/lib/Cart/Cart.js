import Dinero from "dinero.js";
import { calculateDiscount } from "../discount.utils";

const Money = Dinero;

Money.defaultCurrency = "BRL";
Money.defaultPrecision = 2;

export class Cart {
  items = [];

  add(item) {
    this.items.find((element, index) => {
      if (element.product === item.product) {
        delete this.items[index];
      }
    });
    this.items.push(item);
  }

  remove(product) {
    this.items.find((element, index) => {
      if (element.product === product) {
        delete this.items[index];
      }
    });
  }

  getTotal() {
    return this.items
      .reduce((acc, item) => {
        const amount = Money({ amount: item.quantity * item.product.price });
        let discount = Money({ amount: 0 });
        if (item.condition) {
          discount = calculateDiscount(amount, item.quantity, item.condition);
        }
        return acc.add(amount).subtract(discount);
      }, Money({ amount: 0 }))
      .getAmount();
  }

  summary() {
    const total = this.getTotal();
    const formatted = Money({ amount: total }).toFormat("$0,0.00");
    const items = this.items;

    return { total, formatted, items };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total,
      items,
    };
  }
}
