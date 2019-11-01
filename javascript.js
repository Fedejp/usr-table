

$(document).ready(function () {
    //Carga desde el localStorage lo que esté en la tabla
    //LIMITACIÓN: Si se elimina un valor del "medio" después de ser cargado, no puedo recuperar el resto.
     for (let i = 1; i <= localStorage.length; i++) {
        let row = localStorage.getItem("usr" + i)
        if (row !== null) {
            let rowStoraged = row.split(",");
            let _age = getAge(rowStoraged[2])
            let rowTable = "<tr><td>" + rowStoraged[0] + "</td><td>" + rowStoraged[1] + "</td><td>" + _age + " años</td><td>" + rowStoraged[3] + "</td><td>" + rowStoraged[4] + "</td><td><button type=edit class=\"btn btn-link editar\" data-toggle=modal data-target=#usrInput><span class=\"glyphicon glyphicon-pencil\"></span></button><button type=delete class=\"btn btn-danger borrar\"><span class=\"glyphicon glyphicon-remove-circle editar\"</span></button></td></tr>";
            let _htmlrow = document.createElement("TR");
            _htmlrow.innerHTML = rowTable;
            _htmlrow.setAttribute("id", "" + rowStoraged[0]);
            document.getElementById("tableBody").appendChild(_htmlrow);
        }
    } 

    //table pager
    $('#data').after('<div id="nav" class="col-md-12 text-center"></div>');
    var rowsShown = 5;
    var rowsTotal = $('#data tbody tr').length;
    var numPages = rowsTotal / rowsShown;
    if (rowsTotal == 0) {
        createDefRow(); //Crea la fila default
    }
    for (i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        $('#nav').append('<a  class="btn btn-outline-info" href="#" rel="' + i + '" role="button">' + pageNum + '</a> ');
    }
    $('#data tbody tr').hide();
    $('#data tbody tr').slice(0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function () {

        $('#nav a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#data tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
            css('display', 'table-row').animate({ opacity: 1 }, 300);
    });
});

function createDefRow() {
    var _defrow = document.createElement("TR");
    _defrow.setAttribute("id", "defrow");
    _defrow.innerHTML = "<tr> <td colspan=6> Todavía no hay usuarios registrados.</td></tr>";
    document.getElementById("tableBody").appendChild(_defrow);
}

function save() { //Función para guardar el formulario en localStorage y mostrarlo en la tabla
    let _name = document.getElementById("inputName").value;
    let _dob = document.getElementById("inputDate").value;
    let _sexradio = document.getElementsByName("sexRadioOptions");
    for (let i = 0; i < _sexradio.length; i++) {
        if (_sexradio[i].checked)
            var _sexchosen = _sexradio[i].value;
    }
    let _mail = document.getElementById("inputEmail").value;
    let _age = getAge(_dob);

    if (document.getElementById("defrow") != null) {
        var row = document.getElementById("defrow");
        row.parentNode.removeChild(row);
    }
        let _id = $('#data tbody tr').length + 1;
        let _row = "<tr><td>" + _id + "</td><td>" + _name + "</td><td>" + _age + " años</td><td>" + _sexchosen + "</td><td>" + _mail + "</td><td><button type=edit class=\"btn btn-link editar\" data-toggle=modal data-target=#usrInput><span class=\"glyphicon glyphicon-pencil\"></span></button><button type=delete class=\"btn btn-danger borrar\"><span class=\"glyphicon glyphicon-remove-circle editar\"</span></button></td></tr>";
        let _htmlrow = document.createElement("TR");
        _htmlrow.innerHTML = _row;
        _htmlrow.setAttribute("id", "" + _id);
        document.getElementById("tableBody").appendChild(_htmlrow);
        let _arraydatos = [_id, _name, _dob, _sexchosen, _mail];
    
    localStorage.setItem("usr" + _id, _arraydatos); //guarda en el localstorage como usr{_id}
}
function getAge(_dob) {
    //Transforma _dob en array
    let _dobarr = _dob.split("-");
    let _doby = _dobarr[0];
    let _dobm = _dobarr[1];
    let _dobd = _dobarr[2];
    //obtiene la fecha de hoy y la transforma en array
    let _today = new Date();
    let _todayy = _today.getFullYear();
    let _todaym = _today.getMonth() + 1;
    let _todayd = _today.getDate();
    //Calcula la edad en años
    let _age = _todayy - _doby;
    if (_todaym < _dobm) {
        _age--;
    }
    if ((_dobm == _todaym) && (_todayd < _dobd)) {
        _age--;
    }
    return _age;
}

$(document).on('click', '.borrar', function (event) { //función para que una fila se borre a sí misma
    event.preventDefault();
    let id = $(this).closest('tr').attr("id");
    $(this).closest('tr').remove(); //se borra del html
    let rowsTotal = $('#data tbody tr').length;
    if (rowsTotal == 0) {
        createDefRow();
    }
    localStorage.removeItem("usr" + id); //Se borra del localstorage
});

$(document).on('click', '.editar', function (event) { //función para que una fila llame al editor
    event.preventDefault();
    let id = $(this).closest('tr').attr("id");
    let values = localStorage.getItem("usr" + id).split(","); //sé que si se ingresa una coma se rompe, pero si no ( no es lo esperado ) no pasa nada.
    document.getElementById("inputName").setAttribute("value", values[1])
    document.getElementById("inputDate").setAttribute("value", values[2])
    if (values[3] == "Femenino") {
        document.getElementById("genreRadio1").setAttribute("checked", "checked")
    } else if (values[3] == "Masculino") {
        document.getElementById("genreRadio2").setAttribute("checked", "checked")
    }
    else if (values[3] == "Otro") {
        document.getElementById("genreRadio3").setAttribute("checked", "checked")
    }
    document.getElementById("inputEmail").setAttribute("value", values[4])
    document.getElementById("usrInputTittle").innerHTML = "Modificar el usuario " + id;
    document.getElementById("saveForm").setAttribute("onclick","saveEdit("+id+")");

});

function saveEdit(id){
    let _name = document.getElementById("inputName").value;
    let _dob = document.getElementById("inputDate").value;
    let _sexradio = document.getElementsByName("sexRadioOptions");
    for (let i = 0; i < _sexradio.length; i++) {
        if (_sexradio[i].checked)
            var _sexchosen = _sexradio[i].value;
    }
    let _mail = document.getElementById("inputEmail").value;
    let _age = getAge(_dob);
    let _row = "<tr><td>" + id + "</td><td>" + _name + "</td><td>" + _age + " años</td><td>" + _sexchosen + "</td><td>" + _mail + "</td><td><button type=edit class=\"btn btn-link editar\" data-toggle=modal data-target=#usrInput><span class=\"glyphicon glyphicon-pencil\"></span></button><button type=delete class=\"btn btn-danger borrar\"><span class=\"glyphicon glyphicon-remove-circle editar\"</span></button></td></tr>";
        let _htmlrow = document.getElementById(id);
        _htmlrow.innerHTML = _row;
        let _arraydatos = [id, _name, _dob, _sexchosen, _mail];
    
    localStorage.setItem("usr" + id, _arraydatos); //guarda en el localstorage como usr{_id}
}
