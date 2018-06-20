import React, { Component } from 'react'

import Sidebar from './Sidebar'
import Chat from './Chat'
import base from './base'

class Main extends Component {
  state = {
    room: {},
    roomList: {},
  }

  componentDidMount() {
    const { roomName } = this.props.match.params

    base.syncState(
      'rooms',
      {
        context: this,
        state: 'rooms',
        then: () => this.loadRoom(roomName)
      }
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.roomName !== this.props.match.params.roomName) {
      this.loadRoom(this.props.match.params.roomName)
    }
  }

  filterUser() {

  }

  filterRoomByName() {

  }

  loadFilteredRoom() {

  }

  loadRoom = (roomName) => {
    if (roomName === 'new') return null

    const room = this.state.rooms[roomName]
    if (room) {
      this.setState({ room })
    } else {
      this.loadValidRoom()
    }
  }

  loadValidRoom = () => {
    const realRoomName = Object.keys(this.state.rooms).find(
      roomName => this.state.rooms[roomName]
    )

    this.props.history.push(`/rooms/${realRoomName}`)
  }

  addRoom = (room) => {
    const rooms = {...this.state.rooms}
    rooms[room.name] = room
    this.setState({ rooms })
  }

  removeRoom = (room) => {
    const rooms = {...this.state.rooms}
    rooms[room.name] = null

    this.setState(
      { rooms },
      this.loadValidRoom
    )
  }

  render() {
    return (
      <div className="Main" style={styles}>
        <Sidebar
          user={this.props.user}
          users={this.props.users}
          signOut={this.props.signOut}
          rooms={this.state.rooms}
          addRoom={this.addRoom}
        />
        <Chat
          user={this.props.user}
          room={this.state.room}
          removeRoom={this.removeRoom}
        />
      </div>
    )
  }
}

const styles = {
  display: 'flex',
  alignItems: 'stretch',
  height: '100vh',
}

export default Main