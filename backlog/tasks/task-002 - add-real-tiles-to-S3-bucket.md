---
id: task-002
title: add real tiles to S3 bucket
status: To Do
assignee: ["Bill"]
created_date: "2025-08-03 23:51"
labels: []
dependencies: []
---

## Description

 - The @scripts/upload-tiles.js workflow hasn't yet been tested. We should do that
(even if it's just for one small area).
 - We need to stitch and georeference a set of historical images to test this. 

## Progress
 - Created example imagery dataset using QGIS. Covers just ANU campus in 1980.
 - Current pre-processing workflow is inefficient and requires point-and-click georeferencing.
 - Uploading with the browser took 3 hours.
 - Uploaded data to an [AWS static site](http://leaflet-anu.s3-website-ap-southeast-2.amazonaws.com) using the browser.
 - Confirmed that the site's performance is good.
 - As per Leaflet's XYZ [providers demo](https://leaflet-extras.github.io/leaflet-providers/preview/), Data can now be ingested by any leaflet map using the following code:
 
  ```javascript
  var ANU1980 = L.tileLayer('http://leaflet-anu.s3-website-ap-southeast-2.amazonaws.com/anu/{z}/{x}/{y}.png', { minZoom: 14, maxZoom: 21, attribution: '\&copy; cc-by Image data derived from Geoscience Australia\'s \<a href="https://www.ga.gov.au/scientific-topics/national-location-information/historical-aerial-photography">historical aerial photography collection</a>'
});
```

