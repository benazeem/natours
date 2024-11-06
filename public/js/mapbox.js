export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWFrYXplZW0iLCJhIjoiY20zNWh4eDV4MGJicjJscjJpY2kzajZ5cyJ9.KDDwdc66UUTlQAYy8Ru0jw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //Add Marker
    const el = document.createElement('div');
    el.className = 'marker';

  

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    }).setLngLat(loc.coordinates).addTo(map);

    //Add Pop-up
   const popup =  new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description} </p>`)
      .addTo(map);
    //Extend map bounds to include the new location
    bounds.extend(loc.coordinates);
  });

 

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
