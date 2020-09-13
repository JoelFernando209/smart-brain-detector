import React, { Component } from 'react';

class Register extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }
  
  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }
  
  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }
  
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }
  
  onSubmitRegister = () => {
    fetch('https://whispering-beyond-64828.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
      })
      .then(res => res.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
      .catch(err => console.log("Error :("));
  };
  
  render() {
    const { onRouteChange } = this.props;
    const { onNameChange, onEmailChange, onPasswordChange, onSubmitRegister } = this;
    return (
      <article style={{marginTop: '8%'}} className="br3 ba b--black-10 mv4 w-100 w-80-m w-25-l mw8 shadow-5 center tc">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Complete Name</label>
                <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
                />
                <label
                className="db fw6 lh-copy f6"
                htmlFor="email-address">Email</label>
                <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                onChange={onEmailChange}
                id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                onChange={onPasswordChange}
                name="password"
                id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register & Sign In"
              />
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('signin')}
                className="f6 link dim black db pointer"
              >
              I have an account
              </p>
            </div>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Register;