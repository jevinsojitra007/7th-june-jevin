import React, { useState } from 'react';

const Task_2 = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemValue, setEditItemValue] = useState('');
  
  const addItem = () => {
    if (newItem.trim() === '') {
      return;
    }
    const newItemObject = { id: Date.now(), name: newItem };
    setItems([...items, newItemObject]);
    setNewItem('');
  };
  
  const deleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };
  
  const startEditing = (itemId, itemName) => {
    setEditItemId(itemId);
    setEditItemValue(itemName);
  };
  
  const updateItem = () => {
    if (editItemValue.trim() === '') {
      return;
    }
    setItems(items.map(item => {
      if (item.id === editItemId) {
        return { ...item, name: editItemValue };
      }
      return item;
    }));
    setEditItemId(null);
    setEditItemValue('');
  };
  
  return (
    <div>
      <h2>Items</h2>
      <hr />
      
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.id === editItemId ? (
              <input
                type="text"
                value={editItemValue}
                onChange={(e) => setEditItemValue(e.target.value)}
              />
            ) : (
              item.name
            )}
            
            <br />
            
            {item.id === editItemId ? (
              <>
                <button className='btn btn-success btn-sm ml-2' onClick={updateItem}>Save</button>
                <button className='btn btn-warning btn-sm ml-2' onClick={() => setEditItemId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button className='btn btn-primary btn-sm ml-2' onClick={() => startEditing(item.id, item.name)}>Edit</button>
                <button className='btn btn-danger btn-sm ml-2' onClick={() => deleteItem(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button className='btn btn-success btn-sm ml-1' onClick={addItem}>Add Item</button>
    </div>
  );
};

export default Task_2;
