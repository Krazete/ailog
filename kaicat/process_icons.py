from PIL import Image, ImageOps

assignments = [
    ('ai', '#F4BBC3'),
    ('black', '#c0c0c0'),
    ('love', '#00FFFF'),
    ('pii', '#FFFF00'),
    ('bro', '#FF4040')
]

def monocolor(path, color):
    name = path.split('/')[-1]
    img_in = Image.open(path)
    img_out = ImageOps.colorize(Image.new('L', img_in.size), color, '#000000')
    img_out.putalpha(img_in.getchannel(3))
    return img_out.convert('P', colors=2)

for name, color in assignments:
    img = monocolor('iconraw/' + name + ".png", color)
    img.save('icon/' + name + ".png")
