import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import "./sign-up.style.scss";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    if(password.length < 6){
        alert("Password should be at least 6 character");
        return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      })

    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  };


  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title"> I do not have a account</h2>
        <span>Sign up your email and passWord</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            onChange={this.handleChange}
            value={displayName}
            required
            label="Display Name"
          />

          <FormInput
            name="email"
            type="email"
            onChange={this.handleChange}
            value={email}
            required
            label="Email"
          />

          <FormInput
            name="password"
            type="password"
            onChange={this.handleChange}
            value={password}
            required
            label="Password"
          />

          <FormInput
            name="confirmPassword"
            type="password"
            onChange={this.handleChange}
            value={confirmPassword}
            required
            label="Confirm Password"
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
