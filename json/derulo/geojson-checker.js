const fs = require("fs");

/**
 * Function to determine if the provided data is GeoJSON.
 * @param {Object} data - The JSON data to check.
 * @returns {boolean} - Returns true if data is GeoJSON, false otherwise.
 */
function isGeoJSON(data) {
  if (typeof data !== "object" || data === null) return false;
  const geojsonTypes = [
    "Feature",
    "FeatureCollection",
    "Point",
    "LineString",
    "Polygon",
    "MultiPoint",
    "MultiLineString",
    "MultiPolygon",
    "GeometryCollection",
  ];

  if (!geojsonTypes.includes(data.type)) return false;

  if (data.type === "FeatureCollection") {
    return Array.isArray(data.features) && data.features.every(isGeoJSON);
  }

  if (data.type === "Feature") {
    return data.geometry && isGeoJSON(data.geometry);
  }

  if (["Point", "LineString", "Polygon", "MultiPoint", "MultiLineString", "MultiPolygon"].includes(data.type)) {
    return Array.isArray(data.coordinates);
  }

  return false;
}

/**
 * Main function to read JSON data and determine its type.
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error(
      JSON.stringify({
        error: "No file path provided.",
        usage: "node checkGeoJSON.js <path_to_json_file>",
      })
    );
    process.exit(1);
  }

  const filePath = args[0];

  // Read the JSON file
  fs.readFile(filePath, "utf8", (err, jsonString) => {
    if (err) {
      console.error(
        JSON.stringify({
          error: "Failed to read file.",
          details: err.message,
        })
      );
      return;
    }

    try {
      const data = JSON.parse(jsonString);
      const result = isGeoJSON(data);
      console.log(JSON.stringify({ isGeoJSON: result }));
    } catch (parseErr) {
      console.error(
        JSON.stringify({
          error: "Invalid JSON.",
          details: parseErr.message,
        })
      );
    }
  });
}

// Run the main function
main();
