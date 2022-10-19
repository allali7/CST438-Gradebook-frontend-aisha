//aisha lalli 
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



class AddAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          assignmentName: '',
          dueDate: '',
          courseId: '',
      };
      };
      
      handleClickOpen = () => {
        this.setState( {open:true} );
      };
  
      handleClose = () => {
        this.setState( {open:false} );
      };
  
  
      handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
      }
  
    // Save student and close
      handleAdd = () => {
        this.props.addAssignment({
          assignmentName: this.state.assignmentName,
          dueDate: this.state.dueDate,
          courseId: this.state.courseId,
      });
      this.handleClose();
      }
  
      render()  { 
        return (
            <div>
              <Button  id="addBtn" variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
                Add Assignment
              </Button>
              <Dialog open={this.state.open} onClose={this.handleClose}>
                  <DialogTitle>Add Assignment</DialogTitle>
                  <DialogContent  style={{paddingTop: 20}} >
                  <TextField autoFocus fullWidth label="Assignment Name" name="assignmentName" defaultValue={this.state.assignmentName} onChange={this.handleChange}/>
                  <TextField fullWidth label="Due Date (yyyy-mm-dd)" name="dueDate" defaultValue={this.state.dueDate} onChange={this.handleChange}/>  
                  <TextField fullWidth label="Course Id" name="courseId" defaultValue={this.state.courseId} onChange={this.handleChange}/>  
                  </DialogContent>
                  <DialogActions>
                    <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                    <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                  </DialogActions>
                </Dialog>      
            </div>
        ); 
      }
  }
  
  // required property:  addAssignment is a function to call to perform the Add action
  AddAssignment.propTypes = {
    addAssignment : PropTypes.func.isRequired
  }
    
    export default AddAssignment;