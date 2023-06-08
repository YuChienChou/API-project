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
import ManageReviews from './components/Reviews/ManageReview';
import SearchSpots from './components/Spots/SearchSpots';

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
           <Route exact path='/spots/current' component={ManageSpot} />
           <Route exact path='/spots/new' component={CreateSpotForm} />
           <Route exact path='/spots/query' component={SearchSpots}/>
           <Route exact path='/spots/:spotId/edit' component={EditSpotForm} /> 
           <Route exact path='/spots/:spotId' component={SpotShow} />
           <Route exact path='/reviews/current' component={ManageReviews} />
           
      </Switch>}
      
    </>
  );
}

export default App;