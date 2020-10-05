import React, { useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FileUploader from '../../components/FileUploader/';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
// import './index.scss';

function AssetManager(props) {
  const { history, match } = props;
  const id = match.params.id;
  const handleBackClick = () => {
    history.push(`/vgdt-admin/loads/${id}`);
  }
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {


        return (
          <div className="AssetManager">
            <div className="AssetManager_Back" onClick={handleBackClick}>
              <ArrowBackIcon/>
            </div>
            <FileUploader/>
          </div>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}

export default AssetManager;
