import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TimeSlot from './components/TimeSlot';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={TimeSlot} />
      </Switch>
    </div>
  );
};

export default App;
