---
title: Lab2 - GrovePi Kit
---


### {{FRONTMATTER.title}}
---

##### Useful links for current Lab

- [Lab02 Folder](https://drive.google.com/drive/folders/1KZFDQIDeMj5s57xFg5pmpZP-GC1JIIEr)


##### Due Date
- Check off by <i style='color:white'>12th Feb, 2021</i>
- Deadline is <i style='color:white'>12th Feb, 2021</i>

---


##### 0. Enable I2C Bus on the Raspberry Pi

[Steps to Enable I2C Bus on RPi](https://www.raspberrypi-spy.co.uk/2014/11/enabling-the-i2c-interface-on-the-raspberry-pi)
[More about of I2C](https://en.wikipedia.org/wiki/I%C2%B2C#Design)


##### 1. Install Grove Pi Firmware Updater Tool 
```bash
cd ~
sudo curl -kL dexterindustries.com/update_grovepi | bash

```


##### 2. Update the Grove Pi Firmware (Option)
```bash
cd ~/Dexter/GrovePi/Firmware
./firmware_update.sh 
sudo reboot 
```

You must already have a Github account by now.


##### 3. Check GrovePi Firmware's Updated Version
```bash
cd ~/Dexter/GrovePi/Software/Python
python grove_firmware_version_check.py
```

##### 4. Setup SSH Keys for Github
1. Run `ssh-keygen` and select all default (You may want to keep a blank paraphrase)
2. Follow [Tutorial to setup SSH Keys for Github](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)


Additionally, setup your git user configuration on both the VM and the RPi
```bash
git config --global user.name "Your name"
git config --global user.email "Your @usc.edu email"
```

##### 5. Accept the Github Classroom Assignment
[Lab02 Assignment on Github Classroom](https://classroom.github.com/a/NRxlmTeA)


##### 6. Clone your assignment repository into your Raspberry Pi ( optionally to your VM if you want to develop code on the VM)

Clone the repo, create a new branch `lab02` and work on the `lab02` branch.
*Do not create branches on both VM and the RPi, create only in one place*

```bash
git clone git@github.com:usc-ee250-fall2021/YOUR_REPO.git
cd YOUR_REPO
git pull
git checkout -b lab02 
```

##### 7. Modify Code
Implement the code in this file  -> `GrovePi-EE250/ee250/lab02/grovepi_sensors.py`

![choice](https://external-preview.redd.it/5o3MgC1NEDpIiuAh_epHTNWN924i-7kRvYSQYojBdMI.jpg?auto=webp&s=6b7ea2a73b4a3ab1a93340823c0cd3424b509b11)
*Must be followed strictly while modifying code*

##### 8. Push Changes to your Repository and Submit assignment on Vocareum

Push the implemented code to your Github repository and submit the `lab02_writeup.md` and `grovepi_sensors.py` file on [Vocareum](https://www.vocareum.com)

##### 9. EXTRAS
[Mardown Tutorial](https://www.markdowntutorial.com)
[Markdown Guide](https://www.markdownguide.org/basic-syntax/)
<iframe width="100%" height=500" src="https://www.youtube.com/embed/6A5EpqqDOdk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
