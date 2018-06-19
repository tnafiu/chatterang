import React, {Component} from 'react'

import Message from './Message'

class MessageList extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      this.scrollToBottom()
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { messages, room } = this.props

    return (
      <div className="MessageList" style={styles.list}>
        <div className="roomAnnouncement" style={styles.announcement}>
          <h3 style={styles.h3}>
            #{room.name}
          </h3>
          <p>This is the very beginning of the #{room.name} room.</p>
        </div>
  
        {
          messages.map(msg => (
            <Message key={msg.id} message={msg} />
          ))
        }
        <div ref={el => this.messagesEnd = el}></div>
      </div>
    )
  }
}

const styles = {
  list: {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: '1rem',
    overflowY: 'scroll',
  },

  announcement: {
    padding: '2rem 1rem',
  },

  h3: {
    fontSize: '1.5rem',
  },
}

export default MessageList