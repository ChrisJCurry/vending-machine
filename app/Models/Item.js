import { generateId } from "../Utils/GenerateId.js"

export default class Item {
    constructor({ name = "Item", image = 'https://via.placeholder.com/150', cost = 2.5 }) {
        this.name = name
        this.image = image
        this.cost = cost
        this.id = generateId();
    }

    get Template() {
        return /*html*/`
        <div class="col-xs-12 ${this.id} col-sm-6 col-md-4 py-2 mt-2">
            <div class="card">
                <div class="p-2 bg-dark text-light">
                    <h1>${this.name}</h1>
                    <img src="${this.image}" class="d-block pl-3">
                    <button class="btn btn-info text-dark mt-2" onclick="app.vendingController.buyItem('${this.name}')">Add to Cart: $${this.cost}</button>
                </div>
            </div>
        </div>
        `
    }

    get BoughtTemplate() {
        return /*html*/`
        <div class="col-xs-12 ${this.id} col-sm-6 col-md-4 py-2 mt-2">
            <div class="card">
                <div class="p-2 bg-dark text-light">
                    <h1>${this.name}</h1>
                    <img src="${this.image}" class="d-block pl-3">
                </div>
            </div>
        </div>
        `
    }
}