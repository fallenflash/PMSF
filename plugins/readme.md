# PMSF Plugins

## To use

Pmsf plugins can be enabled in PMSF config by addings the name of the plugin to the enabledPlugins Variable.

## Guidlines

Plugins are self contained in a folder named by the name of the plugin and contain a file named 'init.js' that will be the entry way for the plugin.
PMSF will load all enabled plugins by executing the 'init.js' file in the plugin folder in the order they are listed in the config.

## Examples
[MotD](https://github.com/fallenflash/PMSF/tree/plugins/plugin)