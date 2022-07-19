let title = document.querySelector('#title')
let price = document.querySelector('#price')
let descr = document.querySelector('#descr')
let image = document.querySelector('#image')
let btnAdd = document.querySelector('#btn-add')

console.log(title, price, descr, image, btnAdd)

let productsList = document.querySelector('#products-list')
let search = document.querySelector('#search')
let searchValue = ''

// добавление
btnAdd.addEventListener('click', function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    descr: descr.value,
    image: image.value,
    id: 'product-' + String(Date.now()),
  }

  if (
    !newProduct.title ||
    !newProduct.price ||
    !newProduct.descr ||
    !newProduct.image
  ) {
    alert('Заполните все поля')
    return
  }
  //   console.log(newProduct);

  
  let products = JSON.parse(localStorage.getItem('products')) || []
  products.push(newProduct)

  localStorage.setItem('products', JSON.stringify(products))
  render() //отображение после добавления
  newProduct = {}
  document.querySelector('#title').value = ''
  document.querySelector('#price').value = ''
  document.querySelector('#descr').value = ''
  document.querySelector('#image').value = ''
})

// отображение
function render() {
  let products = JSON.parse(localStorage.getItem('products'))
  if (!products) {
    localStorage.setItem('products', JSON.stringify([]))
  }
  productsList.innerHTML = ''
  //   ? search
  products = products.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  products.forEach((item) => {
    let newElem = document.createElement('div')
    newElem.innerHTML = `<div class="card m-3" style="width: 18rem;">
    <img src=${item.image} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">${item.descr}</p>
      <p class="card-text">$ ${item.price}</p>
      <button class='btn-delete btn btn-danger'id=${item.id}>Delete</button>
    </div>
  </div>`

    productsList.append(newElem)
  })
}
render() // вызываем, чтоб при загрузке страницы, что-то было отображено

// при изменении в инпуте для поиска значение записывается в переменную и вызывается рендер
search.addEventListener('input', function (e) {
  console.log(e.target.value)
  searchValue = e.target.value
  render()
})

// удаление
function deleteProduct(id) {
  console.log(id)
  let products = JSON.parse(localStorage.getItem('products'))
  products = products.filter((item) => item.id !== id)
  //   console.log(products);
  localStorage.setItem('products', JSON.stringify(products))
  render()
}

document.addEventListener('click', function (e) {
  console.log(e.target.className)
  if (e.target.classList.contains('btn-delete')) {
    // запрос для удаления
    let id = e.target.id
    deleteProduct(id)
    render()
  }
})
