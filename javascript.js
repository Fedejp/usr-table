$(document).ready(function(){
    //table pager
    $('#data').after('<div id="nav" class="col-md-12 text-center"></div>');
    var rowsShown = 5;
    var rowsTotal = $('#data tbody tr').length;
    var numPages = rowsTotal/rowsShown;
    console.log(rowsTotal);
    if(rowsTotal==0){
        var _defrow=document.createElement("TR");
        _defrow.innerHTML= "<tr id=defrow> <td colspan=6> Todavía no hay usuarios registrados.</td></tr>"
        document.getElementById("tableBody").appendChild(_defrow);
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

    document.getElementById("defrow");


  
    
   // console.log("Nombre " +_name +" Fecha: "+ _dob + " Sexo "+_sexchoose+" Email: "+_mail);
    
    let _row = "<tr><td>"+_name+"</td><td>"+_age+" años</td><td>"+_sexchosen+"</td><td>"+_mail+"</td><td></td></tr>";
    let _htmlrow = document.createElement("TR");
    _htmlrow.innerHTML = _row;
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