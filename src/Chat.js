import React, {Component} from 'react'

import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageForm from './MessageForm'

class Chat extends Component {
    constructor(){
        super()
        this.state = {
            messages:[
                {
                    id:1,
                    userName: 'stephen',
                    body: 'cool.'
                },
                {
                    id:2,
                    userName: 'dpalazzo',
                    body: 'This guy is so annoying. I hate my job.'
                },
            ]
        }
    }

    render() {
        return (
          <div className="Chat">
            <ChatHeader/>
            <MessageList messages={this.state.messages}/>
            <MessageForm/>
          </div>
        )
    }
}

export default Chat 