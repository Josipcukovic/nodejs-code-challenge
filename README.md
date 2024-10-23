# Node.js Code Challenge

This script is parsing the file for URLs within square brackets ([]) and returns response in following structure:

{
url: string,
title: string,
email: string (SHA-256 hash)
}

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the script](#running-the-script)

## Prerequisites

Ensure that you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Josipcukovic/nodejs-code-challenge
cd nodejs-code-challenge
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up the environment variables:**

Create a .env file in the root directory and add the necessary environment variable. You can use the .env.example file as a reference.

```
IM_SECRET=secret
```

## Running the script

To run the script make sure you edited or added your file in files folder. Example how to run this script:

```bash
npm run start ..files/test.txt.
```

Here the file path is relative to the script location.

If you don't want to use a file, simply run the script as follows:

```bash
npm run start
```

After that, simply enter your text. For example, if you want to parse www.google.com, write [www.google.com]. This will parse a stdin stream, and you should see a response similar to this: { url: 'http://www.google.com/', title: 'Google' }.
