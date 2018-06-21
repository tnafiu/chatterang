import React from 'react'

const ChatHeader = ({ room, removeRoom }) => {
  return (
    <div className="ChatHeader" style={styles.header}>
      <div className="roomInfo">
        <h2 style={styles.h2}>
          #{room.displayName}
        </h2>
        <p style={styles.p}>
          {room.description}
        </p>
      </div>

      <button
        style={styles.button}
        onClick={() => removeRoom(room)}
      >
        <i className="far fa-trash-alt"></i>
      </button>
    </div>
  )
}

const styles = {
  header: {
    backgroundColor: '#f3f3f3',
    borderBottom: '1px solid #ccc',
    padding: '0.25rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  h2: {
    fontSize: '1.1rem',
    margin: 0,
  },

  p: {
    color: '#999',
    margin: 0,
    fontSize: '0.8rem',
  },

  button: {
    border: 0,
    outline: 0,
    backgroundColor: 'transparent',
    padding: 0,
    cursor: 'pointer',
    fontSize: '1rem',
    color: 'rgba(0,0,0, 0.4)',
  },
}

export default ChatHeader