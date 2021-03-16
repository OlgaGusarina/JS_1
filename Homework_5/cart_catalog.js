'use strict';
/*
1. Создать функцию, генерирующую шахматную доску.
    При этом можно использовать любые html-теги по своему желанию.
    Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки.
    Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.*/
"use strict";

const chess = {
    chessBoard : document.querySelector('.chess_board'),
    makeBoard() {
        const rows = [0, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        const cols = [0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 0];

        for (let row = 0; row < rows.length; row++) {
            const tr = document.createElement('tr');
            this.chessBoard.appendChild(tr);

            for (let col = 0; col < cols.length; col++) {
                const td = document.createElement('td');
                tr.appendChild(td);

                if (rows[row] === 0 && cols[col] !== 0) {
                    td.innerHTML = cols[col];
                } else if (cols[col] === 0 && rows[row] !== 0) {
                    td.innerHTML = rows[row].toString();
                }

                if (this.whatColor(row, col)) {
                    td.style.backgroundColor = 'lightgrey';
                }
            }
        }
    },

    whatColor(row, col) {
        if (row === 0 || col === 0 || row === 9 || col === 9) {
            return false;
        }

        return (row % 2 === 1 && col % 2 === 0) || (row % 2 === 0 && col % 2 === 1);
    },
};

chess.makeBoard();

//ВТОРОЙ ВАРИАНТ, я знаю что это зашквар, но это первое что пришло на ум и оно работает!

/*function createBoard() {
    const chessBoard = document.querySelector('.chess_board');
    chessBoard.style.borderCollapse = 'collapse';
    const numbers = [8, 7, 6, 5, 4, 3, 2, 1];
    const letters = ['','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    function makeRows() {
        let rows = document.createElement('tr');
        rows.style.height = '60px';
        return rows;
    }

    function makeCols() {
        let cols = document.createElement('td');
        cols.style.width = '60px';
        cols.style.height = '60px';
        cols.style.textAlign = 'center';
        return cols;
    }

    function findRowNumber(x) {
        let rowNumber = makeCols();
        rowNumber.append(numbers[x]);
        return rowNumber;
    }

    function findColLetter(x) {
        let colLetter = makeCols();
        colLetter.append(letters[x]);
        return colLetter;
    }

    let lettersRow = document.createElement('tr');

    for (let l = 0; l < 9; l++) { // создаём строку с буквами
        lettersRow.appendChild(findColLetter(l));
        chessBoard.appendChild(lettersRow);
    }


    for (let i = 0; i < 8; i++) {
        if (i % 2 == 0) {
            let rows = makeRows();
            let rowNumber = findRowNumber(i);
            rows.appendChild(rowNumber);
            for (let a = 0; a < 8; a++) {
                let cols = makeCols();
                rows.appendChild(cols);
                chessBoard.appendChild(rows);

                if (a % 2 == 0) {
                    cols.style.background = 'black';
                } else {
                    cols.style.background = 'lightgrey';
                }
            }
        } else {
            let rows = makeRows();
            let rowNumber = findRowNumber(i);
            rows.appendChild(rowNumber);
            for (let b = 0; b < 8; b++) {
                let cols = makeCols();

                rows.appendChild(cols);
                chessBoard.appendChild(rows);
                if (b % 2 == 0) {
                    cols.style.background = 'lightgrey';
                } else {
                    cols.style.background = 'black';
                }
            }
        }

    }
}
createBoard();*/

/*
3. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
3.1. Пустая корзина должна выводить строку «Корзина пуста»;
3.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».*/

const cartItem = { //функция, создающая разметку и отображение корзины на странице
    render(item) {
        return `<div class = "item">
            <div> <b> Наименование: </b> ${item.name}</div>
            <div> <b>Стоимость, руб. : </b> ${item.price}</div>
            <div> <b>Количество: </b> ${item.quantity}</div>
            <div> <b>Итого: </b> ${item.quantity * item.price}</div>
        </div>`}
}

const basket = {
    cartList: null, //весь блок товаров корзины
    cartButton: null, //кнопка очистки корзины
    cartItem,//функция, создающая разметку и отображение корзины на странице
    items: [
        {
            id: 123,
            name: ['СИГАРЫ AF CHATEAU FUENTE KING T '],
            price: 2000,
            quantity: 10
        },

        {
            id: 124,
            name: ['СИГАРИЛЛЫ TOSCANO PICCOLO'],
            price: 800,
            quantity: 3
        },
        {
            id: 125,
            name: ['ЗАЖИГАЛКИ ПЬЕЗО'],
            price: 100,
            quantity: 2
        }
    ],
    init() { //находит место для размещения элементов корзины и кнопку, кнопке задаёт функцию очистки корзины при нажатии и запускает render
        this.cartList = document.querySelector('.cart');
        this.cartButton = document.querySelector('.button');
        this.cartButton.addEventListener('click', this.clearCart.bind(this));
        this.render();
    },
    render() { //проверяет содержимое корзины и перебирает содержимое
        if (this.items.length) {
            this.items.forEach(item => {
                this.cartList.insertAdjacentHTML("beforeend", this.cartItem.render(item))
            });
            this.cartList.insertAdjacentHTML("beforeend", `<b> В корзине ${this.countQuantity()} единиц товара стоимостью ${this.countBasketPrice()} рублей</b>`);
        } else {
            this.cartList.textContent = 'Корзина пуста';
        }
    },
    countBasketPrice() { //ну тут понятно, подсчёт цены
        return this.items.reduce((totalPrice, good) => totalPrice + good.price * good.quantity, 0);
    },
    countQuantity() { //подсчёт количества товаров
        return this.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
    },

    clearCart() { //очистка корзины
        this.items = [];
        this.render();
    },
};
basket.init();

/*4.1. Создать массив товаров (сущность Product);
4.2. При загрузке страницы на базе данного массива генерировать вывод из него.
    HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.*/



const catalogItem = { //функция, создающая разметку и отображение каталога на странице
    render(item) {
        return `<div class = "item item_catalog">
            <div> <b> Наименование: </b> ${item.name}</div>
            <div> <b>Стоимость, руб. : </b> ${item.price}</div>
            <button class="button"">ДОБАВИТЬ В КОРЗИНУ</button>
        </div>`}
}

const catalog = {
    catalogList: null, //весь блок товаров каталога
    catalogItem,//функция, создающая разметку и отображение каталога на странице

    catalogProductList: {
        catalogProducts:[
            {
                id: 123,
                name: ['СИГАРЫ AF CHATEAU FUENTE KING T '],
                price: 2000
            },

            {
                id: 124,
                name: ['СИГАРИЛЛЫ TOSCANO PICCOLO'],
                price: 800,
            },
            {
                id: 125,
                name: ['ЗАЖИГАЛКИ ПЬЕЗО'],
                price: 100
            },
            {
                id: 126,
                name: ['ГИЛЬОТИНА COLIBRI FIREBIRD'],
                price: 520
            }
        ]
    },

    catalogInit() { //находит место для размещения элементов каталога и запускает render
        this.catalogList = document.querySelector('#catalog');
        this.catalogRender();
    },
    catalogRender() { //проверяет содержимое каталога и перебирает его
        if (this.catalogProductList.catalogProducts.length) {
            this.catalogProductList.catalogProducts.forEach(item => {
                this.catalogList.insertAdjacentHTML("beforeend", catalogItem.render(item))})
        }
        else {
            this.catalogList.textContent = 'каталог пуст'
        }

    },

};
catalog.catalogInit();

