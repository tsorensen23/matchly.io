var React=require('react');


var Visitor=React.createClass({
  render:function(){
  console.log(this.props.visitor,'visitor');
    return(
      <div className='tableDive'>
        <div id="dataTable">
          <table>
            <tr>
              <td>
                {this.props.visitor.visitorName}
              </td>
              <td>
                {this.props.visitor.hostName}
              </td>
              <td>
                {this.props.visitor.hostEmail}
              </td>
              <td>
                {this.props.visitor.section}
              </td>
              <td>
                {this.props.visitor.visitTime}
              </td>
              <td>
                {this.props.visitor.matchScore}
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
});

module.exports=Visitor;
