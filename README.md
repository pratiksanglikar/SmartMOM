# SmartMOM - Smart Minutes of Meeting
## Introduction
SmartMOM is a web application that one can use to get key points discussed in meeting, summary and minutes of meeting online. 
The application records the meetings, and processes the audio using IBM Watson API's to extract important information.

*This project is an academic project in __San José State University, CMPE - 272 course__*

### Features
- get audio recording of the meeting
- get text extract of the meeting
- get important key points discussed
- get tone of the meeting

### Future Enhancements
- Role based security
- Voice differentiator engine for better text extraction

### Live Demo
- https://smartmom.herokuapp.com/  *use username/password: test/test to login*

## Motivation
This application tries to solve the problems faced by organizations. 
Everyday there are hundreds of meetings taking place in every organization. It becomes difficult to track the discussions in those meetings. If the task of tracking all those discussions is assigned to a person, it will be cumbersome for the individual and also there are chances of human errors. 
Taking all these problems into consideration, we came up with an idea to automate the process of tracking these discussions. So, we have developed an application, which is user friendly and will allow a team from an organization or any group of people to record their conversation, convert it into textual format and store it on the cloud database. This makes it accessible to everyone in the organization. 
Our application will also analyze the textual data and provide sentimental analysis of all the members involved in the conversation. Each member of the team can later check the list of meetings he or she had attended in the past. From that list of meetings, they can click on individual meeting and will get the recorded minutes of the meeting, list of the members who were there in that meeting as well as the analysis provided by Watson API’s to that discussion. User can also choose to listen to the recorded discussion as recording will also be saved in the cloud database.

## Technology Stack
### Server Side Technologies
- Node.js (Express)
- MongoDB
- IBM Bluemix Speech to Text convertor
- IBM Bluemix Concept Insights API
- IBM Bluemix Alchemy API

### Client Side Technologies
- AngularJS
- Bootstrap
- HTML5
- CSS3

## Screenshots
### Architecture Diagram
![alt text](http://i.imgur.com/9qB9HA8.png "Architecture Diagram")

### Home Page
![alt text](http://i.imgur.com/XihADEY.jpg "Home Page")

### Record, Playback and Upload.
![alt text](http://i.imgur.com/hXmpkq0.png "Record, Playback and Upload. Previous meetings shown in below list.")

### Transcript
![alt text](http://i.imgur.com/YEE82tO.png "Transcript")

### Summary
![alt text](http://i.imgur.com/sTy1cuT.png "Summary")

## Contact Information
- [LinkedIn](https://www.linkedin.com/in/psanglikar)
- [Portfolio](https://branded.me/pratiksanglikar)
- [Email](mailto:pratiksanglikar@gmail.com)
