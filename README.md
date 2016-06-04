We are developing a mobile application named “Smart Minutes of Meeting”. The main objective of the app is to record the communication or the interaction between groups of people and convert the speech into readable text using natural language processing. Then through IBM’s Watson API the generated text is analysed thoroughly and the results are categorized according to the specifications like classifications on the basis of speakers participating, then it will analyse sentiments of speakers. This whole analysis will be stored on cloud so that it will be accessible to everyone. Employees of the organization usually face many problems due to inefficient communication. We are trying to solve the problem by automating the process of capturing minutes of meeting and making them publically available. Doing this will help solve the problem faced by inefficient communication in meeting. As the project deals with a mobile app which listens to a meeting and as an output, gives structured data in the form of meeting minutes. It will drastically reduce human efforts and increase the productivity. Also, as it will be analysing emotions, so that it will be accurate. It will analyse the data more in depth. As the recorded meeting, the sentiments and the minutes of the meeting will be stored on cloud, so practically it will last forever and all the information about the meeting can be accessed anytime, anyplace and any number of times.

INTRODUCTION
This document outlines the problems faced by organizations. It also outlines the features provided by our application and guidelines to use the application. Everyday there are hundreds of meeting taking place in every organization. It becomes difficult to track the discussions in those meetings. If the task of tracking all those discussions is assigned to a person, it will be cumbersome for the individual and also there are chances of human errors. Taking all these problems into our minds, we came up with an idea to automate the process of tracking these discussions. So, we have developed an application, which is user friendly and will allow a team from an organization or any group of people to record their conversation, convert it into textual format and store it on the cloud database. This makes it accessible to everyone in the organization. Our application will also analyze the textual data and provide sentimental analysis of all the members involved in the conversation. Each member of the team can later check the list of meetings he or she had attended in the past. From that list of meetings, they can click on individual meeting and will get the recorded minutes of the meeting, list of the members who were there in that meeting as well as the analysis provided by Watson API’s to that discussion. User can also choose to listen to the recorded discussion as recording will also be saved in the cloud database.

Problem Statement
As we already discussed a little in the introduction that today’s organizations are facing trouble in
organizing their minutes of meetings, it seems that with the rapid increase in number of organizations these days, this problem is also increasing to a large amount. On the other hand, it is also difficult for the person who is assigned the task to build minutes of meeting daily for all the meetings taking place in the organization. They may miss out some of the important points discussed during the meet, leading to human errors or wrong conveying of the information. Also, this individual may get frustrated with this banal task of daily jotting down all the points discussed during the meeting leading to poor employee satisfaction in the organization. Also, it is a wastage of the resource as the individual assigned with this task will have to work on making minutes of meetings and other productive works that the individual can perform may get affected which is a big trouble.
There may be some cases where a team member of the team may not be present at the meeting due to some other circumstances. So, to get to know what all was discussed during the meeting that person may have to contact some other team member to get the idea about all the points of the missed meeting, or they may have to read the minutes of the meeting written by some human. These minutes of meeting may be error prone leading to wrong information gathering. This all may end up in impacting the organizations business to a greater extent.
  Client Side Technologies
    Technologies that we have used for our application for client side includes:
       HTML5
       Bootstrap
       CSS
       Angular JS
  To make the client side of the app attractive, we made the use of above technologies. Bootstrap helps to make the design responsive. The main motive behind using the Angular JS is to make the web site dynamic. This makes our app visually impressive and it is also user friendly. The structure of the app is made in such a way that any new user who comes to our site will get the gist of the application within fraction of seconds.
  
  Server Side Technologies
    Technologies that we have used for server side programming includes:
       Node JS
       Express JS
       Speech to Text IBM converter
       IBM Watson concepts insights API  IBM Alchemy
  
  We have designed the backend of the system in such a way that it can handle thousands of users without crashing. The core business logic of the system is developed using Node JS and Express JS. REST based services are used which makes it control the data flow in efficient way. When the meeting is recorded, to convert the vocal information into written format, we have used an IBM tool Speech to Text converter. As the name suggests, it will convert the speech into readable format. IBM alchemy is used to analyze the text. All the sentiments from the text are extracted and based on that a graph is produced which will provide the minutes of meeting.

Backend Technology
  The backend which we have used for our system application is MongoDB. The main goal behind choosing MongoDB as the database is that it allows the unstructured data to be stored in JSON format. For large number of users, database such as MongoDB is useful.
Unit Testing
  Each of the web Page that is designed was checked thoroughly. Manual Testing was performed to ensure that every functionality is working and we made sure that it can be deployed. We also validated the login of the system which is essential part of security.
Integrated Testing
  When the entire application was integrated we performed the integrated testing to ensure that all of the functionalities are working correctly. We also made sure that the flow of the system was maintained while integrating the application.
Architecture Diagram:

Security
  The password which user enters will be encrypted and stored in the database. No one can decrypt the password. If one of the users forgets the password, the previous password won’t be given back to him. Instead he will be asked to enter a new password. So that it keeps the integrity of the system. User will be able to see the records once he will be authenticated. Every user can see his own records of the meeting. This is how we are maintaining the integrity of the system.
Conclusion
  Our application targets the organizational need of tracking the records or the key points of a particular meeting. There are hundreds of meeting taking place in a day. Our application conducts the analysis of the meeting and provides the minutes of meeting of the conversation. This helps to get the gist of the meeting so that on particular person should be dedicated to write down the key points of the meeting. Our application automates the entire process which makes it efficient and can handle number of meetings.

Github Link:
  https://github.com/pratiksanglikar/SmartMOM.git
Application Link:
  https://smartmom.herokuapp.com/
