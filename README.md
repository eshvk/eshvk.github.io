# Status :
- Re-edit three blogs to make them more tuftian.
- Publish Tufte based blogs.

# Maintenance Notes

- Load up environment installed via conda called `pelican` by doing

```
conda activate pelican
```

This code and environment was tested for Pelican 4.8.0.

The conda environment has pelican installed via [here](http://docs.getpelican.com/en/stable/install.html) with the following plugins:
```
pip install pelican
pip install typogrify
pip install Markdown
pip install webassets
pip install ghp-import
```

- Currently loading up pelican involves the following:
```
pelican content -s pelicanconf.py -t ../pelican_related/tufteskine
```

```
pelican --autoreload --listen
```

- Publishing : User pages are published to master.
```
pelican content -s publishconf.py -t ../pelican_related/tufteskine
ghp-import -p output -b master
```



## On Pelican Plugins
The current modern approach to Pelican plugins appears to be to install them via pip. I have:
```
pip install pelican-webassets pelican-render-math
```

`pelican-webassets` requires the `webassets` module.

```
pip install webassets
```

### Liquid Tags via `pelican-liquid-tags`

- Install the fork of `pelican-liquid-tags` from [here](https://github.com/eshvk/liquid-tags/) to get the following tags.

Use
```
{% newthought blah blah %} for new thoughts.
```

Use
```
{% sidenote sidenote-id "blah blah" %} for sidenotes.
```

Use
```
{% marginnote marginnote-id "blah blah" %} for marginnotes (so no identifier).
```

Use
```
{% fullwidth [http[s]:/]/path/to/image [caption text | "caption text"] %} for fullwidth images
```

Use
```
{% maincolumn [http[s]:/]/path/to/image [caption text | "caption text"] %} for maincolumn images
```
Use
```
{% marginfigure marginfigureid [http[s]:/]/path/to/image [caption text | "caption text"] %} for marginfigure images
```

## On Pelican Themes

I had to install sass to compile up themes.
```
brew install sass/sass/sass
```

### Current Themes
- Uses [tufteskine](https://github.com/eshvk/tufteskine).

