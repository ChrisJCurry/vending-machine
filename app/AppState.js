import Value from "./Models/Value.js"
import Item from "./Models/Item.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"


class AppState extends EventEmitter {
  /** @type {Value[]} */
  values = []
  userCurrency = 1000.00
  items = [new Item({
    name: "Last Bought", imgUrl: 'https://via.placeholder.com/150', cost: 5.99
  }),
  new Item({
    name: "Burger", imgUrl: 'https://via.placeholder.com/150', cost: 3.99
  }),
  new Item({
    name: "Fries", imgUrl: 'https://via.placeholder.com/150', cost: 1.99
  }),
  new Item({
    name: "Drink", imgUrl: 'https://via.placeholder.com/150', cost: 1.99
  }),
  new Item({
    name: "Milkshake", imgUrl: 'https://via.placeholder.com/150', cost: 2.99
  }),
  new Item({
    name: "Chips", imgUrl: 'https://via.placeholder.com/150', cost: 1.99
  })]
  itemsBought = []
  lastItemBought = "tomato"
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
