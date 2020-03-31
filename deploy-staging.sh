chmod 600 /tmp/csismag_rsa
eval "$(ssh-agent -s)" # Start the ssh agent
ssh-add /tmp/csismag_rsa
git remote add csismag-staging git@git.wpengine.com:production/csismagstaging.git # add remote for staging site
git fetch --unshallow # fetch all repo history or wpengine complain
git status # check git status
git checkout master # switch to master branch
git add wp-content/themes/csismag/*.css -f # force all compiled CSS files to be added
git add wp-content/themes/csismag/assets -f # force all compiled JS & optimized images
git commit -m "Compiled & bundled all assets" # commit the compiled CSS files
git push -f csismag-staging master #deploy to staging site from master