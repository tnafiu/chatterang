import React, { Component } from 'react'

import base from './base'
import Sidebar from './Sidebar'
import Chat from './Chat'

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
        then: () => this.loadRoom(roomName),
      }
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.roomName !== this.props.match.params.roomName) {
      this.loadRoom(this.props.match.params.roomName)
    }
  }

  filteredroomList = () => {
    return this.filteredRoomNames()
               .map(roomName => this.state.roomList[roomName])
  }

  filteredRoomNames = () => {
    return Object.keys(this.state.roomList)
                 .filter(roomName => {
                   const room = this.state.roomList[roomName]
                   if (!room) return false

                   return room.public || this.includesCurrentUser(room)
                 })
  }

  includesCurrentUser = (room) => {
    const members = room.members || []
    return members.find(
      userOption => userOption.value === this.props.user.uid
    )
  }

  loadRoom = (roomName) => {
    if (roomName === 'new' || roomName === 'new-direct-message') return null

    const room = this.filteredroomList()
                     .find(room => room.name === roomName)

    if (room) {
      this.setState({ room })
    } else {
      this.loadValidRoom()
    }
  }

  loadValidRoom = () => {
    const realRoomName = this.filteredRoomNames().find(
      roomName => this.state.roomList[roomName]
    )

    this.props.history.push(`/roomList/${realRoomName}`)
  }

  addRoom = (room) => {
    const { user } = this.props
    if (!room.public) {
      room.members.push({
        value: user.uid,
        label: `${user.displayName} (${user.email})`,
      })
    }

    if (room.dm) {
      const memberNames = room.members.map(member => member.label.split(' ')[0])
      room.displayName = memberNames.join(', ')
      room.name = room.members.map(member => member.value).join('-')
    }

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
          roomList={this.filteredroomList()}
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