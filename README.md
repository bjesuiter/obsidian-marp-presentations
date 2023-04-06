# MARP Presentations (Obsidian Plugin)

**Heads Up! - Work in Progress!** 
---------------------------------
This Plugin is highly experimental and work in progress. 
In theory, it's not too complicated, but currently the npm marp-core package 
does not compil with the Obsidian Plugin Rollup Configuration. 

See: https://github.com/bjesuiter/obsidian-marp-presentations/issues/1

Also at marp-core repo: https://github.com/marp-team/marp-core/issues/259


## Description

The default presentation/slides feature in Obsidian lacks some configurability for me. 
For example: 

I can't even show 2 lines of text on a slide, since the second line will have a weired indentation. 
This forces me to use only lists on presentation slides, which is a little restrictive for me. 

Therefore I decided to bring over the MARP (Markdown Presentation Ecosystem) into Obsidian, since this looks like a very good fit! 

## For developers

This is basically a thin wrapper around the [marp-core](https://github.com/marp-team/marp-core) npm package. 
If you want to contribute, please feel encouraged to submit a PR to [the plugin repo](https://github.com/bjesuiter/obsidian-marp-presentations/pulls)!

### Some useful documentation Links 

- [Obsidian Plugin API Typing Repo](https://github.com/obsidianmd/obsidian-api)
- [Example on how to generate a modal dialog](https://github.com/obsidianmd/obsidian-sample-plugin/blob/c228a7022301e4a74614a67570d38ed2e2e05a71/main.ts#L35)
- [Unofficial Obsidian Plugin Developer Docs by marcus.se.net](https://marcus.se.net/obsidian-plugin-docs/)
