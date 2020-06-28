/**
 * How to add photo:
 * 1. Name the file using the syntax [xy]-[one word tag].jpg
 * 2. Add GPS metadata (use GeoSetter)
 * 3. Add Haiku Caption to 'Title' field (syntax like Line1#Line2#Line3)
 * 4. Optimise photo for web to under 1MB (use Photoshop 'Image Processor' Quality 5, Action MakeHeightSize800px)
 * 5. Add exported photo to aleang.github.io github under /images
 */
const PHOTOS = {
    cn: [
        'ferris',
        'tianjin',
        'smile',
        'firstcamp',
        'camp',
        'xian',
        'valley',
        'tea',
        'terraces',
        'xining',
        'qinghaipicnic',
        'bigpass',
        'saltlake',
        'jumping',
        'sunset',
        'firstcampfire',
        'qinghaipass',
        'policecamp',
        'gang',
        'teddy',
    ],
    kg: ['gravel', 'rainbow', 'well', 'galaxy', 'cloud'],

};

export function getPhotoList(): string[] {
    let photos = [];
    Object.keys(PHOTOS).forEach(countryTag => {
        PHOTOS[countryTag].forEach(photoName => {
            photos.push(`${countryTag}-${photoName}.jpg`);
        });
    });
    return photos;
}