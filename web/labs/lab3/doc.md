---
title: Lab3 - TCP, UDP, SOcket Programming
---


### {{FRONTMATTER.title}}
---

##### Useful links for current Lab

- [Lab03 Folder](https://drive.google.com/drive/folders/1BzUtTliRgU8lWsFMfT0JjaZahdWSJCnz)
- [Github Classroom Lab 3 Assignment](https://classroom.github.com/g/voOOd8HZ)

##### Lab3 Tools

To test your client code, you may use the servers we have hosted in the link below. 
You will need to connect to the random port that is displayed in the terminal.

- [Mock TCP Server - Use this to test your client code](https://lab.ee250io.tk:2503)

If you want to test your server code wihtout setting up the Microsoft Azure Instance first, you can do so using the cloud terminal below.

- [Free Cloud Ubuntu Instance - Test your server code here (Can also do on Azure)](https://lab.ee250io.tk:2511)

##### Due Date
- Deadline is <i style='color:white'>17th Feb, 2021</i>

---

_**I could tell you a UDP joke. <br> 
You might not get it.**_
---

1. Introduction
2. Socket Programming
3. Some Notes on Python
4. The Assignment
	- Evaluating TCP and UDP
	- TCP Client and Server
	- Microsoft Azure Instance
5. Demo and Code Grading Rubric

---

##### 1. Introduction

In class, we?ve been discussing networking concepts such as TCP, UDP, and ports. However, they will be easier to understand once we start using them. In this lab, we will dive head first into socket programming. We handpicked examples we think will expose you to practical socket programming concepts that will help you understand and debug network problems you will see in future projects or see when using consumer applications at home. Also, we will guide you step by step to create a cloud server on Microsoft Azure Platform, and then you can talk to your server program using your client program.

---

##### 2. Socket Programming

- [Real Python Socket Programming Tutorial](https://realpython.com/python-sockets/)
- [Python Module of The Week Socket Tutorials](https://pymotw.com/3/socket/)

It is important to understand the difference between TCP and UDP. In this lab we will mostly focus on TCP. As discussed in class, TCP is quite sophisticated and provides reliable connection-oriented end to end transport of messages across the Internet. There are many variant implementations of TCP such as TCP Reno, Tahoe, Westwood, Vegas, but they all present the same socket programming interface to applications. In this lab, you will get exposed to both the client and server code of TCP. 

The socket programming itself is independent of any programming language. For example, in this lab, the client code can be written in either Python or C/C++ while the server code is written in C. As you go deeper into this field, you will find that much of the systems and infrastructure code is written in C/C++ (such as the Linux kernel).

---

![udpjoke](lab3/udpjoke.png)

---

##### 3. Some Notes On Python 

Python is easy. Many people say ?life is short, use python?. But do not misunderstand these words -- in a system design process, you can?t just make a decision to use python because it is ?easy and short?. Also in today?s ?artificial intelligence? world, python may be overrated by some people -- some who just use programming as a logical tool think they can use python to do anything, but the truth is, it has limitations such as slow run-time that can potentially affect performance in large-scale production systems.

It?s totally fine for people in finance, accounting etc to use python for their targeted purposes, but as professional engineers, we do need to keep in mind - learning python is good, but although it simplifies your coding experience greatly, it can also limit your ability to appreciate fully what?s going on under the hood. Some things to consider:

1. How is the memory address handled? 
	- In C, why do you have to call free() after malloc()? 
	- In Java, why ?new? an object but you don?t have to free or delete it?
2. How is the scripting language executed? 
	- C : gcc -> bin
	- Java : JDK/JRE -> Java bytecode -> JVM
3.How does the execution time for Python compare to C? 
4.How come you don?t have to define a variable type in Python?

You are not required to answer these questions, but you can think about them and see if you can find the answers online.

To see how socket programs are written in C/C++ (recommended but not required for this lab), see [C socket programming](http://www.linuxhowtos.org/C_C++/socket.htm )

---

![tcpjoke](lab3/tcpjoke.jpg)

---

##### 4. The Assignment 

<ul><b style='color:red'>PART A: Evaluating TCP vs UDP</b></ul>

For this part we will highlight the differences of the UDP and TCP protocols. You will need to answer a few questions in a text file named `lab03_writeup.md`. 

First we will use the `nc` command to test local TCP and UDP connections on our computer. We will see how it responds in a perfect environment, and then we will see how it responds in a lossy environment (50% loss)

**Evaluating UDP Reliability:**

1. In a terminal, start a UDP server
`nc -l -u localhost 10000`

2. In a new terminal, connect a UDP client to the server
`nc -u localhost 10000`
Send a sequence of 1, 2, 3, ......., 10  to the server by typing directly into your nc client and hitting `enter`
4. Now, in a third terminal, force a 50% loss on your local environment
`sudo tc qdisc add dev lo parent root netem loss 50%`
5. Send a sequence of 1, 2, 3, ......., 10 to the server again (multiple times), look for any changes 
6. Remove the loss
`sudo tc qdisc del dev lo parent root netem loss 50%`

**Evaluating TCP Reliability:**

1. In a terminal, start a TCP server
`nc -l localhost 10000`

2. In a new terminal, Connect a UDP client to the server
`nc localhost 10000`

3.Send a sequence of 1, 2, 3, ......., 10 to the server by typing directly into your nc client and hitting `enter`
Now, in a third terminal, force a 50% loss on your local environment
`sudo tc qdisc add dev lo parent root netem loss 50%`

5. Send a sequence of 1, 2, 3, ......., 10 to the server again, look for any changes

4. Remove the loss 
`sudo tc qdisc del dev lo parent root netem loss 50%`

---
<p style='color:brown; font-weight:bolder'>
Question 1: How did the reliability of UDP change when you added 50% loss to your local environment? Why did this occur?<br>
Question 2: How did the reliability of TCP change? Why did this occur?<br>
Question 3: How did the speed of the TCP response change? Why might this happen?<br>
</p>

---


<ul><b style='color:red'>PART B: TCP Client and Server</b></ul>

For this lab you?ll be working primarily in your VM and you?ll need to get the code from Github Classroom

[Github Classroom Assignment](https://classroom.github.com/a/CEgiN_3D)

Like in lab2, you will need to clone the repository created for you from Github and make sure to switch to the branch `ee250-master`. Do not push changes to this branch. The code you will be working on for this lab can be found in the path GrovePi-EE250/ee250/lab03. Although this lab does not require using a Raspberry Pi or GrovePi, this new private repository comes from the same parent repository and has the same structure. 

- TCP Server

The server code is provided for you but you will need to answer the questions in the code in your `lab03_writeup.md` file. Go through the code, and try to understand the basic logic. You will submit this text file as a part of Lab 03.
Compile `tcp_server.c` with the command `gcc tcp_server.c` and execute the output file `a.out` with the command `./a.out <PORT NUMBER>`. If you have an error that says `gcc` command does not exist, you will need to install it using `sudo apt install gcc`


- TCP Client

Use Python or C++ to write a TCP client to interact with TCP server. Python will be easier for you but you will learn a lot more if you try it in C++ (but if you choose to do it, we might not provide full help. There's a 3-point bonus for c/c++). Please implement the TODOs in the provided `tcp_client.py` or `tcp_client.cpp` file

TIP: You can compile the C++ code with the command `g++ -o output_file_name tcp_client.cpp` and execute the output file ?a.out? with the command `./output_file_name`

Test your TCP server and client together using localhost or your IP address.

Now, test your TCP client with a server running remotely. Here?s the connection information.
	- HOST IP: 165.227.201.206 (this is the IPv4 address for the domain lab.ee250io.tk)
	- PORT: visit https://lab.ee250io.tk:2503 to get a random port number and view your message.


<ul><b style='color:red'>PART C: Microsoft Azure Instance</b></ul>

**i) Setup your Microsoft Azure account and Cloud VM**

<iframe src="https://drive.google.com/file/d/1sxVEk7X9LA8v8Ovr-VJiLN3TSqoH1JDW/preview" frameborder='0' width="100%" height="500" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen></iframe>

- [Github Student Developer Pack - Free 100$](https://education.github.com/pack)
- [Tutorial on creating Azure Vm](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-portal)


	Make sure to select the following for your Azure Instance

	- Image: Linux (Ubuntu 18)
	- Virtual Machine Size/Type: B1ls 
	- Specs: 1 vCPU and 0.5GB Memory [about 4$ to 5$ per month -> you have 100$ credit]
	- Leave the storage , tags, etc. to default settings and review+create
	- Make sure that the cost $/hr is in line with what you expect, i.e $/hr * 24hr * 30 <= 5$



**ii) Loging in to Azure Instance and Setting up Firewall Inbound Port Rule** 

<iframe src="https://drive.google.com/file/d/11axjE-y3-3Okyz5lWSFilZSfZoIpSIrb/preview" frameborder='0' width="100%" height="500" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen></iframe>

Now you can use the username you selected to log into the cloud VM - `ssh {username}@{publicIP}`

After logging in, disable the internal firewall of the server using the following commands

```bash
sudo su #become root user
ufw disable #disable uncomplicated firewall
```

We disable the internal firewall on the cloud VM since there already is a firewall setup provided by Microsoft Azure which we will configure later. It is very unlikely that hackers will be interested in your Cloud VM instance. 

Now you will copy the TCP server code onto your Cloud VM instance. You can do one of the following:

1. Clone your github repository onto the Cloud VM

2. Use secure copy protocol to copy the file from your ee250 VM (recommended)
`scp path_to_file azureuser@your_instances_public_IP:~`

3. Create a new file and copy/paste the contents

Now that you have the server code on your Cloud VM, please uncomment line 83:
`printf("Here is the message: %s\n",buffer);`

This will help let you know if your server is actually receiving anything. Now compile and execute the TCP server code using the port number you allowed in the previous step.

Once your TCP server is running, you should be able to run your TCP client code on your ee250 VM (or your raspberry pi) with the IP and port of your Azure instance (the same port that you allowed in the inbound rule)

Create a screen recording video to demo the TCP connection.

Do not forget to shutdown/terminate your Azure instance after you?re done with your lab i.e after the due date of your lab. This is to prevent charging your account for Running the VM. You can save the credits from your 100$ and use them for another project.


**iii) Delete the Azure VM Instance**

In your Azure VM resources page, click on Delete and then follow the prompts.
After a few minutes, go to the Home page of Azure and you should not see the Azure cloud VM on your dashboard

---

_**I told you a TCP joke. <br> 
Did you get it.<br> 
Did you get it.<br>
Did you get it.<br>
.<br>
.<br>
.<br>
.<br>
Did you get it.**_

---

##### 5.Demo and Code Grading Rubrics 

<b style='color:red'>All files are to be submitted via Vocareum.</b>
A C/C++ client file has a bonus of 3 points, but you?ll be responsible for making it work yourself. 

| Points      | Description 														|
| ----------- | ----------- 														|
| DEMO	      | Record a video and share the link in the `lab03_readme.md` file 							|
| 2	      | An Azure Instance is properly running on their Azure Dashboard        							|
| 2	      | The student should be able to show that they can SSH into their Azure Instance and execute their server code        	|
| 3	      | The client code should be able to receive ?I got your message? from the server and print it in the terminal		|
| 3	      | The client code is able to read user input and send it to the server, which should then print that input		|
| CODE	      | Each student must submit `tcp_client.py` or `tcp_client.cpp.`								|
| 2	      | Github repository link and team member names (in this lab, 1 name) listed in the comments of the code.	        	|
| 2	      | The IP used in their code corresponds to the student?s Azure instance 					        	|
| 2	      | Code correctness [no python syntax errors/code compiles, sufficiently bug-free for the assignment, etc.]        	|
| REFLECTION  | Submit a text file named `lab03_writeup.md` with your answers to the questions.						|
| 3	      | QA.1 to QA.3   														|
| 7	      | QC.1 to QC.7  														|
| DEMO	      | Total Possible: 26 [with extra credit: 29] 										|

---

##### 6. EXTRAS

Setting up your domain name, configuring the DNS records and hosting a cool web application, like your awesome website. 


<iframe src="https://drive.google.com/file/d/1x3GqzUBJMBjMHScB0YbkXzHyUAx7RECF/preview" frameborder='0' width="100%" height="500" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen></iframe>

<iframe src="https://drive.google.com/file/d/1ZmkhUwltCwsNchgAMAMLzYNwU1S80YYC/preview" frameborder='0' width="100%" height="500" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen></iframe>


