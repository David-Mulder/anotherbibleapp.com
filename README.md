A change in the Chrome implementation of `<meta rel="import">` causes errors in Chrome. Please take a look in Firefox instead (although firefox hasn't implemented web animations properly yet, so for animations check Chrome and just refresh whenever an error occurs). Fixing this seems to require a somewhat major rewrite of my custom `require` mechanism, so I haven't gotten to it yet.


---

Just a dump of all the code from anotherbibleapp.com. Not yet nice and polished for outside contributions, but this allows others to take a look
at the inner workings more easily and allows me to refer people to specific parts (e.g. when asked how to set up a recaptcha element).

In case you're actually interested in the app itself, I set up a quick tech showcase over at https://anotherbibleapp.com/tech
