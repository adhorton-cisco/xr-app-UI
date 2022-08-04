import React, { Component } from "react"
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      package: null,
      username: '',
      password: '',
      ipaddress: '',
      port: 0,
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
      let url = 'http://localhost:8000/appmgr/packages/';
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

    handleSubmitForm2 = (e) => {
      e.preventDefault();
      console.log(this.state);
      let form_data = new FormData();
      form_data.append('username', this.state.username);
      form_data.append('password', this.state.password)
      form_data.append('ipaddress', this.state.ipaddress);
      form_data.append('port', this.state.port)
      let url = String.concat('http://localhost:8000/appmgr/packages/install/' + this.state.name);
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
              &emsp;<input type="text" placeholder='Name' id='name' value={this.state.name} onChange={this.handleChange} required/>
            </p>
            <p>
              &emsp;<input type="file"
                      id="package"
                      accept=".py, .rpm" onChange={this.handleFileChange} required/>
            </p>
            &emsp;<input type="submit"/>
          </form>

          <form onSubmit={this.handleSubmitForm2} encType="multipart/form-data">
            <p>
              &emsp;<input type="text" placeholder='Username' id='username' value={this.state.username} onChange={this.handleChange} required/>
            </p>
            <p>
              &emsp;<input type="text" placeholder='Password' id='password' value={this.state.password} onChange={this.handleChange} required/>
            </p>
            <p>
              &emsp;<input type="text" placeholder='IP Address' id='ipadress' value={this.state.ipaddress} onChange={this.handleChange} required/>
            </p>
            <p>
              &emsp;GRPC Port <input type="number" placeholder='GRPC Port' id='port' value={this.state.port} onChange={this.handleChange} required/>
            </p>
            &emsp;<input type="submit"/>
          </form>
        </div>
      );
    }
  }
  
export default App;