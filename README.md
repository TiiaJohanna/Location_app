# TIK23SP_Mobile_Programming_Location_App
## Description
A React Native location app that allows users to save travel locations with a name, description, and rating. Locations are stored in a database and can be viewed in a list or displayed on a map based on the location name. This project is a mobile application created as part of a Mobile Programming course assignment.
## Purpose of this assignment
The goal of this project was to practice:

  • Basic navigation between screens
  
  • Storing and retrieving data
  
  • Using maps and geolocation
  
  • Building a functional mobile UI

## Features:
• Example frontpage view in assignment.



<img width="245" height="247" alt="image" src="https://github.com/user-attachments/assets/e40f9768-ce68-4e30-b0e6-9f5610abe21d" />




• Example in "Add location view".



<img width="235" height="206" alt="image" src="https://github.com/user-attachments/assets/f734a586-627f-4adb-86d2-f81f47323595" />




• Example "Map view" in app.



<img width="421" height="252" alt="image" src="https://github.com/user-attachments/assets/844f1ed2-6fd7-43dc-9cef-7b95012b59d7" />





## Locations List View

• Displays a list of travel locations fetched from Firestore / AsyncStorage

• Each location includes:

      • name

      • description

      • numeric rating

• A location can be selected from the list to view it on the map

## Add Location View

• Form for adding a new location

• User can input:

    • location name

    • description

    • rating

• New locations are saved to Firestore / AsyncStorage

• The locations list updates after adding a new item

## Map View

• Opens when a location is selected from the list

• Location coordinates are calculated based on the location name

• The location is displayed on the map if foundDisplays a list of travel locations fetched from Firestore / AsyncStorage

## Techical Overview
• Framework: React Native

• Navigation: stack navigation between views

• Data storage: Firestore / AsyncStorage

• Maps & geolocation: map component with location search

• Version control: GitHub with regular commits

## Demo
Link to the presentation video: https://youtube.com/shorts/uNkwuZYqg90
