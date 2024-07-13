import React from 'react';
import Box from '@mui/material/Box';
import './support.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




const Support = () => {
  return (
    <div className='support'>
      <Box height={40}/>
      <div className="support__container container grid">
        <div className="support__content">
          <h2 className='support__subtitle'>Welcome! How can we help you?</h2>
          <div className="support__input">
            <input type="text" placeholder='Search for answer...' className='support__input-data'/>
            <button></button>
          </div>
        </div>
        <div className="support__content support2">
          <h2 className='support2__subtitle'>Frequently Asked Questions</h2>
          <div className='support__fAQ'>
            <Accordion className='Accordion__item' sx={{marginTop:"2rem"}}
             >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>How do I set up a new expiration reminder?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  To set up a new reminder, navigate to the 'Add Reminder' section, enter the relevant details about the item, such as its name, expiration date, and a short note if necessary. You can also select how often you'd like to receive notifications before the expiration date.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className='Accordion__item'  
             >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography>Can I edit or delete a reminder?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                Yes, you can edit or delete any reminder. Go to the 'My Reminders' section, select the reminder you want to modify, and choose the 'Edit' or 'Delete' option to update or remove the reminder as needed.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className='Accordion__item'
             >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography>What happens when a reminder expires?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  When a reminder reaches its expiration date, you will receive a notification based on your selected alert preferences. The item will be marked as expired within the app, and you can choose to renew or remove it from your list.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className='Accordion__item'
             >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography>How do I receive notifications for reminders?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                You can receive notifications via email or directly through the app, depending on your preference settings. To set up or change your notification preferences, visit the 'Settings' section and select your preferred method of notification.

                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className='Accordion__item'
             >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography>Are my reminders backed up in case I lose my device?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                Yes, all reminders are stored securely in the cloud. If you lose your device or switch to a new one, simply log in to your account on the new device to access all your saved reminders.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className='Accordion__item'
             >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography>What types of reminders can I set up in the app?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                You can set up reminders for virtually any item that has an expiration date, such as food products, subscriptions, warranties, and important documents like passports and licenses.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className='Accordion__item'
             >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography>How do I deactivate my account?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                If you need to deactivate your account, please contact our support team through the 'Help' section. We'll assist you with the process and ensure all your data is securely handled.

                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="footer">
        <Typography variant="body1" >
          <h1 className='support__lastbar'>Can't find what you need? Send us a help request.</h1></Typography>
        <a href="https://portfolioo42.netlify.app/" target='blank'> <button className='contact__button'>Contact Us</button></a>
        <div variant="body2" className='footer__body2'>
        <div className="home__social">
            <a href="https://www.instagram.com/maninderdeep_singh_" className="home__social-icon" target='_blank'>
                <i className="uil uil-instagram"></i>
            </a>
            <a href="https://dribbble.com/" className="home__social-icon" target='_blank'>
            <i className="uil uil-dribbble"></i>
            </a>
            <a href="https://github.com/Maninderr42" className="home__social-icon" target='_blank'>
            <i className="uil uil-github-alt"></i>
            </a>
            <a href="https://www.linkedin.com/in/maninderdeep-singh/" className="home__social-icon" target='_blank'>
            <i className="uil uil-linkedin"></i>
            </a>
    
        </div>
        </div>
        <div className="footer-links">
          <a href="#">Help Center</a>
          <a href="#">Using Twist</a>
          <a href="#">Getting Started</a>
          <a href="#">Back to Twist</a>
          <a href="#">contact</a>
        </div>
        <hr className='line'/>

        <div variant="body3" className='footer__body3'>
          © 2024 Expiration Reminder. All rights reserved.
        </div>
      </div>

        </div>
      </div>
    </div>
  )
}

export  default Support;
