#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
AUTHOR = u'Esh'
SITENAME = u'Meditations'
SITESUBTITLE = u'on Math, Art and Prose.'
SITEURL = 'https://eshvk.me'

PATH = 'content'

TIMEZONE = 'America/Los_Angeles'

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

# Remove Archives, Categories, Tags, Tag, Authors pages.
ARCHIVES_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''
TAGS_SAVE_AS = ''
TAG_SAVE_AS = ''
AUTHORS_SAVE_AS = ''


# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True


LIQUID_TAGS = ["tufte"] #Enables the use of special code
# This enables single quotes to be processed right.
TYPOGRIFY = True
#All these are relative to the `content` folder and get copied to the root of the website with `extras/favicon.png` 
# being stored in `extras/favicon.png`.
STATIC_PATHS = ['extras/favicon.png','javascripts', 'stylesheets', 'extras/CNAME'] 
# This ensures that `extras/favicon.png`is moved to `favicon.png`.
EXTRA_PATH_METADATA = {
   'extras/favicon.png': {'path': 'favicon.png'},
   'extras/CNAME': {'path': 'CNAME'}
}
