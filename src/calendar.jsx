/** @jsx React.DOM */

window.Calendar = React.createClass({
  getInitialState: function() {
    return {
      date: new DateUtil(moment()),
      selected: new DateUtil(moment())
    };
  },

  increaseMonth: function() {
    this.setState({
      date: this.state.date.addMonth()
    });
  },

  decreaseMonth: function() {
    this.setState({
      date: this.state.date.subtractMonth()
    });
  },

  setDate: function(date) {
    var _this = this;

    return function() {
      _this.setState({
        selected: date
      });
    };
  },

  weeks: function() {
    return this.state.date.mapWeeksInMonth(function(weekStart, key) {
      if(! weekStart.weekInMonth(this.state.date)) {
        return;
      }

      return (
        <div className="week">
          {this.days(weekStart)}
        </div>
      );
    }, this);
  },

  days: function(weekStart) {
    return weekStart.mapDaysInWeek(function(day, key) {
      return (
        <Day
          key={key}
          day={day}
          date={this.state.date}
          onSelect={this.setDate(day)}
          selected={this.state.selected} />
      );
    }, this);
  },

  render: function() {
    return (
      <div className="calendar">
        <div className="calendar-header">
          <a className="calendar-month-navigation-left"
              onClick={this.decreaseMonth}>
            &laquo;
          </a>
          <span className="calendar-current-month">
            {this.state.date.format("MMMM YYYY")}
          </span>
          <a className="calendar-month-navigation-right"
              onClick={this.increaseMonth}>
            &raquo;
          </a>
        </div>
        <div className="month">
          <div>
            <div className="day head">MO</div>
            <div className="day head">TU</div>
            <div className="day head">WE</div>
            <div className="day head">TH</div>
            <div className="day head">FR</div>
            <div className="day head">SA</div>
            <div className="day head">SU</div>
          </div>
          {this.weeks()}
        </div>
      </div>
    );
  }
});