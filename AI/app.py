from flask import Flask, request, jsonify
from flask_cors import CORS

import torch
from transformers import pipeline, PreTrainedTokenizerFast

app = Flask(__name__)
cors = CORS(app, resources={
  r"/recipe/*": {"origin": "*"},
})

@app.route('/recipe',methods=['POST'])
def process():
    ingredients = request.json
    print(ingredients)
    recipe = create_recipe(ingredients)
    print(recipe)
    
    return jsonify(recipe)

def create_recipe(ingredients):
    ingredient_sentence = '재료: ' + '|'.join(ingredients)

    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    tokenizer = PreTrainedTokenizerFast.from_pretrained("./tokenizer/")
    generator = pipeline('text-generation', model='./model/', tokenizer=tokenizer, device=device)
    recipe = generator(ingredient_sentence, max_length=512)
    return recipe
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)