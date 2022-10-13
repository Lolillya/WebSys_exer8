from xml.dom.minidom import parse
import xml.dom.minidom

DOMTree = xml.dom.minidom.parse("customerOrders.xml")
collection = DOMTree.documentElement
print("Content-Type: text/html\n")

link_Head = """
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
print(link_Head)

body = """
<body>
    <div class="Customer_div">
        <table class="Customer_table" id="CustID">
            <thead>
                <tr class="Customer_Cat" style="font-size: 15px;">
                    <th class="Customer_category">Customer ID</th>
                    <th class="Customer_category">Customer Address</th>
                    <th class="Customer_category">Customer Email</th>
                    <th class="Customer_category">Contact No.</th>
                    <th class="Customer_category">Date Registered</th>
                </tr>
            </thead>
            <tbody>
"""
print(body)
customers = collection.getElementsByTagName("customers")
for customer in customers:
    print("<tr class=\"Customer_tr\">")
    cid = customer.getElementsByTagName("cid")[0]
    print("<td class=\"Customer_info\" style=\"width:270px\">" + cid.childNodes[0].data + "</td>")
    address = customer.getElementsByTagName("address")[0]
    print("<td class=\"Customer_info\" style=\"width:270px\">" + address.childNodes[0].data + "</td>")
    email = customer.getElementsByTagName("email")[0]
    print("<td class=\"Customer_info\" style=\"width:270px\">" + email.childNodes[0].data + "</td>")
    number = customer.getElementsByTagName("number")[0]
    print("<td class=\"Customer_info\" style=\"width:270px\">" + number.childNodes[0].data + "</td>")
    date = customer.getElementsByTagName("date")[0]
    print("<td class=\"Customer_info\" style=\"width:270px\">" + date.childNodes[0].data + "</td>")
    print("</tr>")

html_close = """
            </tbody>
        </table>
    </div>
    <script>
        $('#CustID').DataTable();
    </script>
</body>

</html>
"""
print(html_close)