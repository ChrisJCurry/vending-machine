import {ProxyState} from '../AppState.js'
import Item from "../Models/Item.js";

class VendingService {

    showVendingItems() {
        console.log("got here")
        let vendingItems = ProxyState.items.length;
        for(let i = 0; i < vendingItems.length; i++) {
            
        }
    }

    buyItem(foodName, foodCost) {
        let currencyTextElem = document.getElementById("userCurrency-text")
        for(let foodItem in ProxyState.items) {
            if(foodName == ProxyState.items[foodItem].name) {
                if(ProxyState.userCurrency > foodCost) {
                    ProxyState.userCurrency -= foodCost
                    ProxyState.userCurrency = ProxyState.userCurrency
                    currencyTextElem.innerText = `${ProxyState.userCurrency.toFixed(2)}`
                    ProxyState.itemsBought.push(ProxyState.items[foodItem])
                }
            }
        }
    }
}

export const vendingService = new VendingService();