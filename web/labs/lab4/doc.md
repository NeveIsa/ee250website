---
title: Lab4 - Web Services
---


### {{FRONTMATTER.title}}
---

##### Due Date
- Deadline is <i style='color:white'>24th Sep, 2021</i>

##### References and Tutorials
- [Flask: Official](http://flask.pocoo.org/docs/1.0/tutorial/)
- [Flask: PythonSpot](https://pythonspot.com/flask-web-app-with-python/)
- [Flask: TutorialsPoint](https://www.tutorialspoint.com/flask)
- [Flask: YouTube](https://www.youtube.com/watch?v=MwZwr5Tvyxo)
- [Pickle: Official](https://docs.python.org/3.5/library/pickle.html)
- [Python Requests HTTP Library](http://docs.python-requests.org/en/master/)

---
##### Table of Contents
1. Introduction
2. Github Classroom
3. Setup
4. Part 1: Flask
5. Part 2: Pickle
6. Part 3: Persistence
7. Test on Raspberry Pi (1 point bonus)
8. Demo and Code Grading Rubric
---

##### 1. Introduction

In this lab you will gain experience developing your very own HTTP service. We will make use of a Python framework called Flask, which will handle a lot of the HTTP protocol for us. This frees us up to spend most of our time developing our application’s logic. For this lab we’ll be working building our very own simple mail service.


This lab relates closely to a future lab we will see in EE250 about RESTFul Services.  But here is a gentle introduction.

<iframe width="100%" height="500" src="https://www.youtube.com/embed/SLwpqD8n3d0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- [A gentle introduction to REST](https://flaviocopes.com/rest-api/)

---

##### 2. Github Classroom
To join the new Github Classroom assignment, please follow the invite at the top of this page. From this lab on, you will create teams of up to two via the Github Classroom interface (but you can always work alone, and you can pick different teammates for different labs). Github will create a copy of our new starter code for this lab when you create a new team.

For this lab, create your branch off of master (not ee250-master). Make sure your lab04 folder has the MailClient.py, MailServer.py, etc files.

---

##### 3. Setup
To install the necessary packages on Raspbian and Ubuntu, running the following command:

`sudo apt-get install python3-pip`  
`sudo pip3 install flask python-dotenv`

You’ll need Flask on your VM to complete this lab. To test your code on the raspberry pi (extra credit), you’ll need Flask on your RPi as well.

---

##### 4. Part 1: Flask
Flask is a very powerful web application framework for Python. It's impossible to cover the entire framework in just one lab session, so we will expose you to some of its features through a learn-by-example approach. In particular, you will complete some TODOs in the starter code to complete the mail service application.

There are two scripts that you will use directly on the command line, one for the server and one for the client. They should be run in separate terminal windows, from within the lab04 folder. Here’s an example of how they can be called:

`python3 mailServer.py -p 123`  
`python3 mailClient.py -a localhost:5000 -p 123 -u your_name`

If you forget what the arguments are, you can use the help flag:

`python3 mailServer.py -h`  
`python3 mailClient.py -h`

Complete the TODO in mailServer.py to add support for GET requests made to the URL /mailbox/search. The mailClient.py is already designed to send this type of request and can be used for testing. Make sure you understand the code in mailboxManager.py as you’ll need to make use of it to complete this part.

<b style='color:red'>Question 1: The Flask service outputs the URL for every request it receives. What is the URL for the get_mail request? What do you notice about your password?</b>



![flask.jpg](labs/lab4/flask.jpg)


---

##### 5. Part 2: Pickle

Pickle is a Python module that allows us to serialize and deserialize data. It’s similar to JSON, however it serializes data into a binary format instead of a string.

Practice using the pickle library in pickle_test.py by completing the TODOs. Use pickle to save and load list data from a file in binary format (see in-lined code comments for details). This experience will help you to complete Part 3.


![pickle.png](labs/lab4/pickle.png)
*No guys, you gotta seriously check dill [dill extends python's pickle (not used in lab4)](https://dill.readthedocs.io/en/latest/)*

---

##### 6. Part 3: Persistence
With your new pickling skills, complete the TODOs in mailboxManager.py to persist your mailbox data across server shutdowns or crashes.

---

##### 7. Test on Raspberry Pi (1 point bonus)

Figure out how to run the server side of your HTTP application on the raspberry pi, with the client side running on your VM. Show this in your screen recording demo for extra credit.

---



##### 5.Demo and Code Grading Rubrics

<b style='color:red'>All files are to be submitted via Vocareum as a team.</b>

| Points      | Description 														|
| ----------- | ----------- 														|
| DEMO	      | Record a video and share the link in the `README.md` file 							|
| 2	      | The search_mail request works correctly, with and without a search field. The search_mail responds correctly if the password is incorrect.      							|
| 2	      | Mailbox data is loaded on server start and persisted in a pickle file.	|
| CODE	      | `pickle_test.py, mailServer.py, mailboxManager.py, README.md`								|
| 1	      | List all team member names and the link to your shared GitHub repo in the README file.       	|
| 5	      | `search_mailbox_callback()` is properly implemented using a route decorator, supports fields if specified, handles password errors, and returns a response using JSON	|
| 2	      | `pickle_test.py` is implemented using the pickle module  	|
| 2	      | `mailboxManager` persists data (loads & saves) using pickle 	|
| WRITEUP  | README writeup file		|
| 1	      | Question 1   														|
| 	      | Total Possible: 15 points (16 with extra credit)					|
