import React from 'react'
import '../SocialSites/SocialSites.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PlusIcon from '../../../Assets/Icons/plus.svg';
import { useTranslation } from "react-i18next";

const AddMore = ({ onPress }) => {
  const { t } = useTranslation();
  return (
    <div className='add_more_main_div' onClick={() => onPress()}>
      <div className='plus_icon_div'>
        <img src={PlusIcon} alt="" className='plus_icon_css' />
      </div>
      <div className='add_new_text_css'>
        {t('addnew')}
      </div>
    </div>
  )
}

export default AddMore