import {AppRegistry} from 'react-native';
//import App from './app/dap';
import App from './app/App';
//import App from './NavApp/index'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
