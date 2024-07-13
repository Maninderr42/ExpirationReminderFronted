import React, { useState } from 'react'
import './setting.css';
import Box from '@mui/material/Box';
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import { TiDocumentText } from "react-icons/ti";
import { RiContactsBookLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";


const tabContent={
    General :{
     content: <div className="general">
      <div className="general__content-title">
      <h1>General Settings</h1>
      <h3>Specify the desired lead time for alert notifications</h3>
      </div>

      <div className="general__form">
        <div className="general__form-row">
          <label htmlFor="days">Enter the Months</label>
          <input type="number" id="days" name="days" placeholder="0" className="general__input" />
          <button className="general__save-button">Save</button>

        </div>
        <div className="general__form-row">
          <label htmlFor="months">Enter Alternate email</label>
          <input type="number" id="months" name="months" placeholder="0" className="general__input" />
          <button className="general__save-button">Save</button>

        </div>
        <div className="general__form-row general__last">
          <label htmlFor="years">Enter Alternate Phone</label>
          <input type="number" id="years" name="years" placeholder="0" className="general__input" />
          <button className="general__save-button">Save</button>
        </div>
      </div>

</div>,
      icon:<CgProfile className='icon__tab' />

    },
    Service :{
      content: <div className="service">
        <div className="email__service email-block">
        <div className="service__content">
        <MdOutlineEmail className='service-icon' />
          <div className="service-title"><h3>Email Service</h3>
          <span>enable/disable email Reminders</span></div>
        </div>
        <div className="service__input">
        <input class="form-checkinput" type="checkbox" id="flexSwitchCheckDefault"/>
        </div>
        </div>
        <div className="email__service">
        <div className="service__content">
        <IoPhonePortraitOutline className='service-icon'/>
          <div className="service-title"><h3>SMS Service</h3>
          <span>enable/disable sms Reminders</span></div>
        </div>
        <div className="service__input">
        <input class="form-checkinput" type="checkbox" id="flexSwitchCheckDefault"/>

        </div>
        </div>
        <div className="email__service">
        <div className="service__content">
        <BsWhatsapp className='service-icon' />
          <div className="service-title"><h3>WhatsApp Service</h3>
          <span>enable/disable WhatsApp Reminders</span></div>
        </div>
        <div className="service__input">
        <input class="form-checkinput" type="checkbox" id="flexSwitchCheckDefault"/>

        </div>
        </div>
      </div>,
      icon:<AiOutlineBell className='icon__tab'/>
    },

    Reminders: {
      content: <div className="reminders">
        <div className="reminder__block-title">
          <h1>Default Reminder Sequence</h1>
        </div>
        <div className="reminder__content-block">
          <h2 className="reminder__subtitle">Set the before reminder</h2>
          <div className="reminder__before">
          <div className="reminder__row">
            <label htmlFor="daysBefore" className='reminder__label'>For Days</label>
            <input type="number" className='reminder__input' name="daysBefore" placeholder='0' id="daysBefore" />
            </div>

            <div className="reminder__row">
            <label htmlFor="monthsBefore" className='reminder__label'>For Months</label>
            <input type="number" className='reminder__input' name="monthsBefore" placeholder='00' id="monthsBefore" />
            </div>

            <div className="reminder__row">
            <label htmlFor="yearsBefore" className='reminder__label'>For Years</label>
            <input type="number" className='reminder__input' name="yearsBefore" placeholder='0000' id="yearsBefore" />
          </div>

          <div className="reminder__row">
            <button className='button button--flex reminderButton'>Save</button>
          </div>
          </div>


          <h2 className="reminder__subtitle">Set the after reminder</h2>
          <div className="reminder__before">
          <div className="reminder__row">
            <label htmlFor="daysBefore" className='reminder__label'>For Days</label>
            <input type="number" className='reminder__input' name="daysBefore" placeholder='0' id="daysBefore" />
            </div>

            <div className="reminder__row">
            <label htmlFor="monthsBefore" className='reminder__label'>For Months</label>
            <input type="number" className='reminder__input' name="monthsBefore" placeholder='00' id="monthsBefore" />
            </div>

            <div className="reminder__row">
            <label htmlFor="yearsBefore" className='reminder__label'>For Years</label>
            <input type="number" className='reminder__input' name="yearsBefore" placeholder='0000' id="yearsBefore" />
          </div>

          <div className="reminder__row">
            <button className='button button--flex reminderButton'>Save</button>
          </div>
          </div>
        </div>
      </div>,
  
      icon:<TiDocumentText className='icon__tab'/>
    },
    Contacts :{
      content: <p>Generl contact.....</p>,
      icon:<RiContactsBookLine className='icon__tab'/>
    }

}


const Settings = () => {
    const [activeTab ,setActiveTab]=useState('General')
  return (
    <div className='settings'>
    <Box height={60} />
    <div className="settings__container container grid">
        <div className="setting__content">
            <div className="setting__title-data">
                <h2 className='setting__title'>Settings/</h2>
                <div className="setting__subtitle-data">
                    <h3 className='setting__subtitle'><AiOutlineHome className='setting__subtitle-icon' /> /App Settings</h3>
                </div>


               <div className="setting__main-content">
                <div className="setting__content-tabdata">
                    {Object.keys(tabContent).map((tab)=>(
                        <div
                        key={tab}
                        className={`nav-item ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                      >
          <span className="icon">{tabContent[tab].icon}</span>
            <span className="label">{tab}</span>
          </div>
                    ))}
                </div>
                <div className="tab-content">
        {tabContent[activeTab].content}
      </div>

            </div>
        </div>
    </div>
    </div>

    </div>
  )
}

export default Settings