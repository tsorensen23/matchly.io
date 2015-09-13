var React = require('react');

var CheckLogin = React.createClass({
  
  componentWillMount:function(){
    console.log("componentWillMount fires");
    
  },
  render: function(){
    var profileObject={cookie: document.cookie};
    console.log(profileObject, 'profileObject');
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(profileObject),
        url: '/checkLogin',
          success: function(data) {
            console.log(data, "data");
            if(data){
              window.location='/#/home';
            } else {
              window.location='/#/login';
            }

          }.bind(this)      
        });
    console.log(document.cookie,'matchlycookie console');
    return(<div></div>);
  }

});

module.exports=CheckLogin;