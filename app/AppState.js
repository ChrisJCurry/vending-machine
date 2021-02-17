import Value from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {Value[]} */
  values = []
  userCurrency = 1000.00
  items = {
    burger: {
      name: "burger",
      image: "https://via.placeholder.com/150",
      cost: 4.99
    },
    drink: {
      name: "drink",
      image: "https://via.placeholder.com/150",
      cost: 3.23
    },
    fries: {
      name: "fries",
      image: "https://via.placeholder.com/150",
      cost: 2.05
    },
    chips: {
      name: "chips",
      image: "https://via.placeholder.com/150",
      cost: 1.99
    },
    milkshake: {
      name: "milkshake",
      image: "https://via.placeholder.com/150",
      cost: 1.75
    }
  }

  itemsBought = []
  lastItemBought = "burger"
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
