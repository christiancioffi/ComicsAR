from flask import Flask, send_from_directory, request

app = Flask(__name__, static_folder='static')

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/hiro/<path:filename>')
def serve_hiro_files(filename):
    return send_from_directory(f'{app.static_folder}/hiro', filename)

@app.route('/nft/<path:filename>')
def serve_nft_files(filename):
    return send_from_directory(f'{app.static_folder}/nft', filename)

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

@app.errorhandler(404)
def page_not_found(e):
    return f"404 - URL not found: {request.path}", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=443, ssl_context=('cert.pem', 'key.pem'))


