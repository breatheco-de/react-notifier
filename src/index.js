import React from 'react';
import EventEmitter from 'events';
import PropTypes from 'prop-types';
import { Dispatcher } from 'flux';
const dispatcher = new Dispatcher();
const NOTIFICATIONS_EVENT = "bc-react-notifier";

const remove = (id) =>{
    let notifications = store.getNotifications().filter(noti => noti.id != id);
    dispatcher.dispatch(notifications);
};

const add = (type, message, confirm=null, timout=6000) =>{
    
    let state = store.getNotifications();
    if(!state) state = [];
    if(typeof message == 'string') message = [message];
    
    let notification = {
        id: Math.floor(Math.random() * 100000000000),
        msg: message,
        type: type,
        onConfirm: confirm,
        timout: timout,
        remove: () => remove(notification.id)
    };
    let notifications = state.concat([notification]);
    
    dispatcher.dispatch(notifications);
    
    if(!timout) timout = 99999999999999999;
    setTimeout(() => {
        remove(notification.id);
    },timout);
    
    return notification;
};

const success = (msg, conf, timout=6000) => add('success', msg, conf, timout);
const error = (msg, conf, timout=6000) => add('error', msg, conf, timout);
const info = (msg, conf, timout=6000) => add('info', msg, conf, timout);
const clean = () => dispatcher.dispatch([]);

export const Notify = {success, error, info, clean, add, remove};

/**
 *      Components
 **/

let Message = (props) => { 
    const Msg = props.noti.msg;
    return (
        <li className={'alert '+props.typeClass}
            style={{
                height: (confirm) ? 'inherit' : '0'
            }}
        >
            { (!Array.isArray(Msg)) ? <Msg onConfirm={props.noti.onConfirm} /> : props.noti.msg.map((msg,i) => (<p key={i} className="noti m-0">{msg}</p>)) }
            { (props.confirm && Array.isArray(Msg)) ? 
                (<p>
                    <button className="btn btn-light" onClick={() => props.noti.onConfirm(false)}>Cancel</button>
                    <button className="btn btn-success ml-2" onClick={() => props.noti.onConfirm(true)}>Confirm</button>
                </p>)
                : ''
            }
        </li>
    );
};
Message.propTypes = {
  noti: PropTypes.object.isRequired,
  onConfirm: PropTypes.func,
  confirm: PropTypes.bool,
  typeClass: PropTypes.string
};

export class Notifier extends React.Component{

    constructor(){
      super();
      this.state = {
        notifications: [],
        typeClasses: {
          error: 'alert-danger',
          success: 'alert-success',
          info: 'alert-info',
          warning: 'alert-warning'
        }
      };
      this.notificationsUpdated = (notifications) => this.setState({ notifications });
    }
    
    componentDidMount(){
        store.on(NOTIFICATIONS_EVENT, this.notificationsUpdated);
    }
    
    componentWillUnmount(){
        store.removeListener(NOTIFICATIONS_EVENT, this.notificationsUpdated);
    }
    
    render(){
        const notifications = this.state.notifications.map((noti, i) => {
          if(typeof noti.msg === 'undefined') return '';
          if(typeof noti.onConfirm === 'function') return <Message key={i} noti={noti} confirm={true} typeClass={this.state.typeClasses[noti.type]} />;
          return (<Message key={i} noti={noti} confirm={false} typeClass={this.state.typeClasses[noti.type]} />);
        });
        
        return(<ul className={"bcnotifier "+this.props.className}>{notifications}</ul>);
    }
}
Notifier.propTypes = {
  className: PropTypes.string
};
Notifier.defaultProps = {
  className: ''
};

/**
 *      Store
 **/
class NotificationStore extends EventEmitter{
    constructor(){
        super();
        this.notifications = [];
        dispatcher.register((notifications) => {
            this.notifications = notifications;
            this.emit(NOTIFICATIONS_EVENT, this.notifications);
        });
    }
    
    getNotifications(){
        return this.notifications;
    }
}
const store = new NotificationStore();