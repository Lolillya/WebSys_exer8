//----------------------index.html---------------------//
function getCookie(isLoggedin){
  var cookieArr = document.cookie.split(";");

  for(var i = 0; i < cookieArr.length; i++){
    var cookiePair = cookieArr[i].split("=");

    if(isLoggedin == cookiePair[0].trim()){
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

function deleteCookie(){
  var Name = getCookie("Name");
  var email = getCookie("email");
  var pics = getCookie("pics");
  var isLoggedin = getCookie("isLoggedin");

  document.cookie = "Name=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "pics=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "isLoggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  alert("You logged out!")
  window.top.location.reload();
}

function checkCookie(){
  var txt = "";
  var isLoggedIn = getCookie("isLoggedin");
  var name = getCookie("Name");
  var pic = getCookie("pics");

  // Not Logged-in
  if(isLoggedIn == null){
    txt += "<td class='topLink'>";
    txt += "<a href='loginPage.html' target='B' class='link'>Login</a>";
    txt += "<a href='cap.py' target='B' class='link'>Register</a>";
    txt += "</td>";
    document.getElementById("topLinkID").innerHTML += txt;

    var profPic = "<img class='profile_img' src='pics/Unknown_person.jpg' width='50px'>";
    document.getElementById("profileInfo").innerHTML += profPic;
  }

  //Logged-in
  else{
    txt += "<a href='StockIn.py' target='B' class='link'>StockIn</a>";
    txt += "<a href='Orders.py' target='B' class='link'>Orders</a>";
    txt += "<a href='Customers.py' target='B' class='link'>Customers</a>";
    txt += "<a href='' class='link' id='logout' onclick='deleteCookie()'>Logout</a>";
    document.getElementById("topLinkID").innerHTML += txt;

    if(pic == null)
      var profPic = "<img class='profile_img' src='pics/Unknown_person.jpg' width='50px'>";
    
    else
      var profPic = "<img class='profile_img' src=" + pic + "\" width='50px'>";

    
    document.getElementById("profileInfo").innerHTML += profPic;
  }
}

function checkLogin(){
  var isLoggedIn = getCookie("isLoggedin");

  if(isLoggedIn == null){
    return false;
    console.log(isLoggedIn);
  }
  else{
    return true;
    console.log(isLoggedIn);
  }
}

// ------------------------------------------------------//
//----------------------------------------------------------//
function loginAttempt() {
  var a = document.forms["login"]["username"].value;
  var b = document.forms["login"]["password"].value;
  if (a == "" || b == "")
    alert("Empty Field");

  else{
    alert("login attept in");
    gotoLogin();
  }
}

function gotoLogin() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      redirectLogin(this);
    }
  };
  xmlhttp.open("GET", "customerOrders.xml", true);
  xmlhttp.send();
}

function redirectLogin(xml){
  var a = document.forms["login"]["username"].value;
  var b = document.forms["login"]["password"].value;
  var xmlDoc, x;
  var match = false;

  xmlDoc = xml.responseXML;
  x = xmlDoc.getElementsByTagName("customers");

  //TODO : Get XML index to user

  for(var i = 0; i < x.length; i++){
    if(a != x[i].getElementsByTagName("username")[0].childNodes[0].nodeValue ||
      b != x[i].getElementsByTagName("password")[0].childNodes[0].nodeValue)
      {
        // alert("invalid user or password");
        // console.log(a);
        // console.log(b);
        console.log(x[i].getElementsByTagName("username")[0].childNodes[0].nodeValue);
        console.log(x[i].getElementsByTagName("password")[0].childNodes[0].nodeValue);
      }
    else{
      // alert("logged in!");
      // document.cookie = "Name=" + a;
      document.cookie = "Name=" + x[i].getElementsByTagName("username")[0].childNodes[0].nodeValue;
      document.cookie = "email=" + x[i].getElementsByTagName("email")[0].childNodes[0].nodeValue;
      document.cookie = "isLoggedin=" + 1;

      location.href = 'bottom.html';
      window.top.location.reload();
      match = true;
      break;
    }
  }

  if(match == true)
    alert("logged in!");
  else
    alert("wrong user or pass!");


  



}

