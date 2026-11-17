import urllib.request
import re
import os

os.makedirs('public/assets', exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

def test_and_download(url, dest_path):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response:
            if response.status == 200:
                data = response.read()
                if len(data) > 10000: # ensure it's not a tiny error response
                    with open(dest_path, 'wb') as f:
                        f.write(data)
                    print(f"SUCCESS: {dest_path} ({len(data)} bytes) from {url[:60]}")
                    return True
    except Exception as e:
        print(f"FAILED: {dest_path} - {e}")
    return False

# High-resolution Unsplash curated photo URLs
HIGH_RES_ASSETS = {
    # 1. Hero: Exquisite woman draped in royal silk saree in heritage palace
    'public/assets/hero-full.jpg': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90',
    'public/assets/hero-model.jpg': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=90',

    # 2. Categories (Crisp circular portraits)
    # Silk Sarees (Red/crimson royal silk)
    'public/assets/cat-silk.jpg': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&h=600&q=90',
    # Cotton Sarees (Pastel blue/teal handloom)
    'public/assets/cat-cotton.jpg': 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&h=600&q=90',
    # Georgette Sarees (Blush pink/peach soft drape)
    'public/assets/cat-georgette.jpg': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&h=600&q=90',
    # Kanjivaram Sarees (Grand royal temple zari)
    'public/assets/cat-kanjivaram.jpg': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=600&q=90',
    # Party Wear Sarees (Regal evening look)
    'public/assets/cat-party.jpg': 'https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=600&h=600&q=90',
    # Handloom Sarees (Authentic organic loom weave)
    'public/assets/cat-handloom.jpg': 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&h=600&q=90',

    # 3. Featured Banners
    # Traditional Handloom Sarees (Woman in ivory handloom saree in rustic courtyard)
    'public/assets/banner-handloom.jpg': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&h=800&q=90',
    # Banarasi Sarees (Close up of rich royal purple gold zari floral weave)
    'public/assets/banner-banarasi.jpg': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&h=800&q=90',

    # 4. Best Sellers (4 Product Cards)
    # Royal Purple Banarasi Silk Saree
    'public/assets/prod-purple-banarasi.jpg': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&h=1067&q=90',
    # Meenakari Silk Saree (Emerald green / jewel tone)
    'public/assets/prod-meenakari.jpg': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&h=1067&q=90',
    # Soft Georgette Saree (Blush peach fluid)
    'public/assets/prod-soft-georgette.jpg': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&h=1067&q=90',
    # Elegant Cotton Saree (Steel blue handloom)
    'public/assets/prod-cotton.jpg': 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&h=1067&q=90',

    # 5. Promo Banner: Royal Purple Gold Zari Drape
    'public/assets/promo-zari.jpg': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&h=700&q=90'
}

for dest, url in HIGH_RES_ASSETS.items():
    test_and_download(url, dest)

