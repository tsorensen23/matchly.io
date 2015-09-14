var React=require('react');

var Available=React.createClass({
  sendClassConstraints:function() {
    var A1=parseInt($('.A1').val());
    var A2=parseInt($('.A2').val());
    var A3=parseInt($('.A3').val());
    var B1=parseInt($('.B1').val());
    var B2=parseInt($('.B2').val());
    var B3=parseInt($('.B3').val());
    var C1=parseInt($('.C1').val());
    var C2=parseInt($('.C2').val());
    var C3=parseInt($('.C3').val());
    var D1=parseInt($('.D1').val());
    var D2=parseInt($('.D2').val());
    var D3=parseInt($('.D3').val());
    var E1=parseInt($('.E1').val());
    var E2=parseInt($('.E2').val());
    var E3=parseInt($('.E3').val());

    var dataObject={
      A1:{ availableSpots: A1,
        lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      A2:{ availableSpots: A2,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      A3:{ availableSpots: A3,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      B1:{ availableSpots: B1,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      B2:{ availableSpots: B2,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      B3:{ availableSpots: B3,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      C1:{ availableSpots: C1,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      C2:{ availableSpots: C2,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      C3:{ availableSpots: C3,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      D1:{ availableSpots: D1,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      D2:{ availableSpots: D2,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      D3:{ availableSpots: D3,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      E1:{ availableSpots: E1,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      E2:{ availableSpots: E2,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          },
      E3:{ availableSpots: E3,
          lowestScore: 10000000000,
        lowestIndex: null,
           matches: {
            exists: 'yes'
           }
          }
    };
    console.log(dataObject, 'dataObject');
      $.ajax({
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(dataObject),
          url: '/availability',
            success: function(data) {
              console.log(data, "data");
              alert('success!');
            }.bind(this)
      });
  },

  render:function() {
    return(
      <div id='available-box'>
        <div id='date'>
        </div>
        <div id="nav">
          <div id='tabs'>
            <ul>
              <li id="match" onClick={this.props.setWorkArea.bind(this,0)}>MATCH</li>
              <li id="available" onClick={this.props.setWorkArea.bind(this,1)}>AVAILABLE</li>
              <li id="upload" onClick={this.props.setWorkArea.bind(this,2)}>UPLOAD</li>
            </ul>
        </div>
        </div>
        <div id='classAvailable'>
          <form onSubmit={this.sendClassConstraints}>
            <table>
                <div id="topRow">
                <tr>
                  <div id="topRowTitles">
                    <h3 className='sections'></h3>
                    <h3 className='sections'>A</h3>
                    <h3 className='sections'>B</h3>
                    <h3 className='sections'>C</h3>
                    <h3 className='sections'>D</h3>
                    <h3 className='sections'>E</h3>
                  </div>
                </tr>
                </div>
              <br></br>
              <tr>
                <h3 className='row-title sections'>8:00 AM</h3>
                <input type='number' className='A1 sections' required defaultValue={this.props.availableData.A1.availableSpots} ></input>
                <input type='number' className='B1 sections' required defaultValue={this.props.availableData.B1.availableSpots} ></input>
                <input type='number' className='C1 sections' required defaultValue={this.props.availableData.C1.availableSpots} ></input>
                <input type='number' className='D1 sections' required defaultValue={this.props.availableData.D1.availableSpots} ></input>
                <input type='number' className='E1 sections' required defaultValue={this.props.availableData.E1.availableSpots} ></input>
              </tr>
              <br></br>
              <tr>
                <h3 className='row-title sections'>10:00 AM</h3>
                <input type='number' className='A2 sections' required defaultValue={this.props.availableData.A2.availableSpots} ></input>
                <input type='number' className='B2 sections' required defaultValue={this.props.availableData.B2.availableSpots} ></input>
                <input type='number' className='C2 sections' required defaultValue={this.props.availableData.C2.availableSpots} ></input>
                <input type='number' className='D2 sections' required defaultValue={this.props.availableData.D2.availableSpots} ></input>
                <input type='number' className='E2 sections' required defaultValue={this.props.availableData.E2.availableSpots} ></input>
              </tr>
              <br></br>
              <tr>
                <h3 className='row-title sections'>10:00 AM</h3>
                <input type='number' className='A3 sections' required defaultValue={this.props.availableData.A3.availableSpots} ></input>
                <input type='number' className='B3 sections' required defaultValue={this.props.availableData.B3.availableSpots} ></input>
                <input type='number' className='C3 sections' required defaultValue={this.props.availableData.C3.availableSpots} ></input>
                <input type='number' className='D3 sections' required defaultValue={this.props.availableData.D3.availableSpots} ></input>
                <input type='number' className='E3 sections' required defaultValue={this.props.availableData.E3.availableSpots} ></input>
              </tr>
            </table>
            <input id='updateButton' type='submit' value='Update'></input>
          </form>
        </div>
      </div>
    );
  }
});

module.exports=Available;
