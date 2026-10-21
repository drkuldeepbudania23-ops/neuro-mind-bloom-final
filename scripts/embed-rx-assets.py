"""Regenerate lib/server/rxAssets.ts after changing the signature or logo image."""
import base64, io
from PIL import Image

def b64(path, size):
    im = Image.open(path).convert("RGBA")
    im.thumbnail(size)
    buf = io.BytesIO()
    im.save(buf, "PNG", optimize=True)
    return base64.b64encode(buf.getvalue()).decode()

sig = b64("private/doctor-signature.png", (300, 210))
logo = b64("public/logo-mark.png", (120, 120))
open("lib/server/rxAssets.ts", "w").write(
    'import "server-only";\n\n'
    "/** Images embedded into e-signed prescription PDFs. Regenerate with scripts/embed-rx-assets.py. */\n"
    f'export const SIGNATURE_PNG_BASE64 = "{sig}";\n'
    f'export const LOGO_PNG_BASE64 = "{logo}";\n'
)
