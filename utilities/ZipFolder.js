const path = require('path');
const zipFolder = require('zip-a-folder');
const vgdtAdminUI_zip = 'build/public/vgdt-admin.zip';
const vgdtAPI_zip = 'build/public/api.zip';
const public_zip = 'build/public/public.zip';
const codeigniter4_zip = 'build/non_public/codeigniter4/codeigniter4.zip';
const publicHtml = 'build/public';
const codeigniter4 = 'codeigniter4';

class ZipAFolder {

    static main(to, as) {
        zipFolder.zipFolder(to, as, function(err) {
            if(err) {
                console.log('Something went wrong!', err);
            }
        });
    }
}

ZipAFolder.main(publicHtml, public_zip);
// ZipAFolder.main(publicHtml, vgdtAPI_zip);
ZipAFolder.main(codeigniter4, codeigniter4_zip);
