from asyncio.windows_events import NULL
import string
import random
import os
import image

image_info = image.ImageCaptcha(width=250, height=100)

def id_generator(size=5, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))
captcha_text = id_generator()
source = image_info.generate(captcha_text)
image_info.write(captcha_text, captcha_text +'Captcha.png')

head = """
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <link rel="stylesheet" href="StyleSheet.css" />
    <script src="javascript.js"></script>
</head>
<body>
    <div class="signUpPage">
        <table class="signUpTable">
            <p style="position:absolute; left: 15px; top: 5px; font-size: 20px;">Sign up</p>
            <form name="signup" action="appendxml.py" method="post">

                <tr class="">
                    <input class="usernameSign" type="text" name="sign_user" id="user" required>
                    <label class="usernameLabel" for="user">Username</label>
                </tr>

                <tr class="phNum_tr">
                    <input class="numSign" type="text" name="sign_Num" id="phNum" required>
                    <label class="numLabel" for="phNum">Phone Number</label>
                </tr>
                
                <tr class="email_tr">
                    <input class="emailSign" type="text" name="sign_Email" id="email" required>
                    <label class="emailLabel" for="phNum">Email</label>
                </tr>
                <tr class="pw_tr">
                    <input class="passSign" type="password" name="sign_pw" id="pw" required>
                    <label class="passLabel" for="phNum">Password</label>
                </tr>
"""
print(head)
print ("<input type='hidden' name='test' id='captcha_Text' value=\"" + captcha_text + "\">")

print("<tr>")
print("<img src=\"" + captcha_text + "Captcha.png" + "\"width='150px' class='captchaIMG'>")
appendCaptcha = """
                    <input class="captchaIn" type="text" name="captcha_IN" id="captchaID" required>
                    <label class="captchaLabel">Input Captcha</label>
                </tr>
"""

print(appendCaptcha)

a = """
                <tr>
                    <input class="submitAcc" type="submit" name="submitButton" style="font-size: 12px" value="Submit" onclick="signupAttempt()"">
                    <input class="cancelAcc" type="submit" name="cancel" style="font-size: 12px" value="Cancel" onclick="location.href='loginPage.html'">
                </tr>
            </form>
        </table>
    </div>
</body>
</html>
"""
print(a)