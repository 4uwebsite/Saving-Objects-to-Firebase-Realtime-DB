// Import Firebase functions.
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import {getDatabase, ref, push, onValue, remove, get, update} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

// Import Other JS functions.
import { renderTable } from "./main.js"

// Configure DB connectivity
const appSettings = {
    databaseURL: 'https://crud-basics-e2bb0-default-rtdb.asia-southeast1.firebasedatabase.app/'
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const productsCTRLInDB = ref(database, 'products')

export function pushToDB(data) {
    push(productsCTRLInDB, data)
}

onValue(productsCTRLInDB, function(snapshot) {
    // Check if snapshot exists.
    if (snapshot.exists()) {
        // const data = Object.values(snapshot.val())
        const data = Object.entries(snapshot.val())
        renderTable(data)
    }
    else {
        renderTable('nodata')
    }
})

export function removeProduct(key) {
    const productsInDBKey = ref(database, `products/${key}`)
    remove(productsInDBKey)
}

export function updateProd(key, obj) {
    const productsInDBKey = ref(database, `products/${key}`)
    // productsInDBKey.update(obj)
    update(productsInDBKey, obj)
        .then(() => {
            // console.log("Item updated successfully!")
            document.getElementById('code').value = ''
            document.getElementById('name').value = ''
            document.getElementById('qty').value = ''
            document.getElementById('price').value = ''
            document.getElementById('desc').value = ''
            document.getElementById('legID').innerText = 'NEW PRODUCT ENTRY'
        })
        .catch((error) => {
            console.error("Error updating item:", error)
        })
}

export function getProduct(key) {
    const productsInDBKey = ref(database, `products/${key}`)
    get(productsInDBKey)
    .then((snapshot) => {
        if (snapshot.exists()) {
            // const product = snapshot.val()
            const product = snapshot.val()
            const code = document.getElementById('code')
            code.value = product.code
            const name = document.getElementById('name')
            name.value = product.name
            const qty = document.getElementById('qty')
            qty.value = product.qty
            const price = document.getElementById('price')
            price.value = product.price
            const desc = document.getElementById('desc')
            desc.value = product.desc
        } else {
            console.log(`No data available`)
        }
    })
    .catch((error) => {
        console.error('Error getting movie:', error)
    });
}