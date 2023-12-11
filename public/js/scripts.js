document.addEventListener("DOMContentLoaded", function(){

    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    
    var today = year + "-" + month + "-" + day; 

    var mindate = date + 1;
    var maxdate = date + 14;


document.querySelector("#end_date").value = today;
document.querySelector("#end_date").setAttribute("min", mindate);
document.querySelector("#end_date").setAttribute("max", maxdate);
    
    });