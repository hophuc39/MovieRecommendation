from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

app = Flask(__name__)

@app.route('/embed', methods=['POST'])
def embed_text():
    try:
        data = request.json
        text = data.get('text', '')
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        # Generate the embedding
        embedding = model.encode(text).tolist()
        return jsonify({"embedding": embedding})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)