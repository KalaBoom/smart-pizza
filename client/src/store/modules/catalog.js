export default {
    actions: {
        async getProducts({commit}) {
            const res = await fetch('/products')
            const products = await res.json()
            commit('updateProducts', products)
        } 
    },
    state: {
        products: [],
        cart: []
    },
    mutations: {
        updateProducts(state, products) {
            state.products = products
        },
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