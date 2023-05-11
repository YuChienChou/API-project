import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spots/SpotsIndex";
import SpotShow from "./components/Spots/SpotShow";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import EditSpotForm from "./components/Spots/EditSpotForm";
import ManageSpot from "./components/Spots/ManageSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
     
      {isLoaded && 
      <Switch>
           <Route exact path='/' component={SpotsIndex} />
           <Route path='/spots/current' component={ManageSpot} />
           <Route path='/spots/new' component={CreateSpotForm} />
           <Route path='/spots/:spotId/edit' component={EditSpotForm} /> 
           <Route path='/spots/:spotId' component={SpotShow} />

           
      </Switch>}
      
    </>
  );
}

export default App;