// aisha lalli 
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddAssignment from './AddAssignment.js';



class AssignmentList extends Component {
  constructor(props) {
    super(props);
    this.state = { assignments: [] };
  } 
  
  componentDidMount() {
    this.fetchAssignments();
  }
  
  fetchAssignments = () => {
    console.log("Assignment.fetchAssignments");
    const token = Cookies.get('XSRF-TOKEN');
    fetch(`${SERVER_URL}/assignment`, 
      {  
        method: 'GET', 
        headers: { 'X-XSRF-TOKEN': token }
      } )
    .then((response) => response.json()) 
    .then((responseData) => { 
      if (Array.isArray(responseData.assignments)) {
        //  add to each assignment an "id"  This is required by DataGrid  "id" is the row index in the data grid table 
        this.setState({ assignments: responseData.assignments.map((assignment, index) => ( { id: index, ...assignment } )) });
      } else {
        toast.error("Fetch failed.", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }        
    })
    .catch(err => console.error(err)); 
  }


    // Add Assignmnet
    addAssignment = (assignment) => {
        const token = Cookies.get('XSRF-TOKEN');
     
        fetch(`${SERVER_URL}/assignment`,
          { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',
                       'X-XSRF-TOKEN': token  }, 
            body: JSON.stringify(assignment)
          })
        .then(res => {
            if (res.ok) {
              toast.success("Assignmnet successfully added", {
                  position: toast.POSITION.BOTTOM_LEFT
              });
              this.fetchAssignments();
            } else {
              toast.error("Error when adding assignment", {
                  position: toast.POSITION.BOTTOM_LEFT
              });
              console.error('Post http status =' + res.status);
            }})
        .catch(err => {
          toast.error("Error when adding assignment", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
        })
      } 

  render() {
    const columns = [
     {
       field: 'assignmentName',
       headerName: 'Assignment',
     },
     { field: 'courseTitle', headerName: 'Course', width: 300 },
     { field: 'dueDate', headerName: 'Due Date', width: 200 }
     ];
     
     const assignmentSelected = this.state.assignments[this.state.selected];
     return (
         <div align="left" >
           <h4>Assignment(s) List: </h4>
             <div style={{ height: 450, width: '100%', align:"left"   }}>
               <DataGrid rows={this.state.assignments} columns={columns} />
             </div>                
           <Button>
           <AddAssignment addAssignment={this.addAssignment}  />
                   </Button>
                   <Button component={Link} to={{pathname:'/',   assignment: assignmentSelected }} 
                    variant="outlined" color="primary" disabled={this.state.assignments.length===0}  style={{margin: 10}}>
              Ready To Grade
            </Button>
           <ToastContainer autoClose={1500} /> 
         </div>
     )
 }
}  

export default AssignmentList;