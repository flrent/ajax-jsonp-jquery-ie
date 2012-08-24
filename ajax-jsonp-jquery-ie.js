(function () {
        //**
        //* You need to require this helper,
        //* then to call it with the following arguments,
        //* a type ("get", ou "post"),
        //* a url to call, a data object for POST request (send null for GET request),
        //* a successCallback function and an errorCallback function
        //*
        //*
        //* if you have questions, issues : @flrent
        //*
        //**
        var $ = this.jQuery;
        var TYPE_GET = "get";
        $.support.cors = true;
        var jsonpAjaxIEsafe = function(type, url, data, successCallback, errorCallback) {
            if ($.browser.msie && window.XDomainRequest) {
                // Use Microsoft XDR
                var xdr = new XDomainRequest();
                    
                    xdr.onerror = errorCallback;
                    xdr.timeout = 5000;

                    xdr.ontimeout = function () {};
                    xdr.onprogress = function () {};
                    xdr.onload = function() {
                        var dom = new ActiveXObject("Microsoft.XMLDOM");
                        dom.async = false;
                        dom.loadXML(xdr.responseText);
                        successCallback(JSON.parse(xdr.responseText));
                    };

                if(type==TYPE_GET) {
                    xdr.open("get", url);

                    setTimeout(function () {
                        xdr.send();
                    }, 200);
                }
                else {
                    xdr.open("post", url);

                    setTimeout(function () {
                        xdr.send(JSON.stringify(data)); // you have to handle stringified data on the server
                    }, 200);
                }
            } else {
                $.ajax({
                    type: type == TYPE_GET ? "GET" : "POST",
                    url: url,
                    data: type == TYPE_GET ? null : data,
                    dataType: 'json',
                    error:errorCallback
                }).done(successCallback);
            }
        };
        return jsonpAjaxIEsafe;
    }
).call(this);
