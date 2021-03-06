var shopApp = angular.module('appControlers',[]);

shopApp.constant("authUrl", "http://localhost:5500/users/login");

shopApp.factory('Data', function(){
    return { Items: null };
});

shopApp.controller('ShopCtrl', function($scope, $http , Data) {

    var showArchived = false;

    $http.get('http://localhost:5500/products' ).then(
        function(response) {
            if(Data.Items == null){
                $scope.items=response.data;
                Data.Items = $scope.items
            } else {
                $scope.items = Data.Items
            }
            $scope.setCategories();
            $scope.setCart();

        },
        function(errResponse) {
            alert('Can not access data');
            console.log('Something went wrong: ' , errResponse);
        }
    );

    $scope.categories = [];
    $scope.orderProp = $scope.categories[0];

    $scope.categoriesContain = function (category) {
        for (cat of $scope.categories) {
            if (cat == category)
                return true;
        }
        return false;
    };

    $scope.setCategories = function () {
        $scope.categories = [];
        for (item of $scope.items) {
            if(!$scope.categoriesContain(item.category)){
                $scope.categories.push(item.category)
            }
        }
    };

    $scope.setCart = function() {
        for(item of $scope.items){
            if(item.cart)
                $('#button-' + item.title)[0].className = "btn btn-danger right"
            else
                $('#button-' + item.title)[0].className = "btn btn-default right"
        }
    }


    $scope.addItem = function addItem() {
        var title = $('#item-title')[0].value;
        var price = $('#item-price')[0].value;
        var category = $('#item-category')[0].value;

        if(title.length < 1 || price.length < 1 || category.length < 1)
            return;

        $scope.items.push({
            title: title,
            price: price,
            category: category,
            cart: false
        })

        $('#item-title')[0].value = '';
        $('#item-price')[0].value = '';
        $('#item-category')[0].value = '';
        $scope.setCategories();
    };

    $scope.categoryFilter = function(item) {
        if($('#category-picker')[0].value == "?") {
            return true;
        } else if(item.category == $('#category-picker')[0].value.split(":")[1]) {
            return true
        }

        return false;
    };

    $scope.addOrRemoveCart = function addOrRemoveCart(title) {
        for (item of $scope.items) {
            if(item.title == title) {
                item.cart = !item.cart;
                if(item.cart)
                    $('#button-' + title)[0].className = "btn btn-danger right"
                else
                    $('#button-' + title)[0].className = "btn btn-default right"
            }
        }
        Data.Items = $scope.items
    };

    $scope.showHideArchived = function() {
        showArchived = !showArchived;
    };

    $scope.allItems = function allItems(clientName) {
        for (client of $scope.clients) {
            if (client.name == clientName) {
               return client.shopping_list.length
            }
        }
    };

    $scope.byRange = function (fieldName, minValue, maxValue) {
        if (minValue === undefined) minValue = Number.MIN_VALUE;
        if (maxValue === undefined) maxValue = Number.MAX_VALUE;

        return function predicateFunc(item) {
            return minValue <= item['price'] && item['price'] <= maxValue;
        };
    };

});


shopApp.controller('BasketCtrl', function($scope, Data) {
    $scope.items = Data.Items

    $scope.cartFilter = function(item) {
       return item.cart;
    };

    $scope.addOrRemoveCart = function addOrRemoveCart(title) {
        for (item of $scope.items) {
            if(item.title == title) {
                item.cart = !item.cart;
            }
        }
        Data.Items = $scope.items
    };
});

shopApp.controller('OrderCtrl', function($scope,$http, Data) {
    $scope.items = Data.Items

    $scope.submitForm = function(isValid) {

        checked_items = [];
        for(item of $scope.items){
            if(item.cart == true){
                checked_items.push(item);
            }
        }
        if (isValid) {
            for (item of checked_items) {
                $http.post('http://localhost:5500/orders', {name: userForm.name.value, address: userForm.address.value, item: item.title }, {headers: {'Content-Type': 'application/json'}}).then(
                    function (response) {
                        return response;
                    }
                );
            }
        }
    };
});

shopApp.controller('LoginCtrl', function($scope,$http, $location, authUrl) {

    $scope.authenticate = function (user, pass) {
        $http.post(authUrl, {username: user, password: pass}, {withCredentials: true})
            .success(function (data) {
                $location.path("/main");
            })
            .error(function (error) {
                $scope.authenticationError = error;
            });
    }
    $scope.submitForm = function(isValid) {

        checked_items = [];
        for(item of $scope.items){
            if(item.cart == true){
                checked_items.push(item);
            }
        }

        if (isValid) {
           authCtrl.authenticate('admin', 'secret');
        }
    };


});