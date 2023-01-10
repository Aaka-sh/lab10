(function () {
  "use strict";

  angular
    .module("myApp", ["ngRoute"])

    .controller("MyController", function ($scope, $http) {
      $http.get("http://localhost:3001/").then(function (response) {
        $scope.datas = response.data;
        $scope.orderByMe = function (x) {
          $scope.myOrderBy = x;
        };

        $scope.changeColorFilter = function (item) {
          if (item.spice == "High") {
            item.class = "High";
          } else if (item.spice == "Low") {
            item.class = "Low";
          } else {
            item.class = "Medium";
          }

          return true;
        };
      });
    })

    .controller("createController", function ($scope) {
      $scope.createEntry = function () {
        var newData =
          '{"product_id":"' +
          $scope.product_id +
          '", "product_name":"' +
          $scope.product_name +
          '", "product_price":"' +
          $scope.product_price +
          '", "product_cat":"' +
          $scope.product_cat +
          '"}';

        fetch("http://localhost:3001/new", {
          method: "POST",
          body: newData,
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((response) => response.json())
          .then((json) => console.log(json))
          .catch((err) => console.log(err));
        $scope.product_id = "";
        $scope.product_name = "";
        $scope.product_price = "";
        $scope.product_cat = "";
      };
    })

    .controller("updateController", function ($scope, $http) {
      $http.get("http://localhost:3001/").then(function (response) {
        $scope.datas = response.data;
      });

      $scope.getId = function () {
        console.log("hi");
        var selectedId = $scope.product_id;
        console.log("hi", selectedId);
        $scope.product_name = selectedId["product_name"];
        $scope.product_price = selectedId["product_price"];
        $scope.product_cat = selectedId["product_cat"];
      };

      $scope.updateEntry = function () {
        var newData =
          '{"product_id":"' +
          $scope.product_id["product_id"] +
          '", "product_name":"' +
          $scope.product_name +
          '", "product_price":"' +
          $scope.product_price +
          '", "product_cat":"' +
          $scope.product_cat +
          '"}';

        console.log(newData);
        fetch("http://localhost:3001/update", {
          method: "POST",
          body: newData,
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((response) => response.text())
          .then((text) => console.log(text))
          .catch((err) => console.log(err));
        // console.log(response)
        $scope.product_id = "";
        $scope.product_name = "";
        $scope.product_price = "";
        $scope.product_cat = "";
      };
    })

    .controller("searchController", function ($scope, $http) {
      $http.get("http://localhost:3001/").then(function (response) {
        $scope.data1 = response.data;
      });
      $scope.getData = function () {
        var searchJson = { searchid: $scope.searchid.product_id };
        var jsonObj = JSON.stringify(searchJson);
        fetch("http://localhost:3001/search", {
          method: "POST",
          body: jsonObj,
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            $scope.datas = json;
          })
          .catch((err) => console.log(err));
      };
    })

    .controller("deleteController", function ($scope, $http) {
      $http.get("http://localhost:3001/").then(function (response) {
        $scope.datas = response.data;
      });
      $scope.deleteEntry = function () {
        var delJson = { delID: $scope.del.product_id };
        var jsonObj = JSON.stringify(delJson);

        fetch("http://localhost:3001/delete", {
          method: "POST",
          body: jsonObj,
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((response) => response.json())
          .then((json) => console.log(json))
          .catch((err) => console.log(err));
        $scope.del = "";
      };
    })

    .config(function ($routeProvider) {
      $routeProvider
        .when("/", {
          templateUrl: "view.html",
        })
        .when("/create", {
          templateUrl: "create.html",
          controller: "createController",
        })
        .when("/update", {
          templateUrl: "update.html",
          controller: "updateController",
        })
        .when("/search", {
          templateUrl: "search.html",
          controller: "searchController",
        })
        .when("/delete", {
          templateUrl: "delete.html",
          controller: "deleteController",
        });
    })
    .config([
      "$locationProvider",
      function ($locationProvider) {
        $locationProvider.hashPrefix("");
      },
    ]);
})();
