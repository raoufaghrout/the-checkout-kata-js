const {Checkout} = require('./checkout');

const priceList = {
    'Apple': 50,
    'Banana': 30,
    'Carrot': 20,
    'Drink': 15
};

const offers = {
    'Apple': {
        'quantity': 3,
        'amount': 20
    },
    'Banana': {
        'quantity': 2,
        'amount': 15
    }
};

test('should price an apple', () => {
    let checkout = new Checkout(priceList, offers);

    checkout.scan('Apple');

    expect(checkout.total()).toBe(50);
});

test('should price two apples', () => {
    let checkout = new Checkout(priceList, offers);


    checkout.scan('Apple');
    checkout.scan('Apple');

    expect(checkout.total()).toBe(100);
});

test('should price all items', () => {
    let checkout = new Checkout(priceList, offers);

    checkout.scan('Apple');
    checkout.scan('Banana');
    checkout.scan('Carrot');
    checkout.scan('Drink');

    expect(checkout.total()).toBe(115);
});

test('should throw exception and not price an unknown item', () => {
    let checkout = new Checkout(priceList, offers);

    expect(() => checkout.scan('Unknown')).toThrow('Unknown item!');
    expect(checkout.total()).toBe(0);
});

test('should throw exception and not price a different unknown item', () => {
    let checkout = new Checkout(priceList, offers);

    expect(() => checkout.scan('Unknown Item')).toThrow('Unknown item!');
    expect(checkout.total()).toBe(0);
});

test('should price and discount 3 apples once', () => {
    let checkout = new Checkout(priceList, offers);

    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');

    expect(checkout.total()).toBe(130);
});

test('should price and discount 6 apples twice', () => {
    let checkout = new Checkout(priceList, offers);

    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');

    expect(checkout.total()).toBe(260);
});

test('should price and discount 5 apples once', () => {
    let checkout = new Checkout(priceList, offers);

    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');

    expect(checkout.total()).toBe(230);
});

test('should price and discount 2 bananas once', () => {
    let checkout = new Checkout(priceList, offers);

    checkout.scan('Banana');
    checkout.scan('Banana');

    expect(checkout.total()).toBe(45);
});

test('should price and discount 4 bananas twice', () => {
    let checkout = new Checkout(priceList, offers);

    checkout.scan('Banana');
    checkout.scan('Banana');
    checkout.scan('Banana');
    checkout.scan('Banana');

    expect(checkout.total()).toBe(90);
});

test('should price and discount 3 bananas once', () => {
    let checkout = new Checkout(priceList, offers);

    checkout.scan('Banana');
    checkout.scan('Banana');
    checkout.scan('Banana');

    expect(checkout.total()).toBe(75);
});
