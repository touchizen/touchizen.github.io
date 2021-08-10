import filetype
import os
import sys
import PIL
import PIL.Image as Image
import tensorflow as tf
import numpy as np

IMAGE_PATHS = [
    "g:\\web_workspace\\touchizen.github.io\\idolface\\image\\idolgallery"
    ]

formats = [".jpg",".png",".jpeg"]
startFilename = 0
for onePath in IMAGE_PATHS:
    dirs = os.listdir(onePath)
    for oneDir in dirs:
        galleryPath = onePath + "\\" + oneDir
        for (path, dirs, files) in os.walk(galleryPath):
            for file in files:
                fileName = os.path.splitext(file)[0]
                fileExt = os.path.splitext(file)[1]

                imagePath = path + "\\" + file

                if fileName.isdigit():
                    startFilename = int(fileName)
                else:
                    startFilename = startFilename + 1
                    oldName = imagePath
                    newName = "{}\\{}{}".format(path, startFilename, fileExt)
                    os.rename(oldName, newName)