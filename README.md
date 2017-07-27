# Status : 
- Re-edit three blogs to make them more tuftian. 
- Publish Tufte based blogs. 

# Maintenance Notes

- Load up environment installed via conda called `pelican` by doing

```
source activate pelican
```

This environment has pelican installed via [here](http://docs.getpelican.com/en/stable/install.html) with the following plugins:
```
pip install pelican
pip install typogrify
pip install Markdown
pip install webassets
pip install ghp-import
```

- Currently loading up pelican involves the following:
```
pelican content -s pelicanconf.py -t ../pelican_related/moleskine2
```

- Publishing
```
pelican content -s publishconf.py -t ../pelican_related/tufteskine
```


## On Pelican Plugins
Pelican Plugins are symbollically linked to `../../pelican_related/pelican-plugins/`. This contains all the plugins from [here](https://github.com/getpelican/pelican-plugins/). Currently the only two plugins installed are [assets](https://github.com/getpelican/pelican-plugins/tree/master/assets) and render_math. The former requires

```
pip install webassets
```

Note that this is a fork of the original pelican plugins. 
## On Themes

I had to install sass to compile up themes.
```gem install sass
``` 

### On Liquid Tags

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