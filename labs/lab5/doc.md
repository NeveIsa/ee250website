---
title: Lab5 - MQTT
externaljs:
  - https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js
---


### {{FRONTMATTER.title}}
---

<!--
- [{{ LINKS.DATA.this }} @@5@@](mqtt://eclipse.usc.edu:1883)
-->

**Contributors: Fayez Loan, Sampad Mohanty**

##### References and Tutorials
- [Paho Python Client Docs](https://www.eclipse.org/paho/index.php?page=clients/python/docs/index.php)
- [Pub-Sub example file](https://github.com/usc-ee250-spring2021/GrovePi-EE250/blob/master/ee250/lab05/publisher_and_subscriber_example.py)


---
1. Introduction
2. Github Classroom
3. Tips on Testing
4. MQTT Setup
5. Test publish-subscribe
6. Part 1: LED and Ultrasonic Ranger
7. Part 2: Button and LCD
8. Demo and Code Grading Rubric
---

##### 1. Introduction

The objective of this lab is to explore the use of the Publish-Subscribe messaging design pattern with the MQTT protocol. We have already explored the Client-Server architecture in the TCP, UDP, and Socket Programming lab. Unlike a Client-Server architecture that we saw in the previous labs, MQTT is a Publish-Subscribe architecture. This allows for decoupling of the data sources/generators from the data consumers/sinks. Also MQTT allows for an asynchronous data flow, i.e the data consumer does not have to make polling requests to receive the data from the data sources. Instead whenever new data is available, an entity called an MQTT Broker takes the responsibility to deliver it to the data consumers. It saves a lot of network bandwidth that might have gotten wasted if new data is generated based on events rather than uniform sampling in time.  

We highly recommend watching this super quick introduction to MQTT and recap important concepts you learnt in class. 

<iframe width="100%" height="500" src="https://www.youtube.com/embed/EIxdz-2rhLs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


---

##### 2. Github Classroom
To join the new Github Classroom assignment, please follow the invite link above. Similar to before, you will create teams of two via the Github Classroom interface. Github will create a copy of our new starter code for this lab when you create a new team.

Please link yourself to your @usc.edu so we can identify you, especially if your Github account is anonymous in nature. If you make a mistake when forming teams, simply leave your team and rejoin using the Github Classroom link below.

<b style='color:red'>Hint: You will find the publisher_and_subscriber_example.py  code in the lab05 folder and the simple code examples in the lab5 google slides helpful.</b>

---

##### 3. Tips on Testing
In this lab, you will need a GrovePi shield with sensors. However, you can use print statements and generate fake sensor reading values to provide feedback and emulate the scenario during your software development. When your software is mostly complete and tested, you can then integrate a GrovePi kit to generate real sensor data (e.g., ultrasonic ranger values) and actuate (e.g., turn on/off an LED).

Since the broker IP is the only address you need, you can also prototype your code between two terminals on your VM before working with your raspberry pi. Focus on the MQTT messaging first and once that works, the Python code you wrote should be portable to the RPi.


---

##### 4. MQTT Setup
We are going to run publishers and subscribers on both your VM and Raspberry Pi. The first thing that we need to do is install the Paho library. We are specifically going to use the Python Paho-MQTT library. If you haven’t already installed `pip`, you will need it to install any python packages. To specifically install the python3 version of pip, `pip3`, run this command on both your VM and RPi.

`sudo apt install python3-pip`

Next, install `paho-mqtt` via `pip3` on both your VM and RPi.

`pip3 install paho-mqtt`

Then, you need to install the keyboard event listener library on your VM. The usage of this library has only been tested on native Linux and Linux VMs.

`pip3 install pynput`

---

##### 5. Test publish-subscribe
Install mosquitto-clients and use the command line examples to understand how to use `mosquitto_pub` and `mosquitto_sub`. 

`sudo apt install mosquitto-clients`

On one terminal, subscribe to a topic at host eclipse.usc.edu on port 11000: 

`mosquitto_sub -h eclipse.usc.edu -p 11000 -t YOUR_USERNAME`

Then, open another terminal and publish a message to that topic. Note that the backslash is to indicate to  your bash shell to interpret the next line to be in-line. That is, “hello” should not be interpreted as a separate line but instead it should be interpreted inline right after “-m”. 

`mosquitto_pub -h eclipse.usc.edu -p 11000 -t YOUR_USERNAME -m "hello"`

To better understand the commands better, you can always `man mosquitto_pub` or `man mosquitto_sub`.


---

##### 6. Part 1: LED and Ultrasonic Ranger
Clone the assignment repository and branch off of the master branch. For this entire lab, you will use the uniqueness of your usc username to determine your topic names to make sure students do not interfere with one another’s topics. If you are working as a team, you can choose one of your usernames or come up with a custom name!

###### A. Edit `vm_publisher.py`
On your VM, you will run `vm_publisher.py`. Edit this file so that a message intended for the LED sensor is published on the appropriate topic when the appropriate key is pressed. 

Table 1 contains the messages to publish and on which topic when a keyboard button is pressed. For Part 1, we ask you to start by completing only (1) and (2) in the table below. You will complete (3) through (6) in Part 2.

|      | Keyboard Button | Topic | Message |
|------| --------------- | ----- | ------- |
| 1)   | A               | “YOUR_USERNAME/led” | “LED_ON”  |
| 2)   | D               | “YOUR_USERNAME/led” | “LED_OFF” |
| 3)   | W               | “YOUR_USERNAME/lcd” | "w"       |
| 4)   | A               | “YOUR_USERNAME/lcd” | "a"       |
| 5)   | S               | “YOUR_USERNAME/lcd” | "s"       |
| 6)   | D               | “YOUR_USERNAME/lcd” | "d"       |

