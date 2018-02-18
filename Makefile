# Try `make`. Output is under build/
#
#
# SCL <scott@rerobots.net>
# Copyright (C) 2018 rerobots, Inc.

BUILDDIR=build/

all:
	mkdir -p $(BUILDDIR)
	tools/gen.py index.md > $(BUILDDIR)index.html
	tools/gen.py prelim.md > $(BUILDDIR)prelim.html
	tools/gen.py tutorials.md > $(BUILDDIR)tutorials.html
	tools/gen.py tutorial_vpn_brunelhand.md > $(BUILDDIR)tutorial_vpn_brunelhand.html
	tools/gen.py tutorial_vpn_lcm.md > $(BUILDDIR)tutorial_vpn_lcm.html
	tools/gen.py web_guide.md > $(BUILDDIR)web_guide.html
	cp -r -f extern $(BUILDDIR)
	cp -r -f css $(BUILDDIR)
	cp -r -f fig $(BUILDDIR)

clean:
	rm -rf $(BUILDDIR)
