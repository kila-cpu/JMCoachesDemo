#!/usr/bin/env python3
"""JM Coaches demo: serves the static phone app in ./public.

Python standard library only. Railway sets PORT; locally it defaults to 4358.
All app data lives in the visitor's browser (localStorage), so there is no backend.
"""
import os
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

PUB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public")


class H(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=PUB, **k)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "4358"))
    print(f"JM Coaches demo on port {port}", flush=True)
    ThreadingHTTPServer(("0.0.0.0", port), H).serve_forever()
