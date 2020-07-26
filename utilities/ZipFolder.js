const path = require('path');
const zipFolder = require('zip-a-folder');
const vgdtAdminUI_zip = 'public/vgdt-admin.zip';
const vgdtAPI_zip = 'public/api.zip';
const codeigniter4_zip = 'non_public/codeigniter4/codeigniter4.zip';
const publicHtml = 'public';
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

ZipAFolder.main(publicHtml, vgdtAdminUI_zip);
ZipAFolder.main(publicHtml, vgdtAPI_zip);
ZipAFolder.main(codeigniter4, codeigniter4_zip);
