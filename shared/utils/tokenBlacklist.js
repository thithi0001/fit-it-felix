import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storageDir = path.resolve(__dirname, "..", "..", ".cache");
const storageFile = path.join(storageDir, "revoked-tokens.json");

const ensureStorage = () => {
    if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir, { recursive: true });
    }

    if (!fs.existsSync(storageFile)) {
        fs.writeFileSync(storageFile, JSON.stringify([]), "utf8");
    }
};

const readTokens = () => {
    ensureStorage();
    try {
        const content = fs.readFileSync(storageFile, "utf8");
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
};

const writeTokens = (tokens) => {
    ensureStorage();
    fs.writeFileSync(storageFile, JSON.stringify(tokens), "utf8");
};

export const blacklistToken = (token) => {
    if (!token) return;

    const tokens = readTokens();
    if (!tokens.includes(token)) {
        tokens.push(token);
        writeTokens(tokens);
    }
};

export const isTokenRevoked = (token) => {
    if (!token) return false;
    return readTokens().includes(token);
};
