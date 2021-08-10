# leaflet-challenge:
--- 
## Fetching Datasets:

Initially the earthquake and tectonic plates datasets are fetched from the USGS GeoJSON feed.

![Data Links](Images/Data_Links.PNG)

## Import & Visualize the Data:

- A Javascript d3 library is used to parse the JSON data.

- A leaflet map is plotted, based on the longitude and latitude from the earthquakes dataset.

- Here the depth of the earthquake is shown from the third coordinate for each earthquake dataset.

- The popups are added that provides the additional information about the earthquake's magnitude, when a marker is clicked.

![Layers](Images/Earthquake_Layer.PNG)

- Two base layers, 'street' and 'topo' are created.

![Topo Layer](Images/Topographic_map.PNG)

- Two overlay maps, 'earthquakes' and 'tectonicPlates' are created.

![Tectonic plates line](Images/Tectonic_Plates_Line.PNG)

- A legend provides the context for the map data.

![Legend](Images/Legend.PNG)

- A layer controls is added to the map.



