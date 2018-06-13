import React from 'react'

const Message = (props) => {
  return (
    <div className="Message">
      {props.message.userName}: {props.message.body}
    </div>
  )
}

const styles = {
  message: {
    display: 'flex',
    marginTop: '1rem',
    padding: '0 1rem',
  },
  
  children: {
    flex: '1',
    paddingLeft: '0.5rem',
  },
}

export default Message