
from PIL import Image
import pillow_avif

import os

folder = 'banners'

input_dir = f'C:/Users/User/Desktop/Electronics Hive/ElectronicsHive/EH-images/{folder}'
output_dir = f'C:/Users/User/Desktop/Electronics Hive/ElectronicsHive/EH-images/{folder}'

# ImgType = 'avif'
# sliceLength = -5

#ImgType = 'jpeg'
#sliceLength = -5

ImgType = 'jpg'
sliceLength = -4

for filename in os.listdir(input_dir):
    # if filename.endswith('.jpg'):
    if filename.endswith(f'.{ImgType}'):
        print(filename[:sliceLength])

        img = Image.open(os.path.join(input_dir,filename))
        img.save(os.path.join(output_dir,f'{filename[:sliceLength]}.png'))

        # os.unlink(os.path.join(input_dir,f'{filename[:-4]}.jpg'))
        os.unlink(os.path.join(input_dir,f'{filename[:sliceLength]}.{ImgType}'))


