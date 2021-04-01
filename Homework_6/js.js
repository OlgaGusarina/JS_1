'use strict';
const catalog= {
    catalogBlock: null,
    cart: {},
    items:[
        {
            product_id: 123,
            name: ['СИГАРЫ'],
            price: 2000
        },

        {
            product_id: 124,
            name: ['СИГАРИЛЛЫ'],
            price: 1800
        },
        {
            product_id: 125,
            name: ['ЗАЖИГАЛКА'],
            price: 5900
        },
        {
            product_id: 126,
            name: ['ГИЛЬОТИНА'],
            price: 1520
        }
    ],

    init(catalogBlockClass, cart) { // инициализация корзины
        this.catalogBlock = document.querySelector(`.${catalogBlockClass}`);
        this.cart = cart;
        this.renderCatalogBlock();// проверяем каталог по наполнению
        this.addEventHandlers(); // создаем событие при клике на позицию товар добавляется в корзину
    },
    renderCatalogBlock() {
        if (this.getCatalogLength() > 0) {
            this.renderCatalogList(); // если длина каталога больше 0, то рендерим его
        } else {
            this.renderEmptyCatalog();// если длина каталога меньше 0, выдаём пустой
        }
    },
    addEventHandlers() { // добавляем обработчик событий (клика по товару)
        this.catalogBlock.addEventListener('click', event => this.addToBasket(event));
    },
    addToBasket(event) { // метод добавления в корзину
        if (!event.target.classList.contains('product__add-to-cart')) return;
        const product_id = +event.target.dataset.product_id;
        const productToAdd = this.items.find((product) => product.product_id === product_id);
        this.cart.addToBasket(productToAdd);
    },
    getCatalogLength() { //определяем длину каталога то бишь количество товаров
        return this.items.length;
    },
    renderCatalogList() { // список товаров каталога
        this.catalogBlock.innerHTML = '';
        this.items.forEach(item => {
            this.catalogBlock.insertAdjacentHTML('beforeend', this.renderCatalogItem(item));
        });
    },
    renderCatalogItem(item) { // рендер отдельного товара каталога
        return `<div class="product">
                <h3>${item.name}</h3>
                <p>Стоимость: ${item.price} руб.</p>
                <button class="product__add-to-cart" data-product_id="${item.product_id}">Купить</button>
            </div>`;
    },
    renderEmptyCatalog() { // пустой каталог
        this.catalogBlock.innerHTML = '';
        this.catalogBlock.insertAdjacentHTML('beforeend', `В каталоге нет товаров`);
    },
};

// КОРЗИНА

const cart = {
    cartBlock: null, //блок корзины
    clrCartButton: null, //кнопка обнуления
    items:[
        {
            product_id: 123,
            name: ['СИГАРЫ'],
            price: 2000,
            quantity: 1
        },
    ],

    init(cartBlockClass, clrCartButton) {
        this.cartBlock = document.querySelector(`.${cartBlockClass}`);
        this.clrCartButton = document.querySelector(`.${clrCartButton}`);
        this.addEventHandlers();
        this.render();
    },

    addEventHandlers() {
        this.clrCartButton.addEventListener('click', this.clearCart.bind(this));
    },
    render() {
        if (this.getCartLength() > 0) {
            this.renderCartList();
        } else {
            this.renderEmptyCart();
        }
    },

    addToBasket(product) {
        if (product) {
            const findInBasket = this.items.find(({product_id}) => product.product_id === product_id);
            if (findInBasket) {
                findInBasket.quantity++;
            } else {
                this.items.push({...product, quantity: 1});
            }
            this.render();
        } else {
            alert('Ошибка добавления!');
        }
    },

    getCartLength() { //определяем длину каталога то бишь количество товаров
        return this.items.length;
    },

    renderEmptyCart() {
        this.cartBlock.innerHTML = '';
        this.cartBlock.insertAdjacentHTML('beforeend', 'Корзина пуста');
    },

    renderCartList() {
        this.cartBlock.innerHTML = '';
        this.items.forEach(item => {
            this.cartBlock.insertAdjacentHTML('beforeend', this.renderCartItem(item));
        });
        this.cartBlock.insertAdjacentHTML("beforeend", this.getTotal())
    },
    getTotal(){
        return `<div class="total"> Итого: ${this.countBasketPrice(cart.items)} руб. Количество товаров в корзине: ${this.countQuantity(cart.items)} шт. </div>`
    },
    renderCartItem(item) {
        return `<div class="cart_item">
                <h3>${item.name}</h3>
                <p>${item.price} руб.</p>
                <p>${item.quantity} шт.</p>
            </div>`;
    },


    countBasketPrice() { //ну тут понятно, подсчёт цены
        return this.items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);
    },
    countQuantity() { //подсчёт количества товаров
        return this.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
    },

    clearCart() { //очистка корзины
        this.items = [];
        this.render();
    },
};
catalog.init('catalog', cart);
cart.init('cart', 'clr-cart');
