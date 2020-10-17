const path = require('path');
const zipFolder = require('zip-a-folder');
const vgdtAPI_zip = 'build/public/api.zip';

const codeigniter4_zip = 'build/non_public/codeigniter4/codeigniter4.zip';
const publicHtml = 'build/public/vgdt-admin';
const publicHtml_zip = 'build/public/vgdt-admin-alpha.zip';
const publicAssets = 'src/assets';
const publicAssets_zip = 'build/public/assets.zip';
const publicAPI = 'build/public/api';
const publicAPI_zip = 'build/public/api.zip';
const codeigniter4 = 'codeigniter4';

class ZipAFolder {

    static main(from, as) {
        zipFolder.zipFolder(from, as, function(err) {
            if(err) {
                console.log('Something went wrong!', err);
            }
        });
    }
}

ZipAFolder.main(publicHtml, publicHtml_zip);
ZipAFolder.main(publicAssets, publicAssets_zip);
ZipAFolder.main(publicAPI, publicAPI_zip);
ZipAFolder.main(codeigniter4, codeigniter4_zip);
