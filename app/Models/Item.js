export default class Item {
    constructor(data) {
        this.name = data.name
        this.image = data.image
        this.cost = data.cost
    }

    get Template() {
        return /*html*/`
        <div class="col-xs-12 col-sm-6 col-md-4 py-2 mt-2">
            <div class="card">
                <div class="p-2 bg-dark text-light">
                    <h1>${this.name}</h1>
                    <img src="${this.image}" class="d-block pl-3">
                    <button class="btn btn-info text-dark mt-2" onclick="app.vendingController.buyItem('${this.name}','${this.cost}')">Price: $${this.cost}</button>
                </div>
            </div>
        </div>
        `
    }
}