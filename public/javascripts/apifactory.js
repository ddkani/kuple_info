angular.module('kuple_info')

.factory('APIFactory', function ($http){

return {
    retriveData : function (callback, date, type) {
        $http({
            method : 'POST',
            url : '/api/retrive',
            data : {type: type, date : date}
        }).then(
            function (data)
            {
                var d = data.data;
                callback(null, d);
            },
            function (err)
            {
                callback(err)
            }
        )
    },

    saveData : function (callback, date, type, data) {
        $http({
            method : 'POST',
            url : '/api/save',
            data : {type: type, date : date, data : data}
        }).then(
            function (data)
            {
                var d = data.data;
                callback(null, d);
            },
            function (err)
            {
                callback(err)
            }
        )

    },

    doLogin : function (callback, form) {
        $http({
            method : 'POST',
            url : '/api/login',
            data : form
        }).then(
            function (data)
            {
                var d = data.data;
                callback(null, d);
            },
            function (err)
            {
                callback(err)
            }
        )
    }
}

});