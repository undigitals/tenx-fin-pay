# Getting Started

# Project specs
1. Node v16.14
2. Azure deploy pipline
3. Yarn

# Prebuild steps
1. Install nvm
2. `nvm install 16`
3. Copy `.env.example` to `.env.local` and change VARIABLES

# Build and Test

## Run dev server
```shell
yarn install --frozen-lockfile
yarn start
```

## Icons
* Icons should be used only with **Icon component**: `src/components/general/Icon/Icon.tsx`. You can see how it works in Storybook
* If you need icon in colored round, go for **IconSign**: `src/components/general/Icon/IconSign.tsx`
* We have all icons presented in [this Figma guideline](https://www.figma.com/file/yGo7LWy04SEE2NtSU9NuIu/Percapita-Mobile-Design-System-1.0v?type=design&node-id=3865-36279&mode=design&t=zHVDu0IHvqaE2pIU-4) with names. **All icon names should be consistent with it.** 
* **Please do not add to icons anything that isn't included in this reference or doesn't look like icon!**
* Before adding new icon run Storybook with `yarn storybook` and check if we already have this icon in Icon gallery
* Most icons should be exported from Figma in `.svg`, with the simplest possible layout and no specific colors, with `fill="currentColor"` and `stroke="currentColor"` attributes
* Nevertheless, some complex icons like **flags** may be meant to use as is, with original colors. In this case just add its name to `CLEAR_ICONS` list in `src/components/general/Icon/Icon.constants.ts`

### Add new icon
1. Put icon svg into assets/icons
2. Run `yarn icons:sprite` script
3. Use new icon with Icon component, prop 'name' would be the same as svg file name
4. Do not forget to commit updated `svg-icons.svg` and `iconList.ts` files

> There's no use to sprite build script manually, if `yarn start` is running, it includes `icon:watch` script for monitoring `assets/icons` directory, so the icon sprite will be automatically updated if there are any changes.

