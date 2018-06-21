import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class RoomForm extends Component {
  state = {
    room: {
        name: '',
        description: '',
        public: true,
        dm: false,
        members: [],
    },
  }

  users = () => {
    const { users } = this.props
    delete users[this.props.user.uid]

    return Object.keys(users).map(
      uid => {
        const user = users[uid]
        return {
          value: uid,
          label: `${user.name} (${user.email})`,
        }
      }
    )
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.addRoom(this.state.room)
    this.props.history.goBack()
  }

  handleChange = (ev) => {
    const room = {...this.state.room}

    const target = ev.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    room[target.name] = value
    this.setState({ room })
  }

  handleSelectChange = (selectedOption) => {
    const room = {...this.state.room}
    room.members = selectedOption

    this.setState({ room })
  }

  render() {
    return (
      <div className={`RoomForm ${css(styles.roomForm)}`}>
        <main className={css(styles.main)}>
          <h2 className={css(styles.title)}>Create a room</h2>
          <form
            className={css(styles.form)}
            onSubmit={this.handleSubmit}
          >
            <p>
              <label className={css(styles.label)}>
                <input
                  type="checkbox"
                  name="public"
                  checked={this.state.room.public}
                  onChange={this.handleChange}
                />
                Public
              </label>
            </p>
            <p>
              <label htmlFor="name" className={css(styles.label)}>
                Room Name
              </label>
              <input
                type="text"
                name="name"
                value={this.state.room.name}
                className={css(styles.input, styles.textInput)}
                onChange={this.handleChange}
                autoFocus
              />
            </p>
            <p>
              <label htmlFor="description" className={css(styles.label)}>
                Description
              </label>
              <input
                type="text"
                name="description"
                value={this.state.room.description}
                className={css(styles.input, styles.textInput)}
                onChange={this.handleChange}
              />
            </p>
            {
              !this.state.room.public && (
                <div>
                  <label
                    htmlFor="members"
                    className={css(styles.label)}
                  >
                    Members
                  </label>
                  <Select
                    multi
                    name="members"
                    options={this.users()}
                    value={this.state.room.members}
                    onChange={this.handleSelectChange}
                    className={css(styles.input)}
                    placeholder="Invite people..."
                  />
                </div>
              )
            }
            <div className={css(styles.buttonContainer)}>
              <button
                type="button"
                className={css(styles.button, styles.cancel)}
                onClick={this.props.history.goBack}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={css(styles.button)}
              >
                Create Room
              </button>
            </div>
          </form>
        </main>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  roomForm: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f6f6f6',
    zIndex: 1000,
  },

  title: {
    color: '#ff3344',
    fontWeight: 400,
    lineHeight: '80px',
    fontSize: '2rem',
  },

  main: {
    flex: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
    paddingBottom: '3rem',
    width: '40rem',
  },

  form: {
    backgroundColor: 'white',
    boxShadow: '0 1px 1px rgba(0,0,0,.1)',
    marginBottom: '2rem',
    padding: '0 2rem 2rem',
  },

  label: {
    display: 'block',
    textTransform: 'uppercase',
    color: '#999',
  },

  input: {
    fontSize: '1.5rem',
    border: 0,
    borderBottom: '1px solid black',
    margin: '1rem auto',
    textAlign: 'center',
    padding: '0.5rem',

    ':focus': {
      outline: 0,
    },
  },

  textInput: {
    width: '20rem',
  },

  h2: {
    fontWeight: 'normal',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  button: {
    display: 'block',
    padding: '1rem',
    margin: '0 1rem',
    fontSize: '1.2rem',
    borderRadius: '1rem',
    backgroundColor: '#ff3333',
    color: 'white',
    width: '10rem',
    cursor: 'pointer',
    outline: 0,
  },

  cancel: {
    backgroundColor: 'white',
    color: '#666',
  },
})

export default RoomForm