# React Notifier

React component for notifications on the fron end.

## Installation

```
$ npm i --save @breathecode/react-notifier
```

## How to use it

1) Add the Notifier tag anywhere in your web app
```jsx
ReactDOM.render(
    <Notifier />,
    document.querySelector('#root')
);
```
2) Call the Notify function from anywhere else
```js

//notify for error, it will automatically close after 2 seconds
Notify.error("Hey! There is an error");

//notify for success, it will automatically close after 2 seconds
Notify.success("Everything is cool my brother");
```

## Customize the component for notification

1) Create the component
```jsx
    
    const ModalComponent = ({ onConfirm }) => 
        <div>
            <h1>Are you sure?</h1>
            <button onClick={()=>onConfirm(true)}>Yes</button>
            <button onClick={()=>onConfirm(false)}>No</button>
        </div>;
```
2) Call the Notify function from anywhere else (passing the component
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
