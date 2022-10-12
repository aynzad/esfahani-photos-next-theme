<p align="left">
    <span><img src="https://badgen.net/badge/license/MIT/blue" alt="license"></span>
    <span><img src="https://badgen.net/github/releases/aynzad/esfahani-photos-next-theme" alt="release"></span>
    <span><img src="https://badgen.net/github/last-commit/aynzad/esfahani-photos-next-theme" alt="last commit"></span>
    <span><img src="https://badgen.net/github/commits/aynzad/esfahani-photos-next-theme" alt="commits"></span>
    <span><img src="https://badgen.net/github/open-issues/aynzad/esfahani-photos-next-theme" alt="open issues"></span>
</p>

# 🌆 esfahani-photos-next-theme

The esfahani.photo is a multilingual fully customizable NextJs theme which aims to modernize, organize and enhance some aspects of a personal portfolio theme for photographers

![esfahani-photos-mockup](https://images.prismic.io/esfahani-photos/88de432f-9109-4f3b-9716-e9db7443a523_esfahani-photos-mockup.png?auto=compress,format)

▶️ Demo: [Open live demo](https://esfahani-photos-next-theme.vercel.app/)

&nbsp;

## 🧞‍♂️ Technologies & Features

- NextJs 12 with Static Generation (SSG) and (SSI)
- Prismic.io as the headless CMS
- Fully Customizable with Tailwind css
- Image blurring using the plaiceholder package
- Multilingual support
- Full Responsive
- RSS feed and Sitemap generator
- Typescript
- ...

## 🚀 Quick Start

To start a new project using this starter, run the following commands in your terminal:

```sh
npx degit aynzad/esfahani-photos-next-theme your-project-name
cd your-project-name
npx @slicemachine/init
```

The commands will do the following:

1. Start a new Next.js project using this starter.
2. Ask you to log in to Prismic or [create an account][prismic-sign-up].
3. Create a new Prismic content repository with sample content.

Then you have to setup your environment variables and put your prismic API endpoint there:

```sh
mv sample.env.local .env.local
nano .env.local
```

When you're ready to start your project, run the following command:

```sh
npm run dev
```

## ☑️ TODO

- [x] Sitemap
- [x] RSS feed
- [ ] Writing tests
- [ ] SEO

## 📝 License

```
Copyright [2022] Alireza Esfahani <alireza@esfahani.dev> (https://esfahani.dev)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
