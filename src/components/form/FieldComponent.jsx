import React from 'react';
import SlideToggle from '../../components/toggle/SlideToggle';
import SelectField from '../../components/select/SelectField';

class FieldComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValues: { ...props.fieldValues }
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ fieldValues: { ...props.fieldValues } });
  }

  getFieldValue = (field) => {
    const fieldValues = { ...this.state.fieldValues };
    return fieldValues[field.id].length > 1
      ? fieldValues[field.id].split(field.delimiter)[field.valueIdx]
      : '';
  };

  getComponent = (field) => {
    switch (field.type) {
      case 'label':
        return <p className="h6">ID: {this.state.fieldValues[field.id] || '<AUTO GENERATED>'}</p>;
      case 'number':
      case 'text':
        return (
          <div className={field.required ? 'form-group required' : 'form-group'}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type={field.type}
              className="form-control"
              id={field.id}
              aria-describedby={field.definition}
              placeholder={field.placeholder}
              value={this.state.fieldValues[field.id]}
              onChange={this.handleChange}
              onKeyPress={event => this.handleKeyPress(event, field.type, field.label)}
              required={field.required}
            />
            <small id={`small${field.id}`} className="form-text text-muted">
              {field.description}
            </small>
          </div>
        );
      case 'inputGroup':
        return (
          <React.Fragment>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">{field.prependText}</span>
              </div>
              <input
                id={field.id + field.subId}
                type={field.allow}
                className="form-control"
                aria-label={field.description}
                value={this.getFieldValue(field)}
                onChange={this.handleFormatChange}
                onKeyPress={event => this.handleKeyPress(event, field.allow, field.prependText)}
                required={field.required}
              />
              <div className="input-group-append">
                <span className="input-group-text">{field.appendText}</span>
              </div>
              <small id={`small${field.id}`} className="form-text text-muted">
                {field.required && <span style={{ color: 'red', marginLeft: '2px' }}>*</span>}
              </small>
            </div>
          </React.Fragment>
        );
      case 'slider':
        return (
          <SlideToggle
            {...field}
            value={this.state.fieldValues[field.id]}
            onChange={this.handleChange}
          />
        );
      case 'select':
        return (
          <SelectField
            field={field}
            value={this.state.fieldValues[field.id]}
            onChange={this.handleChange}
          />
        );
      default:
        return <div>Component Not Available. Please Contact Admin!</div>;
    }
  };

  handleKeyPress = (event, fieldType, fieldLabel) => {
    if (fieldType === 'number') this.props.keyPressHandler(event.key, fieldLabel);
  };

  handleChange = (event) => {
    const fieldValues = { ...this.state.fieldValues };
    fieldValues[event.target.id] =
      event.target.type === 'number'
        ? parseInt(event.target.value, 10)
        : event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value;
    this.setState({ fieldValues });
    this.props.onValueChange(event.target.id, fieldValues[event.target.id]);
  };

  handleFormatChange = (event) => {
    let format = '';
    switch (event.target.id) {
      case 'formatwidth':
        format = `${event.target.value}x${this.state.fieldValues.format.split('x')[1]}`;
        break;
      case 'formatheight':
        format = `${this.state.fieldValues.format.split('x')[0]}x${event.target.value}`;
        break;
      default:
        break;
    }
    this.props.onValueChange('format', format);
  };

  render() {
    return this.getComponent(this.props.fieldDetails);
  }
}

export default FieldComponent;
