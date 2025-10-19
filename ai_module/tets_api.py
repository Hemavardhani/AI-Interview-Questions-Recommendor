import os
import google.generativeai as genai

# Configure Gemini API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY not set. Please set it before running this script.")
genai.configure(api_key=api_key)

def get_questions(skill="Java"):
    try:
        prompt = f"Generate 5 interview questions for {skill} (easy, medium, and hard levels)."
        response = genai.models.generate(
            model="gemini-1.5-t",  # ✅ supported Gemini model
            input=prompt
        )
        # response.output_text contains the generated text
        text = response.output_text if hasattr(response, 'output_text') else str(response)
        questions = [q.strip() for q in text.split('\n') if q.strip()]
        return questions[:5]
    except Exception as e:
        return [f"Error: {e}"]

if __name__ == "__main__":
    skill = input("Enter skill (e.g., Java, Python): ")
    questions = get_questions(skill)
    print("\nHere are 5 recommended interview questions:\n")
    for i, q in enumerate(questions, 1):
        print(f"{i}. {q}")