function signupAttempt() {
  var a = document.forms["signup"]["phNum"].value;
  var b = document.forms["signup"]["email"].value;
  var c = document.forms["signup"]["pw"].value;

  var captcha_Text = document.forms["signup"]["captcha_Text"].value;
  captcha = document.getElementById("captchaID").value;
  console.log(captcha);
  console.log(captcha_Text);

  if (a == "" || b == "" || c == "")
    alert("Empty Field");

  else if (captcha_Text != captcha)
    alert("Wrong Captcha!");

  else
    alert("Account Registered");
}

function openWin(){
var myWindow = window.open('http://127.0.0.1:8080/login', 'name',width=600, height=600);

var timer = setInterval(function() {
  if(myWindow.closed){
    clearInterval(timer);
    alert('closed');

    if(checkLogin() == true){
      location.href = 'bottom.html';
      window.top.location.reload();
    }
    else
      location.reload();
  }
}, 1000);
}

// ---------------------motherboard.xml-----------------//
//------------------------------------------------------//

function loadMBXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();
}

function myFunction(xml) {
  var x, i, xmlDoc, txt;
  var count = 0;
  var read = false;

  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("customers");
  document.getElementById("cat_table_ID").innerHTML = "<h4 onclick=\"location.href=\'bottom.html\'\" style=\"padding-left:20px; cursor:pointer;\">Back</h4>";
  for (i = 0; i < x.length; i++) {
    if ((count == 0 || count == 7) && read == false)
      txt += "<tr class=\"mbPic_tr\" style=\"text-align: left;\">";

    if (x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue == "Motherboard") {

      txt += "<td><img src=\"pics/" +
        x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue + "\" width=\"200px\" ><br>" +
        x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>" +
        x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</td>";

      count++;
      read = true;
    }

    if (count == 7 && read == true) {
      txt += "</tr>";
      count = 0;
      read = false;
    }
  }
  document.getElementById("cat_table_ID").innerHTML += txt;
}

//----------------------Processors.xml------------------------//
//------------------------------------------------------------//

function loadcpuXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      writeCpuXml(this);
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();
}

function writeCpuXml(xml) {
  var x, i, xmlDoc, txt;
  var count = 0;
  var read = false;

  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("customers");
  document.getElementById("cat_table_ID").innerHTML = "<h4 onclick=\"location.href=\'bottom.html\'\" style=\"padding-left:20px; cursor:pointer;\">Back</h4>";
  for (i = 0; i < x.length; i++) {
    if ((count == 0 || count == 7) && read == false)
      txt += "<tr class=\"mbPic_tr\" style=\"text-align: left;\">";

    if (x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue == "Processor") {

      txt += "<td><img src=\"pics/" +
        x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue + "\" width=\"200px\" ><br>" +
        x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>" +
        x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</td>";

      read = true;
      count++;
    }

    if (count == 7 && read == true) {
      txt += "</tr>";
      count = 0;
      read = false;
    }

  }
  document.getElementById("cat_table_ID").innerHTML += txt;
}

//-----------------------memBank.xml-------------------//
//-----------------------------------------------------//

function loadmemBankXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      writememBank(this);
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();
}

function writememBank(xml) {
  var x, i, xmlDoc, txt;
  var count = 0;
  var read = false;

  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("customers");
  document.getElementById("cat_table_ID").innerHTML = "<h4 onclick=\"location.href=\'bottom.html\'\" style=\"padding-left:20px; cursor:pointer;\">Back</h4>";
  for (i = 0; i < x.length; i++) {
    if ((count == 0 || count == 7) && read == false)
      txt += "<tr class=\"mbPic_tr\" style=\"text-align: left;\">";

    if (x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue == "Memory") {

      txt += "<td><img src=\"pics/" +
        x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue + "\" width=\"200px\" ><br>" +
        x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>" +
        x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</td>";

      count++;
      read = true;
    }

    if (count == 7 && read == true) {
      txt += "</tr>";
      count = 0;
      read = false;
    }
  }
  document.getElementById("cat_table_ID").innerHTML += txt;
}

