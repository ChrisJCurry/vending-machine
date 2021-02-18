import { ProxyState } from '../AppState.js'
import VendingController from '../Controllers/VendingController.js';
import Item from "../Models/Item.js";

class VendingService {

    showVendingItems() {
        this.showFeatured()
        let vendingItems = ProxyState.items
        let template = ""
        for (let food in vendingItems) {
            let newItem = new Item(vendingItems[food])
            template += newItem.Template;
            document.getElementById("app").innerHTML = /*html*/`
                ${template}
                `
        }
        this.drawFeatured()
    }

    drawFeatured() {
        let featured = ProxyState.items[0]

        let featuredCard = document.getElementsByClassName(featured.id)

        featuredCard.innerHTML += `
                    <div class="card">
                <div class="p-2 bg-dark text-light">
                    <h1>${featured.name}</h1>
                    <img src="${featured.image}" class="d-block pl-3">
                    <button class="btn btn-info text-dark mt-2" onclick="app.vendingController.buyItem('${featured.name}')">Price: $${featured.cost}</button>
                </div>
            </div>
                    `
    }

    showFeatured() {
        let currencyTextElem = document.getElementById("user-currency-text")
        currencyTextElem.innerText = `${ProxyState.userCurrency.toFixed(2)}`
        let template = ""
        let featured = ProxyState.items[0]

        let featuredCard = document.getElementsByClassName(featured.id)
        if (featuredCard) {
            for (let item in ProxyState.items) {
                if (featured.name != ProxyState.lastItemBought) {
                    featured.name = ProxyState.lastItemBought;
                    featured.image = ProxyState.items[item].image;
                    featured.cost = ProxyState.items[item].cost

                    this.drawFeatured()

                    return;
                }
            }
        }

    }

    buyItem(name) {
        let currencyTextElem = document.getElementById("user-currency-text")
        let temp = ProxyState.items[0]
        for (let i = 1; i < ProxyState.items.length; i++) {
            if (ProxyState.items[i].name == name) {
                if (ProxyState.userCurrency > ProxyState.items[i].cost) {
                    ProxyState.userCurrency -= ProxyState.items[i].cost
                    ProxyState.userCurrency = ProxyState.userCurrency
                    currencyTextElem.innerText = `${ProxyState.userCurrency.toFixed(2)}`
                    ProxyState.itemsBought.push(ProxyState.items[i])
                }
                if (ProxyState.lastItemBought != ProxyState.items[i].name) {
                    ProxyState.lastItemBought = ProxyState.items[i].name
                }
            }

        }
        this.showFeatured()
    }

    complete() {
        ProxyState.itemsBought = []
        let appText = document.getElementById("items-bought")
        let template = ""
        template = `
        <div class="row text-center">
            <div class="col-12">
                <h2>Items bought!</h2>
            </div>
        </div>
        `
        appText.innerHTML = template
    }
}

export const vendingService = new VendingService();