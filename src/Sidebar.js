import React from 'react'

import UserInfo from './UserInfo'
import RoomList from './RoomList'

const Sidebar = ({ user, signOut, users,addRoom, roomList }) => {



  return (
    <aside
      className="Sidebar"
      style={styles.sidebar}
    >
      <UserInfo 
        user={user} 
        signOut={signOut} 
      />
      <h1
        style={{
          ...styles.children,
          ...styles.h1,
        }}
      >
        XTBC 18
      </h1>

      <RoomList
        users={users}
        roomList={roomList} 
        addRoom={addRoom}
      />
    </aside>
  )
}

const styles = {
  sidebar: {
    backgroundColor: '#333344',
    color: 'rgba(255, 255, 255, 0.8)',
    width: '12rem',
    padding: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
  },

  children: {
    padding: '0 1rem',
  },

  h1: {
    color: 'white',
    fontSize: '1.2rem',
    marginTop: 0,
  },
}

export default Sidebar