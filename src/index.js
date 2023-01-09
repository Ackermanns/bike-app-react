import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Bike} from './model.js'


//COMPONENTS
class BikeSetup extends React.Component {
  constructor(props) {
    super(props)
    
    let aBike = new Bike()
    //if no BikeParts in local storage, add these entries for demonstration purposes!
    if (localStorage.getItem("BikeParts") === null) {
      aBike.addPart("brake", "2000-05-05", 1)
      aBike.addPart("front wheel", "2021-02-11", 1);
      aBike.addPart("back wheel", "2020-05-05", 1);
      aBike.addPart("chain", "2022-01-30", 0.5);
    }
    else {
      //otherwise if there are entries, reload the parts whenever the page refreshes
      let partsobj = JSON.parse(localStorage.getItem("BikeParts"))
      localStorage.removeItem("BikeParts")
      for (var i in partsobj) {
        aBike.addPart(partsobj[i].name, partsobj[i].dateInstalled, partsobj[i].weight, partsobj[i].restorename, partsobj[i].restoredateInstalled, partsobj[i].restoreweight)
      }
    }
    let tabselect = localStorage.getItem('tabselect');
    this.state = {theBike:aBike, tabselect:tabselect}
    //Save what we have to localstorage
    let toJSON = this.state.theBike.createJSONParts()
    this.state.theBike.savePartsToLocal(toJSON)
    }
  //All other components are called from here so the bike object can be passed around
  render () {
    if (this.state.tabselect == "0") {
      return (
        <div className="container">
          <h1>Home</h1>
          <TableOfParts theBike={this.state.theBike}/>
          <br />
        </div>
      )
    }
    else if (this.state.tabselect == "1") {
      return (
        <div className="container">
          <AddPartForm theBike={this.state.theBike}/>
          <br />
        </div>
      )
    }
    else if (this.state.tabselect == "2") {
      return (
        <div className="container">
          <DeletePartForm theBike={this.state.theBike}/>
          <br />
        </div>
      )
    }
    else if (this.state.tabselect == "3") {
      return (
        <div className="container">
          <EditPartForm theBike={this.state.theBike}/>
          <br />
        </div>
      )
    }
    /*
    else {
      return (
        <div className="container">
          <AddPartForm theBike={this.state.theBike}/>
          <br />
          <DeletePartForm theBike={this.state.theBike}/>
          <br />
          <EditPartForm theBike={this.state.theBike}/>
          <br />
          <TableOfParts theBike={this.state.theBike}/>
        </div>
      )
    }*/
  }
}

