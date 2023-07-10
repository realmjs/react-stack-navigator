# React Stack Navigator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React Stack Navigator is a versatile library developed by RealmJS that offers a StackNavigator component, enabling seamless navigation and routing within your React applications. With React Stack Navigator, you can easily define a stack of routes and manage navigation between them, providing a smooth and intuitive user experience.

## Installation

```bash
npm install @realmjs/react-stack-navigator --save
```

## Example Usage

```javascript
import StackNavigator, { useStack } from '@realmjs/react-stack-navigator';

const routes = [
  ['home', (props) => <HomeScreen {...props} />, { path: '/', title: 'Home' } ],
  ['profile', (props) => <ProfileScreen {...props} />, { path: '/profile/:user', title: 'Profile' } ],
  ['settings', (props) => <SettingsScreen {...props} />, { path: '/setting', title: 'Settings' } ],
]

const fallbackRoute = ['404', NotFoundScreen]

function App() {
  return (
    <StackNavigator routeStack={routes} fallback={fallbackRoute} />
  )
}

export default App

```

Leverage the `useStack` hook to access the stack API within your components:

```javascript
const stack = useStack();
```

## Props

The StackNavigator component accepts the following props:

- `routeStack` (array): An array of route configurations. Each route configuration consists of three elements: `[routeId, renderFunction, options]`. The `routeId` is a unique identifier for the route, the `renderFunction` is the function that renders the component for the route, and `options` (optional) is an object that can include a `path` and a `title` for the route.

- `fallback` (array): An array representing the fallback route configuration. The fallback configuration consists of three elements: `[routeId, renderFunction, options]`. This route will be used when there is no matching route in the `routeStack` for the initial URL. The `routeId` is a unique identifier for the fallback route, the `renderFunction` is the function that renders the component for the fallback route, and `options` (optional) is an object that can include a `path` and a `title` for the fallback route.

- `onStackReady` (callback): The `stack` handler will be passed to the callback after its ready.

## Stack API

The StackNavigator component exposes the following APIs through the `useStack` hook:

- `next(props)`: Moves to the next route in the `routeStack`, passing `props` to the render function of the next route.

- `previous(props)`: Moves to the route above the current route in the stack, passing `props` to the render function of the previous route.

- `back(props)`: Returns to the previous route in the navigation history, passing `props` to the render function of the previous route.

- `move(routeId, props)`: Moves to the route with the specified `routeId` in the `routeStack`. If no `routeId` is provided or if the `routeId` is not found in the `routeStack`, an error will be thrown. `props` can be passed to the render function of the destination route.

- `animate(animation, options)`: Configures the animation for the next route transition. The `animation` parameter specifies the type of animation, while `options` (optional) allows for additional customization. This method returns the stack API itself, allowing for method chaining. For example, `stack.animate('flyIn right 0.4s').next(props)`.

**Note:** If you are using React Stack Navigator in a web application, each route in the `routeStack` can define a `path` in its options. When a route becomes active, the URL will be set to its corresponding path. If the webpage is loaded with a URL that matches one of the route paths, that route will be activated. The path pattern follows the format `/path/:params`, where `params` can be found as props in the component. For example, if a route has the path `/department/:dept/group/:group`, the equivalent props for the render function would be `{ dept, group }`. When the page is initially loaded with the path `/department/it/group/alpha`, the StackNavigator will resolve the props as `{ dept: 'it', group: 'alpha' }`. Navigating to that route using `stack.next({ dept: 'qc', group: 'beta' })` will resolve the path as `/department/qc/group/beta`.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
