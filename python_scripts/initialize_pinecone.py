import pinecone
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer
from tqdm import tqdm

# Initialize Pinecone
pc = pinecone.Pinecone(
    api_key="pcsk_6hCohU_7JXgF1YhQLhFggaAxzGywsMfwsm85XWYbTZVH7Z1ZVcPDmZoNUpuQqWA7ax3DQ8"
)

# Create an index if it doesn't exist
index_name = "movies"
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name, 
        dimension=384, 
        metric="cosine", 
        spec=pinecone.ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        ) )

# Connect to the index
index = pc.Index(index_name)

mongo_client = MongoClient("mongodb+srv://dmt:dmt123@cluster0.xmbam.mongodb.net")
db = mongo_client["tmdb_db"]
movies_collection = db['movies']
print(movies_collection.count_documents({}))

model = SentenceTransformer('all-MiniLM-L6-v2')

movies = list(movies_collection.find().skip(11000))

# Upload movie embeddings to Pinecone
for movie in tqdm(movies):
    # Prepare the text for embedding
    text = (
        f"{movie.get('title', '')} - "
        f"{movie.get('overview', '')} - "
        f"{', '.join([genre['name'] for genre in movie.get('genres', [])])} - "
        f"{', '.join(movie.get('categories', []))} - "
        f"{movie.get('tagline', '')} - "
    )

    # Generate embedding using Sentence Transformers
    embedding = model.encode(text).tolist()

    # Upsert to Pinecone
    index.upsert([
        {
            "id": str(movie["_id"]),
            "values": embedding,
            "metadata": {'title': movie["title"]}
        }
    ])

print("All movies have been embedded and uploaded to Pinecone.")