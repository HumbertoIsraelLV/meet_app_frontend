import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import IntroductionPage from './IntroductionPage/IntroductionPage';
import JoinRoomPage from './JoinRoomPage/JoinRoomPage';
import ReportPage from './ReportPage/ReportPage';
import RoomPage from './RoomPage/RoomPage';
import { connectWithSocketIOServer } from './utils/wss';

function App() {
  useEffect(()=>{
    connectWithSocketIOServer();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/report">
          <ReportPage/>
        </Route>
        <Route path="/join-room">
          <JoinRoomPage/>
        </Route>
        <Route path="/room">
          <RoomPage/>
        </Route>
        <Route path="/">
          <IntroductionPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
