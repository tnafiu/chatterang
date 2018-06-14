import React, {Component} from 'react' 

class RoomForm extends Component {
    render() {
      return (
        <div className="RoomForm">
          <form>
            <p>
              <label htmlFor="name">Room name</label>
              <input
                type="text"
                name="name"
              />
            </p>
            <p>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
              />
            </p>
            <div>
              <button
                type="button"
                onClick={this.props.hideRoomForm}
              >
                Cancel
              </button>
              <button type="submit">
                Create Room
              </button>
            </div>
          </form>
        </div>
      )
    }
  }

export default RoomForm