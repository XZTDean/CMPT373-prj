import { any } from "prop-types";
import React from "react";


(function mockData($){
    var initM = [
        {"title": 'Hello1',
        "username": null,
        "firstName": null,
        "lastName": null,
        "department": null,
        "timestamp": "2021-10-11T15:43:15.515427",
        "content": "Hello from NICU!",
        "replies": []},

        {"title": 'Hello2',
        "username": null,
        "firstName": null,
        "lastName": null,
        "department": null,
        "timestamp": "2021-10-11T15:43:15.515427",
        "content": "Hello from Rehab!",
        "replies": []},

        {"title": 'Hello3',
        "username": null,
        "firstName": null,
        "lastName": null,
        "department": null,
        "timestamp": "2021-10-11T15:43:15.515427",
        "content": "Hello from Hardy!",
        "replies": []}
    ],
    resArr =  $.extend([],initM);
    
    Mock.mock(/\/get/,function(options){ 
        return {status: 'success', data: resArr};
    }).mock(/\/post/,function(options){ 
        var arr = options.body.split('&'),obj = {};
        arr.map(function(item){
            var items = item.split('=');
            obj[items[0]] = decodeURIComponent(decodeURIComponent(items[1]));
        })
        resArr.push(obj);
    })
})(jQuery)