var portfolioApp = angular.module('shoppingListApp',[]);

portfolioApp.controller('ShoppingListCtrl', function($scope) {

    var showArchived = false;

    $scope.clients = [{
        'name': 'Piotr',
        'shopping_list': [{
            'name': 'truskawki',
            'created_at': '2016-12-01'
        },{
            'name': 'marchewka',
            'created_at': '2016-12-02'
        },{
            'name': 'ziemniaki',
            'created_at': '2016-12-03'
        }]
    },{
        'name': 'Andrzej',
        'shopping_list': [{
            'name': 'seler',
            'created_at': '2016-12-01'
        },{
            'name': 'cukinia',
            'created_at': '2016-12-02'
        },{
            'name': 'bakłażan',
            'created_at': '2016-12-03'
        }]
    },{
        'name': 'Franciszek',
        'shopping_list': [{
            'name': 'kurczak',
            'created_at': '2016-12-01'
        },{
            'name': 'indyk',
            'created_at': '2016-12-02'
        },{
            'name': 'wołowina',
            'created_at': '2016-12-03'
        }]
    }];

    $scope.addItem = function addItem(clientName) {
        var itemName = $('#add-'+clientName)[0].value;

        if(itemName.length < 1)
            return;
        for (client of $scope.clients) {
            if (client.name == clientName) {
                client.shopping_list.push({
                    name: itemName,
                    created_at: Date.now()
                })
            }
        }

        $('#add-'+clientName)[0].value = '';
    };

    $scope.archive = function archive(clientName, itemName) {
        for (client of $scope.clients) {
            if (client.name == clientName) {
                for (item of client.shopping_list) {
                    if(item.name == itemName) {
                        if(item.checked){
                            item.checked = false;
                        } else {
                            item.checked = true;
                        }
                    }
                }
            }
        }
    };

    $scope.archiveFilter = function(item) {
        $scope.setColors();

        if(!showArchived){
            return item.checked != true;
        } else {
            return true;
        }
    };

    $scope.showHideArchived = function() {
        showArchived = !showArchived;
    };

    $scope.activeItems = function activeItems(clientName) {
        var active = 0;
        for (client of $scope.clients) {
            if (client.name == clientName) {
                for (item of client.shopping_list) {
                    if(item.checked != true) {
                        active++;
                    }
                }
            }
        }
        return active;
    };

    $scope.allItems = function allItems(clientName) {
        for (client of $scope.clients) {
            if (client.name == clientName) {
               return client.shopping_list.length
            }
        }
    };

    $scope.setColors = function setColors() {
        for (var cl of $scope.clients) {
            if($scope.activeItems(cl.name) < 3){
                $('#' + cl.name + '-list')[0].className = 'col-lg-3 col-md-5 col-sm-12 shopping-list ng-scope red';
            } else if($scope.activeItems(cl.name) < 5) {
                $('#' + cl.name + '-list')[0].className = 'col-lg-3 col-md-5 col-sm-12 shopping-list ng-scope green';
            } else {
                $('#' + cl.name + '-list')[0].className = 'col-lg-3 col-md-5 col-sm-12 shopping-list ng-scope blue';
            }
        }
    };
});


