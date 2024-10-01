import { pushToDB, removeProduct, getProduct, updateProd } from "./firebase.js"

// Elements
const createBtn = document.getElementById('create')
const updateBtn = document.getElementById('update')
const codeTXT = document.getElementById('code')
const nameTXT = document.getElementById('name')
const qtyTXT = document.getElementById('qty')
const priceTXT = document.getElementById('price')
const descTA = document.getElementById('desc')
const tableBodyTBL = document.getElementById('table-body')

createBtn.addEventListener('click', (event) => {
    event.preventDefault()
    // Creating product object.
    const productObj = {
        code: codeTXT.value,
        name: nameTXT.value,
        qty: qtyTXT.value,
        price: priceTXT.value,
        desc: descTA.value
    }
    pushToDB(productObj) // Sending object to firebase.js to be pushed to the DB.
    // Clear form.
    document.getElementById('product-form').reset()
})

export function renderTable(dataArray) {
    if (dataArray != 'nodata') {
        tableBodyTBL.innerHTML = ""
        // Looping through Object Array
        dataArray.forEach(([key, product]) => {
            // Create new tr.
            const newTR = document.createElement('tr')
            newTR.id = key
            // Create new td and append to tr.
            const newTDcode = document.createElement('td')
            newTDcode.textContent = product.code
            newTR.appendChild(newTDcode)
            // Create new td and append to tr.
            const newTDname = document.createElement('td')
            newTDname.textContent = product.name
            newTR.appendChild(newTDname)
            // Create new td and append to tr.
            const newTDdesc = document.createElement('td')
            newTDdesc.textContent = product.desc
            newTR.appendChild(newTDdesc)
            // Create new td and append to tr.
            const newTDqty = document.createElement('td')
            newTDqty.textContent = product.qty
            newTR.appendChild(newTDqty)
            // Create new td and append to tr.
            const newTDprice = document.createElement('td')
            newTDprice.textContent = product.price
            newTR.appendChild(newTDprice)
            // Create new td and append to tr.
            const newCTRLBtns = document.createElement('td')
            newCTRLBtns.innerHTML = `<button class="edit">EDIT</button><button class="del">DEL</button>`
            newTR.appendChild(newCTRLBtns)
            tableBodyTBL.appendChild(newTR)
        });
        // Select all buttons with the class 'del'
        const buttons = document.querySelectorAll(".del")
            buttons.forEach(button => {
            // Add click event listener to each button
            button.addEventListener("click", function() {
                // Find the closest <tr> element
                const row = this.closest("tr")
                // Get the id of the <tr> element
                const rowId = row.id
                // Send the id of the <tr>
                deleteProduct(rowId)
            })
        })
        // Select all buttons with the class 'update'
        const editButtons = document.querySelectorAll(".edit")
            editButtons.forEach(button => {
            // Add click event listener to each button
            button.addEventListener("click", function() {
                // Find the closest <tr> element
                const row = this.closest("tr")
                // Get the id of the <tr> element
                const rowId = row.id
                // Send the id of the <tr>
                initializeGetProduct(rowId)
            })
        })
    }
    else {
        console.log('No Data')
    }
}

function deleteProduct(key) {
    removeProduct(key)
}

function initializeGetProduct(key) {
    const legIDLegend = document.getElementById('legID')
    legIDLegend.innerText = key
    getProduct(key)
}

updateBtn.addEventListener('click', (event) => {
    event.preventDefault()
    // Create product object.
    const product = {
        // key: document.getElementById('legID').innerText,
        code: document.getElementById('code').value,
        name: document.getElementById('name').value,
        qty: document.getElementById('qty').value,
        price: document.getElementById('price').value,
        desc: document.getElementById('desc').value
    }
    const key = document.getElementById('legID').innerText
    updateProd(key, product)
})
