var React = require('react');

var Root = React.createClass({
  render:function() {
    return (
        <div>
          {/*Navigation*/}
          <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
              <div className="container topnav">
                  {/*Brand and toggle get grouped for better mobile display*/}
                  <div className="navbar-header">
                      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                      </button>
                      <a className="navbar-brand topnav" href="#">
                        <img src="assets/img/logo-matchly.png" alt="Matchly.io Logo" className="img-responsive logo"/>
                      </a>
                  </div>
                  {/*Collect the nav links, forms, and other content for togg*/}
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav navbar-right">
                          <li>
                              <a href="#about">About</a>
                          </li>
                          <li>
                              <a href="#services">Services</a>
                          </li>
                          <li>
                              <a href="#contact">Contact</a>
                          </li>
                      </ul>
                  </div>
                  {/*/.navbar-collapse*/}
              </div>
              {/*/.container*/}
          </nav>


          {/*Header*/}
          <a name="about"></a>
          <div className="intro-header">
              <div className="container">

                  <div className="row">
                      <div className="col-lg-12">
                          <div className="intro-message">
                              <h1>Matchly.io</h1>
                              <hr className="intro-divider" />
                              <h3>Providing a truly advanced recruiting platform</h3>
                          </div>
                      </div>
                  </div>

              </div>
              {/*/.container*/}

          </div>
          {/*/.intro-header*/}

          {/*Page Content*/}

      	<a  name="services"></a>
          <div className="content-section-a">

              <div className="container">
                  <div className="row">
                      <div className="col-lg-5 col-sm-6">
                          <hr className="section-heading-spacer" />
                          <div className="clearfix"></div>
                          <h2 className="section-heading">WHAT WE DO</h2>
                          <p className="lead">
                            Utilizing a Nobel prize winning algorithm, Matchly finds the best possible pairings of two groups based on categories and weights set by you.
                          </p>
                      </div>
                      <div className="col-lg-5 col-lg-offset-2 col-sm-6">
                          <img className="img-responsive" src="assets/img/img-college-girls.jpg" alt="" />
                      </div>
                  </div>

              </div>
              {/*/.container*/}

          </div>
          {/*/.content-section-a*/}

          <div className="content-section-b">

              <div className="container">

                  <div className="row">
                      <div className="col-lg-5 col-lg-offset-1 col-sm-push-6  col-sm-6">
                          <hr className="section-heading-spacer" />
                          <div className="clearfix"></div>
                          <h2 className="section-heading">WHAT WE ACHIEVE</h2>
                          <p className="lead">eHarmony for the recruiting process. Matchly’s algorithm is so efficient, it can find the optimal pairings of 10,000 users in under20 seconds.</p>
                      </div>
                      <div className="col-lg-5 col-sm-pull-6  col-sm-6">
                          <img className="img-responsive" src="assets/img/img-bookcase.jpg" alt="" />
                      </div>
                  </div>

              </div>
              {/*/.container*/}

          </div>
          {/*/.content-section-b*/}

          <div className="content-section-a">

              <div className="container">

                  <div className="row">
                      <div className="col-lg-5 col-sm-6">
                          <hr className="section-heading-spacer" />
                          <div className="clearfix"></div>
                          <h2 className="section-heading">WHAT YOU GET</h2>
                          <p className="lead">
                          The best recruiting experience possible to all prospective students, especially female and veteran applicants!</p>
                      </div>
                      <div className="col-lg-5 col-lg-offset-2 col-sm-6">
                          <img className="img-responsive" src="assets/img/img-phone-check.jpg" alt="" />
                      </div>
                  </div>

              </div>
              {/*/.container*/}

          </div>
          {/*/.content-section-a*/}

      	<a  name="contact"></a>
          <div className="banner">

              <div className="container">

                  <div className="row text-center">
                      <div className="col-lg-8 col-lg-push-2">
                          <h2>Reach out for a personal demo!</h2>
                          <p>
                            Email Travis at <a href="mailto:travis@naladigitalsolutions.com" className="btn btn-default" style={{borderRadius: 3, marginTop: -5}}>Travis@naladigitalsolutions.com</a> and we'll get back to you ASAP!
                          </p>
                      </div>
                  </div>

              </div>
              {/*/.container*/}

          </div>
          {/*/.banner*/}

          {/*Footer*/}
          <footer>
              <div className="container">
                  <div className="row">
                      <div className="col-lg-12">
                          <ul className="list-inline">
                              <li>
                                  <a href="#">Home</a>
                              </li>
                              <li className="footer-menu-divider">&sdot;</li>
                              <li>
                                  <a href="#about">About</a>
                              </li>
                              <li className="footer-menu-divider">&sdot;</li>
                              <li>
                                  <a href="#services">Services</a>
                              </li>
                              <li className="footer-menu-divider">&sdot;</li>
                              <li>
                                  <a href="mailto:travis@naladigitalsolutions.com">Contact</a>
                              </li>
                          </ul>
                          <p className="copyright text-muted small text-center">Powered by the people at <a href="http://oddball.io/">Oddball.io</a><br />Copyright &copy; 2016. All Rights Reserved</p>
                      </div>
                  </div>
              </div>
          </footer>
        </div>
    );
  }
});

module.exports = Root;