###### B. Edit `vm_subscriber.py`
In a separate terminal on your VM, you will run `vm_subscriber.py`. Edit this code to subscribe to the topic “YOUR_USERNAME/ultrasonicRanger” with a custom callback that prints the ultrasonic ranger values received from the RPi, i.e., “VM: [VALUE] cm”.

<b style='color:red'>Hint: Look up the python string decode method.</b>

###### C. Edit `rpi_pub_and_sub.py`
On the Raspberry Pi side, you will run the `rpi_pub_and_sub.py` program. Edit this program to be both a publisher and subscriber. 
* Create a custom callback to be called when messages are received on the “YOUR_USERNAME/led” topic. For each message received, the callback should check whether it is an “LED_ON” message or “LED_OFF” message, formatted correctly, and turn on and off a GrovePi LED accordingly. 
If your LED is not working, try powering down your system, pulling out the LED bulb, flipping it 180 degrees, and reinserting.
* Edit this code to loop and read the ultrasonic ranger at 1 second intervals and publish the distance value to the topic “YOUR_USERNAME/ultrasonicRanger”. 

<b style='color:red'>Hint: You will need the grovepi library.</b>


---

##### 7. Part 2: Button and LCD

Figure out how to run the server side of your HTTP application on the raspberry pi, with the client side running on your VM. Show this in your screen recording demo for extra credit.

###### A. Button
Connect a button to the GrovePi shield. 
* In the same loop polling the ultrasonic ranger in  `rpi_pub_sub.py`, you should now monitor the button to see if it is pressed. If the button is pressed, the program should publish the string "Button pressed!" to the topic “YOUR_USERNAME/button”. 
* On the VM side, the `vm_subscriber.py` program should additionally subscribe to the “YOUR_USERNAME/button” topic. Create another new custom callback to this topic, and print out the “Button pressed!” string in this callback when the message is received.

###### B. LCD
Connect the screen to your GrovePi shield.
* In addition to the “YOUR_USERNAME/led” topic, `vm_publisher.py` will now have to publish the messages “w”, “a”, “s”, and “d” to the “YOUR_USERNAME/lcd” topic when those keyboard buttons are pressed. 
* The `rpi_pub_sub.py` program should subscribe to this topic (and add an additional custom callback), and print those single character messages on the GrovePi LCD when they are received.

<b style='color:red'>Hint: You will need the grovepi library.</b>

---



##### 5.Demo and Code Grading Rubrics

<b style='color:red'>Record a video which demonstrates each element of your code, according to the rubric. Create a README.md file in your lab05 folder and include a link to the demo. All files are to be submitted via vocareum as a team</b>

| Points      | Description 														|
| ----------- | ----------- 														|
| DEMO	      | Record a video and share the link in the `README.md` file 							|
| 2	      | “w”, “a”, “s”, and “d” are displayed on the GrovePi LCD when the corresponding keyboard buttons are pressed. |
| 2	      | The distance from the Grove Ultrasonic Ranger prints out to the terminal on the VM script (vm_subscriber.py) every second.	|
| 2       | The string “Button pressed” prints out on the VM (`vm_subscriber.py`) when the GrovePi button is pressed. The string is also formatted correctly. | 
| 2       | The GrovePi LED is turned on and off when the keyboard keys A and D (not capitalized) are pressed, respectively. |
| CODE	      | `rpi_pub_and_sub.py, vm_publisher.py, vm_subscriber.py`						|
| 0	      | List all team member names and the link to your shared GitHub repo in the README file.       	|
| 4	      | Separate callbacks are defined for each topic subscribed (the default on_message() callback is not used to handle the topics).	|
| 4       | The message callbacks for the led, lcd, and button topics check for correct string formatting before taking any actions.  	|
| 2	      | The message strings published by `vm_publisher.py` are formatted correctly as per the assignment.	|
| 2       | The message strings published by `rpi_pub_sub.py` are formatted correctly as per the assignment.								|
| 2       | Meaningful comments and code correctness (no python syntax errors, sufficiently bug-free for the assignment, etc.)                 |
| 	      | Total Possible: 22 points				|
