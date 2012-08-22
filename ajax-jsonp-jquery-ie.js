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
                    xdr.onload = function() {
                        // XDomainRequest doesn't provide responseXml, so if you need it:
                        var dom = new ActiveXObject("Microsoft.XMLDOM");
                        dom.async = false;
                        dom.loadXML(xdr.responseText);
                        successCallback(JSON.parse(xdr.responseText));
                    };

                if(type==TYPE_GET) {
                    xdr.open(TYPE_GET, url);
                    xdr.send();
                }
                else {
                    xdr.open("post", url);
                    xdr.send(data);
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
