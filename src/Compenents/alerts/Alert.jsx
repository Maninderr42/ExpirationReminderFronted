
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import './alert.css';
import Img2  from '../../Assets/undraw_No_data.png';

import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem } from '@mui/material';

const options = [
  { label: 'All', value: 'All' },
  { label: 'Medicine', value: 'medicine' },
  { label: 'Body Lotion', value: 'body_lotion' },
  { label: 'Duo', value: 'duo' },
  { label: 'Shampoo', value: 'shampoo' },
  { label: 'Facial Cleanser', value: 'facial_cleanser' },
  { label: 'Serum', value: 'serum' },
  { label: 'Sunscreen', value: 'sunscreen' },
  // Add more categories as needed
];

const Alert = () => {
  const [category, setCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const email = localStorage.getItem('email');
  const [currentDate, setCurrentDate] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDiaLogOpen, setIsDiaLogOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({});

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditedItem({
      ...item,
      expiryDate: item.expiryDate ? new Date(item.expiryDate).toISOString().split('T')[0] : ''
    });
    setIsDialogOpen(true);
  };

  
  const handleItemPage = () => {
  
  
    // window.location.href = '/Item'; 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const fetchUpdatedData = async () => {
    try {
      const response = await axios.post(`http://localhost:8083/product/alertProduct/${email}`, { date: currentDate });
      setData(response.data);
    } catch (error) {
      console.error("Fetch updated data failed: ", error);
    }
  };

  const handleSubmit = async () => {
    const formattedItem = {
      ...editedItem,
      expiryDate: new Date(editedItem.expiryDate).toISOString().split('T')[0] // Convert to 'YYYY-MM-DD' format
    };

    try {
      await axios.put(`http://localhost:8083/product/editProduct`, formattedItem);
      await fetchUpdatedData(); // Fetch the updated data after successful update
    } catch (error) {
      console.error("Update failed: ", error);
    } finally {
      setIsDialogOpen(false);
      setSelectedItem(null);
      setEditedItem({});
    }
  };

  const handleDeleteClick = (item) => {
    setIsDiaLogOpen(true);
    setSelectedItem(item);
  };

  const handleDeleteCancel = () => {
    setIsDiaLogOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteConfirm = async () => {
    const productId = selectedItem.productId;

    try {
      await axios.delete(`http://localhost:8083/product/deleteProduct`, {
        params: { email, productId }
      });
      setData(data.filter(product => product.productId !== selectedItem.productId));
    } catch (error) {
      console.error("Delete failed: ", error);
    } finally {
      setIsDiaLogOpen(false);
      setSelectedItem(null);
    }
  };

  const filterData = () => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(item => item.type === category);
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [data, searchQuery, category]);

  const getProductRowClass = (expiryDate) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const expiry = new Date(expiryDate);

    if (expiry > today) {
      return 'green-background';
    } else if (expiry < today) {
      return 'red-background';
    } else {
      return 'alert-color'; // Assuming you have a class for alert color
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    setCurrentDate(date);
  };

  const handleDateChange = (event) => {
    setCurrentDate(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    getCurrentDateTime();
  }, []);

  useEffect(() => {
    (async () => {
      console.log(currentDate);
      try {
        const response = await axios.post(`http://localhost:8083/product/alertProduct/${email}`, { date: currentDate });
        setData(response.data);
      } catch (error) {
        console.error("get failed: ", error);
      }
    })();
  }, [email, currentDate]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className='alert'>
      <Box height={60} />
      <div className="alert__container container grid">
        <div className="alert__content">
          <h1 className='alert__title'>
            Dashboard <i className='fa fa-angle-double-right' aria-hidden='true'></i>
            <span className='alert__subtitle'>Alerts</span>
          </h1>
          <div className="alert__content-title">
          <div className="alert__content-titledata">
            <h2 className='alert--title'>Alerts</h2>
            <h5 className='alert--subbtitle'>Quickly manange your inventory alert and product</h5>
            </div>
            <button className='button button--flex create-button' onClick={handleItemPage}>Create New</button>
          </div>
          <div className="alert__content-Search">
            <div className="Search-data1 item1">
              <h3 className='alert__search-titleserach'>What are you looking for?</h3>
              <input
                type="text"
                placeholder='Search for Category name, company, etc'
                value={searchQuery}
                onChange={handleSearchChange}
                className='alert__search'
              />
            </div>
            <div className="Search-data1 item2">
              <h3 className='alert__search-titleselected'>Category</h3>
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
            <div className="Search-data1 item3">
              <h3 className='alert__search-titleDate'>Date</h3>
              <input
                type="date"
                className='alert__serach-date'
                value={currentDate} // Set the value to currentDate
                onChange={handleDateChange}
              />
            </div>
            <div className="Search-data1 item4">
              <i className='fa fa-angle-double-down' aria-hidden='true'></i>
            </div>
            <div className="Search-data1 item5">
              <button className='button button--flex search-button'>Search</button>
            </div>
          </div>
          <div className="alert__content-tabledata">
            <div className="product-data">
              <h2 className='product__title'>Product Summary</h2>
              <table className='product__table'>
                <thead>
                  <tr className='table__row'>
                    <th className='table__heading left1'>Name</th>
                    <th className='table__heading'>Category</th>
                    <th className='table__heading'>Count</th>
                    <th className='table__heading'>Date</th>
                    <th className='table__heading'>Price</th>
                    <th className='table__heading'>Description</th>
                    <th className='table__heading'>Status</th>
                    <th className='table__heading'>Edit</th>
                    <th className='table__heading right1'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData.map(item => (
                      <tr className='inventory__table-row' key={item.productId}>
                        
        
                        <td className='table__data left1' >{item.productName}</td>
                        <td className='table__data'>{item.type}</td>
                        <td className='table__data'>{item.quantity}</td>
                        <td className='table__data'>{new Date(item.expiryDate).toLocaleDateString()}</td>
                        <td className='table__data'>{item.price}</td>
                        <td className='table__data'>{item.description}</td>
                        <td className={`table__data ${getProductRowClass(item.expiryDate)}`}>
        {getProductRowClass(item.expiryDate) === 'green-background' ? 'Pending' : 
         getProductRowClass(item.expiryDate) === 'red-background' ? 'Expired' : 
         'Expires Today'}
      </td>
                        <td className='table__data'><i className="uil uil-edit" onClick={() => handleEditClick(item)}></i></td>
                        <td className='table__data right1'><i onClick={() => handleDeleteClick(item)} className="uil uil-trash-alt"></i></td>
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
        open={isDiaLogOpen}
        classes={{ paper: 'custom-dialog-content' }} // Assign a class to the Dialog's paper element
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
        open={isDialogOpen}
        classes={{ paper: 'custom-dialog-content' }}
        onClose={() => setIsDialogOpen(false)}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update the details of the item.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="productName"
              name="productName"
              label="Product Name"
              type="text"
              fullWidth
              value={editedItem.productName || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="type"
              name="type"
              label="Category"
              select
              fullWidth
              value={editedItem.type || ''}
              onChange={handleInputChange}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <div className='editPriceBlock'>
              <TextField
                margin="dense"
                id="price"
                name="price"
                label="Price"
                type="number"
                fullWidth
                value={editedItem.price || ''}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="quantity"
                name="quantity"
                label="Quantity"
                type="number"
                fullWidth
                value={editedItem.quantity || ''}
                onChange={handleInputChange}
              />
            </div>
            <TextField
              margin="dense"
              id="expiryDate"
              name="expiryDate"
              label="Expiry Date"
              type="date"
              fullWidth
              value={editedItem.expiryDate || ''}
              onChange={handleInputChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button className='custom-dialog-cancel' onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button className='custom-dialog-delete' onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Alert;
