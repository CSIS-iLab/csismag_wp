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
4. Initiate git & add remote origin. This will connect your local directory to the Git Repo and create a local `main` branch synced with the remote `main` branch.

```shell
$ git init
$ git remote add origin git@github.com:CSIS-iLab/csismag_wp.git
$ git fetch origin
$ git checkout origin/main -ft
```

### If project is already set up:

To begin development, navigate to the theme directory and start npm.

```shell
$ cd wp-content/themes/csismag_wp
$ npm install
$ npm start
```

### CI/CD

GitHub Actions will automatically build & deploy the theme to the Development environment on WPE based on the settings specified in the deployment workflow.

- The `WPE_ENVIRONMENT_NAME: ${{ secrets.WPENGINE_DEV_ENV_NAME }}` setting will be deployed to the WP Engine Development Environment. The Development environment should be used to demo new features. All changes made to the `main` branch will be automatically deployed the Development environment.

### See More Commands

This will display all available commands, such as running eslint or imagemin independently.

```shell
$ npm run
```

## Contributing

### Branching

When modifying the code base, always make a new branch. Unless it's necessary to do otherwise, all branches should be created off of `main`.

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

This theme uses a custom plugin for Gutenberg blocks: `csismag-blocks`. To develop blocks, follow these steps:

```shell
$ cd wp-content/plugins/csismag-blocks
$ npm install
$ npm start
```

### Editor Notes

- Add `js-resize` to iFrames to have their height be dynamically calculated on their content.
- To format the source information, you must select the source text in the caption and select the "Source Style" button on the toolbar

## Copyright / License Info

Copyright © 2020 CSIS iDeas Lab under the [MIT License](https://github.com/CSIS-iLab/csismag_wp/blob/main/LICENSE).
