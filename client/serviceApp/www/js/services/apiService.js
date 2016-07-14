serveApp.factory('API', ['$http', 'ipAddress', function($http, base) {
	this.base = base;	
return{	
  getAll: function(apiUrl) {
    return $http.get(base + apiUrl, {
      method: 'GET'
    });
  },
  getOne: function(apiUrl, id) {
    return $http.get(base + apiUrl + id, {
      method: 'GET'
    });
  },
  saveItem: function(apiUrl, form) {
    return $http.post(base + apiUrl, form, {
      method: 'POST'
    });
  },
  putItem: function(apiUrl, id, form) {
    return $http.put(base + apiUrl + id, form, {
      method: 'PUT'
    });
  },
  deleteItem: function(apiUrl, id) {
    return $http.delete(base + apiUrl + id, {
      method: 'DELETE'
    });
  }
}
}]);