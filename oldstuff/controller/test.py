import time
import pygame
from pygame.locals import *


#this is gonna be the part of the code that handles inputs from the 360 controller

#all it has to do is be able to output all the buttons to the terminal

#triggers and sticks to be added, as well as support for the wireless controller (which hopefully will be easy enough)


pygame.joystick.init()
joysticks = [pygame.joystick.Joystick(x) for x in range(pygame.joystick.get_count())]


