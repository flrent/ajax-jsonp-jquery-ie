#Use jQuery JSONP ajax function with IE, safely
On a project i noticed that IE was not able to do cross domain requests with jQuery. As a fix, we needed to use the native IE object to handle this request.

So i created a simple module/helper for backbone-boilerplate.
All you need is to call this function instead of $.ajax and it will work.
See the source for required arguments and more details.

If you have questions, issues, @flrent on twitter.
