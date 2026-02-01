## Schedule

+ Overview
+ Using an IDE
+ Using an LLM
+ Using an LLM inside of an IDE
+ Example(s)
+ Now you try

## Overview

Historically I have taught artists how to code. Over the last few years LLMs have developed significantly to the point that senior developers use them in their practices. There are certainly instances in which LLMs can not be used reliably to produce usable results, but in general I do find them useful and I wanted to show how they can best be used to bootstrap and/or develop a creative technology project or website.

This workshop will focus on integrated development environments (namely VS Code), utilizing different LLMs (ChatGPT produces bad results compared to the competition), and make use of the resulting output.

For people interested in making work that deals with technology I advise learning how to program. This class will assume no knowledge and will not engage with the actual code the LLM creates beyond making use of it.

## Integrated Development Environments

An IDE is basically a text editor with a bunch of extra features that make it useful for software development. At the end of the day, all code is plain text, even if this is obscured through something that makes it appear visual (like Touch Designer).

The extra features of the VS Code IDE that we will use include "Live Server" which makes your computer able to host a live website (for testing purposes in this case), and the ability to organize the various code and components across a project. The other major feature in recent history is the addition of LLMs used to assist in the programming process.

Other popular development environments are:

+ [Windsurf](https://windsurf.com/)
+ [Cursor](https://cursor.com/)
+ [Claude Code](https://code.claude.com/docs/en/overview)
+ [Google Gemini CLI](https://github.com/google-gemini/gemini-cli)

## Caveats

### Alternatives to cloud-based services

For those who would prefer to host their own local models, this is totally possible but requires more configuration than we will cover in during this workshop. I suggest looking into Ollama and the "Continue" extension for VS Code.

### It often makes mistakes and writes bad code

It will produce code that is incomprehensible. It will be difficult to debug and you will not have any real oversight unless you are very explicit about the structure of code you want produced. It takes some getting used to.

## VS Code

For the purposes of this workshop you will need to download VS Code and create a GitHub account if you do not already have one. 

[Download VS Code](https://code.visualstudio.com/)
[Sign up for Github](https://github.com/)

## LLMs

AI has become synonymous with LLM, but it is important to make the distinction. ChatGPT, Claude, Gemini, DeepSeek, etc. are all Large Language Models. They are a very specific type of AI which popular at the moment for language-based tasks and automation. They are quite good with programming languages and have absorbed over a decade of forum posts and programming manuals.

I don't need to say much about LLMs since I'm sure everyone has used at least one. ChatGPT has become eponymous with AI/LLM but it is presently the worst one. Since it comes pre-installed on many computers, they have little incentive to improve it. I recommend using Gemini or Claude.

## IDE + LLM

The main benefits of using an LLM from within an IDE are **Context** and **Organization**. If you create a project within an LLM, the LLM will have access to all of the files within that directory--though at times you may have to tell it which files are relevant in your current request (more on this later).

An LLM inside an IDE is also capable of **running commands**. These are commands that are typically hidden from view in everyday computer use. For example, if you want to delete a folder from your hard drive you might open Finder, locate the folder, then right-click and delete it. All of this is an abstraction for what is really happening, which is a command like ```rm -R ~/location/name-of-folder```. This is important because you can programmatically remove, rename, and convert files. This is also dangerous! The LLM typically asks for permission to remove a file, for example, so be wary.

## Example

(For this I chose Gemini 3 Preview)

Create a simple website. Instead of a standard website with text it is more like a game. I have images in images/ which include ice-1.png, ice-2.png, ice-3.png, and banana.png. The idea is that ice-1.png is a police officer walking. Police officers will randomly appear at the left side of the screen and move towards the right. By pressing the spacebar, the player puts a large banana (banana.png) into the center of the scene, which then plays the sound sounds/slip.mp3, and causes the police officer's image to change to ice-2.png and then ice-3.png (put a 200 millisecond delay between ice-1.png and ice-2.png). This represents the police officer slipping. The banana should be cleared from the screen after a brief (100ms) delay, and any police officers who have slipped will quickly move downwards until they disappear off screen.

Because I want the project to be self-contained, create it in a new folder called "example1" and copy the media files into that directory.

### Knowing what to look out for

What seems to go wrong with this first attempt by the LLM?

## Plan.md

The easiest way to keep things organized is to create and maintain a plan.md file. Some LLMs like Gemini prefer a specific name for this file (GEMINI.md in that case). Here you can give the LLM an overview of what you want to create, any specific parameters for how to get there (if you want it to use three.js instead of P5.js for example), and keep track of changes that are made. This has the added benefit of forcing you to think through your project in detail.

## Some Tips

+ **Use "Thinking" Modes:** For complex logic, enable reasoning models.
+ **Force Research:** Explicitly add "Look up the current documentation/solution" to prompts to avoid hallucinations about outdated libraries.
+ **Break it Down:** Don't ask for a whole app at once. Ask for the skeleton, then the styling, then the interactivity.
+ **Be Explicit:** Treat the LLM like a talented but literal-minded intern.
+ **Scaffold First:** Create your framework folders (Unity Assets, WordPress themes, etc.) before opening the specific folder in the IDE.
+ **Reference Guidelines:** Instruct the LLM to adhere to specific standards, such as "Apple's Human Interface Guidelines" or "Material Design."
+ **Commit/Save Often:** LLMs often delete functioning code while trying to fix a bug. Use Git source control to save working states frequently.
+ **Feed the Errors:** When code breaks, copy the exact error message from the terminal and paste it back to the LLM.