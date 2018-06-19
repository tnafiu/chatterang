import React from 'react'
import moment from 'moment'

const Metadata = ({ message }) => {
  return (
    <div className="Metadata" style={styles.data}>
      <div className="user" style={styles.user}>
        {message.user.displayName}
      </div>
      <div className="time" style={styles.time}>
        <span title={moment(message.createdAt).format('D MMM @ h:mm a')}>
          {moment(message.createdAt).fromNow()}
        </span>
      </div>
    </div>
  )
}

const styles = {
  data: {
    display: 'flex',
    alignItems: 'baseline',
  },

  user: {
    fontWeight: 'bold',
    marginRight: '0.5rem',
  },

  time: {
    color: '#999',
    fontSize: '0.8rem',
  }
}

export default Metadata