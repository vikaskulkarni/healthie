import React from 'react';

class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onChange(event);
  };

  render() {
    return (
      <React.Fragment>
        <p className="h6">{this.props.field.label}</p>
        <select id={this.props.field.id} onChange={this.handleChange} value={this.state.value}>
          {this.props.field.items &&
            Object.keys(this.props.field.items).map(idx => (
              <option key={this.props.field.id + idx} value={this.props.field.items[idx]}>
                {this.props.field.items[idx]}
              </option>
            ))}
        </select>
      </React.Fragment>
    );
  }
}

export default SelectField;
