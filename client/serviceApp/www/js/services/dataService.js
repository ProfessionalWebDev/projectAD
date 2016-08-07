serveApp.service('dataService', function() {
	return {
        setData : setData,
        getData : getData,
        shared_data : {} 
    }

    function setData(data) {		
        this.shared_data = data
    }

    function getData() {
        return this.shared_data
    } 
})