export default {
    state: {
        products: [
            {id: 1, type: 'пицца', title: 'Перерони', cost: 300, count: 0},
            {id: 2, type: 'пицца', title: 'Маргарита', cost: 500, count: 0},
            {id: 3, type: 'пицца', title: 'Ананасовая', cost: 700, count: 0},
            {id: 4, type: 'пицца', title: 'Гавайская', cost: 800, count: 0},
            {id: 5, type: 'пицца', title: 'Сырная', cost: 400, count: 0},
            {id: 6, type: 'закуска', title: 'сэндвич-ролл куриный', cost: 199, count: 0},
            {id: 7, type: 'закуска', title: 'картофель фри', cost: 149, count: 0},
            {id: 8, type: 'закуска', title: 'куриные крылья BBQ', cost: 199, count: 0},
            {id: 9, type: 'напиток', title: 'Кофе Латте', cost: 115, count: 0},
            {id: 10,type: 'напиток', title: 'Пепси', cost: 119, count: 0}
        ],
        cart: []
    },
    mutations: {
        addItemToCart(state, item) {
            item.count = 1
            state.cart.push(item)
        },
        removeItemToCart(state, id) {
            state.cart = state.cart.filter(item => item.id !== id)
        },
        changeCount(state, arr) {
            const [id, count] = arr
            state.cart = state.cart.map(item => {
                if (item.id === id) item.count = count
                return item
            })
        }
    },
    getters: {
        allProducts(state) {
            return state.products
        },
        productsPizza(state) {
            return state.products.filter(product => product.type === 'пицца')
        },
        productsSnack(state) {
            return state.products.filter(product => product.type === 'закуска')
        },
        productsDrink(state) {
            return state.products.filter(product => product.type === 'напиток')
        },
        cart(state) {
            return state.cart
        },
        cartIds(state) {
            return state.cart.map(item => item.id)
        },
        cartSum(state) {
            return state.cart.reduce((acc, item) => (item.cost * item.count) + acc, 0)
        },
        cartCount(state) {
            return state.cart.reduce((acc, item) => item.count + acc, 0)
        }
    }
}