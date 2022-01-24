---
title: Lab01 - Workspace Setup
---


### {{FRONTMATTER.title}}
---

###### Useful links for current Lab

- [Lab01 Folder](https://drive.google.com/drive/folders/1Ke3VYEe9rgB83OAVSq9rbe5j32ePptVr)


###### Due Date
- Check off by <i style='color:white'>1st Sep, 2021</i>
- Deadline is <i style='color:white'>3rd Sep, 2021</i>

---


###### 3. Overcoming Command Line
[Overcoming Command-Line |Prof. Phillip Guo Blog Link](https://pg.ucsd.edu/command-line-bullshittery.htm)


###### 4. Linux Virtual Machine

Install any one of the following Virtual Machine Hypervisors on your Laptop/Desktop.

1. [VMware Fusion (Provided by VMWare Academic Program)](https://viterbiit.usc.edu/services/hardware-software/vmware-academic-program/)
2. [VirtualBox](https://www.virtualbox.org/wiki/Downloads)

Download any one of the following Ubuntu Desktop Flavours. If your machine is old and slow, it is recommended that you choose Mate Flavour from the second link. 

1. [Ubuntu Official Download](https://ubuntu.com/download/desktop#download)
2. [Ubuntu Mate if your Machine is old and slow](https://ubuntu-mate.org/download/)


Setup a new virtual machine and install Ubuntu using the ISO file downloaded in previous step.

![choice](labs/lab1/OSredpillbluepill.jpg)
*Blue Pill or Red Pill?*


###### 5. Using Git and Github

You must already have a Github account by now.

[understanding Git](https://hackernoon.com/understanding-git-fcffd87c15a3)
[Git Branching Tutorial](https://learngitbranching.js.org/)

###### 6. Text Editors 

Install any one of the Editors 
1. [VS code by Microsoft](https://code.visualstudio.com/)(recommended)
2. [Atom Editor](https://atom.io/)
3. [Sublime Text 2/3](https://www.sublimetext.com/)
4. [Micro Editor](https://micro-editor.github.io)(optional,recommended)
 
###### 7. Flashing Raspberry Pi OS

1. Install Etcher(recommended) from [here](https://www.balena.io/etcher/) on
your host OS(Win/MacOS/etc.)

OR install rpi-imager using the
 command `sudo apt install rpi-imager` on your Ubuntu VM

2. Depending on if you want to use a display and keyboard with your RPi,
 download the appropriate Raspberry Pi OS from [here](https://www.raspberrypi.org/software/operating-systems/#raspberry-pi-os-32-bit)
  


###### 8. SSH from Ubuntu VM to Raspberry Pi (RPi)
- `ssh pi@raspberry`
- `ssh pi@raspberry.local`
- `ssh pi@AA.BB.CC.DD` where AA.BB.CC.DD is the IPv4 address of the RPi.


###### 8. DEBUGGING
- If you can't `ping raspberrypi` or `ping raspberrypi.local` or can't find the IP address of the Raspberry Pi, you may try the App `Fing` on [iOS](https://apps.apple.com/us/app/fing-network-scanner/id430921107) or [Android](https://play.google.com/store/apps/details?id=com.overlook.android.fing&hl=en_US&gl=US).


###### 9. Micro terminal editor on your Raspberry Pi

Install using the command `sudo apt install micro` OR
install by following the instructions at [Micro Editor](https://micro-editor.github.io/)

If you wish, you may install micro terminal editor on your Ubuntu VM as well. 
