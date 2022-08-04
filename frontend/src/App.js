import React, { Component } from "react"
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      package: null
      };
  }

    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      })
    };

    handleFileChange = (e) => {
      this.setState({
        package: e.target.files[0]
      })
    };

    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      let form_data = new FormData();
      form_data.append('name', this.state.name);
      form_data.append('package', this.state.package)
      let url = 'http://localhost:8000/tester/packages/';
      axios.post(url, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err.response))
    };

    render() {
      return (
        <div className="App">
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <p>
              <input type="text" placeholder='Name' id='name' value={this.state.name} onChange={this.handleChange} required/>
            </p>
            <p>
              <input type="file"
                     id="package"
                     accept=".py, .rpm" onChange={this.handleFileChange} required/>
            </p>
            <input type="submit"/>
          </form>
        </div>
      );
    }
  }
  
export default App;