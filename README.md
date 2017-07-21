# Maintenance Notes

- Load up environment in `environments` directory called pelican by doing

```
source pelican/bin/activate
```

This environment has pelican installed via [here](http://docs.getpelican.com/en/stable/install.html) with the following plugins:
```
pip install pelican
pip install typogrify
pip install Markdown
pip install webassets
```

- Currently loading up pelican involves the following:
```
pelican content -s pelicanconf.py -t ../pelican_related/moleskine2
```

## On Pelican Plugins
Pelican Plugins are symbollically linked to `../../pelican_related/pelican-plugins/`. This contains all the plugins from [here](https://github.com/getpelican/pelican-plugins/). Currently the only two plugins installed are [assets](https://github.com/getpelican/pelican-plugins/tree/master/assets) and render_math. The former requires

```
```
## On Themes

I had to install sass to compile up themes.
```gem install sass
``` 
