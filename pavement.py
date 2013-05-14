import os
from itertools import starmap
from itertools import repeat
from paver.easy import *


SASSC = 'sass'
JSC = 'r.js'
SRC_PATH = 'src'
BUILD_PATH = 'Designer'
RESOURCE_PATH_SRC = '%s/resources' % SRC_PATH
RESOURCE_PATH_BLD = '%s/resources' % BUILD_PATH


@task
def build():
    dirs = starmap(
        os.path.join,
        zip(repeat(RESOURCE_PATH_BLD),
            ['css', 'js', 'img', 'fonts']))

    [x.makedirs_p() for x in map(path, dirs)]


@task
def copy_images():
    files = path('%s/img' % RESOURCE_PATH_SRC).glob('*.*')
    dest_dir = path('%s/img' % RESOURCE_PATH_BLD)
    [f.copy(dest_dir) for f in files]


@task
def copy_fonts():
    files = path('%s/fonts' % RESOURCE_PATH_SRC).glob('*.*')
    dest_dir = path('%s/fonts' % RESOURCE_PATH_BLD)
    [f.copy(dest_dir) for f in files]


@task
def copy_html():
    files = path(SRC_PATH).glob('*.html')
    dest_dir = path(BUILD_PATH)
    [f.copy(dest_dir) for f in files]


@task
def styles():
    src_files = path('%s/css' % RESOURCE_PATH_SRC).glob('*.scss')
    out_dir = path('%s/css' % RESOURCE_PATH_BLD)
    out_names = [f.name.replace('.scss', '.css') for f in src_files]

    out_files = starmap(
        os.path.join,
        zip(repeat(out_dir), out_names))

    for input, output in zip(src_files, out_files):
        # sh('cmd', ignore_error=True) # ignore_error defaults to False
        # https://github.com/paver/paver/blob/master/paver/easy.py
        sh('%s --style compressed -C %s > %s' % \
            (SASSC,
            input,
            output))


@task
def scripts():
    src_files = path('%s/js' % RESOURCE_PATH_SRC).glob('*.js')
    out_dir = path('%s/js' % RESOURCE_PATH_BLD)
    out_names = [f.name for f in src_files]

    out_files = starmap(
        os.path.join,
        zip(repeat(out_dir), out_names))

    for input, output in zip(src_files, out_files):
        sh('%s -o build.js name=%s out=%s optimize=none' % \
            (JSC,
            input,
            output))


@task
def watch():
    sh('%s --watch %s/css:%s/css' % \
    (SASSC, RESOURCE_PATH_SRC, RESOURCE_PATH_BLD))


@task
def serve():
    sh('cd %s; python -m SimpleHTTPServer 8000' % BUILD_PATH)


@task
def clean():
    sh('rm -rf %s' % BUILD_PATH, ignore_error=True)


@task
@needs(['build', 'copy_html', 'copy_images', 'copy_fonts', 'styles', 'scripts'])
def default():
    pass
