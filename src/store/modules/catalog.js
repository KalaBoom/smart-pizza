export default {
    state: {
        products: [
            {id: 1, type: 'пицца', title: 'Перерони', cost: 300},
            {id: 2, type: 'пицца', title: 'Маргарита', cost: 500},
            {id: 3, type: 'пицца', title: 'Ананасовая', cost: 700},
            {id: 4, type: 'пицца', title: 'Гавайская', cost: 800},
            {id: 5, type: 'пицца', title: 'Сырная', cost: 400},
            {id: 6, type: 'закуска', title: 'сэндвич-ролл куриный', cost: 199},
            {id: 7, type: 'закуска', title: 'картофель фри', cost: 149},
            {id: 8, type: 'закуска', title: 'куриные крылья BBQ', cost: 199},
            {id: 9, type: 'напитки', title: 'Кофе Латте', cost: 115},
            {id: 10,type: 'напитки', title: 'Pepsi', cost: 119}
        ],
        cart: []
    },
    mutations: {
        addItemToCart(state, item) {
            state.cart.push(item)
        },
        removeItemToCart(state, id) {
            state.cart = state.cart.filter(item => item.id !== id)
        }
    },
    actions: {
    },
    getters: {
        allProducts(state) {
            return state.products
        },
        cart(state) {
            return state.cart
        }
    }
}