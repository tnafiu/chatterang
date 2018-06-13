import React from 'react'

const Avatar = (props) => {
  return (
    <div
      className="Avatar"
      style={{
        ...styles,
        ...props.style,
        background: `url(https://api.adorable.io/avatars/40/${props.user.email})`,
      }}
    ></div>
  )
}

const styles = {
  height: '40px',
  width: '40px',
  fontSize: '1rem',
  borderRadius: '20px',
}

export default Avatar