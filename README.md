<div style="max-width:480px;margin:0 auto;">
	<h1 align="center">[WORKSHOP_TITLE]</h1>
	<div align="center">
		<strong>[WORKSHOP_SHORT_DESCRIPTION]</strong>
	</div>
</div>

---

[WORKSHOP_OVERVIEW]

## Objectives

By the end of this workshop, you should have a solid understanding of:

- [ITEM]

## Agenda

- **Exercise 01:** [EXERCISE_01_NAME]
  - [ITEM]
- **Exercise 02:** [EXERCISE_02_NAME]
  - [ITEM]
- **Exercise 03:** [EXERCISE_03_NAME]
  - [ITEM]
- **Exercise 04:** [EXERCISE_04_NAME]
  - [ITEM]

## Prerequisites

- [ITEM]

## System Requirements

- git
- NodeJS 16+
- npm v8+

## Setup

Run the following commands in your terminal:

```sh
git clone https://github.com/fronttobackdev/[REPO_NAME].git
cd [REPO_NAME]
npm run setup
```

## Exercises

All the exercise projects are in the `exercises` directory, and the the finished
version of the exercise is in `final`.

Each directory in the `final` and `exercises` directories is its own isolated
app. Each step through the directory iterates on the app build in the previous
exercise.

You can run each app from the root of the project by running the `dev` script,
followed by the exercise or final version of the app you want to run.

```sh
# runs the app in the first exercise directory
npm run dev exercise/01

# runs the app in the second final directory
npm run dev final/02
```

---

If you run into any problems setting up or running any of the exercises, please
[open an issue on GitHub](https://github.com/fronttobackdev/[REPO_NAME]/issues/new).

## Credits

This workshop template was inspired by similar workshop formats by
[Ryan Florence](https://github.com/ryanflorence) and
[Kent C. Dodds](https://github.com/kentcdodds). My format is heavily informed by
my experience running workshops for [React Training](https://reacttraining.com).
