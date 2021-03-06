import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router'
toast.configure({
  autoClose: 5000,
  position: toast.POSITION.TOP_CENTER,

  //etc you get the idea
});
// const $ = window.$;
class Login extends Component {

  state = {
    successfull: false
  }

  // componentDidMount() {
  //   var element = ReactDOM.findDOMNode(this.refs.dropdown)

  //   $(element).ready(function() {
  //     $('select').formSelect();
  //   });
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.email.value)
    console.log(e.target.password.value)
    console.log('handling submit')
    var email = e.target.email.value
    let url = 'http://localhost:3002/users/login'
    axios.post(url, {
      email: e.target.email.value,
      password: e.target.password.value
    })
      .then((response) => {
        console.log(response.data.loginState);
        if (response.data.loginState === "true") {
          toast("Succesfully logged in", {

            onClose: () => {
              this.setState({
                successfull: true
              })
            }
          });
          localStorage.setItem('user_id', response.data.user_id);
          localStorage.setItem('sessionID', response.data.sessionID);
          localStorage.setItem('chatName', email);
          
        } else {
          var errormsg = response.data.message[0];
          console.log(errormsg)
          toast(errormsg, {

            onClose: () => { }
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    if (this.state.successfull) {
      // redirect to home if signed up
      console.log('jaskdlfj')
      return <Redirect to='/user/' />;
    }
    return (

      <div className="container login-container junaid">
        <form className="text-center border border-light p-5" onSubmit={this.handleSubmit}>
          <p className="h4 mb-4">Sign in</p>
          {/* Email */}
          <input type="email" id="email" className="form-control mb-4" placeholder="E-mail" required />
          {/* Password */}
          <input type="password" id="password" className="form-control mb-4" placeholder="Password" required />

          {/* Sign in button */}
          <button className="btn btn-danger btn-block my-4" type="submit">Sign in</button>

          {/* Register */}
          <a href="/user/forgetPassword">Forgot password?</a>
          <p>Not a member? <br />
            <a href="/user/userRegister">Register</a>
          </p>


        </form>
      </div>
    );
  }
}

export default Login;