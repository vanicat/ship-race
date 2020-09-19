all: images

images: assets/tile.png

#l’ordre compte !
assets/tile.png: assets/BlackVague.png assets/withRedVague.png 
	cd assets
	make
