# React Notifier

React component for notifications on the fron end.

## Installation

```
$ npm i --save bc-react-notifier
```

## How to use it

1) Add the Notifier tag anywhere in your web app
```jsx
import {Notifier} from 'bc-react-notifier';
ReactDOM.render(
    <Notifier />,
    document.querySelector('#root')
);
```
2) Call the Notify function from anywhere in you code
```js
import {Notify} from 'bc-react-notifier';

//Pass the error string or array, auto closes on 2 sec
Notify.error("Hey! There is an error");
//or successs string
Notify.success("Excelent! Everything went well");
//or info stirng
Notify.info("Everything is cool");

//you can also pass a confirmation callback to any of the notifications
Notify.error("Hey! Are you sure?", () => {
    //this functions runs on confirmation
});
```

## Customize the notification with a custom component

1) Create the component
```jsx
    
    const ModalComponent = ({ onConfirm }) => 
        <div>
            <h1>Are you sure?</h1>
            <button onClick={()=>onConfirm(true)}>Yes</button>
            <button onClick={()=>onConfirm(false)}>No</button>
        </div>;
```
2) Call the Notify function from anywhere else (passing the component)
```jsx
    /**
     * @param1: Wrapper css class 
     * @param2: Component to render it
     * @param3: callback when answered
     * @param4: timeout in millisecons (null for no timout)
    **/
    let noti = Notify.add('info', ModalComponent, (answer)=>{
        
        console.log("The user answer is: ", answer);
        noti.remove();
        
    }, 9999999999999);
```
