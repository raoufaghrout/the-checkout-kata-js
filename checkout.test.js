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
    const checkout = Checkout(priceList, offers);

    checkout.scan('Apple');

    expect(checkout.total()).toBe(50);
});

test('should price two apples', () => {
    const checkout = Checkout(priceList, offers);


    checkout.scan('Apple');
    checkout.scan('Apple');

    expect(checkout.total()).toBe(100);
});

test('should price all items', () => {
    const checkout = Checkout(priceList, offers);

    checkout.scan('Apple');
    checkout.scan('Banana');
    checkout.scan('Carrot');
    checkout.scan('Drink');

    expect(checkout.total()).toBe(115);
});

test('should throw exception and not price an unknown item', () => {
    const checkout = Checkout(priceList, offers);

    expect(() => checkout.scan('Unknown')).toThrow('Unknown item!');
});

test('should throw exception and not price a different unknown item', () => {
    const checkout = Checkout(priceList, offers);

    expect(() => checkout.scan('Unknown Item')).toThrow('Unknown item!');
});

test('should price and discount 3 apples once', () => {
    const checkout = Checkout(priceList, offers);

    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');

    expect(checkout.total()).toBe(130);
});

test('should price and discount 6 apples twice', () => {
    const checkout = Checkout(priceList, offers);

    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');

    expect(checkout.total()).toBe(260);
});

test('should price and discount 5 apples once', () => {
    const checkout = Checkout(priceList, offers);

    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');
    checkout.scan('Apple');

    expect(checkout.total()).toBe(230);
});

test('should price and discount 2 bananas once', () => {
    const checkout = Checkout(priceList, offers);

    checkout.scan('Banana');
    checkout.scan('Banana');

    expect(checkout.total()).toBe(45);
});

test('should price and discount 4 bananas twice', () => {
    const checkout = Checkout(priceList, offers);

    checkout.scan('Banana');
    checkout.scan('Banana');
    checkout.scan('Banana');
    checkout.scan('Banana');

    expect(checkout.total()).toBe(90);
});

test('should price and discount 3 bananas once', () => {
    const checkout = Checkout(priceList, offers);

    checkout.scan('Banana');
    checkout.scan('Banana');
    checkout.scan('Banana');

    expect(checkout.total()).toBe(75);
});
