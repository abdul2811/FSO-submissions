const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    else {
        if (message.includes('Delete')){
            return (
                <div className='message delete'>
                    {message}
                </div>
            )
        }
        else if (message.includes('Added')){
            return (
                <div className='message add'>
                  {message}
                </div>
            )
        }
        else if (message.includes('Replaced')){
            return (
                <div className='message replace'>
                    {message}
                </div>
            )
        }
        else {
            return (
                <div className='message error'>
                    {message}
                </div>
            )
        }
    }
  }

  export default Notification