import os
import google.generativeai as genai
from flask import Flask, request, jsonify

app = Flask(__name__)

# Configure API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY not set. Please set it before running the app.")
genai.configure(api_key=api_key)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    skill = data.get("skill", "Java")

    try:
        # ✅ Use the generate method available in v0.8.5
        response = genai.generate(
            model="gemini-1.5-t",
            prompt=f"Generate 5 interview questions for {skill} (easy, medium, hard).",
        )

        text = response.output_text  # This contains the generated text
        questions = [q.strip() for q in text.split('\n') if q.strip()]
        return jsonify(questions[:5])
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
