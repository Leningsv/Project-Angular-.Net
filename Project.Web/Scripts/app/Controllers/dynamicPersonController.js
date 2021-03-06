﻿var dynamicPersonController = angular.module('personModule')
dynamicPersonController.controller('dynamicPersonController', ['$scope','personService',
function ($scope, personService) {
    //------------- Declaracion de Variables------------------//
    $scope.update = false;
    $scope.people = [];
    $scope.personDetail = {};
    $scope.personInsert = {
        id: 0,
        firstName: '',
        lastName: '',
        cedula: '',
        stateInsert: 'Pendiente',
        styleInsert: 'info'
    };
    //Variables Tabla Dinamica
    $scope.pageNumber = 0;
    $scope.pageSizes = [5, 10, 15, 20];
    $scope.pageSize = $scope.pageSizes[0];
    $scope.currentPage = 0;
    $scope.numberElements = 0;
    //Inicializando Variables Carga de Datos
    $scope.getPeople = function () {
        $scope.people = [];
        var people = personService.getPeople();
        people.then(function (people) {
            people.forEach(function (person) {
                person.stateUpdate = false;
                person.stateUpdateMessage = 'Pendiente';
                person.styleUpdateMessage = 'info';
                $scope.people.push(person);
            }, this);
            //Ajustando los valores de la tabla
            $scope.numberElements = $scope.people.length;
            $scope.pageNumber = Math.ceil($scope.people.length / $scope.pageSize);
        }, function (error) { });
    };
    $scope.getPeople();
    //Funcion carga detalles persona
    $scope.loadPerson = function (person) {
        $scope.personDetail = person;
    };
    //Funcion Actualizar
    $scope.updatePerson = function (person) {
        var updatePerson = personService.updatePerson(person);
        updatePerson.then(function (data) {
            person.stateUpdateMessage = 'Completado';
            person.styleUpdateMessage = 'success';
        });
    };
    //Funcion Insertar
    $scope.insertPerson = function (person) {
        $scope.personInsert.stateInsert ='Procesando';
        $scope.personInsert.styleInsert ='warning';
        var insertPerson = personService.insertPerson(person);
        insertPerson.then(function (data) {
            $scope.getPeople();
            $scope.personInsert.stateInsert = 'Completado';
            $scope.personInsert.styleInsert = 'success';
        });
    };
    //Funcion eliminar
    $scope.deletePerson = function (person) {
        var deletePerson = personService.deletePerson(person);
        deletePerson.then(function (data) {
            $scope.getPeople();
        });
    };
    // Funciones tabla dinamica
    // Funcion para ordenar los elementos de una Tabla
    $scope.ordering = function (ordVar, by) {
        ordVar = !ordVar;
        $scope.ordStatus = ordVar;
        $scope.ord = by;
        $scope.currentPage = 0;
        return ordVar;
    };
    // Funcion para paginar
    $scope.paging = function (type) {
        if (type == 0 && ($scope.currentPage > 0)) {
            --$scope.currentPage;
        } else if (type == 1 && $scope.currentPage < $scope.pageNumber - 1) {
            ++$scope.currentPage;
        }
    };
    // Funcion para Buscar
    $scope.search = function (item) {
        if ($scope.searchComplete == undefined) {
            return true;
        }
        else {
            if (String(item.id).indexOf($scope.searchComplete.toLowerCase()) != -1 ||
            item.firstName.toLowerCase().indexOf($scope.searchComplete.toLowerCase()) != -1 ||
            item.lastName.toLowerCase().indexOf($scope.searchComplete.toLowerCase()) != -1 ||
            item.cedula.toLowerCase().indexOf($scope.searchComplete.toLowerCase()) != -1) {
                return true;
            }
        }
        return false;
    };
    // Para que el numero de paginas se ajuste a la paginacion
    $scope.changeAction = function () {
        $scope.currentPage = 0;
        $scope.pageNumber = Math.ceil($scope.result.length / $scope.pageSize);
    }
    // Funcion para el Estado Insert
    $scope.cleanPersonInsert = function () {
        $scope.personInsert = {
            id: 0,
            firstName: '',
            lastName: '',
            cedula: '',
            stateInsert: 'Pendiente',
            styleInsert: 'info'
        };
    };
    // Funcion para el Estado Update
    $scope.cleanPersonUpdate = function (person) {
        person.stateUpdate = false;
        if (person.stateUpdateMessage == 'Completado') {
            person.stateUpdateMessage = 'Pendiente';
            person.styleUpdateMessage = 'info'
        }        
    };
    // Funcion para cambiar el stado a procesando en update
    $scope.changeStateUpdate = function (person) {
        person.stateUpdateMessage = 'Procesando';
        person.styleUpdateMessage = 'warning';
    };
}]);