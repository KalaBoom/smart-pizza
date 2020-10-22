export default {
    actions: {
        async getProducts({commit}) {
            const res = await fetch('/products')
            const products = await res.json()
            commit('updateProducts', products)
        } 
    },
    state: {
        products: [            
            {id: 1, type: 'пицца', title: 'Перерони', 
            ingredients: ['Сыр моцарелла', 'Соус карри', 'Баварские колбаски'], cost: 300, count: 0, discount: false},

            {id: 2, type: 'пицца', title: 'Маргарита', 
            ingredients: ['Ветчина', 'Соус Чесночный', 'Сыр моцарелла', 'Огурцы'], cost: 500, count: 0, discount: 20},

            {id: 3, type: 'пицца', title: 'Ананасовая', 
            ingredients: ['Голубой сыр', 'Пепперони', 'Сыр моцарелла', 'Соус Чесночный'], cost: 700, count: 0, discount: false},

            {id: 4, type: 'пицца', title: 'Гавайская', 
            ingredients: ['Соус барбекю', 'Пармезан', 'Сыр моцарелла', 'Халапеньо', 'Баварские колбаски'], cost: 800, count: 0, discount: 5},

            {id: 5, type: 'пицца', title: 'Сырная', 
            ingredients: ['Сладкий перец', 'Сыр моцарелла', 'Лук', 'Оливки', 'Томаты', 'Шампиньоны', 'Томатный соус'], cost: 400, count: 0, discount: false},

            {id: 6, type: 'закуска', title: 'сэндвич-ролл куриный', cost: 199, count: 0, discount: 10},
            {id: 7, type: 'закуска', title: 'картофель фри', cost: 149, count: 0, discount: false},
            {id: 8, type: 'закуска', title: 'куриные крылья BBQ', cost: 199, count: 0, discount: false},
            {id: 9, type: "напиток", title: "Кофе Латте", cost: 115, count: 0, discount: false},
            {id: 10, type: "напиток", title: "Пепси", cost: 119, count: 0, discount: 5}
        ],
        cart: []
    },
    mutations: {
        updateProducts(state, products) {
            state.products = products
        },
        addItemToCart(state, product) {
            const item = Object.assign({}, product)
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
        },
        clearCart(state) {
            state.cart = []
        }
    },
    getters: {
        allProducts(state) {
            return state.products
        },
        cart(state) {
            return state.cart
        },
        cartIds(state) {
            return state.cart.map(item => item.id)
        },
        cartSum(state) {
            return state.cart.reduce((acc, item) => {
                if(item.discount) return item.cost * item.count * (1 - item.discount * 0.01) + acc
                else return (item.cost * item.count) + acc
            }, 0).toFixed(2)
        },
        cartCount(state) {
            return state.cart.reduce((acc, item) => item.count + acc, 0)
        }
    }
}