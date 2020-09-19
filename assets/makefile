all: images

images: tile.png batteau.png

#l’ordre compte !
tile.png: BlackVague.png withRedVague.png rock.png batteau.png
	montage -tile 10x $^ -geometry +0+0 tile.png

%.png: %.svg
	inkscape $< --export-id=main --export-width=32 --export-height=32 -o $@

clean:
	rm BlackVague.png withRedVague.png 
