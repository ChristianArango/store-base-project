const productosRuta = "http://localhost:3000/products/"
const formularioProducto = document.getElementById("add-product-form")

const contenedor = document.getElementById("productos-container");

fetch(productosRuta)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((producto) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.name}" />
          <h3>${producto.name}</h3>
          <p>${producto.description}</p>
          <p><strong>Precio:</strong> S/ ${producto.price}</p>
          <button class="btn-agregar">Agregar al carrito</button>
        `;
        contenedor.appendChild(card);
      });
    })
    .catch((error) => {
      contenedor.innerHTML = "<p>Error al cargar productos.</p>";
      console.error("Error:", error);
    });


formularioProducto.addEventListener('submit', (e) => { 
    e.preventDefault();

    const name = e.target.elements['product-name'].value;
    const price = parseFloat(e.target.elements['product-price'].value);
    const description = e.target.elements['product-description'].value;
    const stock = e.target.elements['product-stock'].value;
    const sku = e.target.elements['product-sku'].value;

    const datosEnviar = {
        name: name,
        price: price,
        description: description,
        stock: stock,
        sku: sku
    };

    console.log(datosEnviar);

    fetch(productosRuta, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            datosEnviar
        )
    })
    .then((res) => res.json())
    .then((data) => {
        alert("Producto agregado exitosamente");
        formularioProducto.reset();
        location.reload();
    })
    .catch((error) => {
      contenedor.innerHTML = "<p>Error al agregar el producto.</p>";
      console.error("Error:", error);
    });

})