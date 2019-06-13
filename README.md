# Semia
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation
Run the following commands
```sh
git clone https://github.com/MartijnReeuwijk/meesterproef-semia.git
cd meesterproef-semia
npm install
touch .env
```

Next install a mysql database and add the user `semia` with a password of your choice.  
Then open the `.env` file and add the following
````
DB_HOST=localhost
DB_USER=semia
DB_PASSWORD=the_password_you_chose
DB_NAME=semia
```

To run the server either use
```sh
nodemon

# or

npm run dev

# or

node index.js
```


# meesterproef
We were given the
Over a span of five weeks we willl be working on a data visualisation case with Semia. The case we were presented with was very free and open to our ideas, we were simply tasked with the challenge to come up with and create an application with which users could navigate through the video data in an explorative and playful way. With this in mind we (Jeroen, Martijn, Leonie and Timothy) set out to brainstorm ways in which we could do that.  
What we came up with was an app which rotated through the vast amout of visual data constntly displaying nine randomised images the user could interact with which would in turn display video stills related to it in color, shape, texture and movement respectively. We imagined the user would be able to navigate through the immense data by viewing images related to each other in various ways leaving behind a trail of choices reflected in breadcrumbs.

## Week 1
Mostly debriefing followed by brainstorming and idea generation.
After working together on two separate occasions we

### inspiration
##### The modular body |
A very cool but heavy site displaying videos in a manner which allows for exploring.
http://www.themodularbody.com/  

##### Bladerunner 2049
Another cool source of inspiration was a scene from the latest blade runner movie where Kay is searching for specific data in an interface which looped each hit after a small time frame. This inspired us to loop the videos every few seconds.
https://www.youtube.com/watch?v=04He1qcAgv8&t=58s

## Week 2
We've experimented with multiple ways in which to filter the related images. We tried making the user filter related stills before they are displayed as well as only making the filter option available after the user has seen related stills. The first option is a faster approach and displays the users filtered choice quicker, the second options displays all related stills and has far more explorative capabilities than the first whilst still allowing the user to make real time filter options. After prototyping both filters we chose to implement the second option.

## Week 3  


### Testing product with peers
We conducted three tests with peers where we tested in which ways we should change the flow of the app. We wanted to make it possible for users to view the details/metadata and the actual full clip of a video they were interested in. We had come up with three ways in which the user could do this, made a mockup for each one and tested with peers to hear their opinions and reasons why they thought either one was better.

User feedback showed a clear preference for an overlay screen wherein the user could preview and view data of the video while staying in the same viewport. The users said it was more "in your face and clear what you can do in this view" than the screen where the content is added to the bottom of the page. Users also noted that with the overlay screen you know where you are and which video you've selected
