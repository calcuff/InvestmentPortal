
var UserProfile = (function() {
    var full_name = "";
    var symbols = "";
  
    var getName = function() {
      return full_name;   
    };
  
    var setName = function(name) {
      full_name = name;     
    };

    var setTickers = function(tickers) {
        symbols = tickers;
    };

    var getTickers = function(){
        return symbols;
    }
  
    return {
      getName: getName,
      setName: setName,
      setTickers: setTickers,
      getTickers: getTickers
    }
  
  })();
  
  export default UserProfile;