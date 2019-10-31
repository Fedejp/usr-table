
$(document).ready(function(){
    //table pager
    $('#data').after('<div id="nav" class="col-md-12 text-center"></div>');
    var rowsShown = 5;
    var rowsTotal = $('#data tbody tr').length;
    var numPages = rowsTotal/rowsShown;
    if(rowsTotal==0){
        createDefRow(); //Crea la fila default
    }
    for(i = 0;i < numPages;i++) {
        var pageNum = i + 1;
        $('#nav').append('<a  class="btn btn-outline-info" href="#" rel="'+i+'" role="button">'+pageNum+'</a> ');
    }
    $('#data tbody tr').hide();
    $('#data tbody tr').slice(0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function(){

        $('#nav a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#data tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
    });
});

function createDefRow() {
    var _defrow = document.createElement("TR");
    _defrow.setAttribute("id", "defrow");
    _defrow.innerHTML = "<tr> <td colspan=6> Todavía no hay usuarios registrados.</td></tr>";
    document.getElementById("tableBody").appendChild(_defrow);
}

function save(){
    let _name = document.getElementById("inputName").value;
    let _dob = document.getElementById("inputDate").value;
    let _sexradio= document.getElementsByName("sexRadioOptions");
    for(let i=0; i<_sexradio.length;i++){
        if(_sexradio[i].checked)
            var _sexchosen = _sexradio[i].value;
    }
    let _mail= document.getElementById("inputEmail").value;
    let _age = getAge();

    if(document.getElementById("defrow")!=null){
        var row = document.getElementById("defrow");
        row.parentNode.removeChild(row);
    }
        
    


  
    

    let _id=  $('#data tbody tr').length+1;
    
    let _row = "<tr><td>"+_id+"</td><td>"+_name+"</td><td>"+_age+" años</td><td>"+_sexchosen+"</td><td>"+_mail+"</td><td><button type=edit class=\"btn btn-link editar\" data-toggle=modal data-target=#usrInput><span class=\"glyphicon glyphicon-pencil\"></span></button><button type=delete class=\"btn btn-danger borrar\"><span class=\"glyphicon glyphicon-remove-circle editar\"</span></button></td></tr>";
    let _htmlrow = document.createElement("TR");
    _htmlrow.innerHTML = _row;
    _htmlrow.setAttribute("id",""+_id);
    document.getElementById("tableBody").appendChild(_htmlrow);

    function getAge() {
         //getting the values for the Date of birth
        let _dobarr = _dob.split("-");
        let _doby = _dobarr[0];
        let _dobm = _dobarr[1];
        let _dobd = _dobarr[2];
        //getting the values for today
        let _today = new Date();
        let _todayy = _today.getFullYear();
        let _todaym = _today.getMonth() + 1;
        let _todayd = _today.getDate();
        //calculates age in years
        let _age = _todayy - _doby;
        if (_todaym < _dobm) {
            _age--;
        }
        if ((_dobm == _todaym) && (_todayd < _dobd)) {
            _age--;
        }
        return _age;
    }
}


$(document).on('click', '.borrar', function (event) { //función para que una fila se borre a sí misma
    event.preventDefault();
    $(this).closest('tr').remove();
    let rowsTotal = $('#data tbody tr').length;
    if(rowsTotal==0){
        createDefRow();
    }
});

$(document).on('click', '.editar', function (event) { //función para que una fila llame al editor
    event.preventDefault();
    let values = [];
    i=0;
    $(this).parents("tr").find("td").each(function(){
        values[i]= $(this).html();
        i++
    })
    console.log(values);
    document.getElementById

});

