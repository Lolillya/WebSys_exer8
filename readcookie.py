from http import cookies
import os


name = ""
email = ""

if 'HTTP_COOKIE' in os.environ:
    cookie_string=os.environ.get('HTTP_COOKIE')
    mycookie=cookies.SimpleCookie()
    mycookie.load(cookie_string)
    try:
        name=mycookie['Name'].value
        email = mycookie['email'].value
        pics = mycookie['pics'].value
        
    except KeyError:
        name = ""
        email = ""

print( "Content-type:text/html\n")
print(name)
print(email)
print(pics)