import React, { Component } from 'react'

import './App.css'
import SignIn from './SignIn'
import Main from './Main'
import {auth} from './base'

class App extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.setState({ user })
    }
  }

  signedIn = () => {
    return this.state.user.uid
  }

  handleAuth = (user) => {
    this.setState({ user })
    localStorage.setItem('user', JSON.stringify(user))
  }

  signOut = () => {
    auth.signOut()
    this.setState({ user: {} })
    localStorage.removeItem('user')
  }

  render() {
    return (
      <div className="App">
        {
          this.signedIn()
            ? <Main user={this.state.user} signOut={this.signOut} uid={this.state.uid}/>
            : <SignIn handleAuth={this.handleAuth} />
        }
      </div>
    )
  }
}

export default App