//----------------------------PC_Case.xml----------------//
//-------------------------------------------------------//


function loadpcCaseXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      writePcXML(this);
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();
}

function writePcXML(xml) {
  var x, i, xmlDoc, txt;
  var count = 0;
  var read = false;

  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("customers");
  document.getElementById("cat_table_ID").innerHTML = "<h4 onclick=\"location.href=\'bottom.html\'\" style=\"padding-left:20px; cursor:pointer;\">Back</h4>";
  for (i = 0; i < x.length; i++) {
    if ((count == 0 || count == 7) && read == false)
      txt += "<tr class=\"mbPic_tr\" style=\"text-align: left;\">";

    if (x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue == "PC Case") {

      txt += "<td><img src=\"pics/" +
        x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue + "\" width=\"200px\" ><br>" +
        x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>" +
        x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</td>";

      count++;
      read = true;
    }

    if (count == 7 && read == true) {
      txt += "</tr>";
      count = 0;
      read = false;
    }
  }
  document.getElementById("cat_table_ID").innerHTML += txt;
}

//--------------------------------Monitor.xml-----------------//
//------------------------------------------------------------//

function loadMonitorXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      writeMonitorXML(this);
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();
}

function writeMonitorXML(xml) {
  var x, i, xmlDoc, txt;
  var count = 0;
  var read = false;

  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("customers");
  document.getElementById("cat_table_ID").innerHTML = "<h4 onclick=\"location.href=\'bottom.html\'\" style=\"padding-left:20px; cursor:pointer;\">Back</h4>";
  for (i = 0; i < x.length; i++) {
    if ((count == 0 || count == 7) && read == false)
      txt += "<tr class=\"mbPic_tr\" style=\"text-align: left;\">";

    if (x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue == "Monitors") {

      txt += "<td><img src=\"pics/" +
        x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue + "\" width='200px';><br>" +
        x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>" +
        x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</td>";

      count++;
      read = true;
    }

    if (count == 7 && read == true) {
      txt += "</tr>";
      count = 0;
      read = false;
    }
  }
  document.getElementById("cat_table_ID").innerHTML += txt;
}

//-----------------customerOrders.xml-------------------//
//------------------------------------------------------//

function readCustOrders() {
  $(document).ready(function () {
    $.ajax({
      type: 'GET',
      url: 'customerOrders.xml',
      MimeType: 'xml',
      success: function (data) {
        $(data).find('customers').each(function () {
          var body = "<tr class=\"Customer_tr\">;"
          body += "<td class=\"Customer_info\" style=\"width:270px\">" + $(this).find('cid').text() + "</td>";
          body += "<td class=\"Customer_info\" style=\"width:320px\">" + $(this).find('address').text() + "</td>";
          body += "<td class=\"Customer_info\" style=\"width:290px\">" + $(this).find('email').text() + "</td>";
          body += "<td class=\"Customer_info\" style=\"width:280px\">" + $(this).find('number').text() + "</td>";
          body += "<td class=\"Customer_info\" style=\"width:300px\">" + $(this).find('date').text() + "</td>";
          body += "</tr>";
          $("#CustID").append(body);
        });
        $('#CustID').DataTable();
      },
      error: function () {
        alert("failed to read xml");
      }
    });
  });
}

//----------------------Orders.xml-------------------//
//------------------------------------------------------//

function loadOrders() {
  $(document).ready(function () {
    $.ajax({
      type: 'GET',
      url: 'Orders.xml',
      MimeType: 'xml',
      success: function (data) {
        $(data).find('Customer').each(function () {
          var body = "<tr class=\"orderList_tr\">;"
          body += "<td class=\"orderInfo\" style=\"width:200px\">" + $(this).find('cid').text() + "</td>";
          body += "<td class=\"orderInfo\" style=\"width:190px\">" + $(this).find('pid').text() + "</td>";
          body += "<td class=\"orderInfo\" style=\"width:260px\">" + $(this).find('pcat').text() + "</td>";
          body += "<td class=\"orderInfo\" style=\"width:250px\">" + $(this).find('pname').text() + "</td>";
          body += "<td class=\"orderInfo\" style=\"width:190px\">" + $(this).find('price').text() + "</td>";
          body += "<td class=\"orderInfo\" style=\"width:180px\">" + $(this).find('quantity').text() + "</td>";
          body += "<td class=\"orderInfo\" style=\"width:200px\">" + $(this).find('date').text() + "</td>";
          body += "</tr>";
          $("#orderID").append(body);
        });
        $('#orderID').DataTable();
      },
      error: function () {
        alert("failed to read xml");
      }
    });
  });
}



