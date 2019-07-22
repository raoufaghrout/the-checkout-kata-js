function scan(item) {
    if (this.priceList[item] === undefined) throw 'Unknown item!';

    this.basket.push(item);
}

function total() {
    const price = this.basket
        .map(item => this.priceList[item])
        .reduce((a, b) => a + b);

    return this._applyDiscounts(price);
}

function _applyDiscounts(price) {
    this.offers.map(offer => {
        const numberOfItem = this.basket.filter(item => item === offer.name).length;
        const numberOfDiscounts = Math.floor(numberOfItem / offer.quantity);

        price -= offer.amount * numberOfDiscounts;
    });

    return price;
}

function Checkout(priceList, offers) {
    return {
        priceList: priceList,
        offers: offers,
        basket: [],
        scan: scan,
        total: total,
        _applyDiscounts: _applyDiscounts
    }
}

module.exports = { Checkout };
