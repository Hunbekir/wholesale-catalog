# Product Images Folder

## How to Add Images

### Step 1: Screenshot Your Products from Canva
Take a screenshot of each Townhouse product from your Canva catalog.

### Step 2: Rename Images
Rename them using the supplier style ID:
```
townhouse-MS111.jpg
townhouse-19-400-SLD90-T.jpg
townhouse-PL00178-DRIFT3-018.jpg
```

### Step 3: Upload Here
Upload all images to this `images/` folder via GitHub.

### Step 4: Add to image_mapping.json
Update `../image_mapping.json` with mappings:
```json
{
  "products_images": {
    "MS111": "images/townhouse-MS111.jpg",
    "19-400-SLD90-T": "images/townhouse-19-400-SLD90-T.jpg",
    "PL00178-DRIFT3-018": "images/townhouse-PL00178-DRIFT3-018.jpg"
  }
}
```

That's it! Images will appear automatically in your catalog.

## Naming Convention
Use the supplier_style_id from your product data:
- Look in View Details modal for "Supplier Style ID"
- Use exact ID as filename (without .jpg)
- Example: if supplier_style_id is "MS111", name file "townhouse-MS111.jpg"

## Image Requirements
- Format: JPG or PNG
- Size: 300x300px or larger (app will scale)
- Transparency: Optional (PNG if needed)

## Example
For product with supplier_style_id "19-400-SLD90-T":
1. Take screenshot from Canva: townhouse-19-400-SLD90-T.jpg
2. Upload to this folder
3. Add to image_mapping.json: "19-400-SLD90-T": "images/townhouse-19-400-SLD90-T.jpg"
4. Done! Image appears in catalog

Questions? Check the main README.md