//-----------------StockIn.xml-------------------//
//------------------------------------------------------//

function readStockIn() {
  $(document).ready(function () {
    $.ajax({
      type: 'GET',
      url: 'products.xml',
      MimeType: 'xml',
      success: function (data) {
        $(data).find('customers').each(function () {
          var body = "<tr class=\"list_tr\">;"
          body += "<td class=\"catalog_info\">" + $(this).find('cid').text() + "</td>";
          body += "<td class=\"catalog_info\">" + $(this).find('pcat').text() + "</td>";
          body += "<td class=\"catalog_info\">" + $(this).find('pname').text() + "</td>";
          body += "<td class=\"catalog_info\"><img src=\"pics/" + $(this).find('picture').text() + "\"width='60px'\"></td>";
          body += "<td class=\"catalog_info\">" + $(this).find('price').text() + "</td>";
          body += "<td class=\"catalog_info\">" + $(this).find('quantity').text() + "</td>";
          body += "<td class=\"catalog_info\">" + $(this).find('date').text() + "</td>";
          body += "</tr>";
          $("#StockIn_ID").append(body);
        });
        $('#StockIn_ID').DataTable();
      },
      error: function () {
        alert("failed to read xml");
      }
    });
  });
}

//------------------------------------BRANDS------------------------------------------//
//------------------------------------------------------------------------------//

//---------------------------ACER--------------------//
//---------------------------------------------------//

function getAcerBrands() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      writeAcerProducts(this);
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();

}

function writeAcerProducts(xml) {
  var x, i, xmlDoc, txt;
  var count = 0;
  var read = false;

  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("customers");
  document.getElementById("POPULAR_BRANDS").innerHTML = "<h4 onclick=\"location.href=\'bottom.html\'\" style=\"padding-left:20px; cursor:pointer;\">Back</h4>";
  for (i = 0; i < x.length; i++) {
    if ((count == 0 || count == 7) && read == false)
      txt += "<tr class=\"mbPic_tr\" style=\"text-align: left;\">";

    if (x[i].getElementsByTagName("pbrand")[0].childNodes[0].nodeValue == "Acer") {

      txt += "<td><img src=\"pics/" +
        x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue + "\" width=\"200px\" ><br>" +
        x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>" +
        x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</td>";

      count++;
      read = true;
    }

    if (count == 7 && read == true) {
      txt += "</tr>";
      count = 0;
      read = false;
    }
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.getElementById("POPULAR_BRANDS").innerHTML += txt;
}

//---------------------------INTEL--------------------//
//---------------------------------------------------//

function getIntelBrands() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      writeIntelProducts(this);
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();
}

function writeIntelProducts(xml) {
  var x, i, xmlDoc, txt;
  var count = 0;
  var read = false;

  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("customers");
  document.getElementById("POPULAR_BRANDS").innerHTML = "<h4 onclick=\"location.href=\'bottom.html\'\" style=\"padding-left:20px; cursor:pointer;\">Back</h4>";
  for (i = 0; i < x.length; i++) {
    if ((count == 0 || count == 7) && read == false)
      txt += "<tr class=\"mbPic_tr\" style=\"text-align: left;\">";

    if (x[i].getElementsByTagName("pbrand")[0].childNodes[0].nodeValue == "Intel") {

      txt += "<td><img src=\"pics/" +
        x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue + "\" width=\"200px\" ><br>" +
        x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>" +
        x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</td>";

      count++;
      read = true;
    }

    if (count == 7 && read == true) {
      txt += "</tr>";
      count = 0;
      read = false;
    }
  }
  document.getElementById("POPULAR_BRANDS").innerHTML += txt;
}

