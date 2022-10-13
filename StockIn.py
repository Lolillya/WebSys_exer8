from xml.dom.minidom import parse
import xml.dom.minidom

DOMTree = xml.dom.minidom.parse("products.xml")
collection = DOMTree.documentElement
print("Content-Type: text/html\n")


link_Head = """
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="jquery.dataTables.min.css" />
    <link type="text/css" rel="stylesheet" href="/StyleSheet.css" />

    <script src="javascript.js"></script>
    <script type="text/javascript" src="jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="jquery.dataTables.min.js"></script>
</head>
"""
print(link_Head)
print("<body>")
stock_In = """<div class="stockIn_div">
        <td>
            <tr>
                <h4 style="left: 15px; position: relative;">Stock In</h4>

                <input class="prodId_input" type="text" id="productID" required>
                <label class="prodID_label" for="productID"><br />Product ID</label>

                <input class="prodCategory_input" type="text" id="prodCat" required>
                <label class="prodCategory_label" for="prodCat"><br />Product Category</label>

                <input class="prodName_input" type="text" id="prodName" required>
                <label class="prodName_label" for="prodName"><br />Product Name</label>

                <input class="prodQty_input" type="number" id="prodQty" required>
                <label class="prodQty_label" for="prodQty"><br />Quantity</label>

                <div class="uploadIMG">Choose File</div>
                <label class="uploadIMG_label">No File Chosen</label>
            </tr>
        </td>
        <div class="submitSock">Submit</div>
    </div>"""
print(stock_In)
body_table = """
    <div class="stockIn_list">
        <table class="stockIn_table" id="StockIn_ID">
            <thead>
                <tr style="font-size: 15px;">
                    <th style="width: 90px;">Product ID</th>
                    <th style="width: 90px;">Product Category</th>
                    <th style="width: 90px;">Product Name</th>
                    <th style="width: 90px;">Picture</th>
                    <th style="width: 90px;">Price</th>
                    <th style="width: 90px;">Quantity</th>
                    <th style="width: 90px;">Date</th>
                </tr>
            </thead>
            <tbody>
"""
print(body_table)

products = collection.getElementsByTagName("customers")
for product in products:
    print("<tr class=\"list_tr\">")
    cid = product.getElementsByTagName('cid')[0]
    print("<td class=\"catalog_info\">" + cid.childNodes[0].data + "</td>")
    pcat = product.getElementsByTagName('pcat')[0]
    print("<td class=\"catalog_info\">" + pcat.childNodes[0].data + "</td>")
    pname = product.getElementsByTagName('pname')[0]
    print("<td class=\"catalog_info\">" + pname.childNodes[0].data + "</td>")
    pic = product.getElementsByTagName('picture')[0]
    print("<td class=\"catalog_info\"><img src=\"pics/" + pic.childNodes[0].data + "\"width='60px'\"></td>")
    price = product.getElementsByTagName('price')[0]
    print("<td class=\"catalog_info\">" + price.childNodes[0].data + "</td>")
    quantity = product.getElementsByTagName('quantity')[0]
    print("<td class=\"catalog_info\">" + quantity.childNodes[0].data + "</td>")
    date = product.getElementsByTagName('date')[0]
    print("<td class=\"catalog_info\">" + date.childNodes[0].data + "</td>")
    print("</tr>")
test = """
            </tbody>
        </table>
    </div>

    <script>
        $('#StockIn_ID').DataTable();
    </script>
</body>
</html>
"""
print(test)