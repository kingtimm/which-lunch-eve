from eve import Eve
from flask import send_file

app = Eve(__name__)
app.debug = True

@app.route('/')
def home_page():
    return send_file('static/index.html')

# def print_documents(resource, documents):
#     for document in documents:
#         print document
#
# app.on_fetch_resource += print_documents

if __name__ == "__main__":
    app.run()
