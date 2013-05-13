SASSC = sass
JSC = r.js
SRC_PATH = src
BUILD_PATH = Designer
RESOURCE_PATH_SRC = $(SRC_PATH)/resources
RESOURCE_PATH_BLD = $(BUILD_PATH)/resources

STYLESRC = $(wildcard $(RESOURCE_PATH_SRC)/css/*.scss)
STYLEOBJ = $(STYLESRC:$(RESOURCE_PATH_SRC)/css/%.scss=$(RESOURCE_PATH_BLD)/css/%.css)
SCRIPTSRC = $(wildcard $(RESOURCE_PATH_SRC)/js/*.js)
SCRIPTOBJ = $(SCRIPTSRC:$(RESOURCE_PATH_SRC)/js/%.js=$(RESOURCE_PATH_BLD)/js/%.js)
HTMLSRC = $(wildcard $(SRC_PATH)/*.html)
HTMLFILES = $(notdir $(HTMLSRC))
HTMLTARGETS = $(addprefix $(BUILD_PATH)/, $(HTMLFILES))

.PHONY: all
all: build $(HTMLTARGETS) copy_images copy_fonts styles scripts

build:
	-mkdir -p $(RESOURCE_PATH_BLD)
	-mkdir $(RESOURCE_PATH_BLD)/css
	-mkdir $(RESOURCE_PATH_BLD)/js
	-mkdir $(RESOURCE_PATH_BLD)/img
	-mkdir $(RESOURCE_PATH_BLD)/fonts

copy_images:
	-cp -R $(RESOURCE_PATH_SRC)/img $(RESOURCE_PATH_BLD)

copy_fonts:
	-cp -R $(RESOURCE_PATH_SRC)/fonts $(RESOURCE_PATH_BLD)

$(BUILD_PATH)/%.html: $(SRC_PATH)/%.html
	-cp $< $@

$(RESOURCE_PATH_BLD)/js/%.js: $(RESOURCE_PATH_SRC)/js/%.js
	$(JSC) -o build.js name=$< out=$@ optimize=none

$(RESOURCE_PATH_BLD)/css/%.css: $(RESOURCE_PATH_SRC)/css/%.scss
	$(SASSC) --style compressed -C $< > $@

.PHONY: styles
styles: $(STYLEOBJ)

.PHONY: scripts
scripts: $(SCRIPTOBJ)

.PHONY: watch
watch: build
	sass --watch $(RESOURCE_PATH_SRC)/css:$(RESOURCE_PATH_BLD)/css

.PHONY: clean
clean:
	-rm -rf $(BUILD_PATH)

.PHONY: serve
serve: all
	cd $(BUILD_PATH); python -m SimpleHTTPServer 8000
