import xml.etree.ElementTree as ET
from http import cookies
import cgi, cgitb

from datetime import date

form = cgi.FieldStorage()
id = 0

pics = form.getvalue('pics')
name = form.getvalue('name')
email = form.getvalue('email')

expires = 30*60
mycookie = cookies.SimpleCookie()

mycookie["Name"] = name
mycookie["email"] =  email
mycookie["pics"] =  pics
mycookie["isLoggedin"] = 1
mycookie["email"]['expires']= expires

tree = ET.parse('customerOrders.xml')
root = tree.getroot()
for type_tag in tree.findall('customers'):
    id=id + 1

b = ET.SubElement(root, 'customers')
custid = ET.SubElement(b, 'cid')
custid.text = str(id + 1)
custadd = ET.SubElement(b, 'address')
custadd.text = 'N/A'
custemail = ET.SubElement(b, 'email')
custemail.text = email
custnum = ET.SubElement(b, 'number')
custnum.text = 'N/A'
dateregistered = ET.SubElement(b, 'date')
dateregistered.text = str(date.today())

custUser = ET.SubElement(b, 'username')
custUser.text = "N/A"
custPass = ET.SubElement(b, 'password')
custPass.text = "N/A"

b_xml=ET.tostring(root)

with open("customerOrders.xml", "wb") as f:
    f.write(b_xml)

print (mycookie)
print( "Content-type:text/html\n")
print( "<script>window.close();</script>")
# print( "<script>refreshParent();</script>")