//---------------------------AMD--------------------//
//---------------------------------------------------//

function getAMDBrands() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      writeAMDProducts(this);
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();
}

function writeAMDProducts(xml) {
  var x, i, xmlDoc, txt;
  var count = 0;
  var read = false;

  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("customers");
  document.getElementById("POPULAR_BRANDS").innerHTML = "<h4 onclick=\"location.href=\'bottom.html\'\" style=\"padding-left:20px; cursor:pointer;\">Back</h4>";
  for (i = 0; i < x.length; i++) {
    if ((count == 0 || count == 7) && read == false)
      txt += "<tr class=\"mbPic_tr\" style=\"text-align: left;\">";

    if (x[i].getElementsByTagName("pbrand")[0].childNodes[0].nodeValue == "AMD") {

      txt += "<td><img src=\"pics/" +
        x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue + "\" width=\"200px\" ><br>" +
        x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>" +
        x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</td>";

      count++;
      read = true;
    }

    if (count == 7 && read == true) {
      txt += "</tr>";
      count = 0;
      read = false;
    }
  }
  document.getElementById("POPULAR_BRANDS").innerHTML += txt;
}

//---------------------------ASUS--------------------//
//---------------------------------------------------//

function getAsusBrands() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      writeAsusProducts(this);
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();
}

function writeAsusProducts(xml) {
  var x, i, xmlDoc, txt;
  var count = 0;
  var read = false;

  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("customers");
  document.getElementById("POPULAR_BRANDS").innerHTML = "<h4 onclick=\"location.href=\'bottom.html\'\" style=\"padding-left:20px; cursor:pointer;\">Back</h4>";
  for (i = 0; i < x.length; i++) {
    if ((count == 0 || count == 7) && read == false)
      txt += "<tr class=\"mbPic_tr\" style=\"text-align: left;\">";

    if (x[i].getElementsByTagName("pbrand")[0].childNodes[0].nodeValue == "ASUS") {

      txt += "<td><img src=\"pics/" +
        x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue + "\" width=\"200px\" ><br>" +
        x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>" +
        x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</td>";

      count++;
      read = true;
    }

    if (count == 7 && read == true) {
      txt += "</tr>";
      count = 0;
      read = false;
    }
  }
  document.getElementById("POPULAR_BRANDS").innerHTML += txt;
}

//---------------------------Kingston--------------------//
//---------------------------------------------------//

function getKingstonBrands() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      writeKingstonProducts(this);
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();
}

function writeKingstonProducts(xml) {
  var x, i, xmlDoc, txt;
  var count = 0;
  var read = false;

  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("customers");
  document.getElementById("POPULAR_BRANDS").innerHTML = "<h4 onclick=\"location.href=\'bottom.html\'\" style=\"padding-left:20px; cursor:pointer;\">Back</h4>";
  for (i = 0; i < x.length; i++) {
    if ((count == 0 || count == 7) && read == false)
      txt += "<tr class=\"mbPic_tr\" style=\"text-align: left;\">";

    if (x[i].getElementsByTagName("pbrand")[0].childNodes[0].nodeValue == "Kingston") {

      txt += "<td><img src=\"pics/" +
        x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue + "\" width=\"200px\" ><br>" +
        x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>" +
        x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</td>";

      count++;
      read = true;
    }

    if (count == 7 && read == true) {
      txt += "</tr>";
      count = 0;
      read = false;
    }
  }
  document.getElementById("POPULAR_BRANDS").innerHTML += txt;
}

//----------------------------TOOLTIP--------------------------//
//-------------------------------------------------------------//
var mbAjaxSetting = {
  context: { index: -1 },
  success: mbCallback,
  responseType: "xml"
};

