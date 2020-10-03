var todoList = [];

renderHTML();

function agregarElemento() {
  var desc = document.getElementById("input1").value;
  var id = todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 0;

  todoList.push({
    id: id,
    descripcion: desc,
    done: false
  });
  renderHTML();
}

function eliminarElemento(id) {
  var el = todoList.filter(function(el) {
    return el.id === id;
  })[0];
  var index = todoList.indexOf(el);
  if (index !== -1) {
    todoList.splice(index, 1);
  }
  renderHTML();
}

function colocarDone(id) {
  var el = todoList.filter(function(el) {
    return el.id === id;
  })[0];
  el.done = true;
  renderHTML();
}

function componentInputBtn() {
  this.template = `
    <div class="input-group mb-3">
    <input id="input1" type="text" class="form-control" placeholder="" 
    aria-label="Recipient's username" aria-describedby="button-addon2">
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" 
      onclick="agregarElemento()"  
      type="button" id="button-addon2">Button</button>
    </div>
   </div>
    `;
}

function componentElemento(el) {
  this.doneHtml = el.done ? '<i class="fas fa-check-circle"></i>' : "";
  this.template = `
            <li class="list-group-item d-flex justify-content-between 
            align-items-center">
              ${el.descripcion}
             ${this.doneHtml}
             <button type="button" onclick="colocarDone(${el.id})" 
             class="btn btn-success">done</button>
             <button type="button" onclick="eliminarElemento(${el.id})"
              class="btn btn-danger">delete</button>
            </li> `;
}

function componentListado(list) {
  var scope = this;
  this.ListHtml = "";
  this.template = function() {
    if (list.length > 1) {
      this.ListHtml = list.reduce(function(old, el, index) {
        if (index == 1) {
          return (
            new componentElemento(old).template +
            new componentElemento(el).template
          );
        } else {
          return old + new componentElemento(el).template;
        }
      });
    } else if (list.length == 1) {
      this.ListHtml = new componentElemento(list[0]).template;
    }
    return `<ul class="list-group">
        ${scope.ListHtml}
        </ul>`;
  };
}

function renderHTML() {
  var elbtn = document.getElementById("btn");
  var ellist = document.getElementById("listado1");
  elbtn.innerHTML = new componentInputBtn(" hola mundo").template;
  ellist.innerHTML = new componentListado(todoList).template();
}
