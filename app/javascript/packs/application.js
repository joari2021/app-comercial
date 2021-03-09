// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start();
require("turbolinks").start();
require("@rails/activestorage").start();
require("channels");
require("jquery");

//CSS
import "css/styles";
import "css/sb-admin-2";

//JAVASCRIPT
import "bootstrap";
import "@fortawesome/fontawesome-free/js/all";

import "channels/sb-admin-2";

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

document.addEventListener("turbolinks:load", function() {
    $("#buscador_productos").keyup(function(event){
        let termino = $(this).val();
        let id_modelo = $(this).data("model");
        let tipo_modelo = $(this).data("tipo");
        if(termino.length == 0) {
            $("#tabla_buscador tbody").empty();
        }
        else {
          let request_url = getRootUrl() + "/buscador_productos/" + termino;
          $.get(request_url, function(data, status){
            if(data.length > 0)  {
                $("#tabla_buscador tbody").empty();
                for(let x in data){
                  
                  let nombre_producto = data[x].nombre_producto;
                  let existencia = data[x].existencia;
                  let id_producto = data[x].id;
                  
                  let newRowContent = ` <tr>
                                          <td>${nombre_producto}</td>
                                          <td>${existencia}</td>
                                          <td><button type="button" class="btn btn-primary" id="btn_select_product">
                                            Agregar
                                            </button>
                                          </td>
                                        </tr>`;
                  $("#tabla_buscador tbody").append(newRowContent);

                  $("#btn_select_product").click(function(){
                    seleccionarProducto(id_producto,id_modelo,tipo_modelo)
                  })

                }
            }
          });
        }
    });
  
    $("#buscador_clientes").keyup(function(event){
      let termino = $(this).val();
      let id_venta = $(this).data("venta");
      if(termino.length == 0) {
        $("#tabla_buscador_clientes tbody").empty();
      }
      else {
        let request_url = getRootUrl() + "/buscador_clientes/" + termino;
        $.get(request_url, function(data, status){
          if(data.length > 0){
            $("#tabla_buscador_clientes tbody").empty();
            for(let x in data){
              let nombre = data[x].nombre_cliente;
              let id_cliente = data[x].id;
              let rowContent = `
                                  <tr>
                                    <td>${nombre}</td>
                                    <td>
                                        <button 
                                          class = "btn btn-primary"
                                          id = "btn_select_cliente"
                                          >
                                            Agregar
                                        </button>
                                    </td>
                                  </tr>
                                `;
              $("#tabla_buscador_clientes tbody").append(rowContent);
              $("#btn_select_cliente").click(function(){
                seleccionarCliente(id_cliente, id_venta)
              })
            }
          }
        });
      }
    });
  
    $("#buscador_proveedores").keyup(function(event){
      let termino = $(this).val();
      let id_registro_almacen = $(this).data("warehouse");
      if(termino.length == 0) {
        $("#tabla_buscador_proveedores tbody").empty();
      }
      else {
        let request_url = getRootUrl() + "/buscador_proveedor/" + termino;
        $.get(request_url, function(data, status){
          if(data.length > 0){
            $("#tabla_buscador_proveedores tbody").empty();
            for(let x in data){
              let id_proveedor = data[x].id;
              let nombre = data[x].nombre_proveedor;
              let rowContent = `
                 <tr>
                   <td>${nombre}</td>
                   <td>
                       <button 
                         class = "btn btn-primary"
                         id = "btn_select_proveedor"
                         >
                           Agregar
                       </button>
                   </td>
                 </tr>
              `;
              $("#tabla_buscador_proveedores tbody").append(rowContent);
              $("#btn_select_proveedor").click(function(){
                seleccionarProveedor(id_proveedor, id_registro_almacen)
              })
            }
          }
        });
      }
    });
  
  });
  
  
  function seleccionarProducto(id_producto, id_modelo, tipo_modelo){
    switch(tipo_modelo){
      case 'sales':
        agregarItemVenta(id_producto, id_modelo);
        break;
      case 'warehouse':
        agregarProductoAlmacen(id_producto, id_modelo);
        break;
    }
  }
  
  function seleccionarCliente(id_cliente, id_venta){
    let request_url = getRootUrl() + "/add_cliente_venta/";
    let info = { cliente_id: id_cliente, id: id_venta };
    $.ajax({
      url: request_url,
      type: 'POST',
      data: JSON.stringify(info),
      contentType: 'application/json; charset=utf-8',
      success: function(result){
        if(result != null) {

          //$("#buscador_cliente").modal("hide");
          //$('body').removeClass('modal-open');
          //$('.modal-backdrop').remove();
          $("#btn_closed_modal_add_clients").trigger('click');
          let nombre_cliente = result.nombre_cliente;
          $("#cliente_venta").html("Cliente: " + nombre_cliente)
        }
      }
    });
  }
  
  function seleccionarProveedor(id_proveedor, id_registro_almacen){
    let request_url = getRootUrl() + "/add_sup_almacen/";
    let info = { proveedor_id: id_proveedor, id: id_registro_almacen };
    $.ajax({
      url: request_url,
      type: 'POST',
      data: JSON.stringify(info),
      contentType: 'application/json; charset=utf-8',
      success: function(result){
        if(result != null) {
          //$("#buscador_proveedor").modal("hide");
          //$('body').removeClass('modal-open');
          //$('.modal-backdrop').remove();
          $("#btn_closed_modal_supliers").trigger('click');
          
          let nombre_proveedor = result.nombre_proveedor;
          $("#proveedor-entrada").html("Proveedor: " + nombre_proveedor);
        }
      }
    });
  }
  
  function agregarItemVenta(id_producto, id_venta){
    let cantidad_inicial = $('#cantidad_producto').val();
    let request_url = getRootUrl() + "/add_item_venta/";
    let info = { producto_id: id_producto, id: id_venta, cantidad: cantidad_inicial }
    $.ajax({
      url: request_url,
      type: 'POST',
      data: JSON.stringify(info),
      contentType: "application/json; charset=utf-8",
      success: function(result){
        if( result != null ) {
            $("#btn_closed_modal_add_products").trigger('click');
            //$('body').removeClass('modal-open');
            //$('.modal-backdrop').remove();
            let cantidad = result.cantidad;
            let precio = result.precio_producto;
            let importe_item = result.importe_item;
            let importe_venta = result.importe_venta;
            let nombre_prod = result.nombre_prod;
            let newRowContent = `<tr>
                                   <td>${nombre_prod}</td>
                                   <td>${precio}</td>
                                   <td>${cantidad}</td>
                                   <td>$ ${importe_item}</td>
                                </tr>`;
            
            $("#tabla_ventas tbody").append(newRowContent);
            $("#importe_venta_lbl").text("Importe: $" + importe_venta);
        }
      }
    });
  }
  
  function agregarProductoAlmacen(id_producto, id_entrada_almacen){
    let cantidad_inicial = $("#cantidad_producto").val();
    let request_url = getRootUrl() + "/add_item_almacen";
    let info = { product_id: id_producto, id: id_entrada_almacen, cantidad: cantidad_inicial };
    $.ajax({
      url: request_url,
      type: 'POST',
      data: JSON.stringify(info),
      contentType: 'application/json',
      success: function(result) {
        console.log("resultado: " + result);
        if( result != null ){
          //$("#buscador_producto").modal('hide');
          //$('body').removeClass('modal-open');
          //$('.modal-backdrop').remove();
          $("#btn_closed_modal_add_products").trigger('click');
  
          let product_id = result.product_id;
          let cantidad = result.cantidad;
          let producto = result.producto;
  
          let registro_almacen = `
            <tr>
              <td>${product_id}</td>
              <td>${producto}</td>
              <td>${cantidad}</td>
            </tr>
          `;
          $("#tabla_entradas_almacen").append(registro_almacen);
        }
      }
    });
  }
  
  function getRootUrl() {
      return window.location.origin;
  }