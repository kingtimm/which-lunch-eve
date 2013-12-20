from eve import Eve
from flask import send_file

app = Eve(__name__, static_url_path='')

@app.route('/')
def home_page():
    return app.send_static_file('index.html')

app.debug = True

# def print_documents(resource, documents):
#     for document in documents:
#         print document
#
# app.on_fetch_resource += print_documents

if __name__ == "__main__":
    app.run()
