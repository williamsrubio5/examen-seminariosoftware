var db = require('./db')();
var model = null;
function initModel(){
  db.run("CREATE TABLE IF NOT EXISTS productos(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_cliente TEXT, correo_cliente TEXT, telefono NUMERIC, producto TEXT, forma_pago INTEGER, estado TEXT )");
  model = {};

  model.getAll = function (handler) {
    db.all("SELECT * from productos;",
      function (err, rows) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, rows);
        }
      }
    )
  }

  model.getOne = function (id, handler) {
    db.get("SELECT * from productos where id = ?;", [id],
      function (err, row) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, row || {});
        }
      }
    )
  }

  model.addOne = function (nombre_cliente, correo_cliente, telefono, producto, forma_pago,estado) {
    db.run(
      "INSERT INTO productos (nombre_cliente, correo_cliente, telefono, producto, forma_pago,estado) VALUES (?, ?, ?, ?, ?,?);",
      [nombre_cliente, correo_cliente, telefono, producto, forma_pago,estado],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  model.updateOne = function (id, nombre_cliente, correo_cliente, telefono, producto, forma_pago,estado) {
    db.run(
      "UPDATE productos set  nombre_cliente = ? , correo_cliente = ?,telefono = ?,producto = ?,forma_pago = ?,estado =? p + ? where id = ?;",
      [ nombre_cliente, correo_cliente, telefono, producto, forma_pago,estado,id],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  


}

module.exports = function () {
  if (!model) {
    return initModel();
  } else {
    return model;
  }
}
