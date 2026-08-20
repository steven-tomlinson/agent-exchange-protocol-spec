import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemasDir = path.resolve(__dirname, "../schemas");

console.log("Loading and compiling AEP JSON Schemas...");

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const schemaFiles = fs.readdirSync(schemasDir).filter((file) => file.endsWith(".json"));

if (schemaFiles.length === 0) {
  console.error("No schema files found in", schemasDir);
  process.exit(1);
}

const validators = new Map();

for (const file of schemaFiles) {
  const filePath = path.join(schemasDir, file);
  const schemaContent = JSON.parse(fs.readFileSync(filePath, "utf8"));
  try {
    const validate = ajv.compile(schemaContent);
    validators.set(file, validate);
    console.log(`✓ Validated schema syntax: schemas/${file}`);
  } catch (err) {
    console.error(`✗ Failed to compile schema: schemas/${file}`, err.message);
    process.exit(1);
  }
}

// Sample payload validation test using already compiled envelope validator
const validateEnvelope = validators.get("envelope.json");

const sampleEnvelope = {
  protocol: "agent-exchange",
  version: "0.2",
  network: "eip155:8453",
  messageId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  messageType: "task.request",
  sender: "ae:17bXzK9P8qL3mN5vR2wT4yU1j",
  createdAt: "2026-08-20T12:00:00Z",
  sequence: 1,
  payload: { type: "task.request", taskId: "task-001" },
  signature: {
    algorithm: "ES256K",
    publicKey: "04a1b2c3d4e5f6",
    value: "3045022100a1b2c3d4e5"
  }
};

if (validateEnvelope(sampleEnvelope)) {
  console.log("✓ Sample SignedEnvelope validated successfully against schemas/envelope.json");
} else {
  console.error("✗ Sample SignedEnvelope validation failed:", validateEnvelope.errors);
  process.exit(1);
}

console.log(`\nAll ${validators.size} AEP JSON Schemas compiled and validated successfully!`);
