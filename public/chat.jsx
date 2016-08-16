import React, {Component} from 'react';
import MessageForm from './message-form.jsx';
import MessageList from './message-list.jsx';

export default class Chat extends Component {

  render() {
    return <div>
      <MessageForm/>
      <hr/>
      <MessageList/>
    </div>;
  }
  
}