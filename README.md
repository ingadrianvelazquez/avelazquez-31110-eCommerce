# E-Commerce on ReactJS

Para llevar adelante el aprendizaje se realiza una tienda online que ofrece como productos digitales: películas, series y videojuegos bajo la temática Zombies.

## Consideraciones

* No se emplean dependencias extras 
* No se emplea ningún framework CSS
* El build más reciente se encuentra disponible en: [Netlify](https://e-commerce-31110-velazquez.netlify.app/)

## Changelog / Desafíos realizados

`Desafío: Item Collection`

- La integración con Firebase ya se encuentra desarrollada
- Se quitan las promesas con time out empleadas para simular la consulta de información
- Se contempló validar si el producto y/o categoría buscados existen para no presentar errores al usuario
- Como opté por el ***challenge-extra*** se cargan tanto los documentos de {items} como los de {categories} asociados

`Desafío: Cart View`

- Implementé {removeItem}
- Sumé como extra editar cantidades, actualizando subtotales y total del carrito así como la cantidad de los elementos en el Ícono del menú
- Ahora se contempla la cantidad seleccionada de cada uno los productos agregados, antes solo la cantidad de productos distintos
- Adelanté la integración con Firebase creando la colección de {items} y tomando el ***challenge-extra***, tambien creé la colección de {categories}
- El catálogo, la búsqueda por categoria así como el detalle del producto ahora se cargan desde Firebase

`Desafío: CartContext`

- Sumé al Context el detalle del producto y la cantidad seleccionada
- Además de contemplar la función {addItem} si el producto ya esta agregado, al visualizarlo también se informa al usuario esto
- Implementé las funciones {isInCart} y {clear}, dejando solo {removeItem} para la próxima entrega
- Se calcula subtotal por producto y total del carrito

`Desafío: Sincronizar counter`

Como ya tenía el ItemCount dentro del ItemDetail {Producto}, sumé lógica para:
- visualizar *sin stock*
- ocultar el botón al agregar el producto
- mostrar botón para ir al carrito

Apliqué algo de Context para listar los productos en el carrito {/cart} y actualizar la cantidad de productos en el Ícono del menú

`Desafío: Primera Entrega del Proyecto Final`

- Se aplica routing y navegación para el carrito {/cart} y la home, enlace sobre el logo/marca/nombre del sitio
- Categorías y detalle de producto, ya estaban desarrollados

`Desafío: Detalle de Producto`

- Creo el contenedor DetalleProducto {ItemDetailContainer} y ***re-utilizo*** el componente Producto como {ItemDetail} modificando su estilo
- Para acceder al detalle del producto ya aplico routing y navegación para reaccionar ante /item/:id
- El detalle del producto también contempla seleccionar unidades dentro de su stock y mostrar lo escogido
- Se verifica si el producto buscado, existe en el catálogo y además si tiene stock

`Desafío: Catálogo con MAPS y Promises`

- Separo el Catálogo {ItemListContainer} del nuevo componente Listado {ItemList}, donde mostrar los Productos {Item}
- Se simula una llamada asincrónica aplicando promise y un timeout de 2 seg, tanto para listar el catálogo completo, como productos asociados a una categoría puntual
- Para listar elementos de una categoría seleccionada, ya aplico routing y navegación /category/:categoryName
- Al navegar entre categorías el NavBar detecta el elemento activo y filtra los productos asociados
- Se verifica si la categoría tiene o no elementos para mostrar

`Desafío: Contador con botón`

- Creo y agrego el componente {ItemCount} para considerar su stock y sumar unidades al carrito sobre cada producto
- La acción disparada únicamente se acota a mostrar el nombre del producto seleccionado y la cantidad escogida

`Desafío: Crea tu landing`

- Separo el carrito que había adelantado en el menú y lo coloco en un nuevo componente {CartWidget}
- Creo el catálogo {itemListContainer} donde se listarán los productos
- Sumo un array de objetos para operar productos y agrego estos dentro del catálogo como un nuevo componente {Producto / Item} que es iterado con map

`Desafío: Menú e-commerce`

- Sumar la marca, menú con categorías y carrito
- El NavBar se coloca dentro de la etiqueta html, header

`Desafío: Crear la app utilizando el CLI`

- Simplemente ejecutar el comando para crear la app
