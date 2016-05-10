/*----------------设置服务器url & provider的使用-----------------*/
myApp.config(function(MyProviderProvider) {
	MyProviderProvider.setDomain('http://192.168.1.119:8085');
});

myApp.provider('MyProvider', function() {
		var defaultName = '';
		var domain = defaultName;
		this.setDomain = function(newName) {
			domain = newName;
		}
		this.$get = function() {
			var result = {};
			result.domain = domain;
			result.defaultName = defaultName;
			return result;
		}
	})