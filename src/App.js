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

    auth.onAuthStateChanged(
      user => {
        if (user) {
          // we signed in
          this.handleAuth(user)
        } else {
          //we signed out
          this.handleUnauth()
        }
      }
    )
  }

  signedIn = () => {
    return this.state.user.uid
  }

  handleAuth = (user) => {
    this.setState({ user })
    localStorage.setItem('user', JSON.stringify(user))
  }

  handleUnauth = () => {
    this.setState({ user: {} })
    localStorage.removeItem('user')
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
            : <SignIn />
        }
      </div>
    )
  }
}

export default App
