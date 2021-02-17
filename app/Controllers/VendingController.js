import { ProxyState } from "../AppState.js";
import Item from "../Models/Item.js";
import { vendingService } from "../Services/VendingService.js";


//Private
function _draw() {
  let items = ProxyState.items;
  let template = ''

  for(let food in items) {
      let newItem = new Item(items[food])
      //console.log("Food: ", items[food])
      template += newItem.Template;
      //console.log(template)
      document.getElementById("app").innerHTML = /*html*/`
        ${template}
    `
    if(Object.keys(items).indexOf(food) == (Object.keys(items).length-1)) {
        for(let foodItem in items) {
            console.log(ProxyState.lastItemBought, items[food].name)
            if(ProxyState.lastItemBought == items[food].name) {
                console.log("whoa!")
                    template += newItem.Template
                    document.getElementById("app").innerHTML = `
                    ${template}
                    `
                    return;
            } else {
                //console.log("boo")
            }
        }
       
    }
    
  }
  let boughtItems = ProxyState.itemsBought
  for(let bI in boughtItems) {
      let bought =  new Item(boughtItems[bI])
      template += bought.Template;
      
      document.getElementById("items-bought").innerHTML = /*html*/`
        ${template}
    `
  }
    
}

//Public
export default class VendingController {
  constructor() {
    ProxyState.on("items", _draw);
    ProxyState.on("userCurrency", _draw);
    _draw();
  }

  showVendingItems() {
      vendingService.showVendingItems()
  }

  buyItem(foodName, foodCost) {
    vendingService.buyItem(foodName, foodCost)
  }

}
