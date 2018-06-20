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
      'roomList',
      {
        context: this,
        state: 'roomList',
        then: () => this.loadRoom(roomName)
      }
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.roomName !== this.props.match.params.roomName) {
      this.loadRoom(this.props.match.params.roomName)
    }
  }

  filterUser = (room) => {
    const members = room.members || []
    return members.find(
      userOption => userOption.value === this.props.user.uid
    )
  }

  filterRoomByName = () => {
    return Object.keys(this.state.roomList)
      .filter(roomName => {
        const room = this.state.roomList[roomName]
        if(!room) return false

        return room.public || this.filterUser(room)
      })
  }

  loadFilteredRoom = () => {
    return this.filterRoomByName()
               .map(roomName => this.state.roomList[roomName])
  }

  loadRoom = (roomName) => {
    if (roomName === 'new') return null

    const room = this.state.roomList[roomName]
    if (room) {
      this.setState({ room })
    } else {
      this.loadValidRoom()
    }
  }

  loadValidRoom = () => {
    const realRoomName = this.filterRoomByName().find(
      roomName => this.state.roomList[roomName]
    )

    this.props.history.push(`/roomList/${realRoomName}`)
  }

  addRoom = (room) => {
    const roomList = {...this.state.roomList}
    roomList[room.name] = room
    this.setState({ roomList })
  }

  removeRoom = (room) => {
    const roomList = {...this.state.roomList}
    roomList[room.name] = null

    this.setState(
      { roomList },
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
          roomList={this.loadFilteredRoom()}
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