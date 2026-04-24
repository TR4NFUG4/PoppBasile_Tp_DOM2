var entradaTarea = document.getElementById("taskInput");
var botónAgregar = document.getElementById("addTaskBtn");
var listaTareas = document.getElementById("taskList");

var tareas = [];

function crearTarea(text) {
    return {
        id: Date.now().toString(),
        text: text,
        done: false
    };
}

function actContadores() {
    var pendientes = tareas.filter(function (tarea) {
        return !tarea.done;
    }).length;
    var completadas = tareas.filter(function (tarea) {
        return tarea.done;
    }).length;
    var totales = tareas.length;

    document.getElementById("pendientes").textContent = pendientes;
    document.getElementById("completadas").textContent = completadas;
    document.getElementById("totales").textContent = totales;
}

function renderizarTarea(tarea, indice) {
    var li = document.createElement("li");

    var casilla = document.createElement("input");
    casilla.type = "checkbox";
    casilla.checked = tarea.done;
    casilla.dataset.index = indice;
    casilla.addEventListener("change", function () {
        tareas[indice].done = casilla.checked;
        renderizarTareas();
    });

    var etiqueta = document.createElement("label");
    etiqueta.textContent = tarea.text;
    etiqueta.htmlFor = casilla.id;
    if (tarea.done) {
        etiqueta.style.textDecoration = "line-through";
    }

    li.appendChild(casilla);
    li.appendChild(document.createTextNode(" "));
    li.appendChild(etiqueta);

    return li;
}

function renderizarTareas() {
    listaTareas.innerHTML = "";
    tareas.forEach(function (tarea, indice) {
        var elementoTarea = renderizarTarea(tarea, indice);
        listaTareas.appendChild(elementoTarea);
    });
    actContadores();
}

function agregarTarea(event) {
    event.preventDefault();
    var textoTarea = entradaTarea.value.trim();
    if (textoTarea === "") {
        return;
    }

    tareas.push(crearTarea(textoTarea));
    entradaTarea.value = "";
    entradaTarea.focus();
    renderizarTareas();
}

botónAgregar.addEventListener("click", agregarTarea);
renderizarTareas();