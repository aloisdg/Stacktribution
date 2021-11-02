# Stacktribution

Proper attribution done fast.

I realise that most people don't respect attribution rules from Stack Overflow. Stacktribution is a small web app to help with that. Beside compliance, it fixes some trouble by saving answers next to the source code.

<p align="center">
    <img src="https://user-images.githubusercontent.com/3449303/139926960-e3f5fab4-5634-4a20-96c8-ddc832922ab2.png" alt="meme" height="280">
  <br>
  <a href="https://www.reddit.com/r/ProgrammerHumor/comments/qkna4i/when_you_run_into_the_same_issue_years_later/">When you run into the same issue years later</a>
  <br>
    <img src="https://user-images.githubusercontent.com/3449303/139929881-aa005a6d-2e33-490b-b89a-3100832b00dd.png" alt="comments"/>
  <br>
  <a href="https://www.reddit.com/r/ProgrammerHumor/comments/q7tch9/nothing_can_match_this_feeling/hgl4kfs/">Add the link to your code</a>
</p>

### Demo

![demo_stacktribution](https://user-images.githubusercontent.com/3449303/133624048-0093e2ef-7aa2-4d5e-b725-db96e00c509a.gif)

### StackExchange's rules

Attribution is [required](https://stackoverflow.blog/2009/06/25/attribution-required/).

> You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).

There are not an official way to do it, but here are the rules:

> So let me clarify what Stack Overflow means by attribution. If you republish a content, they require that you:
> 1. Visually indicate that the content is from Stack Overflow or the Stack Exchange network in some way. It doesn’t have to be obnoxious; a discreet text blurb is fine.
> 2. Hyperlink directly to the original question on the source site (e.g., http://stackoverflow.com/questions/12345)
> 3. Show the author names for every question and answer
> 4. Hyperlink each author name directly back to their user profile page on the source site (e.g., http://stackoverflow.com/users/12345/username)

From that, I created some compliant [templates](https://github.com/aloisdg/Stacktribution/blob/main/src/utils/DocUtils.ts) you can fill automaticaly then copy/paste above any snippet from Stack Overflow inserted in your code base.

### Requirements

- Node.js and npm

### Getting started

Run the following command on your local environment:

```
git clone --depth=1 https://github.com/ixartz/Next-js-Boilerplate.git my-project-name
cd my-project-name
npm install
```

Then, you can run locally in development mode with live reload:

```
npm run dev
```

Open http://localhost:3000 with your favorite browser to see your project.

```
.
├── README.md                # README file
├── next.config.js           # Next JS configuration
├── public                   # Public folder
│   └── assets
│       └── images           # Image used by default template
├── src
│   ├── layout               # Atomic layout components
│   ├── pages                # Next JS pages
│   ├── styles               # PostCSS style folder with Tailwind
│   ├── templates            # Default template
│   └── utils                # Utility folder
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

### VSCode information (optional)

If you are VSCode users, you can have a better integration with VSCode by installing the suggested extension in `.vscode/extension.json`. The starter code comes up with Settings for a seamless integration with VSCode. The Debug configuration is also provided for frontend and backend debugging experience.

Pro tips: if you need a project wide type checking with TypeScript, you can run a build with <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> on Mac.

### Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have question or found a bug.

### License

Licensed under the MIT License, Copyright © 2020

See [LICENSE](LICENSE) for more information.

---

Made with [CreativeDesignsGuru](https://creativedesignsguru.com)'s template
