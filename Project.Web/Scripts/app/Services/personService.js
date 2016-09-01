var personService = angular.module('personModule');
personService.service('personService', ['$http', '$q', 'globalVar',
function ($http, $q, globalVar) {
    this.getPeople = function () {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(globalVar.webApiUrl+'person/get').success(function (data, status, headers, config) {
            defered.resolve(data); 
        }).error(function (data, status, headers, config) {
            if (status === 400) {
                defered.reject(data);
            } else {
                throw new Error("Fallo obtener los datos:" + status + "\n" + data);
            }
        });
        return promise;
    };
    this.updatePerson = function (person) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post(globalVar.webApiUrl + 'person/updateperson', person).success(function (data, status, headers, config) {
            defered.resolve(data);
        }).error(function (data, status, headers, config) {
            if (status === 400) {
                defered.reject(data);
            } else {
                throw new Error("Fallo obtener los datos:" + status + "\n" + data);
            }
        });
        return promise;
    };
    this.insertPerson = function (person) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post(globalVar.webApiUrl + 'person/insertperson', person).success(function (data, status, headers, config) {
            defered.resolve(data);
        }).error(function (data, status, headers, config) {
            if (status === 400) {
                defered.reject(data);
            } else {
                throw new Error("Fallo obtener los datos:" + status + "\n" + data);
            }
        });
        return promise;
    };
    this.deletePerson = function (person) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post(globalVar.webApiUrl + 'person/deleteperson', person).success(function (data, status, headers, config) {
            defered.resolve(data);
        }).error(function (data, status, headers, config) {
            if (status === 400) {
                defered.reject(data);
            } else {
                throw new Error("Fallo obtener los datos:" + status + "\n" + data);
            }
        });
        return promise;
    };
}]);