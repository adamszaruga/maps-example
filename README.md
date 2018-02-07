## Hi Cherie!

# First, let's make your MapContainer component aware of what city is in the Browser Bar

- Check out my App.js
- I have two functions called nyc() and raleigh()
- I think you have the same functions
- They're simply routing to /map/nyc and /map/raleigh
- Check out the Route tag on line 25
- Check out its "path" property. I have it set to '/maps/:city'
- The colon right before 'city' lets react router know that we can have any city in the browser bar, and it'll take us to the MapComponent no matter what city is in the browser bar
- Now, move on to MapContainer.js
- Our MapContainer.js is going to need to read from the browser bar. To do that, it needs to be set up with 'withRouter()' in the very same way that your SearchBar component has it. (see line 4 and line 95)
- Check out the constructor. we're giving teh state a property called 'destination', setting it equal to props.match.params.city
- that's where we save the destination city to the MapContainer's "brain". We'll refer to this.state.destination later.

# Next, we'll need to map out the path from Atlanta to the destination city

- Normally we would do this in constructor, but google-maps-react asks us to do this in the Is function! It's somewhere in their documentation
- In the same place as 'initialCenter', you should see onReady={this.mapIsReady.bind(this)} 
- This means when the map is finally ready to be messed with, it'll call our mapIsReady function that is defined on line 24
- Take a look at lines 24 thru 49. This is how you show directions using the provided DirectionsService from google. 
- Notice that I referenced this.state.destination on lines 33 and 35
- That's it! Your code won't look any different than this

# Finally, let's use axios to get the restaurant locations from Sunit's API

- you should see the axios call on line 52 (also inside of the mapIsReady function)
- it uses this.state.destination to see if we should do a GET request to either '/maps/nyc' or '/maps/raleigh'
- Assuming that the API will respond with a list of lat/lng's, we just call this.setState() to update the markers that live in the state
- Since you already have your render() function reading from this.state.markers, you should see the map automatically update with all the markers!