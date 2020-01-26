#-*- coding:utf-8 -*-

from datetime import datetime
import shutil

title = raw_input("input the post title : ")
curr_datetime = datetime.today().strftime('%Y-%m-%d %H:%M')

curr_date = datetime.today().strftime('%Y-%m-%d')
filename = curr_date + '-' + title.replace(' ', '-') + '.md'

# Create a file from template
shutil.copyfile('template.md', filename)

# Read in the file
with open(filename, 'r') as file :
  filedata = file.read()

# Replace the target string
filedata = filedata.replace('$TITLE$', title).replace('$DATETIME$', curr_datetime)

# Write the file out again
with open(filename, 'w') as file:
  file.write(filedata)
