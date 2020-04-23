# CSIS*Mag*

The website for the CSIS*Mag* study by CSIS iDeas Lab. It is based off of the TwentyTwenty WordPress theme and gulp, Sass, Autoprefixer, PostCSS, imagemin, and Browsersync to speed-up development.

## Table of Contents

- [Quick-Start Instructions](#quick-start-instructions)
- [Usage](#usage)
  - [Local Development](#local-development)
  - [CI/CD](#build-for-production)
  - [See More Commands](#see-more-commands)
- [Contributing](#contributing)

## Quick-start Instructions

### If setting up the project for the first time:

1. Follow the instructions in the "Install Local" and "Connect Local to WP Engine" sections in this [blog post](https://wpengine.com/support/local/).
2. Follow the instructions in the "pull to Local from WP Engine" section to pull the "CSISMag Staging" Environment to your local machine
3. Navigate to the directory where Local created the site: eg `cd /Users/[YOUR NAME]/Local Sites/csismag/app/public`
4. Initiate git & add remote origin. This will connect your local directory to the Git Repo and create a local `master` branch synced with the remote `master` branch.

```shell
$ git init
$ git remote add origin git@github.com:CSIS-iLab/csismag_wp.git
$ git fetch origin
$ git checkout origin/master -ft
```

### If project is already set up:

To begin development, navigate to the theme directory and start npm.

```shell
$ cd wp-content/themes/csismag_wp
$ npm install
$ npm start
```

### CI/CD

TravisCI will automatically run when pull requests are submitted. If successful:

- Pull requests into `development` will be deployed to the [WP Engine Development Environment](https://csismagdev.wpengine.com/). The Development environment should be used to demo new features to programs. Once approved, a pull request should be submitted to `master`.

- Pull requests in `master` will be deployed to the [WP Engine Staging Environment](http://csismagstaging.wpengine.com/). The Staging environment should be used as a launchpad to add new features to Production.

### See More Commands

This will display all available commands, such as running eslint or imagemin independently.

```shell
$ npm run
```

## Contributing

### Branching

When modifying the code base, always make a new branch. Unless it's necessary to do otherwise, all branches should be created off of `master`.

Branches should use the following naming conventions:

| Branch type               | Name                                                      | Example                     |
| ------------------------- | --------------------------------------------------------- | --------------------------- |
| New Feature               | `feature/<short description of feature>`                  | `feature/header-navigation` |
| Bug Fixes                 | `bug/<short description of bug>`                          | `bug/mobile-navigation`     |
| Documentation             | `docs/<short description of documentation being updated>` | `docs/readme`               |
| Code clean-up/refactoring | `refactor/<short description>`                            | `refactor/apply-linting`    |
| Content Updates           | `content/<short description of content>`                  | `content/add-new-posts`     |

### Commit Messages

Write clear and concise commit messages describing the changes you are making and why. If there are any issues associated with the commit, include the issue # in the commit title.

### CSS Styles

- This project uses the [BEM](http://getbem.com/introduction/) naming convention.
- This project uses [Stylelint](https://stylelint.io) to maintain a consistent code style. Errors are flagged in the console during development and can be automatically fixed by running `npm run stylelint-fix`.

### Block Development

This theme uses a custom plugin for Gutenbeg blocks: `csismag-blocks`. To develop blocks, follow these steps:

```shell
$ cd wp-content/plugins/csismag-blocks
$ npm install
$ npm start
```

## Copyright / License Info

Copyright © 2020 CSIS iDeas Lab under the [MIT License](https://github.com/CSIS-iLab/csismag_wp/blob/master/LICENSE).
