# React Notifier

React component for notifications on the fron end.

## Installation

```
$ npm i --save @breathecode/react-notifier
```

## How to use it

1) Add the Notifier tag anywhere in your web app
```js
ReactDOM.render(
    <Notifier />,
    document.querySelector('#root')
);
```
2) Call the Notify function from anywhere else
```js

//notify for error
Notify.error("Hey! There is an error");

//notify for success
Notify.success("Everything is cool my brother");
```

## Customize notification

2) Call the Notify function from anywhere else
```js
    
    const ModalComponent = ({ onConfirm }) => 
        <div>
            <h1>Are you sure?</h1>
            <button onClick={()=>onConfirm(true)}>Yes</button>
            <button onClick={()=>onConfirm(false)}>No</button>
        </div>;

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
