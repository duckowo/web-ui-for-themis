import path from 'path';
import fs from 'fs';

const WORK_DIR = path.resolve(process.argv[2] ? process.argv[2] : 'default');
const CONFIG_FILE = path.join(WORK_DIR, 'config.json');

if (!fs.existsSync(CONFIG_FILE)) {
	fs.writeFileSync(CONFIG_FILE, fs.readFileSync(path.join('data', 'default-config.json')));
}

const config = JSON.parse(fs.readFileSync(CONFIG_FILE).toString());

export const LOGS_DIR = path.join(WORK_DIR, config.LOGS_DIR);
export const ACCOUNTS_FILE = path.join(WORK_DIR, config.ACCOUNTS_FILE);
export const PROBLEMS_DIR = path.join(WORK_DIR, config.PROBLEMS_DIR);
export const SUBMIT_DIR = path.join(WORK_DIR, config.SUBMIT_DIR);
export const NOT_JUDGED = 'Chưa chấm';
export const ENABLE_PENALTY = config.ENABLE_PENALTY;
export const ENABLE_SUBMIT_VIEW = config.ENABLE_SUBMIT_VIEW;
