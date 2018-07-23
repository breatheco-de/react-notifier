# React Notifier

React component for notifications on the fron end.

## Installation

```
$ npm i --save @breathecode/react-notifier
```

## How to use it

1) Add the Notifier tag anywhere in your web app
```html
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