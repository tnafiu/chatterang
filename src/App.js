import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import './App.css'
import base, { auth } from './base'
import SignIn from './SignIn'
import Main from './Main'

class App extends Component {
  constructor() {
    super()

    const user = JSON.parse(localStorage.getItem('user')) || {}
    this.state = {
      user,
      users: {},
    }
  }

  componentDidMount() {
    base.syncState(
      'users',
      {
        context: this,
        state: 'users',
      }
    )

    auth.onAuthStateChanged(
      user => {
        if (user) {
          // we signed in
          this.handleAuth(user)
        } else {
          // we signed out
          this.handleUnauth()
        }
      }
    )
  }

  signedIn = () => {
    return this.state.user.uid
  }

  handleAuth = (oauthUser) => {
    // Build the user object
    const user = {
      uid: oauthUser.uid,
      displayName: oauthUser.displayName,
      email: oauthUser.email,
      photoUrl: oauthUser.photoURL,
    }

    // Update the list of users
    const users = {...this.state.users}
    users[user.uid] = user

    // Update state and localStorage
    this.setState({ user, users })
    localStorage.setItem('user', JSON.stringify(user))
  }

  handleUnauth = () => {
    this.setState({ user: {} })
    localStorage.removeItem('user')
  }

  signOut = () => {
    auth.signOut()
  }

  render() {
    const mainProps= {
      user:this.state.user,
      signOut:this.signOut,
      users:this.state.users,
    }
    return (
      <div className="App">
        <Switch>
          <Route
            path="/sign-in"
            render={() => (
              this.signedIn()
                ? <Redirect to="/rooms/general" />
                : <SignIn />
            )}
          />
          <Route
            path="/rooms/:roomName"
            render={navProps => (
              this.signedIn()
              ? <Main
              {...mainProps}
              {...navProps}
            />
                : <Redirect to="/sign-in" />
            )}
          />
          <Route
            render={() => (
              this.signedIn()
                ? <Redirect to="/rooms/general" />
                : <Redirect to="/sign-in" />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default App