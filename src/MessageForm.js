import React, { Component } from 'react'

class MessageForm extends Component {
  state = {
    body: '',
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.addMessage(this.state.body)
    this.setState({body: ''})
  }

  handleChange = (ev) => {
    this.setState({body: ev.target.value})
  }

  render() {
    return (
      <form
        className="MessageForm"
        onSubmit={this.handleSubmit}
        style = {styles.messageForm}
      >
        <input
          type="text"
          name="body"
          placeholder="Type a message..."
          value={this.state.body}
          onChange={this.handleChange}
          style={styles.input}
          autoFocus
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    )
  }
}

const styles = {
  messageForm:{
    display: 'flex',
    borderRadius: '0.5rem',
    alignItems: 'center',
    backgroundColor: 'white',
    color: '#ccc',
    padding: '0 0.5rem',
    fontSize: '1.2rem',
  },
  input: {
    flex: '1',
    fontSize: '1.2rem',
    border: '0',
  },
  inputFocus: {
    outline: '0',
  },
  button: {
    fontSize: '1.5rem',
    backgroundColor: '#1A8FE3',
    color: 'white',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderTopRightRadius: '0.5rem',
    borderBottomRightRadius: '0.5rem',
    border: '1px solid white',
  },
}

export default MessageForm