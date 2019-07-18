class Checkout {

    constructor(priceList, offers) {
        this.priceList = priceList;
        this.offers = offers;
        this.basket = [];
    }

    scan(item) {
        if (this.priceList[item] === undefined) throw 'Unknown item!';

        this.basket.push(item);
    }

    total() {
        let price = 0;
        this.basket.forEach(item => price += this.priceList[item]);

        return this.applyDiscounts(price);
    }

    applyDiscounts(price) {
        for (const [key, value] of Object.entries(this.offers)) {
            let numberOfItem = this.basket.filter(item => item === key).length;
            let numberOfDiscounts = Math.floor(numberOfItem / value.quantity);

            price -= value.amount * numberOfDiscounts;
        }

        return price;
    }
}

module.exports = { Checkout };
