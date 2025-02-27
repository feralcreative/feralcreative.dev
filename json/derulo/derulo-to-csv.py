# v00.04 2025.20.02.0932
# Summary: This Python script converts a JSON file to CSV by recursively flattening nested JSON.
# It now checks if the top-level JSON is a dictionary with one or more keys holding arrays.
# If so, it combines those arrays into a single list of records and adds a "_source" field indicating the key.
# To run: python3 convert_json_to_csv.py {name} 
# (e.g., python3 convert_json_to_csv.py allTasks will read allTasks.json and produce allTasks.csv)

import pandas as pd
import json
import sys
from pathlib import Path

def flatten_json(y, prefix=''):
    out = {}
    if isinstance(y, dict):
        for k, v in y.items():
            full_key = f"{prefix}{k}" if prefix == "" else f"{prefix}.{k}"
            if isinstance(v, dict):
                out.update(flatten_json(v, full_key))
            elif isinstance(v, list):
                # If the list contains dictionaries, flatten each with an index
                if all(isinstance(item, dict) for item in v):
                    for i, item in enumerate(v):
                        out.update(flatten_json(item, f"{full_key}[{i}]"))
                else:
                    # For lists with non-dict elements, join them into a semicolon-separated string.
                    out[full_key] = '; '.join(str(item) for item in v)
            else:
                out[full_key] = v
    elif isinstance(y, list):
        for i, item in enumerate(y):
            out.update(flatten_json(item, f"{prefix}[{i}]"))
    else:
        out[prefix] = y
    return out

if len(sys.argv) < 2:
    print("Usage: python convert_json_to_csv.py {filename} (without file extension)")
    sys.exit(1)

base_name = sys.argv[1]
input_file = Path(f"{base_name}.json")
output_file = Path(f"{base_name}.csv")

try:
    with input_file.open('r', encoding='utf-8') as f:
        data = json.load(f)
except Exception as e:
    print(f"Error reading {input_file}: {e}")
    sys.exit(1)

# If the top-level JSON is a dictionary, check for keys whose values are lists.
if isinstance(data, dict):
    combined = []
    for key, value in data.items():
        if isinstance(value, list):
            # Flatten each item in the list and note the source key.
            for item in value:
                flat = flatten_json(item)
                flat["_source"] = key
                combined.append(flat)
        else:
            # If it's not a list, you might want to include it as metadata.
            # Here we add it as a separate record with the key as column name.
            combined.append({key: value, "_source": key})
    flat_data = combined
elif isinstance(data, list):
    # If data is already a list, just flatten each element.
    flat_data = [flatten_json(item) for item in data]
else:
    # Otherwise, wrap the single object into a list.
    flat_data = [flatten_json(data)]

df = pd.DataFrame(flat_data)
df.to_csv(output_file, index=False, encoding='utf-8')
print(f"CSV file saved as {output_file}")

# v00.04 2025.20.02.0932