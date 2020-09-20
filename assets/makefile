all: images

images: tile.png batteau.png

#l’ordre compte !
tile.png: BlackVague.png withRedVague.png rock.png batteau.png port-p1.png port-p2.png port-p3.png port-p4.png port-p5.png port-p6.png port-p7.png  port-p8.png port-p9.png withYellowVague.png
	montage -tile 10x $^ -geometry +0+0 tile.png

%-p1.png: %.svg
	inkscape $< --export-id=p1 --export-width=32 --export-height=32 -o $@

%-p2.png: %.svg
	inkscape $< --export-id=p2 --export-width=32 --export-height=32 -o $@

%-p3.png: %.svg
	inkscape $< --export-id=p3 --export-width=32 --export-height=32 -o $@

%-p4.png: %.svg
	inkscape $< --export-id=p4 --export-width=32 --export-height=32 -o $@

%-p5.png: %.svg
	inkscape $< --export-id=p5 --export-width=32 --export-height=32 -o $@

%-p6.png: %.svg
	inkscape $< --export-id=p6 --export-width=32 --export-height=32 -o $@

%-p7.png: %.svg
	inkscape $< --export-id=p7 --export-width=32 --export-height=32 -o $@

%-p8.png: %.svg
	inkscape $< --export-id=p8 --export-width=32 --export-height=32 -o $@

%-p9.png: %.svg
	inkscape $< --export-id=p9 --export-width=32 --export-height=32 -o $@

%.png: %.svg
	inkscape $< --export-id=main --export-width=32 --export-height=32 -o $@

clean:
	rm BlackVague.png withRedVague.png 
