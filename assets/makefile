all: images

images: assets/tile.png

#l’ordre compte !
assets/tile.png: BlackVague.png withRedVague.png 
	montage -tile 10x $^ -geometry +0+0 tile.png

%.png: %.svg
	inkscape $< --export-id=main --export-width=32 --export-height=32 -o $@

clean:
	rm BlackVague.png withRedVague.png 
