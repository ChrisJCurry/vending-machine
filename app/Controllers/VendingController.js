import { ProxyState } from "../AppState.js";
import Item from "../Models/Item.js";
import { vendingService } from "../Services/VendingService.js";


//Private
function _draw() {
  let items = ProxyState.items;
  let template = ''
  let firstIndex = items.find(Boolean)
  let boughtItems = ProxyState.itemsBought
  for (let bI in boughtItems) {
    let bought = new Item(boughtItems[bI])
    template += bought.BoughtTemplate;

    document.getElementById("items-bought").innerHTML = /*html*/`
        ${template}
    `
  }
  vendingService.showVendingItems()
}



//Public
export default class VendingController {
  constructor() {
    ProxyState.on("items", _draw);
    ProxyState.on("userCurrency", _draw);
    ProxyState.on("itemsBought", _draw);
    _draw();
  }

  showVendingItems() {
    vendingService.showVendingItems()
  }

  buyItem(id) {
    vendingService.buyItem(id)
  }

  complete() {
    vendingService.complete()
  }

}

