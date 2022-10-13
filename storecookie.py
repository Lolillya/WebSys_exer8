from http import cookies
import os
import cgi, cgitb


name = ""
email = ""

form = cgi.FieldStorage()

name = form.getvalue('name')
email = form.getvalue('email')


expires = 60*60
mycookie = cookies.SimpleCookie()
mycookie["Name"] = name
mycookie["email"] =  email
mycookie["email"]['expires']= expires


