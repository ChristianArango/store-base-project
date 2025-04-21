const contenedor = document.getElementById("productos-container");

  fetch("http://localhost:3000/products")
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
