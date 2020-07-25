const path = require('path');
const zipFolder = require('zip-a-folder');
const vgdtAdminUI_As = 'public/vgdt-admin.zip';
const vgdtAPI_As = 'public/api.zip';
const to = 'public';

class ZipAFolder {

    static main(to, as) {
        zipFolder.zipFolder(to, as, function(err) {
            if(err) {
                console.log('Something went wrong!', err);
            }
        });
    }
}

ZipAFolder.main(to, vgdtAdminUI_As);
ZipAFolder.main(to, vgdtAPI_As);
