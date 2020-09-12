# open-graph-image
Create the open graph image


## Inputs

### `bold-text`

**Required** The text which will appear as bold text on image.

### `plain-text`

**Required** The text which will appear as normal text on image.

### `theme`

The theme layout for social image. There are two values possible which are `light` and `dark`.


## Outputs

Image is stored in the root directory.

## Example usage
```
- name: Open Graph social cards
  uses: Jasmin2895/open-graph-image@v1.1
  with:
    bold-text: "Open graph image"
    plain-text: "for social media platform"
    theme: "dark"

- name: Archive open graph image
  uses: actions/upload-artifact@v2
  with:
    name: open-graph-image
    path: og-image.now.sh.png

- name: Download all workflow run artifacts
  uses: actions/download-artifact@v2
```