//handles the add part form component
class AddPartForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theBike:props.theBike,
      AddPartName: '',
      AddPartDate: '2020-05-05',
      AddPartWeight: '1'
    }
    this.handleAddPartFormChange = this.handleAddPartFormChange.bind(this)
    this.handleAddPartFormOnSubmit = this.handleAddPartFormOnSubmit.bind(this)
  }
  handleAddPartFormChange(e) {
    //weight takes only numbers, already validated from form
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleAddPartFormOnSubmit(e) {
      e.preventDefault();
      //add the part object
      let newname = e.target.AddPartName.value
      let newdate = e.target.AddPartDate.value
      let newweight = e.target.AddPartWeight.value

      //add the new part
      this.state.theBike.addPart(newname, newdate, newweight)
      //Save to localstorage to update it
      let toJSON = this.state.theBike.createJSONParts()
      this.state.theBike.savePartsToLocal(toJSON)
      window.location.reload(false)
      //remove form values
      this.setState({AddPartName:'', AddPartDate:'', AddPartWeight:''})
  }
  //HTML TEMPLATE HERE
  render() {
    return (
      <div className="AddPart">
        <p>Add part form here</p>
        <form onSubmit={this.handleAddPartFormOnSubmit}>
          <label>Part Name: <input type="text" name="AddPartName" value={this.state.AddPartName} onChange={this.handleAddPartFormChange} required></input></label><br />
          <label>Date Added: <input type="date" name="AddPartDate" value={this.state.AddPartDate} onChange={this.handleAddPartFormChange}></input></label><br />
          <label>Part Weight: <input type="number" name="AddPartWeight" value={this.state.AddPartWeight} onChange={this.handleAddPartFormChange}></input></label><br />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

class DeletePartForm extends React.Component {
  constructor(props) {
    super(props)
    //Get localsotrage data
    this.state = {
      theBike:props.theBike,
      selected:0
    }
    this.handleDeletePartFormOnSubmit = this.handleDeletePartFormOnSubmit.bind(this)
    this.handleDeletePartFormChange = this.handleDeletePartFormChange.bind(this)
  }
  handleDeletePartFormOnSubmit(e) {
    e.preventDefault();
    //remove the part
    this.state.theBike.deletePart(this.state.selected)
    //save to storage
    let toJSON = this.state.theBike.createJSONParts()
    this.state.theBike.savePartsToLocal(toJSON)
    //refresh page
    this.setState({selected: 0})
    window.location.reload(false)
  }
  handleDeletePartFormChange(e) {
    this.setState({selected: e.target.value})
  }
  render() {
    return (
      <div className="DeletePart">
        <p>Delete part from here</p>
        <form onSubmit={this.handleDeletePartFormOnSubmit}>
          <label>Select a part: </label>
          <select value={this.state.selected} onChange={this.handleDeletePartFormChange}>
            {this.state.theBike.getAllParts().map((part) => (
            <option key={part.id} value={part.id}>{part.name}</option>
            ))}
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

class EditPartForm extends React.Component {
  constructor(props) {
    super(props)
    //Get localsotrage data
    //load the first part
    let partobj = props.theBike.getSpecificPart(0)
    let partdateobj = new Date(partobj.dateInstalled)
    let partdatestr = partdateobj.toISOString().split('T')[0]
    this.state = {
      theBike:props.theBike,
      selected:0,
      partname:partobj.name,
      partdate:partdatestr,
      partweight:partobj.weight
    }
    this.handleEditPartFormOnSubmit = this.handleEditPartFormOnSubmit.bind(this)
    this.handleSelectPartFormChange = this.handleSelectPartFormChange.bind(this)
    this.handleEditPartFormChange = this.handleEditPartFormChange.bind(this)
  }
  handleEditPartFormOnSubmit(e) {
    
    e.preventDefault();
    let partobj = this.state.theBike.getSpecificPart(this.state.selected)

    //set changes
    if (partobj.restorename !== e.target.partname.value) {
      partobj.changeName(e.target.partname.value)
    }
    if (partobj.restoredateInstalled !== e.target.partdate.value) {
      partobj.changeDate(e.target.partdate.value)
    }
    if (partobj.restoreweight !== e.target.partweight.value) {
      partobj.changeWeight(e.target.partweight.value)
    }

    //commit changes
    let toJSON = this.state.theBike.createJSONParts()
    console.log(toJSON)
    this.state.theBike.savePartsToLocal(toJSON)

    window.location.reload(false)
  }
  handleSelectPartFormChange(e) {
    e.preventDefault();
    this.setState({selected: e.target.value})
    //console.log(this.state.selected)

    let partobj = this.state.theBike.getSpecificPart(e.target.value)
    let partdateobj = new Date(partobj.dateInstalled)
    let partdatestr = partdateobj.toISOString().split('T')[0]
    console.log(partobj.id+": "+partobj.name, partobj.dateInstalled, partobj.weight)
    this.setState({partname:partobj.name, partdate:partdatestr, partweight:partobj.weight})
  }
  handleEditPartFormChange(e) {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="EditPart">
        <p>Edit part from here, select part:</p>
        <p>Edit details here:</p>
        <form onSubmit={this.handleEditPartFormOnSubmit}>
          <label>Select a part: 
          <select value={this.state.selected} onChange={this.handleSelectPartFormChange}>
            {this.state.theBike.getAllParts().map((part) => (
            <option key={part.id} value={part.id}>{part.name}</option>
            ))}
          </select></label><br/>
          <label>New Part Name: <input type="text" name="partname" value={this.state.partname} onChange={this.handleEditPartFormChange} required></input></label>
          <label>New Part Date: <input type="date" name="partdate" value={this.state.partdate} onChange={this.handleEditPartFormChange} required></input></label>
          <label>New Part Weight: <input type="number" name="partweight" value={this.state.partweight} onChange={this.handleEditPartFormChange} required></input></label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

class TableOfParts extends React.Component {
  //NOTE: this component is fully dependant on the "BikeParts" from localstorage,
  //it should not have any dependance from the Bike object
  constructor(props) {
    super(props)
    this.state = {
      theBike:props.theBike,
    }
  }
  render () {
    return (
      <table border="1px">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Weight</th>
            <th>Age type</th>
            <th>Bike total weight - part weight</th>
          </tr>
          {this.state.theBike.getAllParts().map((part) => (
            <tr key={part.id}>
              <td>{part.name}</td>
              <td>{part.dateInstalled}</td>
              <td>{part.weight}</td>
              <td>{part.age}</td>
              <td>{this.state.theBike.partWeightDifference(part)}</td>
            </tr>
          ))}

        </tbody>
      </table>
    )
  }
}
class TabsMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      theBike:props.theBike,
    }
    this.setActive = this.setActive.bind(this)
  }
  setActive(e) {
    this.setState({active:e.target.value})
    localStorage.setItem('tabselect', e.target.value);
    window.location.reload(false)
  }
  render () {
    return (
      <div className="tabOptions">
        <ul>
          <li><button value="0" onClick={this.setActive}>Home</button></li>
          <li><button value="1" onClick={this.setActive}>Add Part</button></li>
          <li><button value="2" onClick={this.setActive}>Delete Part</button></li>
          <li><button value="3" onClick={this.setActive}>Edit Part</button></li>
        </ul>
      </div>
    )
  }
}



const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(
  <React.StrictMode>
    <h1>Bike App</h1>
    <TabsMenu />
    <BikeSetup />
  </React.StrictMode>
)  