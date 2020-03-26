chmod 600 /tmp/csismag_rsa
eval "$(ssh-agent -s)" # Start the ssh agent
ssh-add /tmp/csismag_rsa
git remote add csismag-development git@git.wpengine.com:production/csismagdev.git # add remote for development site
git fetch --unshallow # fetch all repo history or wpengine complain
git status # check git status
git checkout development # switch to development branch
git add wp-content/themes/csismag/*.css -f # force all compiled CSS files to be added
git commit -m "Compiled & bundled all assets" # commit the compiled CSS files
git push -f development:development #deploy to staging site from development to development