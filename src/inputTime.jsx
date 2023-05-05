import React from "react";
import PropTypes from "prop-types";

export default class inputTime extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    date: PropTypes.instanceOf(Date),
    timeString: PropTypes.string,
    timeInputLabel: PropTypes.string,
    customTimeInput: PropTypes.element,
  };

  constructor(props) {
    super(props);

    this.state = {
      time: this.props.timeString,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.timeString !== state.time) {
      return {
        time: props.timeString,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  onTimeChange = (time, isMinute, isHour, AMorPM) => {
    const { timeString } = this.props;
    if (isMinute && isHour) {
      this.setState({ time });
      const date = new Date();
      date.setHours(time.split(":")[0]);
      date.setMinutes(time.split(":")[1]);
      this.props.onChange(date);
    } else if (isMinute) {
      this.setState({ time });
      const date = new Date();
      date.setHours(timeString.split(":")[0]);
      date.setMinutes(time.split(":")[0]);

      this.props.onChange(date);
    } else if (isHour) {
      this.setState({ time });
      const date = new Date();
      date.setMinutes(timeString.split(":")[1]);
      if (this.props.date.toLocaleTimeString().split(" ")[1] === "AM") {
        date.setHours(time.split(":")[0] === "12" ? "0" : time.split(":")[0]);
        this.props.onChange(date);
      } else if (this.props.date.toLocaleTimeString().split(" ")[1] === "PM") {
        date.setHours(
          time.split(":")[0] === "12" ? "12" : parseInt(time.split(":")[0]) + 12
        );
        this.props.onChange(date);
      }
    } else if (AMorPM) {
      let oldTime = timeString.split(":")[0];
      if (time === "PM") {
        const date = new Date();
        let date24 = this.props.date
          .toLocaleTimeString("en-US", { hour12: false })
          .split(":")[0];
        let date12 =
          parseInt(date24.split(":")[0]) !== 12
            ? parseInt(date24.split(":")[0]) + 12
            : 0;

        date.setHours(date12);
        date.setMinutes(timeString.split(":")[1]);

        this.props.onChange(date);
      }
      if (time === "AM") {
        const date = new Date();
        let date24 = this.props.date
          .toLocaleTimeString("en-US", { hour12: false })
          .split(":")[0];
        let date12 = parseInt(date24.split(":")[0]) - 12;

        date.setHours(date12);
        date.setMinutes(timeString.split(":")[1]);
        this.props.onChange(date);
      }
    }
  };

  renderTimeInput = () => {
    const { time } = this.state;
    const { date, timeString, customTimeInput } = this.props;

    if (customTimeInput) {
      return React.cloneElement(customTimeInput, {
        date,
        value: time,
        onChange: this.onTimeChange,
      });
    }
    let mins = () => {
      let minutesArrays = [];
      for (let i = 10; i < 60; i++) {
        minutesArrays.push(<option value={i}>{i}</option>);
      }
      return minutesArrays;
    };

    return (
      <>
        {/* <input
        type="time"
        className="react-datepicker-time__input"
        placeholder="Time"
        name="time-input"
        style={{width:"50%" }}
        required
        value={time}
        onChange={(ev) => {
          this.onTimeChange(ev.target.value || timeString,true,true);
        }}
      /> */}
        <select
          name="hours"
          className="Select-time"
          value={parseInt(this.props.date.toLocaleTimeString().split(":")[0])}
          onChange={(ev) => {
            this.onTimeChange(ev.target.value, false, true, false);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <select
          name="minutes"
          className="Select-time"
          value={time.split(":")[1]}
          onChange={(ev) => {
            this.onTimeChange(ev.target.value, true, false, false);
          }}
        >
          <option value="00">00</option>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          {mins()}
        </select>
        <select
          name="AMorPM"
          className="AM-PM-Input"
          value={this.props.date.toLocaleTimeString().split(" ")[1]}
          onChange={(ev) => {
            this.onTimeChange(ev.target.value, false, false, true);
          }}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>|
        </select>
      </>
    );
  };

  render() {
    return (
      <div className="react-datepicker__input-time-container-custom">
        <div className="react-datepicker-time__caption">
          {this.props.timeInputLabel}
        </div>
        <div className="react-datepicker-time__input-container">
          <div className="react-datepicker-time__input">
            {this.renderTimeInput()}
          </div>
        </div>
      </div>
    );
  }
}
