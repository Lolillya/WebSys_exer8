from xml.dom.minidom import parse
import xml.dom.minidom


DOMTree = xml.dom.minidom.parse("Orders.xml")
collection = DOMTree.documentElement
print("Content-Type: text/html\n")

head_link = """
<!DOCTYPE html>
<html lang="en">

<head>
    <title></title>
    <link rel="stylesheet" href="StyleSheet.css" />
    <link rel="stylesheet" href="jquery.dataTables.min.css"/>

    <script src="javascript.js"></script>
    <script type="text/javascript" src="jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="jquery.dataTables.min.js"></script>

</head>
"""
print(head_link)
body = """
<body>
    <div class="orderList">
        <table class="orderTable" id="orderID">
            <thead>
                <tr class="orderCategory_tr" style="font-size: 15px">
                    <th class="orderCategory">Customer ID</th>
                    <th class="orderCategory">Product ID</th>
                    <th class="orderCategory">Product Category</th>
                    <th class="orderCategory">Product Name</th>
                    <th class="orderCategory">Product Price</th>
                    <th class="orderCategory">Quantity</th>
                    <th class="orderCategory">Date Ordered</th>
                </tr>
            </thead>
            <tbody>
            """
print(body)
orders = collection.getElementsByTagName("Customer")
for order in orders:
    print("<tr class=\"orderList_tr\">")
    cid = order.getElementsByTagName("cid")[0]
    print("<td class=\"orderInfo\" style=\"width:200px\">" + cid.childNodes[0].data + "</td>")
    pid = order.getElementsByTagName("pid")[0]
    print("<td class=\"orderInfo\" style=\"width:200px\">" + pid.childNodes[0].data + "</td>")
    pcat = order.getElementsByTagName("pcat")[0]
    print("<td class=\"orderInfo\" style=\"width:200px\">" + pcat.childNodes[0].data + "</td>")
    pname = order.getElementsByTagName("pname")[0]
    print("<td class=\"orderInfo\" style=\"width:200px\">" + pname.childNodes[0].data + "</td>")
    price = order.getElementsByTagName("price")[0]
    print("<td class=\"orderInfo\" style=\"width:200px\">" + price.childNodes[0].data + "</td>")
    quantity = order.getElementsByTagName("quantity")[0]
    print("<td class=\"orderInfo\" style=\"width:200px\">" + quantity.childNodes[0].data + "</td>")
    date = order.getElementsByTagName("date")[0]
    print("<td class=\"orderInfo\" style=\"width:200px\">" + date.childNodes[0].data + "</td>")
    print("</tr>")

body_end = """
            </tbody>
        </table>
    </div>
    <script>
        $('#orderID').DataTable();
    </script>
    </body>
    </html>
"""
print(body_end)