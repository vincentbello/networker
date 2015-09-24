var React = require('react'),
    ReactRouter = require('react-router'),
    HashHistory = require('react-router/lib/hashhistory'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route;

var Main = require('./components/main'),
    MeetupDetail = require('./components/meetup-detail');

module.exports = (
  <Router history={new HashHistory}>
    <Route path="/" component={Main}>
      <Route path="meetups/:meetupId" component={MeetupDetail}/>
    </Route>
  </Router>
);

// <Route path="events/:id" component={Event} />
// <Route path="connection/:id" component={Connection} />
