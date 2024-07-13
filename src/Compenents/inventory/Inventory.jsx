import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Img2  from '../../Assets/undraw_No_data.png';
import './inventory.css';

import { TbCalendarPlus } from "react-icons/tb";
import ApexChart1 from './graph';
import axios from 'axios';
import { MdOutlineDeleteOutline } from "react-icons/md";

const options = [
  { label: 'All', value: 'all' },
  { label: 'Medicine', value: 'medicine' },
  { label: 'Body Lotion', value: 'body_lotion' },
  { label: 'Duo', value: 'duo' },
  { label: 'Shampoo', value: 'shampoo' },
  { label: 'Facial Cleanser', value: 'facial_cleanser' },
  { label: 'Serum', value: 'serum' },
  { label: 'Sunscreen', value: 'sunscreen' },
];

const Inventory = () => {
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteConfirm = async () => {
    const productId = selectedItem.productId;

    try {
      await axios.delete(`http://localhost:8080/product/deleteProduct`, {
        params: { email, productId }
      });
      setData(data.filter(product => product.productId !== selectedItem.productId));
    } catch (error) {
      console.error("Delete failed: ", error);
    } finally {
      setIsDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    const validDate = item.expiryDate && !isNaN(new Date(item.expiryDate).getTime()) ? new Date(item.expiryDate).toISOString().split('T')[0] : '';
    setEditedItem({
      ...item,
      expiryDate: validDate
    });
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSubmit = async () => {
    const formattedItem = {
      ...editedItem,
      expiryDate: new Date(editedItem.expiryDate).toISOString().split('T')[0]
    };

    try {
      await axios.put(`http://localhost:8080/product/editProduct`, formattedItem);
      const updatedData = data.map(item => item.productId === formattedItem.productId ? formattedItem : item);
      setData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Update failed: ", error);
    } finally {
      setIsEditDialogOpen(false);
      setSelectedItem(null);
      setEditedItem({});
    }
  };

  const handleScheduleDelete = async (scheduleId) => {
    try {
      await axios.delete(`http://localhost:8083/schedule/deleteSchedule`, {
        params: { email, scheduleId }
      });
      setTodos(todos.filter(schedule => schedule.scheduleId !== scheduleId));
    } catch (error) {
      console.error("Schedule delete failed: ", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:8081/auth/getUser/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const productList = response.data.productList;
        const schedules = response.data.scheduleList;

        setTodos(schedules);

        if (productList && Array.isArray(productList)) {
          const updatedProducts = productList.map(product => ({
            ...product,
            expiryDate: new Date(product.expiryDate[0], product.expiryDate[1] - 1, product.expiryDate[2]).toLocaleDateString('en-GB')
          }));

          setData(updatedProducts);
          setFilteredData(updatedProducts);
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    })();
  }, [email, token]);

  useEffect(() => {
    filterData();
  }, [searchQuery, category, data]);

  const filterData = () => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(item => item.type === category);
    }

    setFilteredData(filtered);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='inventory'>
      <Box height={60} />
      <div className="inventory__container container">
        <div className="inventory__content">
          <h1 className='inventory__title'>
            Dashboard <i className='fa fa-angle-double-right' aria-hidden='true'></i>
            <span className='inventory__subtitle'>Inventory</span>
          </h1>
          <div className='inventory__box-data5'>
            <div className='inventory__graph1'>
              <h2 className='inventory__graph1-title'>Total Items</h2>
              <ApexChart1 />
            </div>
            <div className='inventory__graph2'>
              <h2 className='inventory__graph2-title'>Schedule Reminder</h2>
              <div className="inventory__schedule">
                <ul>
                  {todos.length > 0 ? (
                    todos.map((item, index) => (
                      <li className='Schedule__list' key={index}>
                        <div className="Schedule__list-data">
                          <div className={`Schedule__list-type ${
                            item.scheduleType === 'event' ? 'Schedule__list-type--event' :
                            item.scheduleType === 'appointment' ? 'Schedule__list-type--appointment' : ''
                          }`}>
                            {item.scheduleType === 'appointment' ? 'Appt' : item.scheduleType}
                          </div>
                          <div className="Schedule__list-title">
                            <h3>{item.scheduleTitle}</h3>
                            <span className='Schedule__list-Date'>{new Date(item.expiryDate).toLocaleDateString('en-GB')}</span>
                          </div>
                          <div className="Schedule__list-delete">
                            <MdOutlineDeleteOutline className='uil2' onClick={() => handleScheduleDelete(item.scheduleId)} />
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className='nothing__class'>
                      <TbCalendarPlus className='CalendarPlus' />
                      <span className='nothing__upcoming-title'>No upcoming scheduled</span>
                      <span className='nothing__pargh'>You have no upcoming schedule. As soon as someone books a time with you it will show up here.</span>
                    </p>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="inventory__content-tabledata">
            <div className="inventory__content-Search">
              <div className="Search-data1 item1">
                <h3 className='inventory__search-titlesearch'>What are you looking for?</h3>
                <input
                  type="text"
                  placeholder='Search for Category name, company, etc'
                  className='inventory__search'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="Search-data1 item2">
                <h3 className='inventory__search-titleselected'>Category</h3>
                <select
                  name='category'
                  value={category}
                  onChange={handleCategoryChange}
                  className='search-input-category'
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="Search-data1 item4">
                <i className='fa fa-angle-double-down' aria-hidden='true'></i>
              </div>

              <div className="Search-data1 item5">
                <button className='button button--flex search-button' onClick={filterData}>Search</button>
              </div>
            </div>
            <div className="product-data">
              <h2 className='product__title'>Product Summary</h2>
              <table className='product__table'>
                <thead>
                  <tr className='inventory__table-row'>
                    <th className='inventory__table-heading left1'>Name</th>
                    <th className='inventory__table-heading'>Category</th>
                    <th className='inventory__table-heading'>Description</th>
                    <th className='inventory__table-heading'>Count</th>
                    <th className='inventory__table-heading'>Date</th>
                    <th className='inventory__table-heading'>Price</th>
                    <th className='inventory__table-heading'>Edit</th>
                    <th className='inventory__table-heading right1'>Delete</th>
                  </tr>
                </thead>
                <tbody className='inventory__tabledata'>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData.map(item => (
                      <tr className='inventory__table-row' key={item.productId}>
                        <td className='table__data left1'>{item.productName}</td>
                        <td className='table__data'>{item.type}</td>
                        <td className='table__data'>{item.description}</td>
                        <td className='table__data'>{item.quantity}</td>
                        <td className='table__data'>{item.expiryDate}</td>
                        <td className='table__data'>{item.price}</td>
                        <td className='table__data'> <h4 className='edit__button' onClick={() => handleEditClick(item)}>edit</h4></td>
                        <td className='table__data right1'><h4 className='edit__button' onClick={() => handleDeleteClick(item)} >delete</h4></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                    <td colSpan="9" className='table__data'><img src={Img2} alt="" className='NodataPic' />
                    <h3 className='NodataPic__title'>No data available </h3> </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={isDialogOpen}
        classes={{ paper: 'custom-dialog-content' }}
        onClose={handleDeleteCancel}
      >
        <DialogTitle className='custom-dialog-title'> 
          {"Are You Sure? 🤔"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='custom-dialog-text'>
            This action cannot be undone. This will permanently delete the selected item.
          </DialogContentText>
          <DialogActions>
            <Button className='custom-dialog-cancel' onClick={handleDeleteCancel}>Cancel</Button>
            <Button className='custom-dialog-delete' onClick={handleDeleteConfirm}>Delete</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEditDialogOpen}
        classes={{ paper: 'custom-dialog-content' }}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogTitle className='custom-dialog-title'>
          {"Edit Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="productName"
            label="Product Name"
            value={editedItem.productName || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="type"
            label="Type"
            value={editedItem.type || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            select
          >
            {options.filter(option => option.value !== 'all').map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="description"
            label="Description"
            value={editedItem.description || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={editedItem.quantity || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="expiryDate"
            label="Expiry Date"
            type="date"
            value={editedItem.expiryDate || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={editedItem.price || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button className='custom-dialog-cancel' onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button className='custom-dialog-submit' onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Inventory;
