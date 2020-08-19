import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalHeader from '../components/header/GlobalHeader';
import Table from '../components/table/Table';
import AdForm from '../components/form/AdForm';
import SearchBox from '../components/search/SearchBox';
import searchByValue from '../components/search/searchByValue';
import GlobalFooter from '../components/footer/GlobalFooter';
import ClientAPIService from '../service/ClientAPIService';
import menuItems from './menuItems';
import tableData from './tableData'; // Uncomment this for static test data
import adTemplate from './adTemplate';
import table from './table';
import formFields from './formFields';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   menu: menuItems,
    //   tableData: [],
    //   immutableTableData: [],
    //   tableColumns: table.columns,
    //   selectedAd: adTemplate,
    //   editMode: false
    // };
    this.state = {
      menu: menuItems,
      tableData: tableData.data.adslots,
      immutableTableData: [...tableData.data.adslots],
      tableColumns: table.columns,
      selectedAd: { ...tableData.data.adslots[0] },
      editMode: false
    };
    this.rowSelected = this.rowSelected.bind(this);
    this._clientAPIService = new ClientAPIService();
    this._adSlotsURL = 'http://localhost:8080/adslots/';
  }
  componentDidMount() {
    // this.getDataFromServer();
  }

  onSearch = (value) => {
    const filteredData = searchByValue([...this.state.immutableTableData], value, ['name', 'id']);
    this.setState({ tableData: filteredData });
  };

  getDataFromServer = () => {
    const successCB = (responseData) => {
      this.setState({
        tableData: responseData.data.adslots,
        immutableTableData: [...responseData.data.adslots],
        selectedAd: { ...responseData.data.adslots[0] },
        editMode: true
      });
    };

    const errorCB = (error) => {
      toast.error('Operation Failed!', {
        autoClose: false
      });
      this.setState({
        editMode: false
      });
    };

    this._clientAPIService.setUrl(this._adSlotsURL).doGetCall(successCB, errorCB);
  };

  rowSelected(rowIdx) {
    const selectedAd = this.state.tableData[rowIdx];
    this.setState({ selectedAd, editMode: true });
  }

  addClickHandler = () => {
    this.setState({ editMode: false });
  };

  handleSubmit = (editMode, value) => {
    const operationMessage = editMode ? 'Edit' : 'Create';
    const successCB = (responseData) => {
      toast.success(`${operationMessage} Successfull`, {
        autoClose: false
      });
      this.getDataFromServer();
    };

    const errorCB = (error) => {
      toast.error(`${operationMessage} Failed. Error Code-${error.code}:${error.message}`, {
        autoClose: false
      });
    };

    switch (editMode) {
      case true:
        this._clientAPIService
          .setUrl(this._adSlotsURL + value.id)
          .doPatchCall(successCB, errorCB, value);
        break;
      case false:
        this._clientAPIService.setUrl(this._adSlotsURL).doPostCall(successCB, errorCB, value);
        break;
      default:
        break;
    }
  };

  checkIfNAN = (ip, field) => {
    document.addEventListener('mousedown', this.dismissToast);
    const numbers = /^[0-9]+$/;

    if (!toast.isActive(this.toastID) && ip !== '.' && !ip.match(numbers)) {
      this.toastID = toast.error(`"${field}" field allows only numbers!`, {
        position: toast.POSITION.TOP_CENTER
      });
    } else this.dismissToast();
  };

  dismissToast = () => {
    toast.dismiss();
    document.removeEventListener('mousedown', this.dismissToast);
  };

  render() {
    return (
      <React.Fragment>
        <GlobalHeader items={this.state.menu} />
        <div className="containter-fluid app-body">
          <div className="row mb-2">
            <div className="col-sm-3">
              <button type="button" className="btn btn-primary" onClick={this.addClickHandler}>
                Create New Ad
              </button>
            </div>
            <div className="col-sm-2 pt-2">
              <p className="h6">{this.state.tableData.length} Entries</p>
            </div>
            <div className="col-sm-3">
              <SearchBox placeholder="Search on Name, ID" onChange={this.onSearch} />
            </div>
            <div className="col-sm-3 text-center">
              <h4 className="lead">
                {this.state.editMode && 'Edit Ad'}
                {!this.state.editMode && 'Create Ad'}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8">
              <Table
                tableData={this.state.tableData}
                columns={this.state.tableColumns}
                rowSelected={this.rowSelected}
              />
            </div>
            <div className="col-sm-4">
              <AdForm
                selectedAd={this.state.editMode ? this.state.selectedAd : adTemplate}
                formFields={formFields}
                editMode={this.state.editMode}
                submit={this.handleSubmit}
                keyPressHandler={this.checkIfNAN}
              />
            </div>
          </div>
        </div>
        <GlobalFooter />
        <ToastContainer />
      </React.Fragment>
    );
  }
}
module.exports = App;
