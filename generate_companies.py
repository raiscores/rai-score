import os
import json

data_folder = r"C:\Users\Alan\Documents\RAI Score Project\frontend\public\data"
company_list = []

for filename in os.listdir(data_folder):
    if filename.endswith('_profile.json'):
        with open(os.path.join(data_folder, filename), 'r', encoding='utf-8') as f:
            profile = json.load(f)
        slug = profile.get("slug")
        
        # Try to get the matching _scores.json (if it exists)
        score_path = os.path.join(data_folder, f"{slug}_scores.json")
        score = None
        max_score = 7  # Default if not found
        if os.path.exists(score_path):
            with open(score_path, 'r', encoding='utf-8') as f:
                scores = json.load(f)
                score = scores.get("aggregate", {}).get("totalScoreOutOf7")
                # Adjust this if your scoring is different

        # Build the company object
        company = {
            "slug": slug,
            "name": profile.get("name"),
            "industry": profile.get("industry"),
        }
        if score is not None:
            company["score"] = round(score, 1)
            company["max_score"] = max_score

        company_list.append(company)

# Sort alphabetically
company_list = sorted(company_list, key=lambda x: x["name"].lower())

# Compact single-line-per-object formatting
js_array = "export const companies = [\n"
for c in company_list:
    js_array += "  " + json.dumps(c, separators=(',', ': ')) + ",\n"
js_array += "];"

output_path = r"C:\Users\Alan\Documents\RAI Score Project\frontend\companies.js"
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(js_array)

print(f"Generated companies.js successfully at {output_path}!")