function mbCallback(response, context) {
  var i;
  var x = response.documentElement.getElementsByTagName("customers");
  for (i = 0; i < x.length; i++) {
    if (x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue == "Motherboard") {
      var pics = x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue;
      var offer = "<p style='color:red; margin-bottom:0px; font-weight:bold;'>Special Offer!</p>";
      var pcat = x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue + "<br>";
      var pname = x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>";
      var price = "<p>Price: " + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "<span style='color:red';> -10% </span></p>";
      var image = "<img src='pics/" + pics + "' style='float:right;margin-left:12px;width:75px;height:75px;' />";
      break;
    }
  }

  return "<div style='width:200px';>" + image + offer + pcat + pname + price + "</div>";
}

var cpuAjaxSetting = {
  context: { index: -1 },
  success: cpuCallback,
  responseType: "xml"
};

function cpuCallback(response, context) {
  var i;
  var x = response.documentElement.getElementsByTagName("customers");
  for (i = 0; i < x.length; i++) {
    if (x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue == "Processor") {
      var pics = x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue;
      var offer = "<p style='color:red; margin-bottom:0px; font-weight:bold;'>Special Offer!</p>";
      var pcat = x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue + "<br>";
      var pname = x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>";
      var price = "<p>Price: " + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "<span style='color:red';> -10%</span></p>";
      var image = "<img src='pics/" + pics + "' style='float:right;margin-left:12px;width:75px;height:75px;' />";
      break;
    }
  }
  return "<div style='width:230px';>" + image + offer + pcat + pname + price + "</div>";
}

var memAjaxSetting = {
  context: { index: -1 },
  success: memCallback,
  responseType: "xml"
};

function memCallback(response, context) {
  var i;
  var x = response.documentElement.getElementsByTagName("customers");
  for (i = 0; i < x.length; i++) {
    if (x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue == "Memory") {
      var pics = x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue;
      var offer = "<p style='color:red; margin-bottom:0px; font-weight:bold;'>Special Offer!</p>";
      var pcat = x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue + "<br>";
      var pname = x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>";
      var price = "<p>Price: " + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "<span style='color:red';> -10%</span></p>";
      var image = "<img src='pics/" + pics + "' style='float:right;margin-left:12px;width:75px;height:75px;' />";
      break;
    }
  }
  return "<div>" + image + offer + pcat + pname + price + "</div>";
}

var caseAjaxSetting = {
  context: { index: -1 },
  success: caseCallback,
  responseType: "xml"
};

function caseCallback(response, context) {
  var i;
  var x = response.documentElement.getElementsByTagName("customers");
  for (i = 0; i < x.length; i++) {
    if (x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue == "PC Case") {

      var pics = x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue;
      var offer = "<p style='color:red; margin-bottom:0px; font-weight:bold;'>Special Offer!</p>";
      var pcat = x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue + "<br>";
      var pname = x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>";
      var price = "<p>Price: " + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "<span style='color:red';> -10%</span></p>";
      var image = "<img src='pics/" + pics + "' style='float:right;margin-left:12px;width:75px;height:75px;margin-top:15px;' />";
      break;
    }
  }
  return "<div style='width:200px';>" + image + offer + pcat + pname + price + "</div>";
}

var monitorAjaxSetting = {
  context: { index: -1 },
  success: monitorCallback,
  responseType: "xml"
};

function monitorCallback(response, context) {
  var i;
  var x = response.documentElement.getElementsByTagName("customers");
  for (i = 0; i < x.length; i++) {
    if (x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue == "Monitors") {
      var pics = x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue;
      var offer = "<p style='color:red; margin-bottom:0px; font-weight:bold;'>Special Offer!</p>";
      var pcat = x[i].getElementsByTagName("pcat")[0].childNodes[0].nodeValue + "<br>";
      var pname = x[i].getElementsByTagName("pname")[0].childNodes[0].nodeValue + "<br>";
      var price = "<p>Price: " + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "<span style='color:red;';> -10%</span></p>";
      var image = "<img src='pics/" + pics + "' style='float:right;margin-left:12px;width:75px;height:75px;' />";
      break;
    }
  }
  return "<div style='width: 230px'>" + image + offer + pcat + pname + price + "</div>";
}