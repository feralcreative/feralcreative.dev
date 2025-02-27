#!/usr/bin/env node
/**
 * sample_extractor.js
 * v00.01 - 2025.02.20.0825
 *
 * This script reads a large JSON file (e.g. 5.8 MB) from disk and extracts a random sample of items.
 * It is intended to create a smaller snapshot for troubleshooting purposes.
 * The script checks if the input JSON is an array or if it has a property (e.g., "tasks" that is an array).
 * It then performs random (reservoir) sampling and saves the result to an output file.
 *
 * How to run:
 *   node sample_extractor.js input.json 100 sample.json
 *   (This extracts 100 items from input.json and writes them to sample.json)
 */

const fs = require("fs");

// Get command line arguments: input file, sample count, and output file
const inputPath = process.argv[2] || "input.json";
const sampleCount = parseInt(process.argv[3] || "100", 10); // default sample count = 100
const outputPath = process.argv[4] || "sample.json";

fs.readFile(inputPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    process.exit(1);
  }
  let json;
  try {
    json = JSON.parse(data);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    process.exit(1);
  }

  // Determine how to sample based on the JSON structure.
  let result;
  if (Array.isArray(json)) {
    // If the top-level JSON is an array, extract a random sample from it.
    result = reservoirSample(json, sampleCount);
  } else if (json.tasks && Array.isArray(json.tasks)) {
    // If there's a "tasks" property that is an array, sample from it.
    result = { ...json, tasks: reservoirSample(json.tasks, sampleCount) };
  } else {
    // Otherwise, sample by taking the first sampleCount keys.
    const keys = Object.keys(json);
    const sampleKeys = keys.slice(0, Math.min(sampleCount, keys.length));
    result = {};
    sampleKeys.forEach((key) => {
      result[key] = json[key];
    });
  }

  fs.writeFile(outputPath, JSON.stringify(result, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Error writing sample file:", err);
      process.exit(1);
    }
    console.log(`Sample data (with ${sampleCount} items) written to ${outputPath}`);
  });
});

/**
 * Implements reservoir sampling for a given array.
 * @param {Array} arr - The array to sample from.
 * @param {number} k - The number of items to sample.
 * @returns {Array} - An array containing the random sample of k items.
 */
function reservoirSample(arr, k) {
  const sample = [];
  for (let i = 0; i < arr.length; i++) {
    if (i < k) {
      sample.push(arr[i]);
    } else {
      const j = Math.floor(Math.random() * (i + 1));
      if (j < k) {
        sample[j] = arr[i];
      }
    }
  }
  return sample;
}

// v00.01 - 2025.02.20.0825
