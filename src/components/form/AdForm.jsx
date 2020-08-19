import React from 'react';
import PropTypes from 'prop-types';
import FieldComponent from './FieldComponent';

class AdForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAd: { ...props.selectedAd },
      editMode: props.editMode
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ selectedAd: props.selectedAd, editMode: props.editMode });
  }

  handleChange = (property, value) => {
    const selectedAd = { ...this.state.selectedAd };
    selectedAd[property] = value;
    this.setState({ selectedAd });
  };

  handleSubmit = (editMode, selectedAd) => {
    this.props.submit(editMode, selectedAd);
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-card p-3 rounded">
            {this.props.formFields &&
              this.props.formFields.map((field, idx) => (
                <FieldComponent
                  key={`${field.id}${idx}`}
                  fieldDetails={field}
                  fieldValues={this.state.selectedAd}
                  onValueChange={this.handleChange}
                  onFormatChange={this.handleFormatChange}
                  keyPressHandler={this.props.keyPressHandler}
                />
              ))}
          </div>
          <button
            type="submit"
            className="btn btn-primary my-2 float-right"
            onClick={() => this.handleSubmit(this.state.editMode, this.state.selectedAd)}
          >
            {this.state.editMode && 'Edit Ad'}
            {!this.state.editMode && 'Create Ad'}
          </button>
        </form>
      </React.Fragment>
    );
  }
}

AdForm.propTypes = {
  formFields: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedAd: PropTypes.shape({}).isRequired,
  editMode: PropTypes.bool.isRequired,
  keyPressHandler: PropTypes.func,
  submit: PropTypes.func.isRequired
};

AdForm.defaultProps = {
  keyPressHandler() {}
};

export default AdForm;
