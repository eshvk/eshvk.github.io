#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
AUTHOR = u'Esh'
SITENAME = u'Meditations'
SITESUBTITLE = u'on Math, Art and Prose.'
SITEURL = 'https://eshvk.me'

PATH = 'content'

TIMEZONE = 'America/New_York'

DEFAULT_LANG = u'en'
# This is a global ordering number. It may have to be combined with category
# once we have individual pages.
ARTICLE_ORDER_BY = 'article_order'
# No need for menus for now
DISPLAY_PAGES_ON_MENU = False
# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
# LINKS = (('Pelican', 'http://getpelican.com/'),
#         ('Python.org', 'http://python.org/'),
#         ('Jinja2', 'http://jinja.pocoo.org/'),
#         ('You can modify those links in your config file', '#'),)

# Social widget
# SOCIAL = (('You can add links in your config file', '#'),
#          ('Another social link', '#'),)

# DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

# Stuff added by me. assets is for webassets.
# PLUGIN_PATHS = ['./plugins']
# PLUGINS = ['render_math', 'assets', 'liquid_tags.tufte']
# Sass is not able to resolve this as a relative path. There is a bug in either
# my understanding or sass.
# FIXME replace this with the theme dir name + static + sass
#ASSET_CONFIG =[('SASS_LOAD_PATHS', ['/Users/esh/workspace/pelican_related/temp/moleskine2/static/sass/'])]
WEBASSETS_CONFIG =[('SASS_LOAD_PATHS', ['/Users/esh/workspace/pelican_related/moleskine2/static/sass/'])]
LIQUID_TAGS = ["tufte"] #Enables the use of special code
# This enables single quotes to be processed right.
TYPOGRIFY = True
STATIC_PATHS = ['extras/favicon.png','javascripts', 'stylesheets', 'extras/CNAME']
EXTRA_PATH_METADATA = {
   'extras/favicon.png': {'path': 'favicon.png'},
   'extras/CNAME': {'path': 'CNAME'}
}
