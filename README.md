# Village Mapping for Maharashtra
A webapp built by the [Datameet](http://www.datameet.org) Pune chapter to visualize and analyze village level variables for Maharashtra's villages.
Primary source for data visualized within the app is the [District Census Hand Book](http://www.censusindia.gov.in/2011census/dchb/DCHB.html) for 2011

![Webmap Maharashtra villages preview](/images/Webmap_Maharashtra_villages_preview.PNG)

## How-to use the Webmap
* You can view and use the map at the link https://bnamita.github.io/Village_Mapping_v2/
* The app loads and shows all the villages of one district at a time
* The maps are large in size (upto 10 mb) and depending on your internet speed may take some time to load
* Once loaded, select a variable from the dropdown menu on your left
* Similarly select a district from the district menu and wait till it loads

## Webmap Features  
* The Basemaps can be changed as well (see top right). Options provided include Mapbox Satellite and Open Street Maps
* The transparency of the thematic map can also be changed to view the basemap below
* Hovering the mouse over a village will display info for the village in a box in the top right corner. 
* The Village's 2011 census code and tehsil is also displayed.
* The legend and attribution for the map is displayed at the bottom right.

## Feedback
Contact us at pune@datameet.org
* Feel free to suggest new features by mailing us or open an issue on the repository
* We would also like feedback from researchers and rural development sector professionals and NGOs on the usefulness of this map.
* If you do use visuals from this map in your work do mail and tell us how you used them. It gives us reason to do more :)

## How to use the map on your desktop GIS
* The Webmap format has its limitations. You can also access the maps via a desktop GIS software such as QGIS, see below.
* For this simply download the entire state's geojson and also the District Census Handbook data here. 
* We will update the geojson continuously based on error reports we receive.

![Marathwada villages in QGIS](/images/Marathwada_villages_population.PNG)

## How to contribute to the Webmap
###Short term planned changes
Several features are still in the works. If you think you would like to have a go at one of these fork us!
Do feel free to suggest additional features as well.<br>

1. Displaying categorical data: As of now the map is only equipped to display numerical data. Attempting to display categorical variables give errors [DONE]
2. Changing the choropleth scheme to a quantile based classification. The current uniform classification does not capture variation well.
3. A download button to download just the data that is currently being displayed as a csv and the boundaries as a geojson. [DONE]
4. A way for users to save images as snapshots [DONE]
5. Smaller improvements to the styling and layout of the map.<br> 
 * make only the fill transparent, not the border. <br>
 * display village names after zooming in to a certain level<br>
 * Need to have further discussion on how the styling/layout can be improved
6. Link with web map with [Village wiki files](https://github.com/IndiaWikiFiles/Maharashtra)
7. Incorporate marathi variable names and village names

8. Non technical help needed<br> 
  *Help us curate the variables and limit to the most relevant ones.[DONE]<br>
  *Error checking - view variables one at a time and report errors in display<br>
  *Translation of content to Marathi<br>
  *Help by pulling in Census 2001 data for comparison.<br>
  *Also help by reporting errors and commenting on the data (See tracking sheet here http://tinyurl.com/dmpune17916)<br>
  *Help by spreading the word and share the map with others

###Long term planned changes
1. A way to display a second variable on the same map for comparison
2. A way for users to add their own data. A two column csv with one column containing the census village codes and the second <br>containing their data of interest.
3. A way to merge town directory data into the webmap
4. Calculated area variable - To show difference between census geographical area and area of village polygon
5. Collapsible panel to show a guide to using the map
6. A way to report errors in the map.
7. A basic feedback form that sends feedback to our mail id pune@datameet.org

## Disclaimer
The data displayed here is data produced by the Census of India. The boundaries of villages are those published on the 
[Bhuvan Panchayat portal](http://bhuvan-panchayat.nrsc.gov.in/). We assume no responsibility and are not liable for any errors
in the display of the data.

## License
The code for this map is made available under ____

## Background of this Exercise
Read more about how this exercise has evolved at this link
https://craigdsouza.github.io/village_mapping/
