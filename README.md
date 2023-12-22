# p5c

[![NPM Package][npm]][npm-url]

p5 CLI template generator.

## Usage

Install `p5c` globally using `npm`:

```bash
npm i -g p5c
```

Run `p5c` to display a CLI ( [Inquirer](https://github.com/SBoudrias/Inquirer.js) ) for an interactive setup:

```text
>>> p5c

p5*js Template

? Project Name: Sketch
? p5 Mode: Global
? Template: Basic
? Canvas Mode: P2D
? Project Type: Normal

✔ Have fun!
```

Quickly create a project with default settings:

```bash
p5c [projectName]
```

Use `p5c -h` to view options:

```text
Usage: p5c [options] [projectName]

Options:
  -g, --global    p5 Mode: Global (default)
  -i, --instance  p5 Mode: Instance
  -b, --basic     Template: Basic (default)
  -s, --shader    Template: Shader
  -p, --p2d       Canvas Mode: P2D (default)
  -w, --webgl     Canvas Mode: WEBGL
  -n, --normal    Project Type: Normal (default)
  -f, --fxhash    Project Type: fxhash
  -h, --help      display help for command
```

Update `p5c` to the latest version:

```bash
npm update -g p5c
```

Alternatively, you can use `npx` to run `p5c` without installing it globally:

```bash
npx p5c [options] [projectName]
```

If no project name is provided, the default project name is `Sketch`.

## License

Please refer to [the MIT license](https://github.com/ZRNOF/p5c/blob/main/LICENSE) for detailed licensing information.

[npm]: https://img.shields.io/npm/v/p5c
[npm-url]: https://www.npmjs.com/package/p5c
