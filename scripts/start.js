import chalk from 'chalk';
import prompts from 'prompts';
import fg from 'fast-glob';
import nodemon from 'nodemon';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import spawn from 'cross-spawn';

const { sql, port } = yargs(hideBin(process.argv)).argv;
const reactFiles = await fg.glob('examples/*/src/App.tsx');
const files = await fg.glob('examples/*/index.js');
const projects = [...files, ...reactFiles]
  .map((file) => file.split('/')[1])
  .sort();

const base = process.cwd();

const choice = await prompts(
  {
    type: 'select',
    name: 'project',
    message: 'Which project do you want to run?',
    hint: chalk.dim('Use ⬆️  and ⬇️  to navigate.'),
    choices: projects,
    initial: 0,
  },
  {
    onCancel: () => {
      console.log('👋', chalk.bgRed('Cancelled'), 'No project selected.');
      process.exit();
    },
  }
);
const project = projects[choice.project];
const cwd = `examples/${project}`;

console.log('👉', chalk.bgGreen.black('Selected'), cwd + '/index.js');

const selectedPort =
  port || process.env.PORT || `40${String(choice.project).padStart(2, '0')}`;

if (project.includes('react')) {
  spawn.sync('npm', ['run', 'dev', '--', '--port', selectedPort], {
    stdio: 'inherit',
    cwd: cwd,
  });
} else {
  nodemon({
    script: `index.js`,
    cwd,
    watch: ['**/*.js', '../../shared/**/*.js'],
    ext: 'js,json',
    ignore: ['node_modules', '.git'],
    env: {
      PORT: selectedPort,
      NODE_ENV: 'development',
      BASE: cwd,
      SHOW_SQL: sql ? true : false,
    },
  });

  nodemon
    .on('quit', function () {
      console.log(' ', chalk.red('Exiting…'));
      process.exit();
    })
    .on('restart', function (files) {
      console.log(
        '👻',
        chalk.bgGreen('Changed'),
        files.map((file) => chalk.green(file.replace(base, ''))).join(', ')
      );
    });
}
