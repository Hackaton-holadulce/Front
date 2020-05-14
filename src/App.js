import React from 'react';
import MyProvider from './Components/context/MyProvider';
import './App.css';
import Home from './Components/Home/Home';
import { Switch, Route } from 'react-router-dom';
import Stock from './Components/Stock/Stock';
import Box from './Components/Box/Box';
import SaveStock from './Components/Stock/insertStock';
import Sale from './Components/Sales/Sales';
import { Link } from 'react-router-dom';
//import { MyContext } from '../context/MyProvider';


class App extends React.Component {


    render () {

        return (
            <MyProvider>
                <div className="App">
                    <Link to="">Volver al dashboard</Link>
                    <Switch>
                        <Route
                            exact path="/"
                            render={(props) => (
                            <div> <Home  {...props} /> </div>
                            )}
                        />
                        <Route
                            path="/stock"
                            render={(props) => (
                            <div> <Stock  {...props} /> </div>
                            )}
                        />
                        <Route
                            path="/box"
                            render={(props) => (
                            <div> <Box  {...props} /> </div>
                            )}
                        />
                        <Route
                            path="/form-stock"
                            render={(props) => (
                            <div> <SaveStock  {...props} /> </div>
                            )}
                        />
                        <Route
                            path="/sale"
                            render={(props) => (
                            <div> <Sale  {...props} /> </div>
                            )}
                        />
                    </Switch>
                </div>
            </MyProvider>
        );
    }
}

export default App;
