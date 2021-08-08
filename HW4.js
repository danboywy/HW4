//Haojie Zheng
//Haojie_zheng@student.uml.edu
//08/09/2021

//Create method to test input

//No decimal point
jQuery.validator.addMethod("isInteger", function (value, element) {
  return this.optional(element) || (/^[-\+]?\d+$/.test(value) && parseInt(value) >= -50);
}, "Please enter an integer");

//The minimum row need to smaller than the maximum row
jQuery.validator.addMethod("greater1", function(value, element) {  
  var first = $("#fn").val();
  value = parseInt(value);
  return this.optional(element) || value > first;
},"The minimum row need to smaller than the maximum row"); 

//The minimum column need to smaller than the maximum column
jQuery.validator.addMethod("greater2", function(value, element) {  
  var sec = $("#sn").val();
  value = parseInt(value);
  return this.optional(element) || value > sec;
},"The minimum column need to smaller than the maximum column"); 


var msg="Please enter a value in range -50 to 50";
//validation
$(document).ready(function() {
  $("#Form").validate({
  //rules
    rules: {
      firstnumber: {
        required: true,
        number: true,
        min:-50,
        max: 50,
        isInteger: true
      },
      endnumber1: {
        required: true,
        number: true,
        min:-50,
        max: 50,
        isInteger: true,
        greater1: true
      },
      secoundnumber: {
        required: true,
        number: true,       
        min:-50,
        max: 50,
        isInteger: true
      },
      endnumber2: {
        required: true,
        number: true,
        min:-50,
        max: 50,
        isInteger: true,
        greater2: true
      }
  },
  //no negative number in the original message
  messages:{
    firstnumber:{
      min: msg,
      max: msg
    },
    endnumber1:{
      min: msg,
      max: msg
    },
    secoundnumber:{
      min: msg,
      max: msg
    },
    endnumber2:{
      min: msg,
      max: msg
    }
  }
  });

  // If validation pass. will call the multiplication table function
  $("#button").click(function() {
    if($("#Form").valid())
    $("#Form").submit(btn1_click());
  });
});

function btn1_click(){

  //Get value from input with decimal only
  var rows=parseInt(document.getElementById("fn").value);
  var cols=parseInt(document.getElementById("sn").value);
  var e1_num = parseInt(document.getElementById("en1").value);
  var e2_num = parseInt(document.getElementById("en2").value);

  //Table info

  var table = document.createElement("table");
  table.setAttribute("id", "newtable");
  var tr = document.createElement("tr");
  var th = document.createElement("th");

  //Blank input
  th.appendChild(document.createTextNode(''));
  tr.appendChild(th);
  table.appendChild(tr);

  //Remoce old table
  old_table = document.getElementById("newtable");
  if(old_table){
  old_table.parentNode.removeChild(old_table);
  }
  

  //Create column header
  for (var i = cols; i <= e2_num; i++) {
    tr.appendChild(tablebox(i, "th"));
  }

  //Create row header
  for (var j = rows; j <= e1_num; j++) {
    
    var tr = document.createElement("tr");
    tr.appendChild(tablebox(j, "th"));
    for (var i = cols; i <= e2_num; i++) {
      //Calculate the output
      var value = j * i;
      tr.appendChild(tablebox(value, "td"));
    }
    table.appendChild(tr);
  }
  htmltable = table;
  $("#Table").html(htmltable);
}

//Create box
function tablebox(text, type) {
  var space = document.createElement(type);
  space.appendChild(document.createTextNode(text));
  return space;
}