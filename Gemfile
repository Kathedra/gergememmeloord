source "https://rubygems.org"

# Zelfde Jekyll-versie en plugins als GitHub Pages gebruikt bij het bouwen.
gem "github-pages", group: :jekyll_plugins

# Nodig om lokaal te draaien met Ruby 3.x (webrick zit niet meer in de stdlib).
gem "webrick"

# Windows heeft geen zoneinfo-database; zonder deze gem crasht Jekyll
# lokaal op TZInfo. Platform-gebonden, dus GitHub Pages negeert hem.
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
